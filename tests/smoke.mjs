// End-to-end smoke test. Run `npm run build` first, then `npm test`.
// Starts the real Cloudflare Worker locally (`wrangler dev`), drives Chromium with Playwright, and checks the key features.
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = await import('playwright')); }

const PORT = 4329;
const BASE = `http://localhost:${PORT}`;
const server = spawn('npx', ['wrangler', 'dev', '--port', String(PORT), '--var', 'ALLOW_NO_EMAIL:true'], { stdio: 'pipe', env: { ...process.env, WRANGLER_SEND_METRICS: 'false', CI: '1' }, detached: true });
await new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error('wrangler dev did not start')), 60000);
  const onData = (d) => { if (String(d).includes('Ready on')) { clearTimeout(t); res(); } };
  server.stdout.on('data', onData);
  server.stderr.on('data', onData);
});

let failures = 0;
const check = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`); if (!cond) failures++; };

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

const visible = (scope = '') => page.$$eval(`${scope} [data-shop-card]:not([hidden])`, (els) => els.map((e) => e.dataset.slug));
const setScale = async (i) => { await page.fill('#scale', String(i)); await page.dispatchEvent('#scale', 'input'); await page.waitForTimeout(80); };

try {
  // ---------- Home: project-size slider ----------
  await page.goto(`${BASE}/`);
  check((await page.locator('footer', { hasText: 'This directory is operated by Clutch Cabinets NW.' }).count()) === 1, 'footer disclosure present');
  check((await page.locator('meta[name=robots][content*=noindex]').count()) === 1, 'preview mode: pages are noindex');
  await setScale(0);
  let v = await visible('#scale-results');
  check((await page.textContent('#scale-out')) === '1 kitchen', 'slider starts at "1 kitchen"');
  check(v.length === 5 && !v.includes('sample-shop-d') && JSON.stringify(v) === JSON.stringify(['clutch-cabinets-nw', 'sample-shop-a', 'sample-shop-b', 'sample-shop-c', 'sample-shop-e']), `1 kitchen: residential shops, alphabetical [${v}]`);
  await setScale(3);
  v = await visible('#scale-results');
  check(v[0] === 'clutch-cabinets-nw' && v.includes('sample-shop-d') && !v.includes('sample-shop-a'), `12–49 units: operator first, residential-only shops drop out [${v}]`);
  check(v.indexOf('sample-shop-b') < v.indexOf('sample-shop-d'), '12–49 units: others ordered by capacity score (B 44 > D 33)');
  await setScale(5);
  v = await visible('#scale-results');
  check(JSON.stringify(v) === JSON.stringify(['clutch-cabinets-nw']), `200+ units: only shops whose max project allows it [${v}]`);
  check((await page.getAttribute('#scale', 'aria-valuetext')) === '200+ units', 'slider announces its value to screen readers');
  check((await page.textContent('#scale-note')).includes('operator is listed first'), 'slider explains ordering');

  // Spec cards expand
  const t = page.locator('#scale-results [data-shop-card] [data-spec-toggle]').first();
  await t.click();
  check((await t.getAttribute('aria-expanded')) === 'true', 'spec-sheet card expands on tap');
  check((await page.locator('#scale-results .spec[data-open="true"] td', { hasText: 'Not yet published' }).count()) >= 1, 'unknown capacity shows "Not yet published"');

  // ---------- Directory: filters, URL, map ----------
  await page.goto(`${BASE}/directory`);
  const all = await visible();
  check(all.length === 6, `directory lists all 6 shops (got ${all.length})`);
  check(JSON.stringify(all) === JSON.stringify([...all].sort()), 'directory is alphabetical');
  await page.fill('#q', 'vanities');
  check((await visible()).length === 2, 'keyword search "vanities" → 2 shops');
  await page.fill('#q', '');
  await page.selectOption('#city', 'Eugene');
  check((await visible()).join() === 'sample-shop-b', 'location filter Eugene → Sample Shop B');
  await page.selectOption('#city', '');
  await page.selectOption('#size', 'commercial');
  check((await visible()).length === 3, 'size filter commercial → 3 shops');
  await page.selectOption('#specialty', 'Hospitality');
  check((await visible()).join() === 'sample-shop-d', 'size + specialty → Sample Shop D');
  check(page.url().includes('size=commercial') && page.url().includes('specialty=Hospitality'), 'filters reflected in URL');
  check(await page.locator('#specialty.active').count() === 1, 'active filter is marked');
  await page.selectOption('#market', 'assisted-living');
  check(await page.isVisible('#empty'), 'empty state when nothing matches');
  await page.goto(`${BASE}/directory?market=multifamily`);
  check(JSON.stringify((await visible()).sort()) === JSON.stringify(['clutch-cabinets-nw', 'sample-shop-d']), 'market filter via URL');
  await page.locator('.map').scrollIntoViewIfNeeded();
  await page.waitForSelector('.map[data-ready="1"]', { timeout: 15000 });
  const markers = await page.locator('.map path.leaflet-interactive').count();
  check(markers >= 2, `map draws markers/service areas for the filtered shops (${markers} shapes)`);

  // ---------- Shop pages ----------
  for (const slug of ['clutch-cabinets-nw', 'sample-shop-a', 'sample-shop-b']) {
    const r = await page.goto(`${BASE}/shops/${slug}`);
    check(r.status() === 200, `/shops/${slug} returns 200`);
    const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent());
    check(ld['@type'] === 'LocalBusiness', `/shops/${slug} has LocalBusiness JSON-LD`);
    check((await page.locator('a', { hasText: 'Request an update' }).count()) === 1, `/shops/${slug} has "Request an update" link`);
  }
  check((await page.locator('.op-tag').count()) === 0, 'non-operator shop has no Operator tag');
  await page.goto(`${BASE}/shops/clutch-cabinets-nw`);
  check((await page.locator('.op-tag', { hasText: 'Operator' }).count()) === 1, 'Clutch shop sheet carries Operator label');

  // ---------- Commercial ranking ----------
  await page.goto(`${BASE}/commercial`);
  const op = await page.$$eval('[data-operator-list] [data-shop-card]', (e) => e.map((x) => x.dataset.slug));
  check(op.join() === 'clutch-cabinets-nw', 'Clutch shown first, labeled');
  const ranked = await page.$$eval('[data-ranked-list] [data-shop-card]', (e) => e.map((x) => [x.dataset.slug, +x.dataset.score]));
  check(ranked.length === 2 && ranked[0][1] >= ranked[1][1], `others ranked by score: ${JSON.stringify(ranked)}`);
  check((await page.locator('#how-ranked').count()) === 1, '"How shops are ranked" section present');
  for (const u of ['Multifamily', 'Hospitality', 'Senior living', 'Tenant improvements']) check((await page.locator('.uses h2', { hasText: u }).count()) === 1, `use case: ${u}`);

  // ---------- Multi-step quote ----------
  await page.goto(`${BASE}/quote`);
  check(await page.isVisible('[data-step="0"]') && !(await page.isVisible('[data-step="1"]')), 'quote starts at step 1 only');
  await page.click('#next-btn');
  check((await page.textContent('#step-error')).includes('project type'), 'cannot advance without a project type');
  await page.check('input[name="project-type"][value="Multifamily"]');
  await page.click('#next-btn');
  check(await page.isVisible('[data-step="1"]'), 'advances to Scale');
  await page.fill('#qty', '120');
  check((await page.inputValue('#size')) === 'commercial', '120 units sets project size to commercial');
  await page.click('#next-btn');
  await page.fill('#location', 'Salem, OR');
  await page.click('#next-btn');
  check(await page.isVisible('[data-step="3"]'), 'reaches Contact step');
  check((await page.textContent('#route-live')).includes('Clutch Cabinets NW') && (await page.isDisabled('#shop')), 'commercial request routes to Clutch; shop choice locked');
  await page.click('#back-btn'); await page.click('#back-btn');
  await page.fill('#qty', '1');
  check((await page.inputValue('#size')) === 'residential', 'changing scale to 1 unit sets residential');
  await page.click('#next-btn'); await page.click('#next-btn');
  await page.selectOption('#shop', 'sample-shop-a');
  check((await page.textContent('#route-live')).includes('Sample Shop A'), 'residential request routes to the chosen shop');
  await page.fill('#name', 'Test Person'); await page.fill('#email', 'test@example.com');
  await Promise.all([page.waitForURL('**/thanks'), page.click('#submit-btn')]);
  check(page.url().endsWith('/thanks'), 'quote submits through the Worker and lands on /thanks');
  await page.goto(`${BASE}/quote?shop=sample-shop-c`);
  check((await page.inputValue('#shop')) === 'sample-shop-c', 'quote link from a shop page preselects the shop');
  const unlabeled = await page.$$eval('#quote-form input:not([type=hidden]):not([type=radio]):not([name=bot-field]), #quote-form select, #quote-form textarea',
    (els) => els.filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.name));
  check(unlabeled.length === 0, `all quote fields labeled ${unlabeled.join(',')}`);

  // Other pages
  await page.goto(`${BASE}/request-update?shop=sample-shop-b`);
  check((await page.inputValue('#shop')) === 'sample-shop-b', 'request-update preselects shop');
  const nf = await page.goto(`${BASE}/no-such-page`);
  check(nf.status() === 404, 'unknown URL returns 404');
  check((await (await page.request.get(`${BASE}/robots.txt`)).text()).includes('Disallow: /'), 'preview robots.txt blocks crawlers');
  const titles = new Set();
  for (const p of ['/', '/directory', '/commercial', '/quote', '/about', '/shops/sample-shop-a']) { await page.goto(BASE + p); titles.add(await page.title()); }
  check(titles.size === 6, 'unique page titles');

  // Reduced motion: slider still works with no animation
  const rm = await browser.newPage({ reducedMotion: 'reduce' });
  await rm.goto(`${BASE}/`); await rm.fill('#scale', '3'); await rm.dispatchEvent('#scale', 'input');
  check((await rm.$$eval('#scale-results [data-shop-card]:not([hidden])', (e) => e.length)) === 3, 'reduced-motion: slider filters without animation');

  // Mobile
  const m = await browser.newPage({ viewport: { width: 375, height: 800 } });
  for (const p of ['/', '/directory', '/commercial', '/quote', '/shops/clutch-cabinets-nw', '/markets/multifamily', '/about']) {
    await m.goto(BASE + p);
    check(!(await m.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)), `no horizontal scroll at 375px on ${p}`);
  }
  check(errors.length === 0, `no JS errors ${errors.join(' | ')}`);
} catch (e) {
  console.error(e); failures++;
} finally {
  await browser.close();
  try { process.kill(-server.pid); } catch { server.kill(); }
}
console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
