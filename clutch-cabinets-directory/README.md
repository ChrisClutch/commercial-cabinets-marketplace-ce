# Cabinet Shop Directory (operated by Clutch Cabinets NW)

A static directory of local custom cabinet shops. It's built with **Astro** and hosted on **Cloudflare**, using a Worker plus static assets on the free plan. The shop data lives in JSON files. You edit it in a browser with **Decap CMS** at `/admin`, logging in with GitHub. Quote requests are emailed to you through **Cloudflare Email Routing**.

```
clutch-cabinets-directory/
├── src/config/site.json        ← site name, region, emails, colors (one place)
├── src/content/shops/*.json    ← one file per shop (edited via /admin)
├── src/lib/shops.ts            ← market list + commercial ranking formula
├── src/pages/                  ← home, directory, shops/[slug], markets/[segment], commercial, quote, about…
├── worker/index.js             ← Cloudflare Worker: form emails + /admin GitHub login
├── wrangler.jsonc              ← Cloudflare config (email addresses, bindings)
├── public/admin/               ← Decap CMS (config.yml = admin form fields)
├── public/images/shops/        ← uploaded logos/photos
└── tests/smoke.mjs             ← end-to-end test (runs the real Worker locally)
```

## Before launch: TODO list
The build prints a `[TODO]` warning until these are filled in.
1. **Clutch Cabinets NW listing** (`src/content/shops/clutch-cabinets-nw.json`):
   - Confirm which **Markets** Clutch should be listed in. It's currently in all five.
   - Fill in the real capacity numbers, service area, phone, email and description. Use only numbers you can back up. Until then the commercial pages show "Capacity score: Not yet published."
2. **Site settings** (`src/config/site.json`): replace `[SITE NAME]`, `[REGION…]`, `[YOUR-EMAIL]` and `siteUrl`.
3. **Delete the 5 sample shops** (`sample-shop-*.json`) and add real ones.
4. Read through the copy for promises you need to keep. The site currently says shops never pay for ranking, listings are free, and visitor info isn't shared beyond the shop handling the request. Edit these lines if any of them won't stay true: `commercial.astro`, `about.astro`, `quote.astro`.

## Run it locally
You need Node.js 20 or newer.
```bash
cd clutch-cabinets-directory
npm install
npm run dev          # fast preview of the pages: http://localhost:4321
npm run cf:dev       # full site + Worker (forms work; emails are written to .wrangler/tmp/email)
```
To test (needs Playwright: `npm i -D playwright && npx playwright install chromium`):
```bash
npm run build && npm test
```

## Add or edit a shop
**On the live site:** go to `https://yourdomain.com/admin` and click **Login with GitHub**. Click **Shops**, then **New Shop** to add one or an existing shop to edit it. Click **Publish** when you're done. That saves a commit to GitHub, Cloudflare rebuilds, and the change is live in about a minute. Anyone who edits needs a GitHub account with write access to the repo.

**Locally, without logging in:** run `npm run cms` in one terminal and `npm run dev` in another, then open `http://localhost:4321/admin/`. Changes are saved straight to your files, so commit and push them afterwards.

Field tips:
- **URL slug**: lowercase letters, numbers and dashes. It becomes `/shops/<slug>`.
- **Markets**: choose any of Custom Residential, Commercial & Tenant Improvement, Multifamily, Assisted Living & Senior Living, and Other Large-Volume Installation. Each market has its own page (`/markets/multifamily`, `/markets/assisted-living`, …) and a filter in the directory. Custom Residential is listed alphabetically. The other four list the operator first, then rank shops by capacity score.
- **Capacity fields**: these drive the commercial ranking. Leave a field blank if you don't know it (blank scores 0).
- **Operator**: keep this on for Clutch Cabinets NW only. It pins Clutch first on the commercial pages with an "Operator" label.
- **Featured**: adds a "Featured" label. It doesn't change any ranking.

## Change the site name, region, emails or colors
Go to `/admin` → **Site settings**, or edit `src/config/site.json`. Every page reads from that one file. The address quote emails go to is set separately in `wrangler.jsonc`; see step 3 below.

## How the commercial ranking works
Defined in `src/lib/shops.ts` and published on `/commercial#how-ranked`. It's a 100-point score: capacity 35, CNC 15, commercial experience 20, max project size 20, lead time 10. The operator's listing appears in its own labeled section above the ranked list.

## Deploy to Cloudflare (step by step)
You need your domain on Cloudflare DNS for the form emails to work. If it's registered elsewhere, add it to Cloudflare (**Add a domain**) and change the nameservers at your registrar to the two Cloudflare gives you.

1. **Put the code on GitHub.** It's currently in the `forgesalem-website` repo, in the `clutch-cabinets-directory` folder. That works. A separate repo is cleaner; if you move it:
   - remove `clutch-cabinets-directory/` from the paths in `public/admin/config.yml`;
   - update `repo:` in that file;
   - change the `cms` script in `package.json` to `npx decap-server`.
2. **Create the Worker:** Cloudflare dashboard → **Workers & Pages → Create → Import a repository** → pick the repo. Then set:
   - **Root directory:** `clutch-cabinets-directory` (blank if it's in its own repo)
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - Production branch `main`.

   Every push to `main` now deploys automatically.
3. **Turn on form emails:**
   1. Dashboard → your domain → **Email → Email Routing → Enable**. Add your inbox under **Destination addresses** and click the verification link Cloudflare emails you.
   2. In `wrangler.jsonc`, set `destination_address` and `FORM_TO` to that verified inbox, and `FORM_FROM` to any address on your domain (e.g. `forms@yourdomain.com`; it doesn't need a mailbox).
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
