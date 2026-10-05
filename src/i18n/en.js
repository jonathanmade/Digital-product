export default {
  nav: {
    links: {
      home: 'Home',
      services: 'Services',
      process: 'Process',
      work: 'Work',
      ai: 'AI',
      contact: 'Contact',
    },
    bookCall: 'Book a Call',
    themeToggleToLight: 'Switch to light theme',
    themeToggleToDark: 'Switch to dark theme',
    langToggleLabel: 'Switch language',
    toggleMenu: 'Toggle menu',
  },

  hero: {
    tag: 'Available for new engagements',
    typewriter: [
      'Data Engineering · Microsoft Fabric',
      'BI & Power BI Embedded · Direct Lake',
      'Medallion Architecture · Databricks',
      'AI Applications · Azure',
    ],
    headlinePre: 'Turn fragmented SAP, Salesforce, or Odoo data into ',
    headlineHighlight: 'BI and AI you can trust',
    headlinePost: '',
    subheadline:
      'A decade of Data Engineering, BI and Architecture, now extending into end-to-end AI applications on governed, production-grade data. Based in Barcelona, working with enterprise teams across Europe.',
    ctaPrimary: 'Book a Strategy Call',
    ctaSecondary: 'See Case Studies',
    credibility: [
      { value: '10+', label: 'Yrs Experience' },
      { value: '4', label: 'Enterprise Sources' },
      { value: '50M+', label: 'Events / Day' },
      { value: '<1s', label: 'Query Latency' },
    ],
    scroll: 'scroll',
  },

  services: {
    eyebrow: 'Services',
    titlePre: 'From scattered data to ',
    titleHighlight: 'business impact',
    titlePost: '',
    desc: 'SAP, Salesforce and Odoo rarely speak the same language. We close the gap with governed pipelines, BI that scales and an AI layer on top, delivered as one connected project.',
    cards: [
      {
        title: 'Data Engineering & Architecture',
        description: 'Every report starts with a manual reconciliation. We build governed Medallion pipelines (Bronze → Silver → Gold) that turn fragmented sources into one trusted dataset.',
        bullets: [
          'Traceable Bronze/Silver/Gold pipelines on Databricks, PySpark and Delta Lake',
          'SAP, Salesforce and Odoo integration',
          'Data quality, governance and SLA-backed operation',
          'Runs natively in your Azure tenant, no new infrastructure to approve',
        ],
        engagement: 'Engagement: 6–12 weeks · fixed scope or embedded',
      },
      {
        title: 'BI & Data Architecture',
        description: 'Dashboards that shine in a demo often crawl with hundreds of real users. We keep Power BI Embedded and Direct Lake sub-second at that scale.',
        bullets: [
          'Power BI Embedded with row-level security',
          'Direct Lake semantic models and advanced DAX',
          'Paginated, print-ready reports',
          'Multi-tenant platforms with isolated data per client',
        ],
        engagement: 'Engagement: 4–8 weeks · dashboard suite or platform',
      },
      {
        title: 'AI-Powered Applications',
        description: 'Most AI pilots die because they never touch real, governed data. We build production AI that plugs directly into your data estate.',
        bullets: [
          'AI that answers from your own data (RAG on the Gold layer)',
          'Internal agents for operational workflows',
          'Pipeline, backend and UI delivered as one system',
          'Deployed inside your Azure environment',
        ],
        engagement: 'Engagement: scoped pilot → production rollout',
      },
    ],
  },

  process: {
    eyebrow: 'Process',
    titlePre: 'How a ',
    titleHighlight: 'project',
    titlePost: ' runs',
    desc: 'A predictable sequence with a clear deliverable at every stage. No black box.',
    steps: [
      {
        n: '01',
        title: 'Discovery & Audit',
        description: 'We map your sources, pipelines and reporting stack, and surface bottlenecks and quick wins.',
      },
      {
        n: '02',
        title: 'Architecture & Design',
        description: 'Target architecture, semantic model or AI application, documented so your IT team can sign off before any code is written.',
      },
      {
        n: '03',
        title: 'Build & Deploy',
        description: 'Short, reviewable iterations. Production-grade from day one, never a throwaway proof of concept.',
      },
      {
        n: '04',
        title: 'Handover & Support',
        description: 'Full documentation and hands-on knowledge transfer so your team runs it on its own, plus optional post-launch support.',
      },
    ],
  },

  medallion: {
    eyebrow: 'Methodology',
    titlePre: 'How your data flows: ',
    titleHighlight: 'from chaos to decision',
    titlePost: '',
    desc:
      'We apply the Medallion method: every source is extracted untouched, refined layer by layer by orchestrated notebooks, and published in a governed semantic model. The result: every figure traceable to its origin, ready for Power BI and AI.',
    stages: {
      extract: { label: '1 · Extract', title: 'Data Pipeline', desc: 'A Fabric pipeline lands every source as-is, on schedule or event-driven.', activity: 'Copy data', sourcesLabel: 'Sources' },
      dag: { label: '2 · Transform', title: 'Notebook DAG', desc: 'One notebook per layer, chained in a DAG: ordered, retryable and traceable end to end.' },
      consume: {
        label: '3 · Consume & AI',
        title: 'Semantic Model + Ontology',
        desc: 'Business meaning on top of Gold, so reports and AI answer from the same governed definitions.',
        items: [
          { title: 'Semantic model', desc: 'Measures, relationships and security in Direct Lake.' },
          { title: 'Ontology', desc: 'Business entities and rules that ground Copilot and data agents.' },
        ],
        outputs: ['Power BI', 'Copilot', 'Data agent'],
      },
    },
    layers: [
      {
        id: 'bronze',
        label: 'BRONZE LAYER',
        subtitle: 'Raw Ingestion',
        description: 'Source data as it arrives, full history preserved and traceable.',
      },
      {
        id: 'silver',
        label: 'SILVER LAYER',
        subtitle: 'Cleanse & Validate',
        description: 'Cleaned, deduplicated, standardized: where systems finally agree.',
      },
      {
        id: 'gold',
        label: 'GOLD LAYER',
        subtitle: 'Business Ready',
        description: 'Optimized models for Direct Lake: sub-second on millions of rows.',
      },
    ],
    stats: [
      { value: '4+', label: 'Data Sources' },
      { value: '50M+', label: 'Events / Day' },
      { value: '<1s', label: 'Query Latency' },
      { value: '99.9%', label: 'Pipeline SLA' },
    ],
  },

  techStack: {
    eyebrow: 'Capabilities',
    titlePre: 'Tools & ',
    titleHighlight: 'Technologies',
    titlePost: '',
    desc:
      'One platform across the full data lifecycle, from ingestion to Power BI Direct Lake and AI.',
    alsoKnowLabel: 'Also work with:',
    alsoKnow: ['Databricks', 'PySpark', 'Delta Lake', 'ADLS Gen2', 'Kafka', 'Python', 'SQL / T-SQL', 'DAX', 'dbt', 'Git'],
  },

  work: {
    eyebrow: 'Work',
    titlePre: 'Case ',
    titleHighlight: 'Studies',
    titlePost: '',
    desc: 'Enterprise data engineering with measurable business impact.',
    viewMore: 'View More →',
    comingSoon: 'Coming soon',
    caseStudyLabel: (n) => `Case Study ${n}`,
    cards: [
      {
        title: 'Medallion Architecture · Pharma Group',
        description: 'Governed, near real-time reporting across four disconnected systems. SAP lands in Bronze via ADF, PySpark refines it in Silver, and Direct Lake serves 200+ users.',
        metrics: [
          { label: 'Data sources', value: '4' },
          { label: 'Daily events', value: '50M+' },
          { label: 'Report latency', value: '<1s' },
        ],
      },
      {
        title: 'Power BI Embedded Dashboard Suite',
        description: 'One report embedded in a pharmacy portal. A token API and row-level security give each pharmacy its own sell-out view, with no per-user licence.',
        metrics: [
          { label: 'One report, all pharmacies', value: '1' },
          { label: 'Viewer licences', value: '0' },
          { label: 'Isolation', value: 'RLS' },
        ],
      },
      {
        title: 'Real-time Pipeline · Databricks',
        description: 'Salesforce and Odoo data available the moment it happens. Delta Live Tables streaming with schema evolution, automated quality checks and SLA monitoring.',
        metrics: [
          { label: 'Event latency', value: '<5s' },
          { label: 'Tables managed', value: '120+' },
          { label: 'Uptime SLA', value: '99.9%' },
        ],
      },
    ],
    aiPlaceholder: {
      title: 'AI Application — End-to-End Delivery',
      description: 'The next case study: a production AI application built end-to-end on a governed data platform, following the same Data → BI → AI chain.',
      badge: 'Add real case study',
    },
  },

  powerbi: {
    eyebrow: 'Power BI Demo',
    titlePre: 'Cyclistic: ',
    titleHighlight: 'members vs casual riders',
    titlePost: '',
    desc: 'A Power BI-style report for the Cyclistic bike-share case study. Filter by rider type and see how usage changes, from volume to seasonality.',
    shellTitle: 'Cyclistic · Rider Behavior',
    liveBadge: 'Sample data · Case study',
    appName: 'Power BI',
    workspace: 'My workspace',
    menu: ['File', 'View', 'Edit', 'Export', 'Share'],
    resetFilters: 'Reset filters',
    tabs: ['Overview', 'Seasonality'],
    pageLabel: 'Page',
    ofLabel: 'of',
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    peakMonth: 'Peak month',
    summerShare: 'Summer share (Jun–Aug)',
    seasonTitle: 'Rides per month (K) by rider type',
    legend: { member: 'Members', casual: 'Casual' },
    slicerLabel: 'Rider type',
    slicer: { all: 'All riders', member: 'Members', casual: 'Casual' },
    barChartLabel: 'Rides by weekday (K)',
    lineChartLabel: 'Rides by month (K)',
    donutLabel: 'Bike type',
    donutCenter: 'bikes',
    kpis: ['Total rides', 'Avg ride (min)', 'Weekend rides', 'Electric bikes'],
    vsAll: 'vs all riders',
    baseline: 'baseline',
    weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    months: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    bikeTypes: ['Classic', 'Electric', 'Docked'],
    insights: { all: 'Two profiles, one network: members commute on weekdays; casual riders ride longer and on weekends.', member: 'Members: short, regular weekday rides, with steady use even in winter.', casual: 'Casual riders: longer rides concentrated on weekends and summer, the best audience for a membership offer.' },
    footer: { source: 'Cyclistic case study (Google Data Analytics)', note: 'Illustrative sample data', platform: 'Power BI-style report' },
  },

  ai: {
    eyebrow: 'AI',
    titlePre: 'AI applications built on ',
    titleHighlight: 'solid data ground',
    titlePost: '',
    desc: 'Most AI projects fail on messy, ungoverned data. Our AI layer sits on a foundation built to be trusted.',
    capabilities: [
      {
        title: 'Retrieval on your own data',
        description: 'RAG built on the Gold layer: answers grounded in governed, up-to-date data.',
      },
      {
        title: 'Internal agents',
        description: 'Agents that complete operational tasks on your systems, not just chat.',
      },
      {
        title: 'End-to-end delivery',
        description: 'Pipeline, backend and UI as one working system, not a notebook demo.',
      },
      {
        title: 'Native Azure integration',
        description: 'Azure AI services, identity and networking already in place.',
      },
    ],
  },

  trustBar: {
    label: 'Built with',
  },

  testimonials: {
    eyebrow: 'Testimonials',
    titlePre: 'What ',
    titleHighlight: 'clients',
    titlePost: ' say',
    quotePending: 'Testimonial pending — this space stays empty until a client puts their name to it. No quotes get invented here.',
    namePending: '[Name pending]',
    rolePending: '[Role / company pending]',
  },

  contact: {
    eyebrow: 'Contact',
    titlePre: "Let's talk about your ",
    titleHighlight: 'data & AI',
    titlePost: ' roadmap',
    desc:
      '30 minutes to walk through your current stack, where it\'s costing you time or money, ' +
      'and whether a Data Engineering, BI, or AI engagement makes sense.',
    ctaPrimary: 'Book a Strategy Call',
    calendlyNote: 'Opens instantly in this page — no redirects, no forms.',
  },

  footer: {
    tagline: 'DeltaForge Gold · Data & AI Engineering · Barcelona',
  },

  caseStudyDetail: {
    backLink: 'Back to case studies',
    notFoundTitle: 'Case study not found',
    notFoundDesc: "This case study doesn't have a page yet.",
    challengeTitle: 'The Challenge',
    processTitle: 'Delivery Process',
    architectureTitle: 'The Architecture',
    techStackTitle: 'Tech Stack',
    resultsTitle: 'Results',
    ctaTitle: 'Want results like this for your own data stack?',
    ctaButton: 'Book a Call',
    otherStudiesLabel: 'Other case studies',
    comingSoon: 'Coming soon',
    implementationTitle: 'Implementation',
    pendingLabel: 'Pending',
    resultsPendingNote: 'Design outcomes below. Measured results (pharmacies live, load times, hours saved) will be added once confirmed.',
    layerMeta: {
      dataFormat: 'Data Format',
      storage: 'Storage',
      transform: 'Transform',
      status: 'Status',
    },
  },

  embedFlow: {
    title: 'EMBED FLOW · APP OWNS DATA',
    status: 'RLS enforced',
    steps: [
      { from: 1, to: 2, text: 'User opens the dashboard; the portal session is sent to the token API' },
      { from: 2, to: 3, text: 'API resolves the pharmacy ID server-side and requests a service-principal token' },
      { from: 2, to: 4, text: 'GenerateToken with effective identity { username: pharmacyId, roles: [Pharmacy] }' },
      { from: 2, to: 1, text: 'Short-lived, read-only embed token returned to the browser' },
      { from: 1, to: 4, text: 'powerbi-client renders the report; RLS filters every visual to that pharmacy' },
    ],
  },

  medallionHud: {
    title: 'MEDALLION ARCHITECTURE · V1.0',
    serviceStatus: 'Service Status',
    vendor: 'Vendor',
    layerMetadata: 'Layer Metadata',
    controls: 'Controls',
    resetView: 'Reset View',
    toggleFlow: (paused) => (paused ? 'Resume Flow' : 'Pause Flow'),
    speed: (label) => `Speed: ${label}`,
    speedLabels: { slow: 'Slow', normal: 'Normal', fast: 'Fast' },
    selected: (label) => `Selected: ${label} LAYER`,
    dataFormat: 'Data Format',
    storage: 'Storage',
    transform: 'Transform',
    status: 'Status',
    serviceStatusItems: [
      { name: 'Data Factory', statusKey: 'active', status: 'Active' },
      { name: 'Synapse', statusKey: 'active', status: 'Active' },
      { name: 'OneLake', statusKey: 'syncing', status: 'Syncing' },
      { name: 'Power BI', statusKey: 'connected', status: 'Connected' },
    ],
  },
}
