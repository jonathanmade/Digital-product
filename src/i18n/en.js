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
    headlinePre: 'I build data platforms your ',
    headlineHighlight: 'BI and AI',
    headlinePost: ' can trust',
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
      { value: 'Pharma / Health', label: 'Sector Focus' },
    ],
    scroll: 'scroll',
  },

  services: {
    eyebrow: 'Services',
    titlePre: 'Where I ',
    titleHighlight: 'add value',
    titlePost: '',
    desc: 'Three ways to engage — from enterprise pipelines to the AI layer built on top of them.',
    cards: [
      {
        title: 'Data Engineering & Architecture',
        description:
          'Enterprise-scale pipelines built on Medallion Architecture — from raw ingestion across your source systems to governed, business-ready data.',
        bullets: [
          'Bronze/Silver/Gold pipeline design (Databricks, PySpark, Delta Lake)',
          'Enterprise source integration — SAP, Salesforce, Odoo, Zinc',
          'Data quality, governance, and SLA-backed pipelines',
          'Azure-native architecture (ADF, ADLS Gen2, Event Hubs)',
        ],
        engagement: 'Engagement: 6–12 weeks · fixed scope or embedded',
      },
      {
        title: 'BI & Data Architecture',
        description:
          'Power BI Embedded and Direct Lake solutions that scale to hundreds of concurrent users without sacrificing query performance.',
        bullets: [
          'Power BI Embedded with row-level security',
          'Direct Lake semantic models for sub-second queries',
          'DAX modeling & paginated reports',
          'Multi-tenant analytics architecture',
        ],
        engagement: 'Engagement: 4–8 weeks · dashboard suite or platform',
      },
      {
        title: 'AI-Powered Applications',
        description:
          'End-to-end AI applications built on solid data foundations — production systems that plug into your existing data estate, not prototypes.',
        bullets: [
          'Retrieval over your own governed data (RAG on the Gold layer)',
          'Internal agents for operational workflows',
          'End-to-end delivery: data, backend, and UI',
          'Native integration with Azure AI services',
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
      'A fixed, predictable sequence — regardless of whether the scope is a pipeline, a ' +
      'dashboard suite, or an AI application.',
    steps: [
      {
        n: '01',
        title: 'Discovery & Audit',
        description: 'Map your current data sources, pipelines, and reporting stack. Identify bottlenecks, gaps, and quick wins.',
      },
      {
        n: '02',
        title: 'Architecture & Design',
        description: 'Design the target Medallion architecture, semantic model, or AI application — scoped to your systems and constraints.',
      },
      {
        n: '03',
        title: 'Build & Deploy',
        description: 'Implement in short, reviewable iterations. Production-grade from day one, not a throwaway proof of concept.',
      },
      {
        n: '04',
        title: 'Handover & Support',
        description: 'Documentation, knowledge transfer to your team, and an optional support window after go-live.',
      },
    ],
  },

  medallion: {
    eyebrow: 'Architecture',
    titlePre: 'Medallion ',
    titleHighlight: 'Architecture',
    titlePost: '',
    desc:
      'Enterprise-scale data pipeline processing millions of events daily. ' +
      'Bronze → Silver → Gold — from raw ingestion to Power BI Direct Lake.',
    sourcesOutputs: 'Sources / Outputs',
    technologies: 'Technologies',
    layers: [
      {
        id: 'bronze',
        label: 'BRONZE LAYER',
        subtitle: 'Raw Ingestion',
        description: 'Unprocessed data as-is from enterprise systems. Schema-on-read, full history preserved, no transformations applied.',
      },
      {
        id: 'silver',
        label: 'SILVER LAYER',
        subtitle: 'Cleanse & Validate',
        description: 'Cleaned, deduplicated and standardized data. Business rules enforced, schema-on-write, referential integrity validated.',
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
        title: 'Medallion Architecture · Uriach Group',
        description:
          'End-to-end Medallion pipeline for a multinational pharma company. SAP data ingested via ADF into Bronze, PySpark transforms through Silver, Power BI Direct Lake reports for 200+ users.',
        metrics: [
          { label: 'Data sources', value: '4' },
          { label: 'Daily events', value: '50M+' },
          { label: 'Report latency', value: '<1s' },
        ],
      },
      {
        title: 'Power BI Embedded Dashboard Suite',
        description:
          'Row-level security embedded analytics platform serving 500+ concurrent users. Custom visual components, paginated reports, and multi-tenant architecture with Direct Lake mode.',
        metrics: [
          { label: 'Concurrent users', value: '500+' },
          { label: 'Report types', value: '28' },
          { label: 'Query p95', value: '0.4s' },
        ],
      },
      {
        title: 'Real-time Pipeline · Databricks',
        description:
          'Streaming data pipeline processing Salesforce and Odoo events in near real-time. Delta Live Tables with schema evolution, automated data quality assertions, and SLA monitoring.',
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
        'A production AI application delivered end-to-end on top of a governed data platform. Real client, metrics, and architecture details to be added once the engagement is public.',
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
    quotePending: '[Testimonial pending]',
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
    calendlyNote: 'Calendly link pending — placeholder',
  },

  footer: {
    tagline: 'Jonatan Marín · Data & AI Engineering · Barcelona',
  },

  caseStudyDetail: {
    backLink: 'Back to case studies',
    notFoundTitle: 'Case study not found',
    notFoundDesc: "This case study doesn't have a page yet.",
    challengeTitle: 'The Challenge',
    architectureTitle: 'The Architecture',
    techStackTitle: 'Tech Stack',
    resultsTitle: 'Results',
    ctaTitle: 'Interested in something similar?',
    ctaButton: 'Book a Call',
    otherStudiesLabel: 'Other case studies',
    comingSoon: 'Coming soon',
    layerMeta: {
      dataFormat: 'Data Format',
      storage: 'Storage',
      transform: 'Transform',
      status: 'Status',
    },
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
