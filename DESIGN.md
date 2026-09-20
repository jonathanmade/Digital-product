---
name: Jonatan Marín — Data & AI Engineering
description: Dark ops-console portfolio for a senior Data & AI Engineering consultant, built on a single-accent HUD visual language.
colors:
  electric-signal-cyan: "#00F5FF"
  terminal-void: "#050810"
  deep-void-alt: "#080c18"
  glass-panel: "#0d1321"
  panel-raised: "#111827"
  hairline: "#1a2540"
  hairline-strong: "#243050"
  signal-text: "#c8d6f0"
  muted-signal: "#8a9ab8"
  dim-readout: "#5a6a8a"
  terminal-white: "#ffffff"
  status-active: "#4ade80"
  bronze-tier: "#b87333"
  silver-tier: "#C0C0C0"
  gold-tier: "#FFB800"
  azure-vendor: "#0078D4"
  fabric-vendor: "#0EA5A0"
  power-bi-vendor: "#F2C811"
typography:
  display:
    fontFamily: "Orbitron, Rajdhani, sans-serif"
    fontSize: "clamp(34px, 5.2vw, 64px)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.5px"
  headline:
    fontFamily: "Orbitron, Rajdhani, sans-serif"
    fontSize: "clamp(28px, 4vw, 48px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "normal"
  title:
    fontFamily: "Rajdhani, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  tag:
    fontFamily: "Rajdhani, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.3
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "1.5px"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  full: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "100px"
components:
  button-primary:
    backgroundColor: "{colors.electric-signal-cyan}"
    textColor: "#000000"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "14px 32px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.electric-signal-cyan}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "14px 32px"
  tag-pill:
    backgroundColor: "transparent"
    textColor: "{colors.signal-text}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  capability-chip:
    backgroundColor: "{colors.glass-panel}"
    textColor: "{colors.signal-text}"
    typography: "{typography.tag}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  card-service:
    backgroundColor: "{colors.glass-panel}"
    textColor: "{colors.signal-text}"
    rounded: "{rounded.md}"
    padding: "32px 28px"
  card-project:
    backgroundColor: "{colors.glass-panel}"
    textColor: "{colors.signal-text}"
    rounded: "{rounded.lg}"
    padding: "28px"
---

# Design System: Jonatan Marín — Data & AI Engineering

## Overview

**Creative North Star: "Mission Control / The Ops Console"**

The site reads as a single, precise instrument panel rather than a marketing page: an almost-black
canvas, one electric-cyan signal color, and UI chrome — status dots, uppercase mono labels,
letter-spaced eyebrows — that behaves like telemetry rather than decoration. The clearest expression
of the North Star is the HUD sidebar next to the Medallion architecture diagram: a title-plus-timestamp
header, a service-status list with pulsing dots, colored metadata pills, and rectangular mono
control buttons — every other surface on the site borrows that same instrumented vocabulary at a
lower intensity.

The voice is **restrained technical precision**, not cinematic spectacle. Earlier iterations of this
system leaned further into a dark neon/gaming aesthetic (glitch text on the name, a custom cursor
with a particle halo, a terminal easter egg); all of it was deliberately removed to read as a senior
consultant's services page rather than a portfolio chasing attention. What survived — the dark canvas,
the single accent, the sci-fi-adjacent HUD panels — stayed because it doubles as genuine product
evidence (it *looks* like the kind of data-operations tooling the underlying services actually build),
not because it looks impressive on its own.

**Key Characteristics:**
- One interactive accent color (electric cyan) carries every call-to-action, active state, and glow — never diluted with a second general-UI accent.
- Reading and chrome text defaults to a monospace voice; a second, more humanist face (Rajdhani) appears only for the hero's subheadline and component/card titles.
- Flat, glass-panel surfaces at rest; elevation is communicated by a cyan glow plus a small upward shift on hover/selection, not by drop shadows.
- Bronze/Silver/Gold and the Azure/Fabric/Power BI vendor hues are semantic and quarantined — they exist only inside the Medallion diagram and its vendor badges, never as general UI color.

## Colors

The palette is built from one accent, a five-step near-black neutral scale, and two restricted
semantic families that never leak into general UI.

### Primary
- **Electric Signal Cyan** (`#00F5FF`): the only interactive accent in the system — every primary button, active nav state, focus glow, progress bar, and hover treatment. **The One Voice Rule: cyan is the entire accent vocabulary; a second general-purpose accent is never introduced.**

