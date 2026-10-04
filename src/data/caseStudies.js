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
        'End-to-end Medallion pipeline ingesting SAP into Bronze, transforming through Silver with PySpark, serving Power BI Direct Lake reports to 200+ users.',
      es:
        'Pipeline Medallion end-to-end que ingiere SAP en Bronze, transforma a través de Silver con PySpark, y sirve informes de Power BI Direct Lake a más de 200 usuarios.',
    },
    challenge: {
      en:
        'The client — a multinational pharmaceutical group — runs on four enterprise systems: ' +
        'SAP ERP, Salesforce CRM, Odoo ERP, and Zinc WMS, each with its own schema, refresh ' +
        'cadence, and data-quality profile. Business teams needed governed, near real-time ' +
        'reporting without waiting on manual exports or fragile point-to-point integrations, ' +
        'and IT needed a single source of truth that could scale as new systems were added, ' +
        'without re-architecting the pipeline each time.',
      es:
        'El cliente — un grupo farmacéutico multinacional — opera sobre cuatro sistemas ' +
        'empresariales: SAP ERP, Salesforce CRM, Odoo ERP y Zinc WMS, cada uno con su propio ' +
        'esquema, cadencia de actualización y nivel de calidad de datos. Los equipos de negocio ' +
        'necesitaban informes gobernados y casi en tiempo real sin depender de exportaciones ' +
        'manuales ni integraciones punto a punto frágiles, y IT necesitaba una única fuente de ' +
        'verdad capaz de escalar a medida que se añadían nuevos sistemas, sin rediseñar el ' +
        'pipeline cada vez.',
    },
    process: [
      {
        title: { en: 'Requirement Intake', es: 'Recepción del Requerimiento' },
        description: {
          en: 'Kickoff with business stakeholders to capture the reporting need, priority KPIs, and delivery constraints.',
          es: 'Kickoff con los stakeholders de negocio para capturar la necesidad de reporting, los KPIs prioritarios y las restricciones de entrega.',
        },
      },
      {
        title: { en: 'Data Source & Connections Diagnostic', es: 'Diagnóstico de Fuentes de Datos y Conexiones' },
        description: {
          en: 'Map every source system (SAP, Salesforce, Odoo, Zinc WMS), its schema, refresh cadence, and access method before touching the pipeline.',
          es: 'Mapeo de cada sistema fuente (SAP, Salesforce, Odoo, Zinc WMS), su esquema, cadencia de actualización y método de acceso, antes de tocar el pipeline.',
        },
      },
      {
        title: { en: 'Requirement Analysis', es: 'Análisis del Requerimiento' },
        description: {
          en: 'Translate the business ask into a technical spec: target Medallion layer, transformations needed, and semantic model design.',
          es: 'Traducción de la necesidad de negocio a una especificación técnica: capa Medallion objetivo, transformaciones necesarias y diseño del modelo semántico.',
        },
      },
      {
        title: { en: 'Development', es: 'Desarrollo' },
        description: {
          en: 'Build the pipeline layer by layer — ingestion, PySpark transforms, Delta tables, and the Power BI semantic model — in short, reviewable increments.',
          es: 'Construcción del pipeline capa por capa — ingesta, transformaciones en PySpark, tablas Delta y modelo semántico de Power BI — en incrementos cortos y revisables.',
        },
      },
      {
        title: { en: 'UAT', es: 'UAT' },
        description: {
          en: 'Business users validate the reports and underlying data against real scenarios before anything reaches production.',
          es: 'Los usuarios de negocio validan los informes y los datos subyacentes contra escenarios reales antes de llegar a producción.',
        },
      },
      {
        title: { en: 'Business Adjustments', es: 'Ajustes de Negocio' },
        description: {
          en: 'Incorporate UAT feedback — metric definitions, formatting, access/RLS rules — without breaking what has already been validated.',
          es: 'Se incorporan los ajustes surgidos del UAT — definiciones de métricas, formato, reglas de acceso/RLS — sin romper lo ya validado.',
        },
      },
      {
        title: { en: 'Deployment (Azure DevOps)', es: 'Despliegue (Azure DevOps)' },
        description: {
          en: 'Versioned release through Azure DevOps pipelines — CI/CD, work-item tracking, and a rollback path for every environment promotion.',
          es: 'Despliegue versionado a través de pipelines de Azure DevOps — CI/CD, seguimiento de work items y posibilidad de rollback en cada promoción de entorno.',
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
        'One Power BI report embedded in a pharmacy portal. Each pharmacy sees only its own sell-out (units, value, by product, YTD and YoY), enforced by row-level security keyed on the pharmacy ID. A Node.js API issues short-lived embed tokens on behalf of a service principal.',
      es:
        'Un único informe de Power BI embebido en el portal de farmacias. Cada farmacia ve solo su propio sell-out (unidades, valor, por producto, YTD y YoY), garantizado por seguridad a nivel de fila sobre el ID de farmacia. Una API en Node.js emite tokens de embebido de corta duración en nombre de un service principal.',
    },
    challenge: {
      en:
        'Every pharmacy in the network wanted its own sell-out view (units and value by product, ' +
        'by month, year-to-date and against last year) inside the portal it already uses. The ' +
        'existing process was monthly exports emailed pharmacy by pharmacy: manual, stale on ' +
        'arrival, and one wrong attachment away from a data leak. Sharing reports in the Power BI ' +
        'service would have required a licence and a corporate account for every pharmacy user, and ' +
        '"Publish to web" has no authentication at all. The solution had to be licence-free for ' +
        'viewers, isolate each pharmacy\'s data by design, and scale by adding rows, not reports.',
      es:
        'Cada farmacia de la red quería su propia vista de sell-out (unidades y valor por producto, ' +
        'por mes, acumulado anual y frente al año anterior) dentro del portal que ya utiliza. El ' +
        'proceso existente eran exportaciones mensuales enviadas por email farmacia a farmacia: ' +
        'manual, desactualizado al llegar y a un adjunto equivocado de una fuga de datos. Compartir ' +
        'informes en el servicio de Power BI habría exigido una licencia y una cuenta corporativa ' +
        'por cada usuario de farmacia, y "Publicar en la web" no tiene autenticación. La solución ' +
        'debía ser sin licencias para los usuarios, aislar los datos de cada farmacia por diseño y ' +
        'escalar añadiendo filas, no informes.',
    },
    process: [
      {
        title: { en: 'Need Diagnosis', es: 'Diagnóstico de la Necesidad' },
        description: {
          en: 'Interview pharmacy and commercial stakeholders, audit the email-export process, and fix the KPI set: sell-out units, value, by product, by month, YTD and YoY.',
          es: 'Entrevistas con farmacias y equipo comercial, auditoría del proceso de exportación por email y definición de los KPIs: unidades y valor de sell-out, por producto, por mes, YTD y YoY.',
        },
      },
      {
        title: { en: 'Embedding Model Decision', es: 'Decisión del Modelo de Embebido' },
        description: {
          en: 'Compare sharing, Publish to web, embed-for-your-organization and embed-for-your-customers. Choose app-owns-data with one report plus RLS instead of one report per pharmacy.',
          es: 'Comparación entre compartir, Publicar en la web, embed para tu organización y embed para tus clientes. Elección de app-owns-data con un único informe más RLS en lugar de un informe por farmacia.',
        },
      },
      {
        title: { en: 'Entra ID App & Service Principal', es: 'App en Entra ID y Service Principal' },
        description: {
          en: 'Register the app in Microsoft Entra ID, store the secret in Key Vault, add the service principal to a security group allowed by the Power BI tenant settings, and grant it Member on a dedicated workspace.',
          es: 'Registro de la app en Microsoft Entra ID, secreto en Key Vault, service principal en un grupo de seguridad habilitado en la configuración del tenant de Power BI y rol Member en un workspace dedicado.',
        },
      },
      {
        title: { en: 'Semantic Model & RLS', es: 'Modelo Semántico y RLS' },
        description: {
          en: 'Star schema over the Gold layer (FactSellOut, DimDate, DimProduct, DimPharmacy), time-intelligence DAX, and a "Pharmacy" role filtering DimPharmacy[PharmacyId] = USERPRINCIPALNAME().',
          es: 'Modelo en estrella sobre la capa Gold (FactSellOut, DimDate, DimProduct, DimPharmacy), DAX de inteligencia temporal y un rol "Pharmacy" que filtra DimPharmacy[PharmacyId] = USERPRINCIPALNAME().',
        },
      },
      {
        title: { en: 'Node.js Token API', es: 'API de Tokens en Node.js' },
        description: {
          en: 'Express + MSAL: client-credentials token, report metadata, then GenerateToken with an effective identity whose username is the pharmacy ID, resolved server-side from the portal session.',
          es: 'Express + MSAL: token por client credentials, metadatos del informe y GenerateToken con una identidad efectiva cuyo username es el ID de farmacia, resuelto en servidor a partir de la sesión del portal.',
        },
      },
      {
        title: { en: 'HTML Embed & Custom Theme', es: 'Embebido HTML y Tema Personalizado' },
        description: {
          en: 'powerbi-client embed page with a read-only token, hidden filter pane, silent token refresh before expiry, and a report theme matching the portal palette.',
          es: 'Página de embebido con powerbi-client, token de solo lectura, panel de filtros oculto, renovación silenciosa del token antes de caducar y un tema de informe alineado con la paleta del portal.',
        },
      },
      {
        title: { en: 'UAT per Pharmacy & Rollout', es: 'UAT por Farmacia y Despliegue' },
        description: {
          en: 'Validate RLS with "View as" and with real portal users from several pharmacies, then promote Dev → Test → Prod through deployment pipelines.',
          es: 'Validación del RLS con "Ver como" y con usuarios reales del portal de varias farmacias, y promoción Dev → Test → Prod mediante deployment pipelines.',
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
