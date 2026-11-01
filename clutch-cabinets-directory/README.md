# Cabinet Shop Directory (operated by Clutch Cabinets NW)

A static directory of local custom cabinet shops. It's built with **Astro**, the shop data lives in JSON files, you edit it with **Decap CMS** at `/admin`, quote requests go through **Netlify Forms**, and it runs on Netlify's free tier.

```
clutch-cabinets-directory/
├── src/config/site.json        ← site name, region, emails, colors (one place)
├── src/content/shops/*.json    ← one file per shop (edited via /admin)
├── src/lib/shops.ts            ← commercial ranking formula
├── src/pages/                  ← home, directory, shops/[slug], commercial, quote, about…
├── public/admin/               ← Decap CMS (config.yml = admin form fields)
├── public/images/shops/        ← uploaded logos/photos
└── tests/smoke.mjs             ← end-to-end test (Playwright)
```

## Before launch: TODO list
The build prints a `[TODO]` warning until these are filled in.
1. **Clutch Cabinets NW listing**: `src/content/shops/clutch-cabinets-nw.json`. Fill in the real capacity numbers, service area, phone, email and description. Use only numbers you can back up. Until then the commercial pages show "Capacity score: Not yet published."
2. **Site settings**: `src/config/site.json`. Replace `[SITE NAME]`, `[REGION…]`, `[YOUR-EMAIL]` and `siteUrl`.
3. **Delete the 5 sample shops** (`sample-shop-*.json`) and add real ones.
4. Read through the copy for promises you need to keep. The site currently says shops never pay for ranking, listings are free, and visitor info isn't shared beyond the shop handling the request. Edit these lines if any of them won't stay true: `commercial.astro`, `about.astro`, `quote.astro`.

## Run it locally
You need Node.js 20 or newer.
```bash
cd clutch-cabinets-directory
npm install
npm run dev          # http://localhost:4321
```
To build and test:
```bash
npm run build && npm test   // the test needs Playwright: npm i -D playwright && npx playwright install chromium
```

## Add or edit a shop
**On the live site (easiest):** go to `https://yourdomain.com/admin`, log in, and click **Shops**. Use **New Shop** to add one, or click an existing shop to edit it. Click **Publish** when you're done. The site rebuilds and is live in about a minute.

**Locally, without logging in:** run `npm run cms` in one terminal and `npm run dev` in another, then open `http://localhost:4321/admin/`. Changes are saved straight to your files, so commit and push them afterwards.

Field tips:
- **URL slug**: lowercase letters, numbers and dashes. It becomes `/shops/<slug>`.
- **Capacity fields**: these drive the commercial ranking. Leave a field blank if you don't know it (blank scores 0).
- **Operator**: keep this on for Clutch Cabinets NW only. It pins Clutch first on `/commercial` with an "Operator" label.
- **Featured**: adds a "Featured" label. It doesn't change any ranking.

## Change the site name, region, emails or colors
Go to `/admin` → **Site settings**, or edit `src/config/site.json`. Every page reads from that one file.

## How the commercial ranking works
Defined in `src/lib/shops.ts` and published on `/commercial#how-ranked`. It's a 100-point score: capacity 35, CNC 15, commercial experience 20, max project size 20, lead time 10. The operator's listing appears in its own labeled section above the ranked list. If you change the formula, the table on the page updates automatically.

## Deploy to Netlify (step by step)
1. **Put the code on GitHub.** This folder currently sits inside the `forgesalem-website` repo. That works, but a separate repo is cleaner. If you move it, remove `clutch-cabinets-directory/` from the paths in `public/admin/config.yml`, and change the `cms` script in `package.json` to `npx decap-server`.
2. Log in at [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project → GitHub** → choose the repo.
3. Build settings:
   - **Base directory:** `clutch-cabinets-directory` (leave blank if it's in its own repo)
   - **Build command:** `npm run build`
   - **Publish directory:** `clutch-cabinets-directory/dist` (or `dist` if it's in its own repo)
   - **Branch:** `main`. It must match `branch:` in `public/admin/config.yml`.
4. Click **Deploy**.
5. **Turn on forms:** Site configuration → **Forms** → **Enable form detection**, then redeploy. The `quote` and `listing-update` forms will appear there.
6. **Email notifications for quote requests:** Forms → **Form notifications** → **Add notification → Email notification**. Choose the `quote` form and enter your email (the `[YOUR-EMAIL]` placeholder). Repeat for `listing-update`.
7. **Turn on the admin login:**
   - Site configuration → **Identity** → **Enable Identity**.
   - Set Registration to **Invite only**.
   - Under Services, **enable Git Gateway**.
   - Invite yourself under **Identity → Invite users**. Open the email, set a password, then log in at `/admin`.
   - Note: Netlify has deprecated Identity for new sites but it still works. If it isn't available on your account, switch `backend` in `config.yml` to `github` and follow Decap's "GitHub backend" docs.

## Connect a custom domain
1. Netlify → **Domain management → Add a domain** → enter `yourdomain.com`.
2. At your domain registrar, either:
   - point the nameservers to the four Netlify nameservers shown (easiest), **or**
   - add a `CNAME` record for `www` → `your-site.netlify.app` and an `A` record for `@` → `75.2.60.5`.
3. Wait for DNS to update (minutes to a few hours). Netlify issues the free HTTPS certificate automatically.
4. Update `siteUrl` in Site settings to `https://yourdomain.com`. The canonical tags, sitemap and structured data all use it.
5. Submit `https://yourdomain.com/sitemap-index.xml` in Google Search Console.

## Deploy to Vercel instead
The site builds as-is on Vercel (Root Directory `clutch-cabinets-directory`, framework Astro). Netlify Forms and the Git Gateway login won't work there, though. You'd need to switch the forms to Formspree (change the `<form>` `action` to your Formspree URL) and the CMS backend to `github`. That's why Netlify is the default.
