# Portfolio — Jonatan Marín · Data & AI Engineering

## Developer
- **Name:** Jonatan Marín — Data & AI Engineering consultant, Barcelona
- **Role:** 10+ years in Data Engineering, BI, and Architecture; now extending into
  end-to-end AI applications built on governed, production-grade data
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

## Sections (current order, see v3 below for rationale)
1. **Hero** — Value-proposition headline, typewriter role line, Three.js particles, two CTAs, credibility bar
2. **Services** — 3 service cards: Data Engineering & Architecture, BI & Data Architecture, AI-Powered Applications
3. **MedallionArchitecture** — Animated interactive Medallion diagram (star section, proof behind service #1)
4. **Process** — 4-step engagement timeline
5. **TechStack** — Capability chips grouped by category (no proficiency %)
6. **Work** — 3D tilt case-study cards + 1 AI placeholder card, business-outcome framing
7. **PowerBIDemo** — Simulated dashboard with animated KPIs and SVG charts
8. **AISection** — "AI built on solid data ground" capability list
9. **TrustBar** — Flat chip strip of the real stack (no gauges)
10. **Testimonials** — 2 placeholder cards, clearly marked pending
11. **Contact** — Book a Strategy Call + mailto CTA (no fake form/terminal)

## Animations
- Three.js connected particle nodes in hero (data flow)
- Typewriter effect on hero role line
- Staggered Intersection Observer reveals on scroll
- 3D tilt on Work cards (CSS perspective transforms)
- Glassmorphism hover glow
- StormSystem: subtle scroll-reactive particles, paused via visibilitychange when tab is hidden
- Scroll progress bar (fixed, top of viewport, below navbar)

## Project Structure
```
src/
  components/
    Navbar/
    Hero/
    Services/
    MedallionArchitecture/
    Process/
    TechStack/
    Work/
    PowerBIDemo/
    AISection/
    TrustBar/
    Testimonials/
    Contact/
  hooks/
    useScrollReveal.js
    useScrollProgress.js
    useTheme.js
  utils/
    stormSystem.js
  styles/
    globals.css
```

## Decisiones de diseño v2 (ajustes post-deploy)

### Paleta simplificada
- Monocromático oscuro con UN SOLO acento: cyan #00F5FF
- Violeta (#7B2FFF) y dorado (#FFB800) eliminados de la UI general
- Violeta permitido únicamente en gradientes radiales de fondo con opacidad < 0.05
- Excepción semántica: colores Bronze/Silver/Gold solo en MedallionArchitecture (son colores de datos, no chrome UI)
- Glassmorphism cards: border rgba(0,245,255,0.1), hover border rgba(0,245,255,0.3)
- Botones: solo dos variantes — filled cyan y outline cyan

### Sistema de tormenta (StormSystem)
- Archivo: src/utils/stormSystem.js — clase StormSystem + singleton exportado
- Canvas fijo global (position:fixed, z-index:9999, pointer-events:none)
- Un tipo de partícula: puntos flotantes suaves, suben lentamente, vida 400-800ms
  (el efecto de rayos eléctricos en zigzag se eliminó)
- Intensidad reactiva a scroll velocity (0-1 → idle, 2-15 → suave, >15 → intenso)
- Límite: 80 partículas simultáneas, requestAnimationFrame loop
- Inicializado en App.jsx con useEffect + cleanup (storm.init / storm.destroy)

### Hero particles (Three.js)
- NODE_COUNT reducido a 60 (mitad del original)
- Tamaño reducido: size 0.56 (vs 0.8 original)
- Velocidad reducida: factor 0.6x
- Solo color cyan, líneas de conexión también cyan con opacity 0.08

### Reglas de color para futuros cambios
- NUNCA añadir nuevos colores de acento sin revisar estas notas
- Cualquier elemento interactivo usa cyan o outline cyan
- Los colores Medallion (Bronze/Silver/Gold) son datos, no UI — no replicar en otras secciones

## Decisiones de diseño v3 (reposicionamiento a servicios senior)

Objetivo del cambio: pasar de "portfolio personal buscando trabajo" a "página de
servicios de un consultor senior en Data & AI Engineering". Cambios de fondo:

### Elementos eliminados (restaban autoridad senior)
- **Glitch text** en el nombre del Hero — eliminado sin reemplazo.
- **Cursor personalizado con halo de partículas** (`useCustomCursor.js`) — eliminado
  por completo, no se dejó tras un toggle. Razón: es un detalle de portfolio/gaming
  que añade fricción de interacción sin aportar a la credibilidad de un sitio de
  servicios profesionales. Si en el futuro se quiere revisitar como "detalle de
  marca", debe implementarse detrás de una preferencia explícita del usuario, no
  por defecto.
- **Easter egg de terminal "sudo hire me"** y el formulario de contacto que solo
  simulaba el envío (`setTimeout`) — sustituidos por CTAs reales: "Book a Strategy
  Call" (Calendly pendiente, ver más abajo) + `mailto:` al email ya presente en el
  sitio (`contact@jonatanmarin.dev`).
- **Emojis** (🥉🥈🥇 en Medallion, 💰⚡👥⏱ en PowerBI KPIs) — sustituidos por SVG
  inline stroke-based, consistentes con el resto del sitio.
- **Barras de progreso / ArcGauge con %** en TechStack (95%, 93%...) — autoevaluación
  sin sustento, sustituida por chips de capacidades agrupadas por categoría.

### Nueva arquitectura de contenido
Orden final de secciones (ver lista arriba): Hero → Services → MedallionArchitecture
→ Process → TechStack → Work → PowerBIDemo → AISection → TrustBar → Testimonials →
Contact. El prompt original solo especificó el backbone
Hero → Services → Process → Work → AI → TrustBar → Testimonials → Contact; Medallion,
TechStack y PowerBIDemo (contenido real y ya construido, no descartable) se
insertaron en los huecos donde narrativamente aportan más:
- **MedallionArchitecture** justo después de Services, como prueba detallada de la
  metodología detrás del primer servicio (Data Engineering & Architecture).
- **TechStack** antes de Work, como capacidades técnicas de soporte.
- **PowerBIDemo** después de Work, como prueba interactiva adicional (ya que Work
  cubre la prueba estática/case-study).

Nuevos componentes: `Services/`, `Process/`, `AISection/`, `Testimonials/`, `TrustBar/`.
`Projects/` se renombró a `Work/` (mismos 3 proyectos reales y métricas, sin tocar,
más una 4ª tarjeta placeholder de IA con badge "Add real case study" — sin cifras
inventadas).

### Contenido placeholder (pendiente de rellenar con datos reales)
- `Contact.jsx`: `CALENDLY_URL = '[CALENDLY_URL]'` — sustituir por el link real de
  Calendly cuando exista.
- `Testimonials.jsx`: 2 tarjetas con `[Testimonial pending]` / `[Name pending]` /
  `[Role / company pending]` — no se fabricaron citas.
- `Work.jsx`: 4ª case study "AI Application — End-to-End Delivery" con badge
  "Add real case study" — sin métricas inventadas, sustituir cuando haya un
  proyecto de IA real que documentar.

### Tema claro/oscuro
- `src/hooks/useTheme.js`: localStorage → `prefers-color-scheme` → `data-theme` en
  `<html>`. Botón sol/luna (SVG inline) en Navbar, junto a un nuevo CTA "Book a
  Call" (oculto en móvil para no saturar la barra).
- Paleta light completa bajo `:root[data-theme="light"]` en `globals.css`.
- Para que el toggle repintara el sitio de verdad (y no solo las variables raíz),
  se reemplazaron los literales de color hardcodeados por variables temáticas:
  - `--panel-rgb` / `--sunken-rgb`: triplete RGB base para los paneles glass
    (`rgba(var(--panel-rgb), 0.7)` en vez de `rgba(13,19,33,0.7)` literal) — en
    light theme apunta a blanco, así las "glass cards" se aclaran en vez de quedar
    navy sobre fondo claro.
  - `--cyan-rgb`, `--bronze-rgb`, `--silver-rgb`, `--gold-rgb`, `--success-rgb`:
    mismos triples para poder variar opacidad con `rgba(var(--x-rgb), alpha)`.
  - `--heading`: título/blanco en dark, casi-negro en light (sustituye `color:#fff`
    hardcodeado en headings).
  - `--bg-alt`: segundo tono de fondo para los degradados de sección (antes
    `#080c18` literal).
  - Bronze/Silver/Gold/success tienen variantes más oscuras en light theme
    específicamente para mantener contraste AA — son colores de datos (ver regla
    de arriba) pero deben seguir siendo legibles en ambos temas.
  - El glow de texto tipo neón en los KPI de PowerBIDemo (`text-shadow`) se
    desactiva en light theme — un glow difuso diseñado para fondo oscuro lava el
    contraste sobre blanco en vez de aportar "pop".
- Regla para futuros componentes: **nunca** hardcodear `rgba(13,19,33,*)`,
  `rgba(5,8,16,*)`, `#080c18`, `#fff` como color de heading, o `rgba(0,245,255,*)`.
  Usar siempre las variables de arriba para que el toggle de tema no quede roto.

### Fix de una violación pre-existente de la regla de paleta v2
Al tocar `PowerBIDemo.jsx` para el theming se detectó que el donut chart
("Source Distribution") y el gradiente del line chart usaban dorado (#FFB800) y
violeta (#7B2FFF) fuera de MedallionArchitecture, violando la regla "Bronze/Silver/
Gold solo en Medallion" y "violeta solo en gradientes de fondo <0.05 opacidad" de
v2. Se sustituyeron por una escala secuencial de opacidades de cyan
(`rgba(var(--cyan-rgb), 1 / 0.7 / 0.45 / 0.25)`), manteniendo la distinción visual
entre las 4 fuentes sin romper la regla del acento único.

### Scroll
- Scrollbar del navegador oculta visualmente (`scrollbar-width:none` +
  `::-webkit-scrollbar{display:none}` en `html`); el scroll sigue funcionando.
- `useScrollProgress.js`: mismo patrón rAF-throttled que `useScrollReveal`/
  `StormSystem`. Barra fija cian de 3px arriba del todo, z-index por debajo del
  navbar (999 vs 1000) y por encima del contenido.
