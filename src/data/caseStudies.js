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
  { slug: null, title: 'Power BI Embedded Dashboard Suite' },
  { slug: null, title: 'Real-time Pipeline · Databricks' },
  { slug: null, title: 'AI Application — End-to-End Delivery' },
]