### Neutral
- **Terminal Void** (`#050810`): page background.
- **Deep Void Alt** (`#080c18`): secondary background step for section-to-section gradients.
- **Glass Panel** (`#0d1321`): the base surface color for cards, panels, and the navbar-when-scrolled, always rendered at partial opacity (`rgba(var(--panel-rgb), 0.5–0.97)`) over the page background — never painted solid.
- **Panel Raised** (`#111827`): a slightly lighter secondary surface step, used sparingly.
- **Hairline** (`#1a2540`) / **Hairline Strong** (`#243050`): the two border weights — default dividers and the stronger weight used on buttons/controls that need to read as more substantial.
- **Signal Text** (`#c8d6f0`): primary body/reading color.
- **Muted Signal** (`#8a9ab8`): secondary text (subheadlines, descriptions).
- **Dim Readout** (`#5a6a8a`): tertiary/label text — eyebrows, captions, metadata.
- **Terminal White** (`#ffffff`): headings only, never body copy.
- **Status Active** (`#4ade80`): the one non-cyan color allowed in general UI, and only for a literal "active/connected" status dot — never decorative.

### Semantic — Data Tier (Medallion diagram only)
- **Bronze Tier** (`#b87333`), **Silver Tier** (`#C0C0C0`), **Gold Tier** (`#FFB800`): these name real data-architecture layers (Bronze/Silver/Gold), not brand accents. **The Diagram-Only Rule: bronze/silver/gold appear exclusively inside the Medallion architecture visualization and its own legend — never as a button, link, badge, or any other general UI color.**

### Semantic — Vendor Identity (badge-only)
- **Azure Vendor** (`#0078D4`), **Fabric Vendor** (`#0EA5A0`), **Power BI Vendor** (`#F2C811`): the literal brand colors of Azure Data Factory, Microsoft Fabric, and Power BI. **The Vendor Badge Rule: each color is scoped to that specific provider's own icon, badge, or labeled node — never applied to unrelated UI, and never used interchangeably with cyan.**

## Typography

**Display Font:** Orbitron (with Rajdhani, sans-serif fallback)
**Title/Body Font:** Rajdhani (sans-serif)
**Label/Code Font:** JetBrains Mono (monospace)

**Character:** Orbitron is reserved for the two or three largest headlines on the page — it is loud
and geometric, so its use is deliberately rare. JetBrains Mono is the workhorse: it is the sitewide
default body font and carries every label, tag, nav item, and HUD readout, uppercase with wide
letter-spacing. Rajdhani is the one warmer voice in the system, appearing only in the hero's
subheadline sentence and in component/card titles that need to read as slightly more human than a
terminal line.

### Hierarchy
- **Display** (weight 900, `clamp(34px, 5.2vw, 64px)`, line-height 1.1, letter-spacing -0.5px): the Hero headline only.
- **Headline** (weight 700, `clamp(28px, 4vw, 48px)`, line-height 1.15): every section title, same font stack as Display at a lower weight/size.
- **Title** (weight 700, 19–20px, line-height 1.3, Rajdhani): card and service titles.
- **Body** (weight 400, 15px, line-height 1.7, JetBrains Mono): the sitewide default reading font (set on `body`), plus the Hero subheadline in Rajdhani as its one exception.
- **Tag** (weight 600, 13px, line-height 1.3, Rajdhani): capability chips — sentence-case technology names, distinct from the uppercase mono Label voice below.
- **Label** (weight 700, 10–13px, letter-spacing 1–3px, uppercase, JetBrains Mono): nav links, section eyebrows, buttons, pills, badges, and HUD text — the single most-used treatment on the site.

### Named Rules
**The Mono Voice Rule.** JetBrains Mono is the default for both body copy and UI chrome; Rajdhani is the exception, reserved for the Hero subheadline and component/card titles only — it never becomes the base body font.

## Layout

A single centered container (`max-width: 1100px`) holds every section. Sections carry generous
vertical breathing room (`100px 24px` desktop, `70px 16px` at ≤768px) so each one reads as a distinct
"screen" rather than a continuous scroll of content. Grids (`services-grid`, `projects-grid`,
`category-grid`) use `repeat(auto-fit/auto-fill, minmax(…, 1fr))` with a consistent 24px gap, so they
reflow from 2–3 columns down to a single column without custom per-breakpoint column counts. The one
exception is `MedallionScene3D`, which splits into a fixed two-column grid (`1fr 280px`) pairing the
diagram canvas with the HUD sidebar, collapsing to a single column under 900px.

## Elevation & Depth

The system is flat-by-default and glow-driven on interaction — there is no traditional layered-shadow
depth system. Surfaces at rest are glass panels (`rgba(panel, 0.5–0.9)` + `backdrop-filter: blur(12px)`)
with a 1px hairline border; nothing casts a resting shadow. On hover or selection, elements gain a
soft cyan `box-shadow` glow (`0 0 24–40px`) paired with a small upward `translateY` shift (−2px to
−6px) — glow *is* the elevation cue. The one deliberate exception is the Work section's project cards,
which add a genuine dark drop-shadow (`0 20px 60px rgba(0,0,0,0.3)`) alongside the cyan glow on hover,
since that section is the site's proof-of-work centerpiece and earns a stronger lift.

### Named Rules
**The Glow-Is-Elevation Rule.** Depth is communicated by a cyan glow plus a small position shift, not by dark drop-shadows — the one exception (Work cards) adds shadow only on top of, never instead of, the glow.

## Shapes

