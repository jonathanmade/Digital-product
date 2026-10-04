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
    eyebrow: 'Architecture',
    titlePre: 'Medallion ',
    titleHighlight: 'Architecture',
    titlePost: '',
    desc:
      'A governed pipeline, not just a diagram. Bronze → Silver → Gold turns raw events from your source systems into numbers your teams can trust, all the way to sub-second Power BI Direct Lake.',
    sourcesOutputs: 'Sources / Outputs',
    technologies: 'Technologies',
    layers: [
      {
        id: 'bronze',
        label: 'BRONZE LAYER',
        subtitle: 'Raw Ingestion',
        description: 'Source data as it arrives, with full history preserved. Nothing is lost or overwritten, so every report traces back to its origin.',
      },
      {
        id: 'silver',
        label: 'SILVER LAYER',
        subtitle: 'Cleanse & Validate',
        description: 'Cleaned, deduplicated and standardized. The layer where numbers from different systems finally agree.',
      },
      {
        id: 'gold',
        label: 'GOLD LAYER',
        subtitle: 'Business Ready',
        description: 'Optimized semantic models served through Direct Lake: sub-second queries on millions of rows.',
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
      'Production-proven platforms across the full data lifecycle, from ingestion to Power BI Direct Lake and AI.',
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
    titlePre: 'Live Data ',
    titleHighlight: 'Dashboard',
    titlePost: '',
    desc: 'Simulated Power BI Embedded environment showcasing Direct Lake analytics.',
    shellTitle: 'DeltaForge Gold · Analytics Suite',
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
