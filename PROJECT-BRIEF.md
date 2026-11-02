# Project Brief — Local Cabinet Shop Directory

Read this whole file before running `/impeccable init`. Use it as the design context for PRODUCT.md and DESIGN.md, then build the site.

---

## 1. What we're building

A deployable directory of local custom cabinet shops, operated by **Clutch Cabinets NW** (www.clutchcabinetsnw.com). Homeowners, builders and developers use it to compare shops. It positions Clutch Cabinets NW as the go-to shop for **high-volume and commercial production** work.

- Site name: `[SITE NAME]` (placeholder, set in one config file)
- Region: `[REGION, e.g. Willamette Valley, OR]` (placeholder, same config file)
- Quote form email: `[YOUR-EMAIL]` (placeholder)

## 2. Positioning rules (hardest requirement)

- Clutch Cabinets NW ranks **first** for commercial and high-volume project types and is featured on the `/commercial` page.
- That ranking comes from **visible criteria** stored for each shop: production capacity (units/month), CNC / automated production, commercial project experience, max project size, typical lead time. Show a short "How shops are ranked" note on the commercial page.
- Footer and About page say plainly: "This directory is operated by Clutch Cabinets NW." Clutch's card carries a small "Operator" label.
- Residential and small-project listings are neutral (alphabetical or by distance).
- Clutch's capacity numbers are placeholders marked `TODO`. Don't invent capability claims.
- Seed with Clutch plus 4–5 obviously fake sample shops ("Sample Shop A — Placeholder"). No real business names.

## 3. Design direction — the part that must not look generic

**Concept: the millwork shop floor.** The site should feel like it was made by people who build things — shop drawings, raw materials, precise joinery — not like a SaaS landing page.

**Palette (define as CSS custom properties / tokens, never default Tailwind colors):**
- Walnut `#3B2A20` (primary dark)
- Blackened steel `#1E2124` (text, dark sections)
- Raw maple `#E9DCC6` (main background — warm, not white)
- Sawdust `#F5EFE4` (cards, light panels)
- Safety orange `#E2582B` (one accent only: CTAs, active filters, the Operator tag)
- Pencil graphite `#6B6B66` (secondary text, drawing lines)

**Typography:**
- Display: a characterful serif or condensed industrial face (e.g. Fraunces, Playfair Display, or Oswald for labels). Big, confident headlines.
- Body: a clean humanist sans that is **not** Inter, Roboto, Arial or system-ui (e.g. Source Sans 3, IBM Plex Sans, Work Sans).
- Technical labels (dimensions, capacity, lead time) in a monospace like IBM Plex Mono — like annotations on a shop drawing.

**Texture and detail:**
- Subtle wood-grain or paper texture in backgrounds (CSS or a lightweight SVG, not heavy images).
- Shop-drawing motifs: thin graphite dimension lines, corner tick marks, section labels like "SEC. A — COMMERCIAL".
- Cards look like spec sheets or material samples, not floating white boxes with drop shadows.

**Banned (the generic AI look):**
- Purple/blue gradients, glassmorphism, neon glows
- Three identical rounded cards in a row as the main layout
- Default shadcn / Tailwind styling, `bg-white shadow-md rounded-lg` everywhere
- Emoji as icons, stock "team high-fiving" imagery
- Centered hero with a giant headline and two buttons and nothing else

## 4. Interactivity (make it feel alive, but purposeful)

1. **Project-size slider** on the home page: from "1 kitchen" to "200+ units". As it moves, the shop list re-sorts and filters live, and commercial-capable shops (Clutch first) rise to the top at the high end. Smooth animated reordering.
2. **Animated filters** for location, specialty and project size — results transition, they don't jump.
3. **Shop map** showing service areas (lightweight, e.g. Leaflet with a muted map style).
4. **Spec-sheet cards** that flip or expand on hover/tap to show capacity, lead time and specialties.
5. **Quote form as a short multi-step flow**: project type → scale (units / rooms / linear feet) → timeline → contact. Tell visitors where the request goes: commercial/high-volume to Clutch Cabinets NW; others can pick a shop.
6. Motion is restrained and respects `prefers-reduced-motion`.

## 5. Pages

- **Home** — what the directory is, project-size slider, entry points (Residential / Light Commercial / Commercial & High-Volume), featured commercial section.
- **Directory** — filterable, searchable shop cards.
- **Shop detail** — one per shop at `/shops/shop-name`, with "Is this your shop? Request an update."
- **Commercial & High-Volume** (`/commercial`) — for developers, GCs, property managers and builders. Use cases: multifamily, hospitality, senior living, tenant improvements. Clutch first, then other qualifying shops by the ranking criteria.
- **Quote request** — the multi-step form.
- **About** — who runs the site, with the disclosure.

## 6. Tech and hosting

- Host on **Cloudflare Pages** (free tier), deployed from a GitHub repo.
- Static site generator (Astro preferred) with shop data in Markdown or JSON files.
- A git-based admin so shops can be added/edited in a browser form without code (e.g. Pages CMS or Decap CMS, set up to work with Cloudflare Pages).
- Form handling that works on Cloudflare (e.g. a Cloudflare Pages Function or Formspree).
- Site name, region, email and colors live in one config file.

## 7. Quality bar

- Mobile-first; check every page at phone width.
- Lighthouse 90+ on performance, accessibility, SEO.
- Local SEO: unique titles and meta descriptions, LocalBusiness JSON-LD on each shop page, sitemap.xml, robots.txt, clean URLs.
- Accessible: real headings, alt text, labeled fields, good contrast (check the orange on maple).
- No user accounts, payments, or reviews.

## 8. How to work

1. Run `/impeccable init` using this brief as the context.
2. Give a short plan (pages, file structure), then build without waiting.
3. Run the site locally. Test the slider, filters, search, shop pages, commercial ranking and quote form. Fix anything broken.
4. Run Impeccable's audit and polish passes and fix what they flag.
5. Finish with a README: run locally, add/edit a shop, change site name/region, deploy to Cloudflare Pages, connect a custom domain.
