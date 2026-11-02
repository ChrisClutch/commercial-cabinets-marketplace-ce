# Product

<!-- impeccable:product-schema 1 -->

> Written from PROJECT-BRIEF.md (the owner's brief). The owner was not interviewed separately for this file;
> facts marked *(inferred)* come from the brief's intent, not an explicit answer.

## Platform

web

## Stack

Astro (static pages) with shop data as one JSON file per shop, Decap CMS for browser editing, and a Cloudflare Worker for form email and the CMS GitHub login. Delegated: the brief asks for Cloudflare Pages; a Worker serving static assets is the same free GitHub-to-Cloudflare flow and was already tested for forms and login.

## Users

- **Homeowners** comparing local custom cabinet shops for a kitchen, bath or built-in.
- **Builders and remodelers** who need a shop that matches the size of a job.
- **Developers, GCs and property managers** sourcing high-volume or commercial cabinet production (multifamily, hospitality, senior living, tenant improvements).
- **Shop owners** who want their listing accurate (they use "Request an update").

## Product Purpose

A local directory of custom cabinet shops in `[REGION]` that lets people match a shop to the size of their project, compare specialties and capacity, and request a quote. Success: qualified quote requests, especially commercial and high-volume requests for Clutch Cabinets NW, without the directory losing trust with other shops or homeowners.

## Positioning

It is openly operated by a working cabinet shop (Clutch Cabinets NW), and it ranks commercial shops by published capacity criteria instead of hidden boosting. Clutch is first for commercial work in the open, labeled "Operator."

## Operating Context

Buyers think in project scale: one kitchen, a handful of units, or 200+ apartments. Commercial buyers talk in units, unit types, lead times and production capacity; homeowners talk in rooms and style. Shops are compared on specialties, service area and capacity. Requests go by email to the site owner, who forwards them.

## Capabilities and Constraints

- Pages: Home (project-size slider), Directory (filters, search, map), Shop detail `/shops/<slug>`, Commercial `/commercial` (ranked), Quote (multi-step), About (disclosure).
- Commercial ranking uses stored criteria: production capacity (units/month), CNC/automated production, commercial project experience, max project size, typical lead time.
- Residential and small-project listings stay neutral (alphabetical).
- Site name, region, emails and colors in one config file (`src/config/site.json`).
- No user accounts, payments or reviews.
- Placeholders: `[SITE NAME]`, `[REGION]`, `[YOUR-EMAIL]`.

## Brand Commitments

- "This directory is operated by Clutch Cabinets NW." appears in the footer and on About; Clutch's card carries an "Operator" label.
- Palette, type direction and the "millwork shop floor" concept are set by the brief (see DESIGN.md).

## Evidence on Hand

- Clutch Cabinets NW: name, website, Salem OR, wholesale for projects of 12+ units. **Capacity numbers are not known**; they are `TODO` and must not be invented.
- Sample shops A–E are fictional placeholders. No real business names, no reviews, no testimonials, no project photography yet.

## Product Principles

1. **Lead in the open.** Clutch wins commercial placement through visible criteria and labels, never hidden ordering.
2. **Match the scale.** Every surface helps a visitor find shops that fit the size of their project.
3. **Never invent capability.** Unknown values say so; placeholders stay obviously placeholders.
4. **Built by people who build things.** The site should read as a shop's own tool, not a SaaS template.

## Accessibility & Inclusion

WCAG 2.1 AA: real heading order, labeled fields, alt text, keyboard-usable controls, and verified contrast (the brief specifically flags safety orange on maple). Motion respects `prefers-reduced-motion`.
