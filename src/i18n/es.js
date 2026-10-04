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
    headlinePre: 'Convierte datos fragmentados de SAP, Salesforce u Odoo en ',
    headlineHighlight: 'BI e IA en los que puedes confiar',
    headlinePost: '',
    subheadline:
      'Más de una década en Ingeniería de Datos, BI y Arquitectura, ahora ampliada a aplicaciones de IA end-to-end sobre datos gobernados y de nivel productivo. Desde Barcelona, con equipos empresariales de toda Europa.',
    ctaPrimary: 'Reservar una Llamada Estratégica',
    ctaSecondary: 'Ver Casos de Estudio',
    credibility: [
      { value: '10+', label: 'Años de Experiencia' },
      { value: '4', label: 'Fuentes Empresariales' },
      { value: '50M+', label: 'Eventos / Día' },
      { value: '<1s', label: 'Latencia de Consulta' },
    ],
    scroll: 'desplázate',
  },

  services: {
    eyebrow: 'Servicios',
    titlePre: 'De datos dispersos a ',
    titleHighlight: 'impacto de negocio',
    titlePost: '',
    desc: 'SAP, Salesforce y Odoo rara vez hablan el mismo idioma. Cerramos esa brecha con pipelines gobernados, BI que escala y una capa de IA encima, en un único proyecto conectado.',
    cards: [
      {
        title: 'Ingeniería de Datos y Arquitectura',
        description: 'Cada informe empieza con una reconciliación manual. Construimos pipelines Medallion gobernados (Bronze → Silver → Gold) que convierten fuentes fragmentadas en un único conjunto de datos fiable.',
        bullets: [
          'Pipelines Bronze/Silver/Gold trazables con Databricks, PySpark y Delta Lake',
          'Integración de SAP, Salesforce y Odoo',
          'Calidad de datos, gobernanza y operación con SLA',
          'Se ejecuta de forma nativa en tu entorno Azure, sin infraestructura nueva que aprobar',
        ],
        engagement: 'Duración: 6–12 semanas · alcance fijo o embebido',
      },
      {
        title: 'BI y Arquitectura de Datos',
        description: 'Los dashboards que lucen en una demo suelen ralentizarse con cientos de usuarios reales. Mantenemos Power BI Embedded y Direct Lake por debajo del segundo a esa escala.',
        bullets: [
          'Power BI Embedded con seguridad a nivel de fila',
          'Modelos semánticos Direct Lake y DAX avanzado',
          'Informes paginados listos para imprimir',
          'Plataformas multi-tenant con datos aislados por cliente',
        ],
        engagement: 'Duración: 4–8 semanas · suite de dashboards o plataforma',
      },
      {
        title: 'Aplicaciones Impulsadas por IA',
        description: 'La mayoría de los pilotos de IA mueren porque nunca tocan datos reales y gobernados. Construimos IA en producción conectada directamente a tu estado de datos.',
        bullets: [
          'IA que responde desde tus propios datos (RAG sobre la capa Gold)',
          'Agentes internos para flujos operativos',
          'Pipeline, backend y UI entregados como un único sistema',
          'Desplegada dentro de tu entorno Azure',
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
    desc: 'Una secuencia predecible con un entregable claro en cada etapa. Sin cajas negras.',
    steps: [
      {
        n: '01',
        title: 'Descubrimiento y Auditoría',
        description: 'Mapeamos tus fuentes, pipelines y stack de reporting, e identificamos cuellos de botella y victorias rápidas.',
      },
      {
        n: '02',
        title: 'Arquitectura y Diseño',
        description: 'Arquitectura objetivo, modelo semántico o aplicación de IA, documentados para que tu equipo de IT los apruebe antes de escribir código.',
      },
      {
        n: '03',
        title: 'Construcción y Despliegue',
        description: 'Iteraciones cortas y revisables. Calidad de producción desde el primer día, nunca una prueba de concepto desechable.',
      },
      {
        n: '04',
        title: 'Traspaso y Soporte',
        description: 'Documentación completa y transferencia práctica de conocimiento para que tu equipo opere solo, con soporte opcional tras el lanzamiento.',
      },
    ],
  },

  medallion: {
    eyebrow: 'Arquitectura',
    titlePre: 'Arquitectura ',
    titleHighlight: 'Medallion',
    titlePost: '',
    desc:
      'Un pipeline gobernado, no solo un diagrama. Bronze → Silver → Gold convierte eventos en bruto de tus sistemas en cifras fiables, hasta Power BI Direct Lake en menos de un segundo.',
    sourcesOutputs: 'Fuentes / Salidas',
    technologies: 'Tecnologías',
    layers: [
      {
        id: 'bronze',
        label: 'CAPA BRONZE',
        subtitle: 'Ingesta Bruta',
        description: 'Datos de origen tal cual llegan, con todo el histórico. Nada se pierde ni se sobrescribe, así que cada informe se rastrea hasta su origen.',
      },
      {
        id: 'silver',
        label: 'CAPA SILVER',
        subtitle: 'Limpieza y Validación',
        description: 'Datos limpios, deduplicados y estandarizados. La capa donde las cifras de distintos sistemas por fin coinciden.',
      },
      {
        id: 'gold',
        label: 'CAPA GOLD',
        subtitle: 'Lista para el Negocio',
        description: 'Modelos semánticos optimizados servidos con Direct Lake: consultas en menos de un segundo sobre millones de filas.',
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
      'Una sola plataforma a lo largo de todo el ciclo del dato, desde la ingesta hasta Power BI Direct Lake y la IA.',
    alsoKnowLabel: 'También trabajamos con:',
    alsoKnow: ['Databricks', 'PySpark', 'Delta Lake', 'ADLS Gen2', 'Kafka', 'Python', 'SQL / T-SQL', 'DAX', 'dbt', 'Git'],
  },

  work: {
    eyebrow: 'Proyectos',
    titlePre: 'Casos de ',
    titleHighlight: 'Estudio',
    titlePost: '',
    desc: 'Ingeniería de datos empresarial con impacto medible en el negocio.',
    viewMore: 'Ver Más →',
    comingSoon: 'Próximamente',
    caseStudyLabel: (n) => `Caso de Estudio ${n}`,
    cards: [
      {
        title: 'Medallion Architecture · Grupo Farmacéutico',
        description: 'Reporting gobernado y casi en tiempo real sobre cuatro sistemas desconectados. SAP aterriza en Bronze vía ADF, PySpark lo refina en Silver y Direct Lake sirve a más de 200 usuarios.',
        metrics: [
          { label: 'Fuentes de datos', value: '4' },
          { label: 'Eventos diarios', value: '50M+' },
          { label: 'Latencia de informes', value: '<1s' },
        ],
      },
      {
        title: 'Power BI Embedded Dashboard Suite',
        description: 'Un único informe embebido en el portal de farmacias. Una API de tokens y seguridad a nivel de fila dan a cada farmacia su propia vista de sell-out, sin licencia por usuario.',
        metrics: [
          { label: 'Un informe, todas las farmacias', value: '1' },
          { label: 'Licencias por usuario', value: '0' },
          { label: 'Aislamiento', value: 'RLS' },
        ],
      },
      {
        title: 'Real-time Pipeline · Databricks',
        description: 'Datos de Salesforce y Odoo disponibles en el momento en que ocurren. Streaming con Delta Live Tables, evolución de esquema, validaciones de calidad automáticas y monitorización de SLA.',
        metrics: [
          { label: 'Latencia de eventos', value: '<5s' },
          { label: 'Tablas gestionadas', value: '120+' },
          { label: 'SLA de disponibilidad', value: '99.9%' },
        ],
      },
    ],
    aiPlaceholder: {
      title: 'Aplicación de IA — Entrega End-to-End',
      description: 'El próximo caso: una aplicación de IA en producción construida end-to-end sobre una plataforma de datos gobernada, siguiendo la misma cadena Datos → BI → IA.',
      badge: 'Añadir caso de estudio real',
    },
  },

  powerbi: {
    eyebrow: 'Demo de Power BI',
    titlePre: 'Dashboard de ',
    titleHighlight: 'Datos en Vivo',
    titlePost: '',
    desc: 'Entorno simulado de Power BI Embedded que muestra analítica con Direct Lake.',
    shellTitle: 'DeltaForge Gold · Suite de Analítica',
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
    desc: 'La mayoría de los proyectos de IA fallan por datos desordenados y sin gobernar. Nuestra capa de IA se apoya en una base construida para ser confiable.',
    capabilities: [
      {
        title: 'Retrieval sobre tus propios datos',
        description: 'RAG sobre la capa Gold: respuestas basadas en datos gobernados y actualizados.',
      },
      {
        title: 'Agentes internos',
        description: 'Agentes que completan tareas operativas sobre tus sistemas, no solo conversan.',
      },
      {
        title: 'Entrega end-to-end',
        description: 'Pipeline, backend y UI como un único sistema funcional, no una demo en notebook.',
      },
      {
        title: 'Integración nativa con Azure',
        description: 'Servicios de IA de Azure, identidad y redes ya en marcha.',
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
    quotePending: 'Testimonio pendiente — este espacio permanece vacío hasta que un cliente lo firme con su nombre. Aquí no se inventan citas.',
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
    calendlyNote: 'Se abre al instante en esta misma página — sin redirecciones ni formularios.',
  },

  footer: {
    tagline: 'DeltaForge Gold · Ingeniería de Datos e IA · Barcelona',
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
    ctaTitle: '¿Quieres resultados así para tu propio stack de datos?',
    ctaButton: 'Reservar una Llamada',
    otherStudiesLabel: 'Otros casos de estudio',
    comingSoon: 'Próximamente',
    implementationTitle: 'Implementación',
    pendingLabel: 'Pendiente',
    resultsPendingNote: 'Resultados de diseño. Las métricas medidas (farmacias activas, tiempos de carga, horas ahorradas) se añadirán cuando estén confirmadas.',
    layerMeta: {
      dataFormat: 'Formato de Datos',
      storage: 'Almacenamiento',
      transform: 'Transformación',
      status: 'Estado',
    },
  },

  embedFlow: {
    title: 'FLUJO DE EMBEBIDO · APP OWNS DATA',
    status: 'RLS activo',
    steps: [
      { from: 1, to: 2, text: 'El usuario abre el dashboard; la sesión del portal se envía a la API de tokens' },
      { from: 2, to: 3, text: 'La API resuelve el ID de farmacia en servidor y pide un token del service principal' },
      { from: 2, to: 4, text: 'GenerateToken con identidad efectiva { username: pharmacyId, roles: [Pharmacy] }' },
      { from: 2, to: 1, text: 'Token de embebido de corta duración y solo lectura devuelto al navegador' },
      { from: 1, to: 4, text: 'powerbi-client pinta el informe; el RLS filtra cada visual a esa farmacia' },
    ],
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
