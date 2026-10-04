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
      'Jonatan Marín — 10+ years in Data Engineering, BI, and Architecture, now extending ' +
      'into end-to-end AI applications built on governed, production-grade data. ' +
      'Based in Barcelona, working with enterprise teams across Europe.',
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
    titlePre: 'Where I ',
    titleHighlight: 'add value',
    titlePost: '',
    desc:
      'Data scattered across SAP, Salesforce, Odoo, and warehouse systems rarely turns into ' +
      'decisions on its own. Three ways to close that gap — governed pipelines, BI that scales, ' +
      'and the AI layer built on top — delivered as one connected engagement, not stitched ' +
      'together from separate vendors.',
    cards: [
      {
        title: 'Data Engineering & Architecture',
        description:
          "When data lives in SAP, Salesforce, Odoo, and Zinc — systems that don't talk to each " +
          'other — every report starts with a manual reconciliation. I build governed pipelines ' +
          'on Medallion Architecture (Bronze → Silver → Gold) that turn those fragmented sources ' +
          'into one trusted, business-ready dataset.',
        bullets: [
          'Bronze/Silver/Gold pipeline design — raw data preserved, every transformation traceable (built on Databricks, PySpark, Delta Lake)',
          'Enterprise source integration — SAP, Salesforce, Odoo, Zinc',
          'Data quality, governance, and SLA-backed pipelines',
          'Runs natively inside your existing Azure environment — no new infrastructure to procure or approve (ADF, ADLS Gen2, Event Hubs)',
        ],
        engagement: 'Engagement: 6–12 weeks · fixed scope or embedded',
      },
      {
        title: 'BI & Data Architecture',
        description:
          'Dashboards that look great in a demo often slow to a crawl once hundreds of real ' +
          'users are on them. I build Power BI Embedded and Direct Lake solutions that hold ' +
          'sub-second query performance at that scale — not just for a handful of test users.',
        bullets: [
          'Power BI Embedded with row-level security — each user or client sees only their own data',
          'Direct Lake semantic models for sub-second queries',
          'Advanced metrics and calculations (DAX), plus paginated reports for print-ready exports',
          'Multi-tenant architecture — one platform serving multiple clients or business units with isolated data',
        ],
        engagement: 'Engagement: 4–8 weeks · dashboard suite or platform',
      },
      {
        title: 'AI-Powered Applications',
        description:
          'Most AI pilots impress in a demo, then die because they were never connected to ' +
          'real, governed data. I build end-to-end AI applications that plug directly into your ' +
          'existing data estate — production systems, not prototypes.',
        bullets: [
          'AI that answers from your own governed data, not the public internet (RAG on the Gold layer)',
          'Internal agents for operational workflows',
          'One team, one system — data pipeline, backend, and UI delivered together, not stitched from separate vendors',
          'Deploys inside your existing Azure environment — no new infrastructure or security review required (Azure AI services)',
        ],
        engagement: 'Engagement: scoped pilot → production rollout',
      },
    ],
  },

  process: {
    eyebrow: 'Process',
    titlePre: 'How an ',
    titleHighlight: 'engagement',
    titlePost: ' runs',
    desc:
      'A fixed, predictable sequence with a clear deliverable at every stage — regardless of ' +
      'whether the scope is a pipeline, a dashboard suite, or an AI application. No black box, ' +
      'no guessing what happens next.',
    steps: [
      {
        n: '01',
        title: 'Discovery & Audit',
        description: 'Map your current data sources, pipelines, and reporting stack. Identify bottlenecks, gaps, and quick wins.',
      },
      {
        n: '02',
        title: 'Architecture & Design',
        description: 'Design the target Medallion architecture, semantic model, or AI application — scoped to your systems and constraints, and documented so your own IT team can review and sign off before a line of code is written.',
      },
      {
        n: '03',
        title: 'Build & Deploy',
        description: 'Implement in short, reviewable iterations. Production-grade from day one, not a throwaway proof of concept.',
      },
      {
        n: '04',
        title: 'Handover & Support',
        description: 'Full documentation and hands-on knowledge transfer, so your team can run and extend the system without depending on me — plus an optional support window after go-live.',
      },
    ],
  },

  medallion: {
    eyebrow: 'Architecture',
    titlePre: 'Medallion ',
    titleHighlight: 'Architecture',
    titlePost: '',
    desc:
      'A governed pipeline architecture — not just a diagram. Bronze → Silver → Gold turns ' +
      'millions of raw events a day from your source systems into numbers your teams can trust ' +
      'and act on, all the way to sub-second Power BI Direct Lake reporting.',
    sourcesOutputs: 'Sources / Outputs',
    technologies: 'Technologies',
    layers: [
      {
        id: 'bronze',
        label: 'BRONZE LAYER',
        subtitle: 'Raw Ingestion',
        description: 'Unprocessed data as-is from enterprise systems, with full history preserved — nothing is ever lost or overwritten, so any report can be traced back to its original source. Schema-on-read, no transformations applied.',
      },
      {
        id: 'silver',
        label: 'SILVER LAYER',
        subtitle: 'Cleanse & Validate',
        description: 'Cleaned, deduplicated and standardized data — the layer where numbers from different systems finally agree with each other. Business rules enforced, schema-on-write, referential integrity validated.',
      },
      {
        id: 'gold',
        label: 'GOLD LAYER',
        subtitle: 'Business Ready',
        description: 'Aggregated, optimized semantic models. Direct Lake mode for Power BI — sub-second query response on millions of rows.',
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
      'Production-proven platforms across the full data lifecycle — from ingestion to ' +
      'Power BI Direct Lake, and increasingly AI applications layered on top.',
    categories: [
      { name: 'Platform', items: ['Microsoft Fabric'] },
      { name: 'BI', items: ['Power BI', 'Power BI Embedded', 'DAX'] },
      { name: 'Processing', items: ['Databricks', 'PySpark', 'Delta Live Tables'] },
      { name: 'Storage', items: ['Delta Lake', 'ADLS Gen2'] },
      { name: 'Orchestration', items: ['Azure Data Factory', 'Apache Kafka'] },
      { name: 'Language', items: ['Python', 'SQL / T-SQL'] },
      { name: 'Cloud', items: ['Azure', 'Azure AD B2C', 'Synapse Analytics'] },
    ],
    alsoKnowLabel: 'Also proficient in:',
    alsoKnow: ['dbt', 'Power Automate', 'Git', 'Docker', 'M Query', 'Great Expectations'],
  },

  work: {
    eyebrow: 'Work',
    titlePre: 'Case ',
    titleHighlight: 'Studies',
    titlePost: '',
    desc: 'Enterprise-scale data engineering projects driving real business impact. Hover each card to explore.',
    viewMore: 'View More →',
    comingSoon: 'Coming soon',
    caseStudyLabel: (n) => `Case Study ${n}`,
    cards: [
      {
        title: 'Medallion Architecture · Pharma Group',
        description:
          'A multinational pharma group needed governed, near real-time reporting across four ' +
          'disconnected systems — without manual exports slowing the business down. We built ' +
          'an end-to-end Medallion pipeline: SAP ingested via ADF into Bronze, PySpark transforms ' +
          'through Silver, and Power BI Direct Lake reports now serving 200+ users.',
        metrics: [
          { label: 'Data sources', value: '4' },
          { label: 'Daily events', value: '50M+' },
          { label: 'Report latency', value: '<1s' },
        ],
      },
      {
        title: 'Power BI Embedded Dashboard Suite',
        description:
          'One Power BI report embedded in a pharmacy portal. A Node.js token API and row-level security on the pharmacy ID give every pharmacy its own sell-out view (units, value, by product, YTD and YoY) with no Power BI licence per user.',
        metrics: [
          { label: 'Report, all pharmacies', value: '1' },
          { label: 'Viewer licences', value: '0' },
          { label: 'Isolation', value: 'RLS' },
        ],
      },
      {
        title: 'Real-time Pipeline · Databricks',
        description:
          'Salesforce and Odoo data, available the moment it happens — not hours later. A ' +
          'streaming pipeline built on Delta Live Tables, with schema evolution, automated data ' +
          'quality assertions, and SLA monitoring keeping it reliable at production scale, not ' +
          'just fast.',
        metrics: [
          { label: 'Event latency', value: '<5s' },
          { label: 'Tables managed', value: '120+' },
          { label: 'Uptime SLA', value: '99.9%' },
        ],
      },
    ],
    aiPlaceholder: {
      title: 'AI Application — End-to-End Delivery',
      description:
        'This is where the next AI case study will go — a production application built ' +
        'end-to-end on a governed data platform, following the same Data → BI → AI chain as ' +
        'the work above. Client, metrics, and architecture will be added as soon as the ' +
        'engagement can be made public.',
      badge: 'Add real case study',
    },
  },

  powerbi: {
    eyebrow: 'Power BI Demo',
    titlePre: 'Live Data ',
    titleHighlight: 'Dashboard',
    titlePost: '',
    desc: 'Simulated Power BI Embedded environment showcasing Direct Lake analytics.',
    shellTitle: 'Jonatan Marín · Analytics Suite',
    liveBadge: 'Live Data · Direct Lake Mode',
    barChartLabel: 'Pipeline Volume · Monthly',
    lineChartLabel: 'Latency Trend (ms)',
    donutLabel: 'Source Distribution',
    donutCenter: '4 src',
    kpis: [
      { label: 'Revenue Processed', trend: '+12.4% MoM' },
      { label: 'Pipelines Active', trend: '+8 this week' },
      { label: 'Active Users', trend: '+3.1% WoW' },
      { label: 'Avg Latency (ms)', trend: '-45ms' },
    ],
    footer: {
      lastRefreshLabel: 'Last refresh:',
      lastRefreshValue: 'just now',
      platform: 'Microsoft Fabric · Direct Lake',
      version: 'Medallion v3.1',
    },
  },

  ai: {
    eyebrow: 'AI',
    titlePre: 'AI applications built on ',
    titleHighlight: 'solid data ground',
    titlePost: '',
    desc:
      'Most AI projects fail on messy, ungoverned data. Ten years of Data Engineering ' +
      'means the AI layer sits on a foundation that was already built to be trusted.',
    capabilities: [
      {
        title: 'Retrieval over your own data',
        description: 'RAG built directly on the Gold layer — answers grounded in governed, up-to-date data, not a static document dump.',
      },
      {
        title: 'Internal agents',
        description: 'Agents that automate operational workflows against your systems — not chatbots, task-completing tools.',
      },
      {
        title: 'End-to-end delivery',
        description: 'Data pipeline, backend, and UI shipped as one system — a working application, not a notebook demo.',
      },
      {
        title: 'Azure-native integration',
        description: 'Built on the same Azure estate as the data platform — Azure AI services, identity, and networking already in place.',
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
    tagline: 'Jonatan Marín · Data & AI Engineering · Barcelona',
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
