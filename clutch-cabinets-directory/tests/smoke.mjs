// End-to-end smoke test. Run `npm run build` first, then `npm test`.
// Starts `astro preview`, drives Chromium with Playwright, and checks the key features.
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = await import('playwright')); }

const PORT = 4329;
const BASE = `http://localhost:${PORT}`;
const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'pipe' });
await new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error('preview did not start')), 20000);
  server.stdout.on('data', (d) => { if (String(d).includes(String(PORT))) { clearTimeout(t); res(); } });
});

let failures = 0;
const check = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`); if (!cond) failures++; };

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const visible = () => page.$$eval('[data-shop-card]:not([hidden])', (els) => els.map((e) => e.dataset.name));

try {
  // Home
  await page.goto(`${BASE}/`);
  check((await page.title()).length > 0, 'home has a title');
  check(await page.locator('footer', { hasText: 'This directory is operated by' }).count() === 1, 'footer disclosure present');

  // Directory: search + filters
  await page.goto(`${BASE}/directory`);
  const all = await visible();
  check(all.length === 6, `directory lists all 6 shops (got ${all.length})`);
  check(JSON.stringify(all) === JSON.stringify([...all].sort()), 'directory is alphabetical');
  await page.fill('#q', 'vanities');
  check((await visible()).length === 2, 'keyword search "vanities" → 2 shops');
  await page.fill('#q', '');
  await page.selectOption('#city', 'Eugene');
  check((await visible()).join() === 'sample shop b – placeholder', 'location filter Eugene → Sample Shop B');
  await page.selectOption('#city', '');
  await page.selectOption('#size', 'commercial');
  check((await visible()).length === 3, 'size filter commercial → 3 shops');
  await page.selectOption('#specialty', 'Hospitality');
  check((await visible()).join() === 'sample shop d – placeholder', 'size + specialty Hospitality → Sample Shop D');
  check(page.url().includes('size=commercial') && page.url().includes('specialty=Hospitality'), 'filters reflected in URL');
  await page.fill('#q', 'zzznomatch');
  check(await page.isVisible('#empty'), 'empty state shown when nothing matches');
  await page.goto(`${BASE}/directory?q=springfield`);
  check((await visible()).length === 1, 'home search query (?q=springfield) prefills and filters');
  await page.goto(`${BASE}/directory?size=residential`);
  check((await visible()).length === 5, 'entry link ?size=residential → 5 shops');

  // Market filter + market pages
  await page.goto(`${BASE}/directory?market=multifamily`);
  check((await visible()).length === 2, 'market filter multifamily → 2 shops (Clutch, D)');
  await page.goto(`${BASE}/directory?market=assisted-living`);
  check((await visible()).join() === 'clutch cabinets nw', 'market filter assisted-living → Clutch only');
  for (const m of ['custom-residential', 'commercial', 'multifamily', 'assisted-living', 'large-volume-installation']) {
    const r = await page.goto(`${BASE}/markets/${m}`);
    check(r.status() === 200, `/markets/${m} returns 200`);
  }
  await page.goto(`${BASE}/markets/multifamily`);
  check((await page.$$eval('[data-operator-list] [data-shop-card]', (e) => e.map((x) => x.dataset.name))).join() === 'clutch cabinets nw', 'multifamily page: operator pinned first');
  await page.goto(`${BASE}/markets/custom-residential`);
  const alpha = await page.$$eval('[data-alpha-list] [data-shop-card]', (e) => e.map((x) => x.dataset.name));
  check(alpha.length === 5 && JSON.stringify(alpha) === JSON.stringify([...alpha].sort()) && (await page.locator('[data-operator-list]').count()) === 0, 'custom residential page: alphabetical, no pinning');
  await page.goto(`${BASE}/quote?market=assisted-living&size=commercial`);
  check((await page.inputValue('#market')) === 'assisted-living' && (await page.textContent('#route-live')).includes('Clutch Cabinets NW'), 'quote from ALF page → market prefilled, routes to Clutch');
  await page.goto(`${BASE}/quote`);
  await page.selectOption('#market', 'multifamily');
  check((await page.inputValue('#size')) === 'commercial', 'choosing a high-volume market sets size to commercial');

  // Shop pages
  for (const slug of ['clutch-cabinets-nw', 'sample-shop-a', 'sample-shop-b']) {
    const r = await page.goto(`${BASE}/shops/${slug}`);
    check(r.status() === 200, `/shops/${slug} returns 200`);
    const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent());
    check(ld['@type'] === 'LocalBusiness', `/shops/${slug} has LocalBusiness JSON-LD`);
    check(await page.locator('a', { hasText: 'Request an update' }).count() === 1, `/shops/${slug} has "Request an update" link`);
  }
  const titles = new Set();
  for (const p of ['/', '/directory', '/commercial', '/quote', '/about', '/shops/sample-shop-a']) {
    await page.goto(BASE + p); titles.add(await page.title());
  }
  check(titles.size === 6, 'page titles are unique');

  // Commercial ranking
  await page.goto(`${BASE}/commercial`);
  const op = await page.$$eval('[data-operator-list] [data-shop-card]', (e) => e.map((x) => x.dataset.name));
  check(op.join() === 'clutch cabinets nw', 'operator (Clutch) shown first in labeled section');
  const ranked = await page.$$eval('[data-ranked-list] [data-shop-card]', (e) => e.map((x) => [x.dataset.name, +x.dataset.score]));
  check(ranked.length === 2 && ranked.every((r, i, a) => i === 0 || a[i - 1][1] >= r[1]), `others ranked by score desc: ${JSON.stringify(ranked)}`);
  check(await page.locator('#how-ranked').count() === 1, '"How shops are ranked" note present');

  // Quote form
  await page.goto(`${BASE}/quote`);
  check(await page.locator('form[name="quote"][data-netlify="true"]').count() === 1, 'quote form is a Netlify form');
  const unlabeled = await page.$$eval('#quote-form input:not([type=hidden]):not([name=bot-field]), #quote-form select, #quote-form textarea',
    (els) => els.filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.name));
  check(unlabeled.length === 0, `all quote fields have labels ${unlabeled.join(',')}`);
  await page.selectOption('#size', 'commercial');
  check((await page.textContent('#route-live')).includes('Clutch Cabinets NW'), 'commercial request routes to Clutch Cabinets NW');
  check(await page.isDisabled('#shop'), 'shop choice locked for commercial');
  await page.selectOption('#size', 'residential');
  await page.selectOption('#shop', 'sample-shop-a');
  check((await page.textContent('#route-live')).includes('Sample Shop A'), 'residential request routes to chosen shop');
  await page.selectOption('#shop', '');
  check((await page.textContent('#route-live')).includes('site owner'), 'no choice → site owner');
  await page.goto(`${BASE}/quote?shop=sample-shop-c`);
  check((await page.inputValue('#shop')) === 'sample-shop-c', 'quote link from shop page preselects the shop');
  // Required-field validation blocks empty submit
  await page.goto(`${BASE}/quote`);
  await page.click('#quote-form button[type=submit]');
  check(page.url().endsWith('/quote'), 'empty quote submit is blocked by required fields');
  await page.goto(`${BASE}/request-update?shop=sample-shop-b`);
  check((await page.inputValue('#shop')) === 'sample-shop-b', 'request-update preselects shop');

  // Mobile: no horizontal scroll
  await page.setViewportSize({ width: 375, height: 800 });
  for (const p of ['/', '/directory', '/commercial', '/quote', '/shops/clutch-cabinets-nw', '/markets/assisted-living']) {
    await page.goto(BASE + p);
    const over = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    check(!over, `no horizontal scroll at 375px on ${p}`);
  }

  check(errors.length === 0, `no JS errors ${errors.join(' | ')}`);
} finally {
  await browser.close();
  server.kill();
}
console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
