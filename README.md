# [SITE NAME]: local cabinet shop directory

A directory of custom cabinet shops in `[REGION]`, operated by **Clutch Cabinets NW**. Visitors match a shop to the size of their project, from one kitchen to 200+ units, compare spec sheets and service areas, and send a quote request.

**Built with Claude Code (Anthropic)** from [`PROJECT-BRIEF.md`](PROJECT-BRIEF.md), as one entry in a three-way build comparison (Claude, Antigravity, ChatGPT). Session link (owner access only): https://claude.ai/code/cshk_014LpFBUt1WyZiMxF5FZ73XfDVr5qjAvoZYZCtsFaKiZvZ

- **Product context:** [`PRODUCT.md`](PRODUCT.md) (Impeccable format)
- **Design system:** [`DESIGN.md`](DESIGN.md) ("the millwork shop floor": palette, type, components)

## What's in it

| Page | What it does |
|---|---|
| `/` | Project-size slider ("1 kitchen" to "200+ units"). The shop list filters and re-sorts live with a short animated reorder. Below 12 units it's alphabetical; from 12 units up, the operator is first (labeled) and the rest follow the published capacity score. |
| `/directory` | Search plus location, specialty, market and project-size filters; results animate into place; the service-area map updates with the filters. |
| `/shops/<slug>` | Spec sheet with capacity table, contact, location map, LocalBusiness JSON-LD, "Is this your shop? Request an update." |
| `/commercial` | Multifamily, hospitality, senior living and tenant improvement use cases; Clutch first (Operator), then other qualifying shops ranked by capacity score; "How shops are ranked." |
| `/quote` | Four steps: project type, scale (units / rooms / linear feet), timeline and location, contact. Shows where the request goes (commercial goes to Clutch Cabinets NW; others go to the chosen shop or the site owner). |
| `/markets/<market>` | Custom residential, commercial/TI, multifamily, assisted living, other large-volume. |
| `/about` | Who runs the site and the disclosure. |
| `/admin` | Decap CMS: add or edit shops and site settings in a browser form. |

Every card is a spec sheet: tap **Show specs** to expand capacity, largest project, lead time, CNC and commercial experience. Unknown values say "Not yet published." Motion is short and turns off under `prefers-reduced-motion`.

## How the brief and Impeccable's rules were reconciled

| Brief | Impeccable rule | What was done |
|---|---|---|
| Display font like Fraunces or Playfair | Fraunces is on the overused list; big italic serifs are flagged | **Big Shoulders Display** (condensed, signage-like) + **IBM Plex Sans** body + **IBM Plex Mono** annotations |
| "SEC. A — COMMERCIAL" section labels | Kicker labels above headings are banned | Labels sit in a title block on the frame's bottom-right corner, like a drawing sheet |
| Raw maple background | Cream backgrounds flagged when reflexive | Kept: a deliberate, named palette with a faint grain |
| Safety orange accent | Contrast | Orange on maple is 2.74:1, so orange is used for fills (buttons, active states, the slider thumb). A darker **orange ink `#A63D18`** is used for orange text and the Operator tag (5.6:1). Button labels on orange are large bold text (4.36:1 passes for large text). Secondary text uses **graphite ink `#55554F`** (5.5:1). |
| "Sample Shop A — Placeholder" | Em-dash saturation | Named "Sample Shop A (Placeholder)": still obviously fake, no em dashes |

Impeccable itself couldn't run in the build environment (downloaded code was blocked), so its 64 detector rules were applied by hand. To double-check on your machine: `npx impeccable detect http://localhost:8787` while `npm run cf:dev` is running.

## Quality checks (latest run)
- **64 automated browser checks pass** (`npm test`): slider filtering and ordering, spec cards, filters and URL state, map markers, shop pages and JSON-LD, commercial ranking, every quote step and routing rule, form submission through the Worker, reduced motion, and no horizontal scroll at 375px.
- **Lighthouse:** 100 performance / 100 accessibility / 100 best practices / 100 SEO on the home and directory pages with indexing on. In preview mode SEO reads 66 only because the site deliberately tells search engines to stay away.

## Preview mode (hidden from search engines)
`previewNoindex` in `src/config/site.json` is **on**: every page is `noindex` and `robots.txt` disallows crawlers, so the three comparison builds don't compete in Google. Turn it off (or untick "Hide from search engines" in Admin → Site settings) only for the build that goes live.

