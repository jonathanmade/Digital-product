export default {
  nav: {
    links: {
      home: 'Inicio',
      services: 'Servicios',
      process: 'Proceso',
      work: 'Proyectos',
      ai: 'IA',
      contact: 'Contacto',
    },
    bookCall: 'Reservar Llamada',
    themeToggleToLight: 'Cambiar a tema claro',
    themeToggleToDark: 'Cambiar a tema oscuro',
    langToggleLabel: 'Cambiar idioma',
    toggleMenu: 'Abrir o cerrar menú',
  },

  hero: {
    tag: 'Disponible para nuevos proyectos',
    typewriter: [
      'Ingeniería de Datos · Microsoft Fabric',
      'BI y Power BI Embedded · Direct Lake',
      'Arquitectura Medallion · Databricks',
      'Aplicaciones de IA · Azure',
    ],
    headlinePre: 'Construyo plataformas de datos en las que tu ',
    headlineHighlight: 'BI y tu IA',
    headlinePost: ' pueden confiar',
    subheadline:
      'Jonatan Marín — más de 10 años en Ingeniería de Datos, BI y Arquitectura, ahora ' +
      'ampliando hacia aplicaciones de IA end-to-end construidas sobre datos gobernados y ' +
      'de nivel productivo. Con base en Barcelona, trabajando con equipos empresariales en toda Europa.',
    ctaPrimary: 'Reservar una Llamada Estratégica',
    ctaSecondary: 'Ver Casos de Éxito',
    credibility: [
      { value: '10+', label: 'Años de Experiencia' },
      { value: '4', label: 'Fuentes Empresariales' },
      { value: '50M+', label: 'Eventos / Día' },
      { value: 'Farma / Salud', label: 'Sector de Enfoque' },
    ],
    scroll: 'desplázate',
  },

  services: {
    eyebrow: 'Servicios',
    titlePre: 'Dónde aporto ',
    titleHighlight: 'valor',
    titlePost: '',
    desc: 'Tres formas de colaborar — desde pipelines empresariales hasta la capa de IA construida sobre ellos.',
    cards: [
      {
        title: 'Ingeniería de Datos y Arquitectura',
        description:
          'Pipelines a escala empresarial construidos sobre Arquitectura Medallion — desde la ingesta bruta de tus sistemas de origen hasta datos gobernados y listos para el negocio.',
        bullets: [
          'Diseño de pipelines Bronze/Silver/Gold (Databricks, PySpark, Delta Lake)',
          'Integración de fuentes empresariales — SAP, Salesforce, Odoo, Zinc',
          'Calidad de datos, gobernanza y pipelines respaldados por SLA',
          'Arquitectura nativa de Azure (ADF, ADLS Gen2, Event Hubs)',
        ],
        engagement: 'Duración: 6–12 semanas · alcance fijo o embebido',
      },
      {
        title: 'BI y Arquitectura de Datos',
        description:
          'Soluciones de Power BI Embedded y Direct Lake que escalan a cientos de usuarios concurrentes sin sacrificar el rendimiento de las consultas.',
        bullets: [
          'Power BI Embedded con seguridad a nivel de fila',
          'Modelos semánticos Direct Lake para consultas en menos de un segundo',
          'Modelado DAX e informes paginados',
          'Arquitectura de analítica multi-tenant',
        ],
        engagement: 'Duración: 4–8 semanas · suite de dashboards o plataforma',
      },
      {
        title: 'Aplicaciones Impulsadas por IA',
        description:
          'Aplicaciones de IA end-to-end construidas sobre bases de datos sólidas — sistemas en producción que se integran con tu estado de datos actual, no prototipos.',
        bullets: [
          'Retrieval sobre tus propios datos gobernados (RAG sobre la capa Gold)',
          'Agentes internos para flujos de trabajo operativos',
          'Entrega end-to-end: datos, backend y UI',
          'Integración nativa con los servicios de IA de Azure',
        ],
        engagement: 'Duración: piloto acotado → despliegue en producción',
      },
    ],
  },

  process: {
    eyebrow: 'Proceso',
    titlePre: 'Cómo funciona un ',
    titleHighlight: 'proyecto',
    titlePost: '',
    desc:
      'Una secuencia fija y predecible — sin importar si el alcance es un pipeline, una ' +
      'suite de dashboards o una aplicación de IA.',
    steps: [
      {
        n: '01',
        title: 'Descubrimiento y Auditoría',
        description: 'Mapeamos tus fuentes de datos, pipelines y stack de reporting actuales. Identificamos cuellos de botella, carencias y victorias rápidas.',
      },
      {
        n: '02',
        title: 'Arquitectura y Diseño',
        description: 'Diseñamos la arquitectura Medallion objetivo, el modelo semántico o la aplicación de IA — ajustados a tus sistemas y restricciones.',
      },
      {
        n: '03',
        title: 'Construcción y Despliegue',
        description: 'Implementamos en iteraciones cortas y revisables. Con calidad de producción desde el primer día, no una prueba de concepto desechable.',
      },
      {
        n: '04',
        title: 'Traspaso y Soporte',
        description: 'Documentación, transferencia de conocimiento a tu equipo, y una ventana de soporte opcional tras el lanzamiento.',
      },
    ],
  },

  medallion: {
    eyebrow: 'Arquitectura',
    titlePre: 'Arquitectura ',
    titleHighlight: 'Medallion',
    titlePost: '',
    desc:
      'Pipeline de datos a escala empresarial que procesa millones de eventos al día. ' +
      'Bronze → Silver → Gold — desde la ingesta bruta hasta Power BI Direct Lake.',
    sourcesOutputs: 'Fuentes / Salidas',
    technologies: 'Tecnologías',
    layers: [
      {
        id: 'bronze',
        label: 'CAPA BRONZE',
        subtitle: 'Ingesta Bruta',
        description: 'Datos sin procesar, tal cual llegan de los sistemas empresariales. Schema-on-read, con todo el histórico preservado, sin transformaciones aplicadas.',
      },
      {
        id: 'silver',
        label: 'CAPA SILVER',
        subtitle: 'Limpieza y Validación',
        description: 'Datos limpios, deduplicados y estandarizados. Reglas de negocio aplicadas, schema-on-write, integridad referencial validada.',
      },
      {
        id: 'gold',
        label: 'CAPA GOLD',
        subtitle: 'Lista para el Negocio',
        description: 'Modelos semánticos agregados y optimizados. Modo Direct Lake para Power BI — respuesta de consultas en menos de un segundo sobre millones de filas.',
      },
    ],
    stats: [
      { value: '4+', label: 'Fuentes de Datos' },
      { value: '50M+', label: 'Eventos / Día' },
      { value: '<1s', label: 'Latencia de Consulta' },
      { value: '99.9%', label: 'SLA del Pipeline' },
    ],
  },

  techStack: {
    eyebrow: 'Capacidades',
    titlePre: 'Herramientas y ',
    titleHighlight: 'Tecnologías',
    titlePost: '',
    desc:
      'Plataformas probadas en producción a lo largo de todo el ciclo de vida del dato — ' +
      'desde la ingesta hasta Power BI Direct Lake, y cada vez más aplicaciones de IA construidas encima.',
    categories: [
      { name: 'Plataforma', items: ['Microsoft Fabric'] },
      { name: 'BI', items: ['Power BI', 'Power BI Embedded', 'DAX'] },
      { name: 'Procesamiento', items: ['Databricks', 'PySpark', 'Delta Live Tables'] },
      { name: 'Almacenamiento', items: ['Delta Lake', 'ADLS Gen2'] },
      { name: 'Orquestación', items: ['Azure Data Factory', 'Apache Kafka'] },
      { name: 'Lenguaje', items: ['Python', 'SQL / T-SQL'] },
      { name: 'Nube', items: ['Azure', 'Azure AD B2C', 'Synapse Analytics'] },
    ],
    alsoKnowLabel: 'También domino:',
    alsoKnow: ['dbt', 'Power Automate', 'Git', 'Docker', 'M Query', 'Great Expectations'],
  },

  work: {
    eyebrow: 'Proyectos',
    titlePre: 'Casos de ',
    titleHighlight: 'Éxito',
    titlePost: '',
    desc: 'Proyectos de ingeniería de datos a escala empresarial que generan impacto real en el negocio. Pasa el cursor por cada tarjeta para explorar.',
    viewMore: 'Ver Más →',
    comingSoon: 'Próximamente',
    caseStudyLabel: (n) => `Caso de Estudio ${n}`,
    cards: [
      {
        title: 'Medallion Architecture · Grupo Farmacéutico',
        description:
          'Pipeline Medallion end-to-end para una farmacéutica multinacional. Datos de SAP ingeridos vía ADF a Bronze, transformaciones con PySpark a través de Silver, informes de Power BI Direct Lake para más de 200 usuarios.',
        metrics: [
          { label: 'Fuentes de datos', value: '4' },
          { label: 'Eventos diarios', value: '50M+' },
          { label: 'Latencia de informes', value: '<1s' },
        ],
      },
      {
        title: 'Power BI Embedded Dashboard Suite',
        description:
          'Plataforma de analítica embebida con seguridad a nivel de fila que sirve a más de 500 usuarios concurrentes. Componentes visuales personalizados, informes paginados y arquitectura multi-tenant con modo Direct Lake.',
        metrics: [
          { label: 'Usuarios concurrentes', value: '500+' },
          { label: 'Tipos de informe', value: '28' },
          { label: 'Consulta p95', value: '0.4s' },
        ],
      },
      {
        title: 'Real-time Pipeline · Databricks',
        description:
          'Pipeline de datos en streaming que procesa eventos de Salesforce y Odoo casi en tiempo real. Delta Live Tables con evolución de esquema, validaciones automáticas de calidad de datos y monitorización de SLA.',
        metrics: [
          { label: 'Latencia de eventos', value: '<5s' },
          { label: 'Tablas gestionadas', value: '120+' },
          { label: 'SLA de disponibilidad', value: '99.9%' },
        ],
      },
    ],
    aiPlaceholder: {
      title: 'AI Application — End-to-End Delivery',
      description:
        'Una aplicación de IA en producción entregada de forma end-to-end sobre una plataforma de datos gobernada. Cliente real, métricas y detalles de arquitectura se añadirán en cuanto el proyecto pueda hacerse público.',
      badge: 'Añadir caso de estudio real',
    },
  },

  powerbi: {
    eyebrow: 'Demo de Power BI',
    titlePre: 'Dashboard de ',
    titleHighlight: 'Datos en Vivo',
    titlePost: '',
    desc: 'Entorno simulado de Power BI Embedded que muestra analítica con Direct Lake.',
    shellTitle: 'Jonatan Marín · Suite de Analítica',
    liveBadge: 'Datos en Vivo · Direct Lake Mode',
    barChartLabel: 'Volumen de Pipeline · Mensual',
    lineChartLabel: 'Tendencia de Latencia (ms)',
    donutLabel: 'Distribución de Fuentes',
    donutCenter: '4 fte',
    kpis: [
      { label: 'Ingresos Procesados', trend: '+12.4% MoM' },
      { label: 'Pipelines Activos', trend: '+8 esta semana' },
      { label: 'Usuarios Activos', trend: '+3.1% WoW' },
      { label: 'Latencia Media (ms)', trend: '-45ms' },
    ],
    footer: {
      lastRefreshLabel: 'Última actualización:',
      lastRefreshValue: 'justo ahora',
      platform: 'Microsoft Fabric · Direct Lake',
      version: 'Medallion v3.1',
    },
  },

  ai: {
    eyebrow: 'IA',
    titlePre: 'Aplicaciones de IA construidas sobre ',
    titleHighlight: 'una base de datos sólida',
    titlePost: '',
    desc:
      'La mayoría de los proyectos de IA fallan por datos desordenados y sin gobernar. Diez ' +
      'años de Ingeniería de Datos significan que la capa de IA se apoya en una base ya construida para ser confiable.',
    capabilities: [
      {
        title: 'Retrieval sobre tus propios datos',
        description: 'RAG construido directamente sobre la capa Gold — respuestas fundamentadas en datos gobernados y actualizados, no en un volcado estático de documentos.',
      },
      {
        title: 'Agentes internos',
        description: 'Agentes que automatizan flujos de trabajo operativos sobre tus sistemas — no chatbots, sino herramientas que completan tareas.',
      },
      {
        title: 'Entrega end-to-end',
        description: 'Pipeline de datos, backend y UI entregados como un único sistema — una aplicación funcional, no una demo en notebook.',
      },
      {
        title: 'Integración nativa con Azure',
        description: 'Construido sobre el mismo entorno Azure que la plataforma de datos — servicios de IA de Azure, identidad y redes ya en marcha.',
      },
    ],
  },

  trustBar: {
    label: 'Construido con',
  },

  testimonials: {
    eyebrow: 'Testimonios',
    titlePre: 'Lo que dicen los ',
    titleHighlight: 'clientes',
    titlePost: '',
    quotePending: '[Testimonio pendiente]',
    namePending: '[Nombre pendiente]',
    rolePending: '[Cargo / empresa pendiente]',
  },

  contact: {
    eyebrow: 'Contacto',
    titlePre: 'Hablemos de tu hoja de ruta de ',
    titleHighlight: 'datos e IA',
    titlePost: '',
    desc:
      '30 minutos para repasar tu stack actual, dónde te está costando tiempo o dinero, ' +
      'y si un proyecto de Ingeniería de Datos, BI o IA tiene sentido.',
    ctaPrimary: 'Reservar una Llamada Estratégica',
    calendlyNote: 'Enlace de Calendly pendiente — placeholder',
  },

  footer: {
    tagline: 'Jonatan Marín · Ingeniería de Datos e IA · Barcelona',
  },

  caseStudyDetail: {
    backLink: 'Volver a los casos de estudio',
    notFoundTitle: 'Caso de estudio no encontrado',
    notFoundDesc: 'Este caso de estudio todavía no tiene página propia.',
    challengeTitle: 'El Reto',
    processTitle: 'Proceso de Entrega',
    architectureTitle: 'La Arquitectura',
    techStackTitle: 'Stack Tecnológico',
    resultsTitle: 'Resultados',
    ctaTitle: '¿Interesado en algo similar?',
    ctaButton: 'Reservar una Llamada',
    otherStudiesLabel: 'Otros casos de estudio',
    comingSoon: 'Próximamente',
    layerMeta: {
      dataFormat: 'Formato de Datos',
      storage: 'Almacenamiento',
      transform: 'Transformación',
      status: 'Estado',
    },
  },

  medallionHud: {
    title: 'MEDALLION ARCHITECTURE · V1.0',
    serviceStatus: 'Estado del Servicio',
    vendor: 'Proveedores',
    layerMetadata: 'Metadatos de la Capa',
    controls: 'Controles',
    resetView: 'Restablecer Vista',
    toggleFlow: (paused) => (paused ? 'Reanudar Flujo' : 'Pausar Flujo'),
    speed: (label) => `Velocidad: ${label}`,
    speedLabels: { slow: 'Lenta', normal: 'Normal', fast: 'Rápida' },
    selected: (label) => `Seleccionado: CAPA ${label}`,
    dataFormat: 'Formato de Datos',
    storage: 'Almacenamiento',
    transform: 'Transformación',
    status: 'Estado',
    serviceStatusItems: [
      { name: 'Data Factory', statusKey: 'active', status: 'Activo' },
      { name: 'Synapse', statusKey: 'active', status: 'Activo' },
      { name: 'OneLake', statusKey: 'syncing', status: 'Sincronizando' },
      { name: 'Power BI', statusKey: 'connected', status: 'Conectado' },
    ],
  },
}
