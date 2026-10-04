// Narrative page-level copy (summary, challenge, result labels) is bilingual
// inline ({ en, es }). Everything else — title, client, tags, techStack, and
// the `layers` array that feeds MedallionScene3D — is shared across
// languages on purpose: technology/brand names and the architecture-diagram
// terminology in `layers` don't change between English and Spanish.
export const CASE_STUDIES = {
  'pharma-medallion-fabric': {
    slug: 'pharma-medallion-fabric',
    title: 'Medallion Architecture · Microsoft Fabric',
    client: 'Pharmaceutical Group · Multinational',
    tags: ['Microsoft Fabric', 'SAP', 'PySpark', 'Power BI', 'Delta Lake', 'Azure'],
    summary: {
      en:
        'Medallion pipeline that unifies four enterprise systems: SAP lands in Bronze, PySpark refines it in Silver, and Power BI Direct Lake serves 200+ users.',
      es:
        'Pipeline Medallion que unifica cuatro sistemas empresariales: SAP aterriza en Bronze, PySpark lo refina en Silver y Power BI Direct Lake sirve a más de 200 usuarios.',
    },
    challenge: {
      en:
        'A multinational pharma group ran on SAP, Salesforce, Odoo and a warehouse system, each with its own schema and refresh cadence. Business teams needed governed, near real-time reporting without manual exports, and IT needed one source of truth that could absorb new systems without re-architecting.',
      es:
        'Un grupo farmacéutico multinacional operaba con SAP, Salesforce, Odoo y un sistema de almacén, cada uno con su esquema y cadencia propios. Negocio necesitaba reporting gobernado y casi en tiempo real sin exportaciones manuales, e IT una única fuente de verdad capaz de absorber nuevos sistemas sin rediseñar.',
    },
    process: [
      {
        title: { en: 'Requirement Intake', es: 'Recepción del Requerimiento' },
        description: {
          en: 'Kickoff with stakeholders to capture the reporting need, priority KPIs and constraints.',
          es: 'Kickoff con stakeholders para capturar la necesidad de reporting, KPIs prioritarios y restricciones.',
        },
      },
      {
        title: { en: 'Data Source & Connections Diagnostic', es: 'Diagnóstico de Fuentes de Datos y Conexiones' },
        description: {
          en: 'Map every source system, its schema, refresh cadence and access method.',
          es: 'Mapeo de cada sistema fuente, su esquema, cadencia de actualización y método de acceso.',
        },
      },
      {
        title: { en: 'Requirement Analysis', es: 'Análisis del Requerimiento' },
        description: {
          en: 'Turn the business ask into a technical spec: target layers, transformations and semantic model.',
          es: 'De la necesidad de negocio a una especificación técnica: capas, transformaciones y modelo semántico.',
        },
      },
      {
        title: { en: 'Development', es: 'Desarrollo' },
        description: {
          en: 'Build layer by layer (ingestion, PySpark, Delta tables, semantic model) in short, reviewable increments.',
          es: 'Construcción capa por capa (ingesta, PySpark, tablas Delta, modelo semántico) en incrementos cortos y revisables.',
        },
      },
      {
        title: { en: 'UAT', es: 'UAT' },
        description: {
          en: 'Business users validate reports and data against real scenarios before production.',
          es: 'Los usuarios de negocio validan informes y datos con escenarios reales antes de producción.',
        },
      },
      {
        title: { en: 'Business Adjustments', es: 'Ajustes de Negocio' },
        description: {
          en: 'Fold UAT feedback (metrics, formatting, RLS rules) in without breaking what is validated.',
          es: 'Se incorporan los ajustes del UAT (métricas, formato, reglas RLS) sin romper lo validado.',
        },
      },
      {
        title: { en: 'Deployment (Azure DevOps)', es: 'Despliegue (Azure DevOps)' },
        description: {
          en: 'Versioned CI/CD releases with a rollback path for every promotion.',
          es: 'Despliegues versionados con CI/CD y rollback en cada promoción.',
        },
      },
    ],
    layers: [
      {
        id: 'landing',
        label: 'LANDING ZONE',
        subtitle: 'Raw',
        color: 'var(--cyan)',
        dataFormat: 'Native source format (CSV, JSON, IDoc)',
        storage: 'ADLS Gen2 landing containers',
        transform: 'None — exact copy of source',
        status: 'Active',
      },
      {
        id: 'bronze',
        label: 'BRONZE',
        subtitle: 'Structured',
        color: 'var(--bronze)',
        dataFormat: 'Delta (schema-on-read)',
        storage: 'OneLake / ADLS Gen2 — Bronze',
        transform: 'Schema mapping only, no business logic applied',
        status: 'Active',
      },
      {
        id: 'silver',
        label: 'SILVER',
        subtitle: 'Cleaned',
        color: 'var(--silver)',
        dataFormat: 'Delta (schema-on-write)',
        storage: 'OneLake — Silver',
        transform: 'PySpark cleansing, deduplication, validation',
        status: 'Active',
      },
      {
        id: 'gold',
        label: 'GOLD',
        subtitle: 'Reporting, Analytics',
        color: 'var(--gold)',
        dataFormat: 'Delta semantic model',
        storage: 'OneLake — Gold / Direct Lake',
        transform: 'Aggregation, DAX measures, semantic modeling',
        status: 'Active',
      },
    ],
    techStack: [
      'Azure Data Factory',
      'Event Hubs',
      'ADLS Gen2',
      'Delta Lake',
      'Databricks',
      'PySpark',
      'Great Expectations',
      'Power BI',
      'DAX',
      'Direct Lake',
    ],
    results: [
      { value: '4', label: { en: 'Data Sources', es: 'Fuentes de Datos' } },
      { value: '50M+', label: { en: 'Daily Events', es: 'Eventos Diarios' } },
      { value: '<1s', label: { en: 'Report Latency', es: 'Latencia de Informes' } },
    ],
  },
  'powerbi-embedded-pharmacy': {
    slug: 'powerbi-embedded-pharmacy',
    title: 'Power BI Embedded Dashboard Suite',
    client: 'Pharmacy Network · Spain',
    tags: ['Power BI Embedded', 'Row-Level Security', 'Node.js', 'Microsoft Entra ID', 'DAX', 'Azure'],
    // Hero visual: token/embed sequence diagram instead of the Medallion 3D scene.
    heroVisual: 'embed-flow',
    summary: {
      en:
        'One Power BI report embedded in a pharmacy portal. Row-level security on the pharmacy ID gives each pharmacy only its own sell-out, with short-lived tokens issued by a Node.js API.',
      es:
        'Un único informe de Power BI embebido en el portal de farmacias. La seguridad a nivel de fila sobre el ID de farmacia muestra a cada una solo su sell-out, con tokens de corta duración emitidos por una API en Node.js.',
    },
    challenge: {
      en:
        'Every pharmacy wanted its own sell-out view inside the portal it already uses. Monthly emailed exports were manual, stale on arrival and one wrong attachment from a data leak, while per-user Power BI licences or Publish to web were not an option. The solution had to be licence-free for viewers, isolate each pharmacy by design and scale by adding rows, not reports.',
      es:
        'Cada farmacia quería su propia vista de sell-out dentro del portal que ya usa. Las exportaciones mensuales por email eran manuales, llegaban desactualizadas y a un adjunto de una fuga de datos, y las licencias por usuario o Publicar en la web no eran opción. La solución debía ser sin licencias para los usuarios, aislar cada farmacia por diseño y escalar añadiendo filas, no informes.',
    },
    process: [
      {
        title: { en: 'Need Diagnosis', es: 'Diagnóstico de la Necesidad' },
        description: {
          en: 'Interview stakeholders, audit the email-export process and fix the KPI set.',
          es: 'Entrevistas, auditoría del proceso de exportación por email y definición de los KPIs.',
        },
      },
      {
        title: { en: 'Embedding Model Decision', es: 'Decisión del Modelo de Embebido' },
        description: {
          en: 'Compare embedding models; choose app-owns-data with one report plus RLS.',
          es: 'Comparación de modelos de embebido; se elige app-owns-data con un informe más RLS.',
        },
      },
      {
        title: { en: 'Entra ID App & Service Principal', es: 'App en Entra ID y Service Principal' },
        description: {
          en: 'Register the app, keep the secret in Key Vault, grant the service principal access to a dedicated workspace.',
          es: 'Registro de la app, secreto en Key Vault y acceso del service principal a un workspace dedicado.',
        },
      },
      {
        title: { en: 'Semantic Model & RLS', es: 'Modelo Semántico y RLS' },
        description: {
          en: 'Star schema over Gold, time-intelligence DAX and a Pharmacy role filtering on the pharmacy ID.',
          es: 'Modelo en estrella sobre Gold, DAX de inteligencia temporal y un rol Pharmacy filtrado por ID de farmacia.',
        },
      },
      {
        title: { en: 'Node.js Token API', es: 'API de Tokens en Node.js' },
        description: {
          en: 'Express + MSAL issue embed tokens with an identity resolved server-side from the portal session.',
          es: 'Express + MSAL emiten tokens de embebido con identidad resuelta en servidor desde la sesión del portal.',
        },
      },
      {
        title: { en: 'HTML Embed & Custom Theme', es: 'Embebido HTML y Tema Personalizado' },
        description: {
          en: 'Read-only embed with hidden filters, silent token refresh and a portal-matched theme.',
          es: 'Embebido de solo lectura con filtros ocultos, renovación silenciosa del token y tema alineado con el portal.',
        },
      },
      {
        title: { en: 'UAT per Pharmacy & Rollout', es: 'UAT por Farmacia y Despliegue' },
        description: {
          en: 'Validate RLS with real pharmacy users, then promote Dev → Test → Prod.',
          es: 'Validación del RLS con usuarios reales de farmacia y promoción Dev → Test → Prod.',
        },
      },
    ],
    // Architecture components. `meta` rows replace the Medallion-specific
    // Data format / Storage / Transform / Status labels.
    layers: [
      {
        id: 'portal',
        label: 'PHARMACY PORTAL',
        subtitle: 'Browser · HTML + powerbi-client',
        color: 'var(--cyan)',
        meta: [
          { label: { en: 'Role', es: 'Rol' }, value: 'Authenticates the pharmacy user, hosts the embed container' },
          { label: { en: 'Token', es: 'Token' }, value: 'Embed token only, read-only, auto-refreshed' },
        ],
      },
      {
        id: 'api',
        label: 'TOKEN API',
        subtitle: 'Node.js · Express · MSAL',
        color: 'var(--cyan)',
        meta: [
          { label: { en: 'Role', es: 'Rol' }, value: 'Session → pharmacy ID → GenerateToken with RLS identity' },
          { label: { en: 'Secret', es: 'Secreto' }, value: 'Key Vault, never exposed to the browser' },
        ],
      },
      {
        id: 'entra',
        label: 'MICROSOFT ENTRA ID',
        subtitle: 'App registration · Service principal',
        color: 'var(--azure)',
        meta: [
          { label: { en: 'Flow', es: 'Flujo' }, value: 'OAuth 2.0 client credentials' },
          { label: { en: 'Access', es: 'Acceso' }, value: 'Security group enabled in tenant settings, Member of one workspace' },
        ],
      },
      {
        id: 'powerbi',
        label: 'POWER BI EMBEDDED',
        subtitle: 'Capacity · Semantic model · RLS',
        color: 'var(--pbi)',
        meta: [
          { label: { en: 'Model', es: 'Modelo' }, value: 'Star schema over Gold, Import mode' },
          { label: { en: 'Security', es: 'Seguridad' }, value: 'Role "Pharmacy": [PharmacyId] = USERPRINCIPALNAME()' },
        ],
      },
    ],
    codeSnippets: [
      {
        title: { en: 'Node.js · embed token with RLS identity', es: 'Node.js · token de embebido con identidad RLS' },
        language: 'js',
        code: `const token = await pbiFetch('/GenerateToken', {
  method: 'POST',
  body: JSON.stringify({
    datasets: [{ id: report.datasetId }],
    reports:  [{ id: report.id, allowEdit: false }],
    identities: [{
      username: pharmacyId,        // resolved from the portal session
      roles: ['Pharmacy'],
      datasets: [report.datasetId],
    }],
  }),
})`,
      },
      {
        title: { en: 'DAX · RLS role "Pharmacy"', es: 'DAX · rol RLS "Pharmacy"' },
        language: 'dax',
        code: `// Table: DimPharmacy
[PharmacyId] = USERPRINCIPALNAME()

Value YTD YoY % =
DIVIDE ( [Value YTD] - [Value PY YTD], [Value PY YTD] )`,
      },
      {
        title: { en: 'HTML · embed and silent refresh', es: 'HTML · embebido y renovación silenciosa' },
        language: 'js',
        code: `const report = powerbi.embed(container, {
  type: 'report', id: cfg.reportId, embedUrl: cfg.embedUrl,
  accessToken: cfg.accessToken,
  tokenType: models.TokenType.Embed,
  permissions: models.Permissions.Read,
  settings: { panes: { filters: { visible: false } } },
})
// 5 min before expiry:
await report.setAccessToken((await fetchEmbedConfig()).accessToken)`,
      },
    ],
    techStack: [
      'Power BI Embedded',
      'Power BI REST API',
      'Row-Level Security',
      'DAX',
      'Microsoft Entra ID',
      'MSAL Node',
      'Node.js',
      'Express',
      'powerbi-client',
      'Azure Key Vault',
    ],
    // Design outcomes that hold by construction. Quantitative results
    // (pharmacies onboarded, load times, hours saved) stay pending until real
    // figures are available; see PRODUCT.md "No fabricated proof".
    results: [
      { value: '1', label: { en: 'Report for every pharmacy', es: 'Informe para todas las farmacias' } },
      { value: '0', label: { en: 'Viewer licences needed', es: 'Licencias necesarias por usuario' } },
      { value: 'RLS', label: { en: 'Isolation per pharmacy ID', es: 'Aislamiento por ID de farmacia' } },
    ],
    resultsPending: true,
  },
}

export function getCaseStudy(slug) {
  return CASE_STUDIES[slug] ?? null
}

// Lightweight index of every case study shown on the homepage, used by the
// detail page's "other case studies" section. Slugs present here have a
// full page (see CASE_STUDIES above); the rest render as "Coming soon".
// Titles are project/client names, shared across languages (see note above).
export const CASE_STUDY_INDEX = [
  { slug: 'pharma-medallion-fabric', title: 'Medallion Architecture · Pharma Group' },
  { slug: 'powerbi-embedded-pharmacy', title: 'Power BI Embedded Dashboard Suite' },
  { slug: null, title: 'Real-time Pipeline · Databricks' },
  { slug: null, title: 'AI Application — End-to-End Delivery' },
]