## Before launch
1. Fill in Clutch Cabinets NW's capacity numbers, service area, radius, phone, email and description (`src/content/shops/clutch-cabinets-nw.json`; the build prints a `[TODO]` list).
2. Replace the five sample shops with real, consenting shops.
3. Set `[SITE NAME]`, `[REGION]`, `[YOUR-EMAIL]` and `siteUrl`.
4. **Map tiles:** the map uses OpenStreetMap's public tiles, which are fine for light use. For real traffic, switch `mapTiles.url` in `site.json` to a provider with a free tier (for example MapTiler or Stadia Maps; they need a free API key).
5. Re-read the promises in the copy (for example "Listings are free" on About) and keep only ones you'll honor.

## Run it locally
Requires Node.js 20+.
```bash
npm install
```
```bash
npm run dev
```
Opens http://localhost:4321. For the full site plus the form Worker (emails are written to `.wrangler/tmp/email` instead of sent):
```bash
npm run cf:dev
```
To run the tests (needs Playwright: `npm i -D playwright && npx playwright install chromium`):
```bash
npm run build && npm test
```

## Add or edit a shop
**On the live site:** go to `/admin`, log in with GitHub, open **Shops**, then **New Shop** or click a shop. Fill in the form and **Publish**; the site redeploys in about a minute.

**Locally:** run `npm run cms` in one terminal and `npm run dev` in another, then open `http://localhost:4321/admin/`. Changes are written straight to `src/content/shops/`; commit and push them.

Field tips:
- **URL slug** becomes `/shops/<slug>` (lowercase, dashes).
- **Map latitude / longitude / service radius** place the shop and its dashed service-area circle on the map. Right-click a spot in Google Maps to copy coordinates.
- **Capacity fields** drive the commercial ranking; leave blank if unknown (scores 0, shows "Not yet published").
- **Operator** is for Clutch Cabinets NW only: it pins the listing first for 12+ unit projects and on the commercial pages, always labeled.

## Change the site name, region, emails or colors
Admin → **Site settings**, or edit `src/config/site.json`. Colors are the brief's palette plus the two accessible "ink" shades; if you change them, keep orange ink and graphite ink dark enough to read on maple (4.5:1).

## Deploy to Cloudflare (step by step)
You need your domain on Cloudflare DNS for the form emails to work. If it's registered elsewhere, add it to Cloudflare (**Add a domain**) and change the nameservers at your registrar to the two Cloudflare gives you.

1. **The code is already on GitHub** in this repo (`ChrisClutch/commercial-cabinets-marketplace-ce`).
2. **Create the Worker:** Cloudflare dashboard → **Workers & Pages → Create → Import a repository** → pick the repo. Then set:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - Production branch `main`.

   Every push to `main` now deploys automatically.
3. **Turn on form emails:**
   1. Dashboard → your domain → **Email → Email Routing → Enable**. Add your inbox under **Destination addresses** and click the verification link Cloudflare emails you.
   2. In `wrangler.jsonc`, uncomment the `send_email` block, then set `destination_address` and `FORM_TO` to that verified inbox, and `FORM_FROM` to any address on your domain (e.g. `forms@yourdomain.com`; it doesn't need a mailbox).
   3. Commit and push.

   Each quote arrives as an email. Hitting Reply goes straight to the visitor.
4. **Connect your domain:** Worker → **Settings → Domains & Routes → Add → Custom domain** → `www.yourdomain.com`. Add the bare domain too if you want it. HTTPS is automatic.
5. **Turn on the `/admin` login:**
   1. On GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**.
      - Homepage URL: `https://www.yourdomain.com`
      - Callback URL: `https://www.yourdomain.com/api/callback`
   2. Copy the **Client ID** into `GITHUB_CLIENT_ID` in `wrangler.jsonc`.
   3. Generate a client secret, then in Cloudflare go to Worker → **Settings → Variables and Secrets → Add → Secret**. Name it `GITHUB_CLIENT_SECRET`.
   4. In `public/admin/config.yml`, set `base_url` to `https://www.yourdomain.com`.
   5. Push.
6. **Update `siteUrl`** in Site settings to your domain. The canonical tags, sitemap and structured data all use it. Then submit `https://www.yourdomain.com/sitemap-index.xml` in Google Search Console.

Optional extras:
- **Spam protection with Turnstile:**
  - Dashboard → **Turnstile → Add widget** for your domain.
  - Put the site key in Site settings → "Turnstile site key".
  - Add the secret key as a Worker secret named `TURNSTILE_SECRET`.
- **Backup copy of every submission:**
  - Create a KV namespace (**Storage & Databases → KV**).
  - Add it to `wrangler.jsonc` as `"kv_namespaces": [{ "binding": "SUBMISSIONS", "id": "…" }]`.

**Deploying from your own computer instead:** run `npx wrangler login` once, then `npm run deploy`.

**Cost:** the Workers free plan covers 100,000 dynamic requests a day, and static page views don't count toward that. Email Routing and Turnstile are free.