Two corner languages coexist on purpose. **Structural containers** — cards, panels, buttons, the HUD
sidebar — stay near-rectangular with small radii (4px on buttons, 6–10px on cards/panels), keeping
the "instrument panel" read. **Metadata and status elements** — tags, pills, badges, the language
toggle, the theme toggle — are fully rounded (20px/stadium or a true circle), so at a glance the
rounded shapes are always "this is a label/status," never a content container.

### Named Rules
**The Rectangular-Core, Round-Chrome Rule.** If it holds content, keep it near-square (≤10px radius). If it *describes* something — a tag, a status, a toggle — make it a stadium or a circle.

## Components

### Buttons
- **Shape:** 4px radius — the tightest corner in the system, reinforcing "control," not "content."
- **Primary:** solid Electric Signal Cyan background, black text, mono uppercase label; hover adds a cyan glow (`0 0 32px`) and lifts 2px.
- **Outline:** transparent background, 1px cyan border, cyan text; hover fills a 10% cyan tint and adds the same glow + lift.
- Only these two variants exist. **The Two-Variant Rule: never introduce a third button treatment (e.g., a filled neutral or a ghost/ghost-outline button) — every CTA is either filled-cyan or outline-cyan.**

### Chips / Tags (two families)
- **Mono status pill** (nav pills, HUD vendor/layer chips, "coming soon" badges, social links): fully rounded, uppercase JetBrains Mono, 10–12px, 1px border in the chip's own accent color, transparent or near-transparent background; an active/selected state fills a translucent tint of that same color.
- **Capability chip** (TechStack skill chips): Rajdhani, sentence case, 13px/600, 6px radius (squarer than the pill family, since these represent substantial technology names, not metadata), glass-panel background; hover shifts border and text to cyan with a 2px lift.

### Cards / Containers
- **Corner Style:** 8px (service cards, generic glass-card) or 10px (project/case-study cards).
- **Background:** Glass Panel at 70–90% opacity with `backdrop-filter: blur(12px)`.
- **Shadow Strategy:** none at rest; cyan glow (+ dark drop-shadow on project cards only) on hover — see Elevation & Depth.
- **Border:** 1px Hairline at rest; project cards additionally reveal a gradient-cyan 1px border ring on hover via a masked pseudo-element.
- **Internal Padding:** 28–32px.

### Navigation
- Fixed top bar, transparent over the Hero and turning into a blurred glass panel (`rgba(sunken, 0.85)` + blur) once the page scrolls.
- Nav links: mono uppercase, 12px, muted by default, cyan on hover/active with a small cyan dot beneath the active item — no underline.
- Utility controls (language toggle, theme toggle) are pill/circle-shaped with a hairline-strong border, going cyan on hover.
- Mobile (<768px): links collapse into a full-width dropdown panel; the primary CTA hides in favor of the hamburger.

### The Ops-Console HUD Panel (signature component)
The right-hand sidebar beside the Medallion architecture scene is the system's clearest expression of
the North Star: a mono uppercase title + live-formatted date header, a hairline-divided stack of
labeled panels (Service Status, Vendor, Layer Metadata, Controls), a status list where each row is a
small pulsing or solid dot plus a right-aligned value, colored metadata pills that double as filters,
and rectangular outline buttons for transport-style controls (Reset View / Pause Flow / Speed). Every
other "info panel" pattern on the site (case-study metadata, KPI readouts) is a lower-intensity
descendant of this component.

## Do's and Don'ts

### Do:
- **Do** keep Electric Signal Cyan as the only general-UI interactive accent — buttons, links, focus states, glows, and progress indicators all route through it.
- **Do** default reading and chrome text to JetBrains Mono; reserve Rajdhani for the Hero subheadline and component/card titles only.
- **Do** keep every new surface flat-at-rest and communicate elevation with a cyan glow + small lift on hover/selection, matching the Glow-Is-Elevation Rule.
- **Do** theme any new hardcoded color through the existing RGB-triplet CSS-variable pattern (`rgba(var(--x-rgb), alpha)`) so the light/dark theme toggle keeps working — never hardcode `rgba(13,19,33,*)`, `rgba(5,8,16,*)`, `#080c18`, `#fff` as a heading color, or a literal `rgba(0,245,255,*)`.
- **Do** keep Bronze/Silver/Gold inside the Medallion diagram and Azure/Fabric/Power BI inside their own vendor badges, per the Diagram-Only and Vendor Badge Rules.

### Don't:
- **Don't** add a second general-purpose accent color, or a third button variant beyond filled-cyan/outline-cyan.
- **Don't** use violet/gold/bronze/silver anywhere outside the Medallion diagram, its legend, or (violet specifically) a background radial gradient under 0.05 opacity.
- **Don't** reach for a drop-shadow as a default elevation cue — glow is the system's depth language; the Work-card drop-shadow is a named exception, not a precedent.
- **Don't** round a structural container (card, panel, button) past ~10px, and don't leave a metadata/status element (tag, pill, toggle) with a small squared-off radius — corner shape signals content vs. chrome.
