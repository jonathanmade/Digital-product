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
      'Jonatan Marín — más de 10 años en Ingeniería de Datos, BI y Arquitectura, ahora ' +
      'ampliando hacia aplicaciones de IA end-to-end construidas sobre datos gobernados y ' +
      'de nivel productivo. Con base en Barcelona, trabajando con equipos empresariales en toda Europa.',
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
    titlePre: 'Dónde aporto ',
    titleHighlight: 'valor',
    titlePost: '',
    desc:
      'Los datos dispersos entre SAP, Salesforce, Odoo y sistemas de almacén rara vez se ' +
      'convierten en decisiones por sí solos. Tres formas de cerrar esa brecha — pipelines ' +
      'gobernados, BI que escala y la capa de IA construida encima — como un único proyecto ' +
      'conectado, no como piezas sueltas de distintos proveedores.',
    cards: [
      {
        title: 'Ingeniería de Datos y Arquitectura',
        description:
          'Cuando los datos viven en SAP, Salesforce, Odoo y Zinc —sistemas que no se ' +
          'comunican entre sí—, cada informe empieza con una reconciliación manual. Construyo ' +
          'pipelines gobernados sobre Arquitectura Medallion (Bronze → Silver → Gold) que ' +
          'convierten esas fuentes fragmentadas en un único conjunto de datos fiable y listo ' +
          'para el negocio.',
        bullets: [
          'Diseño de pipelines Bronze/Silver/Gold — datos en bruto preservados y cada transformación trazable (con Databricks, PySpark, Delta Lake)',
          'Integración de fuentes empresariales — SAP, Salesforce, Odoo, Zinc',
          'Calidad de datos, gobernanza y pipelines respaldados por SLA',
          'Se ejecuta de forma nativa dentro de tu entorno Azure existente — sin infraestructura nueva que aprobar ni contratar (ADF, ADLS Gen2, Event Hubs)',
        ],
        engagement: 'Duración: 6–12 semanas · alcance fijo o embebido',
      },
      {
        title: 'BI y Arquitectura de Datos',
        description:
          'Los dashboards que funcionan bien en una demo suelen volverse lentos en cuanto se ' +
          'conectan cientos de usuarios reales. Construyo soluciones de Power BI Embedded y ' +
          'Direct Lake que mantienen consultas en menos de un segundo a esa escala — no solo ' +
          'con un puñado de usuarios de prueba.',
        bullets: [
          'Power BI Embedded con seguridad a nivel de fila — cada usuario o cliente ve únicamente sus propios datos',
          'Modelos semánticos Direct Lake para consultas en menos de un segundo',
          'Métricas y cálculos avanzados (DAX), además de informes paginados listos para exportar o imprimir',
          'Arquitectura multi-tenant — una sola plataforma que sirve a varios clientes o unidades de negocio con datos aislados entre sí',
        ],
        engagement: 'Duración: 4–8 semanas · suite de dashboards o plataforma',
      },
      {
        title: 'Aplicaciones Impulsadas por IA',
        description:
          'La mayoría de los pilotos de IA impresionan en la demo y luego mueren porque nunca ' +
          'se conectaron a datos reales y gobernados. Construyo aplicaciones de IA end-to-end ' +
          'que se integran directamente con tu estado de datos existente — sistemas en ' +
          'producción, no prototipos.',
        bullets: [
          'IA que responde a partir de tus propios datos gobernados, no de internet en general (RAG sobre la capa Gold)',
          'Agentes internos para flujos de trabajo operativos',
          'Un único equipo, un único sistema — pipeline de datos, backend y UI entregados de forma conjunta, no ensamblados a partir de proveedores distintos',
          'Se despliega dentro de tu entorno Azure existente — sin infraestructura nueva ni revisión de seguridad adicional (servicios de IA de Azure)',
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
      'Una secuencia fija y predecible, con un entregable claro en cada etapa — sin importar ' +
      'si el alcance es un pipeline, una suite de dashboards o una aplicación de IA. Sin caja ' +
      'negra, sin adivinar qué viene después.',
    steps: [
      {
        n: '01',
        title: 'Descubrimiento y Auditoría',
        description: 'Mapeamos tus fuentes de datos, pipelines y stack de reporting actuales. Identificamos cuellos de botella, carencias y victorias rápidas.',
      },
      {
        n: '02',
        title: 'Arquitectura y Diseño',
        description: 'Diseño de la arquitectura Medallion objetivo, el modelo semántico o la aplicación de IA — ajustado a tus sistemas y restricciones, y documentado para que tu propio equipo de IT pueda revisarlo y aprobarlo antes de escribir una sola línea de código.',
      },
      {
        n: '03',
        title: 'Construcción y Despliegue',
        description: 'Implementamos en iteraciones cortas y revisables. Con calidad de producción desde el primer día, no una prueba de concepto desechable.',
      },
      {
        n: '04',
        title: 'Traspaso y Soporte',
        description: 'Documentación completa y transferencia de conocimiento práctica, para que tu equipo pueda operar y ampliar el sistema sin depender de mí — más una ventana de soporte opcional tras el lanzamiento.',
      },
    ],
  },

  medallion: {
    eyebrow: 'Arquitectura',
    titlePre: 'Arquitectura ',
    titleHighlight: 'Medallion',
    titlePost: '',
    desc:
      'Una arquitectura de pipeline gobernada — no solo un diagrama. Bronze → Silver → Gold ' +
      'convierte millones de eventos diarios de tus sistemas de origen en cifras en las que ' +
      'tus equipos pueden confiar y actuar, hasta llegar a informes de Power BI Direct Lake en ' +
      'menos de un segundo.',
    sourcesOutputs: 'Fuentes / Salidas',
    technologies: 'Tecnologías',
    layers: [
      {
        id: 'bronze',
        label: 'CAPA BRONZE',
        subtitle: 'Ingesta Bruta',
        description: 'Datos sin procesar, tal cual llegan de los sistemas empresariales, con todo el histórico preservado — nada se pierde ni se sobrescribe, así que cualquier informe puede rastrearse hasta su origen. Schema-on-read, sin transformaciones aplicadas.',
      },
      {
        id: 'silver',
        label: 'CAPA SILVER',
        subtitle: 'Limpieza y Validación',
        description: 'Datos limpios, deduplicados y estandarizados — la capa donde las cifras de distintos sistemas por fin coinciden entre sí. Reglas de negocio aplicadas, schema-on-write, integridad referencial validada.',
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
    titleHighlight: 'Estudio',
    titlePost: '',
    desc: 'Proyectos de ingeniería de datos a escala empresarial que generan impacto real en el negocio. Pasa el cursor por cada tarjeta para explorar.',
    viewMore: 'Ver Más →',
    comingSoon: 'Próximamente',
    caseStudyLabel: (n) => `Caso de Estudio ${n}`,
    cards: [
      {
        title: 'Medallion Architecture · Grupo Farmacéutico',
        description:
          'Un grupo farmacéutico multinacional necesitaba reporting gobernado y casi en tiempo ' +
          'real sobre cuatro sistemas desconectados, sin exportaciones manuales que frenaran ' +
          'al negocio. Construimos un pipeline Medallion end-to-end: datos de SAP ingeridos ' +
          'vía ADF a Bronze, transformaciones con PySpark a través de Silver, e informes de ' +
          'Power BI Direct Lake que hoy sirven a más de 200 usuarios.',
        metrics: [
          { label: 'Fuentes de datos', value: '4' },
          { label: 'Eventos diarios', value: '50M+' },
          { label: 'Latencia de informes', value: '<1s' },
        ],
      },
      {
        title: 'Power BI Embedded Dashboard Suite · Pharmacy Network',
        description:
          'Un único informe de Power BI embebido en el portal de farmacias. Una API de tokens en Node.js y seguridad a nivel de fila sobre el ID de farmacia dan a cada farmacia su propio sell-out (unidades, valor, por producto, YTD y YoY) sin licencia de Power BI por usuario.',
        metrics: [
          { label: 'Informe, todas las farmacias', value: '1' },
          { label: 'Licencias por usuario', value: '0' },
          { label: 'Aislamiento', value: 'RLS' },
        ],
      },
      {
        title: 'Real-time Pipeline · Databricks',
        description:
          'Datos de Salesforce y Odoo disponibles en el momento en que ocurren, no horas ' +
          'después. Un pipeline en streaming construido sobre Delta Live Tables, con evolución ' +
          'de esquema, validaciones automáticas de calidad de datos y monitorización de SLA ' +
          'que lo mantienen fiable a escala de producción, no solo rápido.',
        metrics: [
          { label: 'Latencia de eventos', value: '<5s' },
          { label: 'Tablas gestionadas', value: '120+' },
          { label: 'SLA de disponibilidad', value: '99.9%' },
        ],
      },
    ],
    aiPlaceholder: {
      title: 'Aplicación de IA — Entrega End-to-End',
      description:
        'Aquí irá el próximo caso de estudio de IA — una aplicación en producción construida ' +
        'end-to-end sobre una plataforma de datos gobernada, siguiendo la misma cadena Datos → ' +
        'BI → IA que el trabajo de arriba. Cliente, métricas y arquitectura se añadirán en ' +
        'cuanto el proyecto pueda hacerse público.',
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
