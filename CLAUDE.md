# Portfolio — Jonatan Marín · Data Engineer

## Developer
- **Name:** Jonatan Marín — Data Engineer & BI Developer, Barcelona
- **Role:** Data Engineer specializing in enterprise-scale data pipelines and BI
- **Stack:** Microsoft Fabric, Databricks, Power BI Embedded, Delta Lake, PySpark, Azure

## Architecture
- **Pattern:** Medallion Architecture (Bronze → Silver → Gold)
- **Sources:** SAP, Salesforce, Odoo, Zinc
- **Bronze:** Raw data ingestion from enterprise systems
- **Silver:** Cleaned & validated data via Delta Lake + PySpark transforms
- **Gold:** Business-ready semantic layer for Power BI Direct Lake mode

## Portfolio Framework
- **React 18 + Vite** (no Create React App)
- **Three.js** for particle hero background
- **Framer Motion** for transitions and scroll reveals
- **CSS Custom Properties** extensively, no UI libraries (no MUI, Bootstrap, Chakra)

## Design System — Sci-Fi Data Universe
- **Aesthetic:** Dark cinematic, neon gradients, futuristic / gaming feel
- **BG:** #050810 (deep black)
- **Surface:** #0d1321
- **Cyan:** #00F5FF (electric)
- **Violet:** #7B2FFF (neon)
- **Gold:** #FFB800 (data gold)
- **Text:** #c8d6f0
- **Muted:** #5a6a8a

## Typography
- Display/Titles: Orbitron or Rajdhani (Google Fonts)
- Code/Data: JetBrains Mono
- NEVER: Inter, Roboto, Arial, system-ui

## Sections
1. **Hero** — Glitch text + Three.js particles + typewriter + CTAs
2. **MedallionArchitecture** — Animated interactive Medallion diagram (star section)
3. **TechStack** — Hexagonal glassmorphism cards with SVG proficiency arcs
4. **Projects** — 3D tilt cards with data flow effect
5. **PowerBIDemo** — Simulated dashboard with animated KPIs and SVG charts
6. **Contact** — Terminal/CLI aesthetic form with easter egg

## Animations
- Three.js connected particle nodes in hero (data flow)
- Typewriter effect on hero subtitle
- Staggered Intersection Observer reveals on scroll
- 3D tilt on project cards (CSS perspective transforms)
- Glassmorphism hover glow
- Custom cursor with particle halo
- "Data wipe" section transitions

## Project Structure
```
src/
  components/
    Hero/
    MedallionArchitecture/
    TechStack/
    Projects/
    PowerBIDemo/
    Contact/
  hooks/
  styles/
    globals.css
```
