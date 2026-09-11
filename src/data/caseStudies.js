export const CASE_STUDIES = {
  'uriach-medallion-fabric': {
    slug: 'uriach-medallion-fabric',
    title: 'Medallion Architecture · Microsoft Fabric',
    client: 'Uriach Group · Pharmaceutical / Multinational',
    tags: ['Microsoft Fabric', 'SAP', 'PySpark', 'Power BI', 'Delta Lake', 'Azure'],
    summary:
      'End-to-end Medallion pipeline ingesting SAP into Bronze, transforming through Silver with PySpark, serving Power BI Direct Lake reports to 200+ users.',
    challenge:
      'Uriach Group runs on four enterprise systems — SAP ERP, Salesforce CRM, Odoo ERP, and ' +
      'Zinc WMS — each with its own schema, refresh cadence, and data-quality profile. Business ' +
      'teams needed governed, near real-time reporting without waiting on manual exports or ' +
      'fragile point-to-point integrations, and IT needed a single source of truth that could ' +
      'scale as new systems were added, without re-architecting the pipeline each time.',
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
      { value: '4', label: 'Data Sources' },
      { value: '50M+', label: 'Daily Events' },
      { value: '<1s', label: 'Report Latency' },
    ],
  },
}

export function getCaseStudy(slug) {
  return CASE_STUDIES[slug] ?? null
}

// Lightweight index of every case study shown on the homepage, used by the
// detail page's "other case studies" section. Slugs present here have a
// full page (see CASE_STUDIES above); the rest render as "Coming soon".
export const CASE_STUDY_INDEX = [
  { slug: 'uriach-medallion-fabric', title: 'Medallion Architecture · Uriach Group' },
  { slug: null, title: 'Power BI Embedded Dashboard Suite' },
  { slug: null, title: 'Real-time Pipeline · Databricks' },
  { slug: null, title: 'AI Application — End-to-End Delivery' },
]
