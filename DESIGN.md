---
name: "[SITE NAME] cabinet shop directory"
description: "The millwork shop floor: shop drawings, raw materials, precise joinery."
colors:
  walnut: "#3B2A20"
  blackened-steel: "#1E2124"
  raw-maple: "#E9DCC6"
  sawdust: "#F5EFE4"
  safety-orange: "#E2582B"
  safety-orange-ink: "#A63D18"
  pencil-graphite: "#6B6B66"
  graphite-ink: "#55554F"
typography:
  display:
    fontFamily: "Big Shoulders Display, Impact, sans-serif"
    fontSize: "clamp(2.6rem, 6vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.005em"
  heading:
    fontFamily: "Big Shoulders Display, Impact, sans-serif"
    fontSize: "clamp(1.7rem, 3.4vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.0
  body:
    fontFamily: "IBM Plex Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  annotation:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  none: "0px"
  sm: "2px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "40px"
  xl: "72px"
components:
  button-primary:
    backgroundColor: "{colors.safety-orange}"
    textColor: "{colors.blackened-steel}"
    rounded: "{rounded.sm}"
    padding: "14px 22px"
  button-secondary:
    backgroundColor: "{colors.sawdust}"
    textColor: "{colors.blackened-steel}"
    rounded: "{rounded.sm}"
    padding: "14px 22px"
  operator-tag:
    backgroundColor: "{colors.safety-orange-ink}"
    textColor: "{colors.sawdust}"
    rounded: "{rounded.none}"
    padding: "3px 8px"
  spec-card:
    backgroundColor: "{colors.sawdust}"
    textColor: "{colors.blackened-steel}"
    rounded: "{rounded.none}"
    padding: "20px"
---

# Design system: the millwork shop floor

## Overview

The site should feel made by people who build things. Surfaces read like shop drawings pinned to a bench: raw maple paper, graphite linework, dimension strings, corner tick marks and a title block. Type is condensed and confident like stencilled shop signage, with monospace annotations for anything measured. One loud color, safety orange, is reserved for action.

## Colors

### Primary
- **Safety orange `#E2582B`**: the one accent. Fills primary buttons, the active state of filters and the slider, focus rings, and the Operator mark. Never used as text on maple (2.74:1 fails).
- **Safety orange ink `#A63D18`**: the same hue darkened for text-bearing uses that need contrast: links on maple (4.7:1), and the Operator tag fill under sawdust text (5.6:1).

### Neutral
- **Raw maple `#E9DCC6`**: page background. Deliberately chosen by the owner as "warm, not white" and paired with a faint grain texture; not a reflexive cream.
- **Sawdust `#F5EFE4`**: cards, panels, form fields.
- **Blackened steel `#1E2124`**: body text (11.9:1 on maple), dark sections.
- **Walnut `#3B2A20`**: header, footer, the dark title block.
- **Pencil graphite `#6B6B66`**: drawing lines, borders, dimension strings (non-text, 3.96:1 on maple).
- **Graphite ink `#55554F`**: secondary text (5.5:1 on maple).

### Named Rules
- **One orange.** If two orange things compete in a viewport, one of them is wrong.
- **Orange is a fill, ink is a word.** Text in the accent hue always uses safety-orange-ink.
- **Steel on orange is large-only.** Steel on orange is 4.36:1, so button labels on orange are set at 1.2rem bold (WCAG large text).

## Typography

- **Display: Big Shoulders Display** (condensed, signage-like) for headlines and big numbers. Never italic.
- **Body: IBM Plex Sans.** Not Inter, Roboto, Arial or system-ui.
- **Annotation: IBM Plex Mono** for dimensions, capacity, lead times, unit counts and drawing labels, like notes on a shop drawing.

### Hierarchy
Display headlines are short. Long sentences belong in body type. Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`. Measure capped at about 68 characters.

## Layout

Left-aligned, asymmetric layouts on a 12-column grid. The home hero is a working tool (headline beside the project-size slider and a live list), not a centered headline with two buttons. Sections sit inside drawing frames with corner ticks; the section label lives in the frame's title block (bottom-right corner, like a drawing sheet), not as a kicker above the heading.

## Elevation & Depth

Flat. No drop shadows on cards. Depth comes from linework: 1px graphite borders, a 4px steel rule on the active element, and offset "material sample" backing plates on featured items.

## Shapes

Square corners (0–2px). Rounded pills are not used. Tags are rectangles like stamped labels.

## Components

### Buttons
Primary: safety orange fill, steel label, 1.2rem bold, square. Secondary: sawdust fill, steel 1px border.

### Chips
Specialty tags: sawdust rectangles with a graphite hairline, monospace small caps are avoided; use sentence case.

### Cards / Containers
**Spec-sheet cards**: sawdust panel, graphite hairline, a title strip with the shop name, a monospace spec table (capacity, max project, lead time, CNC) that expands on tap or hover. Operator card adds an orange-ink "Operator" tag.

### Inputs / Fields
Sawdust fill, graphite 1px border, steel 2px bottom border on focus plus an orange focus ring.

### Navigation
Walnut bar, maple text, the active page marked with an orange underline.

### Project-size slider (signature component)
A ruler: tick marks with monospace labels from "1 kitchen" to "200+ units", an orange thumb. Moving it filters and re-orders the shop list live with a short FLIP animation (disabled under reduced motion).

## Do's and Don'ts

### Do:
- Use dimension strings and title blocks to frame real content.
- Show unknown capacity as "Not yet published."
- Keep motion short (150–300ms, ease-out) and purposeful.

### Don't:
- Purple/blue gradients, glassmorphism, neon glows.
- Three identical rounded cards in a row as the main layout.
- Drop-shadow white boxes, emoji icons, stock photography.
- Tiny uppercase kicker labels above headings.
- Orange text on maple.
