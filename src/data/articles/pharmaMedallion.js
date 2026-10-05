// Long-form (blog style) body for the pharma Medallion case study.
// Every text node is { en, es }. Block types are rendered by
// src/pages/CaseStudyDetail/ArticleBody.jsx.
//
// Narrative only: no client names and no metrics that have not been verified.
// Code samples are illustrative, not client code.

const SILVER_NOTEBOOK = `# nb_silver_clean (illustrative)
from delta.tables import DeltaTable
from pyspark.sql import functions as F, Window

src = spark.read.table("bronze.sap_sales_orders")

# 1. Type, trim and standardise
clean = (
    src
    .withColumn("order_id", F.col("VBELN").cast("string"))
    .withColumn("order_date", F.to_date("ERDAT", "yyyyMMdd"))
    .withColumn("net_value", F.col("NETWR").cast("decimal(18,2)"))
)

# 2. Keep the latest version of every business key
w = Window.partitionBy("order_id").orderBy(F.col("_ingested_at").desc())
latest = clean.withColumn("_rn", F.row_number().over(w)).filter("_rn = 1").drop("_rn")

# 3. Validate before publishing
assert latest.filter("order_id IS NULL").count() == 0, "null business key"

# 4. Idempotent upsert into Silver
(DeltaTable.forName(spark, "silver.sales_orders").alias("t")
    .merge(latest.alias("s"), "t.order_id = s.order_id")
    .whenMatchedUpdateAll()
    .whenNotMatchedInsertAll()
    .execute())`

const PIPELINE_YAML = `# azure-pipelines.yml (illustrative)
trigger:
  branches:
    include: [ main ]

stages:
  - stage: Dev
    jobs:
      - deployment: deploy_dev
        environment: fabric-dev          # no approval
        strategy:
          runOnce:
            deploy:
              steps:
                - script: python deploy.py --workspace dev --branch $(Build.SourceBranchName)

  - stage: Test
    dependsOn: Dev
    jobs:
      - deployment: deploy_test
        environment: fabric-test         # UAT workspace, business validates here
        strategy:
          runOnce:
            deploy:
              steps:
                - script: python deploy.py --workspace test --tag $(Build.BuildNumber)

  - stage: Prod
    dependsOn: Test
    jobs:
      - deployment: deploy_prod
        environment: fabric-prod         # manual approval + checks configured on the environment
        strategy:
          runOnce:
            deploy:
              steps:
                - script: python deploy.py --workspace prod --tag $(Build.BuildNumber)`

export const PHARMA_MEDALLION_ARTICLE = {
  headline: {
    en: 'From four silos to one governed platform: a Medallion lakehouse on Microsoft Fabric',
    es: 'De cuatro silos a una plataforma gobernada: un lakehouse Medallion en Microsoft Fabric',
  },
  intro: {
    en: 'Four operational systems, four versions of the truth, and a reporting process that lived in spreadsheets. This is how we went from that to a governed Medallion platform on Microsoft Fabric: the spec we started from, the options we weighed, the architecture we chose and how we took it to production with Azure DevOps.',
    es: 'Cuatro sistemas operativos, cuatro versiones de la verdad y un proceso de reporting que vivía en hojas de cálculo. Así pasamos de eso a una plataforma Medallion gobernada sobre Microsoft Fabric: la especificación de partida, las opciones que valoramos, la arquitectura elegida y cómo la llevamos a producción con Azure DevOps.',
  },
  sections: [
    {
      id: 'problem',
      title: { en: 'The problem: spec of the current situation', es: 'El problema: especificación de la situación actual' },
      blocks: [
        {
          type: 'p',
          text: {
            en: 'A multinational pharmaceutical group ran its business on SAP, Salesforce, Odoo and a warehouse management system. Each had its own schema, its own refresh cadence and its own idea of what a "customer" or a "sale" is. Reporting meant exporting from each system and reconciling by hand.',
            es: 'Un grupo farmacéutico multinacional operaba con SAP, Salesforce, Odoo y un sistema de gestión de almacén. Cada uno con su esquema, su cadencia de actualización y su propia idea de qué es un "cliente" o una "venta". Reportar significaba exportar de cada sistema y conciliar a mano.',
          },
        },
        {
          type: 'ul',
          items: [
            { en: 'The same KPI gave different numbers depending on who built the report.', es: 'El mismo KPI daba cifras distintas según quién construyera el informe.' },
            { en: 'No lineage: nobody could say which source field fed which figure.', es: 'Sin trazabilidad: nadie sabía qué campo de origen alimentaba cada cifra.' },
            { en: 'Reports were stale on arrival and depended on a person running the exports.', es: 'Los informes llegaban desactualizados y dependían de una persona que lanzara las exportaciones.' },
            { en: 'Adding a new system meant starting another reporting project from scratch.', es: 'Incorporar un sistema nuevo suponía empezar otro proyecto de reporting desde cero.' },
          ],
        },
        {
          type: 'spec',
          title: { en: 'Requirements we agreed with the business', es: 'Requisitos acordados con negocio' },
          head: [{ en: 'ID', es: 'ID' }, { en: 'Requirement', es: 'Requisito' }, { en: 'Acceptance criterion', es: 'Criterio de aceptación' }],
          rows: [
            { id: 'R1', cells: [{ en: 'One governed model across the four sources', es: 'Un modelo gobernado para las cuatro fuentes' }, { en: 'Each KPI has one definition, owned and documented', es: 'Cada KPI tiene una única definición, con responsable y documentada' }] },
            { id: 'R2', cells: [{ en: 'Refresh as close to real time as each source allows', es: 'Actualización lo más cercana a tiempo real que permita cada fuente' }, { en: 'Cadence agreed per source and monitored', es: 'Cadencia acordada por fuente y monitorizada' }] },
            { id: 'R3', cells: [{ en: 'Traceability from report to source', es: 'Trazabilidad del informe al origen' }, { en: 'Any figure can be traced back through Silver and Bronze', es: 'Cualquier cifra se puede rastrear por Silver y Bronze' }] },
            { id: 'R4', cells: [{ en: 'Access limited by role', es: 'Acceso limitado por rol' }, { en: 'Row-level security validated with real users', es: 'Seguridad a nivel de fila validada con usuarios reales' }] },
            { id: 'R5', cells: [{ en: 'Safe change management', es: 'Gestión de cambios segura' }, { en: 'Separate environments, versioned releases and rollback', es: 'Entornos separados, despliegues versionados y rollback' }] },
            { id: 'R6', cells: [{ en: 'Extensible without re-architecting', es: 'Ampliable sin rediseñar' }, { en: 'A fifth source is added by following the same pattern', es: 'Una quinta fuente se añade siguiendo el mismo patrón' }] },
          ],
        },
      ],
    },
    {
      id: 'options',
      title: { en: 'Solutions we considered', es: 'Soluciones que valoramos' },
      blocks: [
        {
          type: 'p',
          text: {
            en: 'We compared three approaches against the requirements above. The goal was not the most fashionable option, but the one that satisfied R1 to R6 with the least long-term cost.',
            es: 'Comparamos tres enfoques frente a los requisitos anteriores. El objetivo no era la opción más de moda, sino la que cumpliera R1 a R6 con el menor coste a largo plazo.',
          },
        },
        {
          type: 'options',
          items: [
            {
              name: { en: 'A. Direct connections from Power BI', es: 'A. Conexiones directas desde Power BI' },
              pros: { en: 'Fastest to a first report.', es: 'Lo más rápido para un primer informe.' },
              cons: { en: 'Logic is duplicated in every report, ERP systems take the query load and there is no history or lineage.', es: 'La lógica se duplica en cada informe, los ERP asumen la carga de consultas y no hay histórico ni trazabilidad.' },
              verdict: { en: 'Fails R1, R3 and R6', es: 'No cumple R1, R3 ni R6' },
            },
            {
              name: { en: 'B. Classic data warehouse with ETL', es: 'B. Data warehouse clásico con ETL' },
              pros: { en: 'Well understood and governable.', es: 'Bien conocido y gobernable.' },
              cons: { en: 'Separate storage and compute, a heavier delivery and data copied again for BI.', es: 'Almacenamiento y cómputo separados, una entrega más pesada y datos copiados otra vez para BI.' },
              verdict: { en: 'Meets the spec at a higher cost', es: 'Cumple la especificación a mayor coste' },
            },
            {
              name: { en: 'C. Medallion lakehouse on Microsoft Fabric', es: 'C. Lakehouse Medallion en Microsoft Fabric' },
              pros: { en: 'One copy of the data in OneLake, layered quality, Delta tables and Direct Lake for Power BI.', es: 'Una sola copia de los datos en OneLake, calidad por capas, tablas Delta y Direct Lake para Power BI.' },
              cons: { en: 'Needs discipline in layer contracts and naming from day one.', es: 'Exige disciplina en los contratos entre capas y en la nomenclatura desde el primer día.' },
              verdict: { en: "Chosen", es: "Elegida" },
              chosen: true,
            },
          ],
        },
      ],
    },
    {
      id: 'architecture',
      title: { en: 'The proposed architecture', es: 'La arquitectura propuesta' },
      blocks: [
        {
          type: 'p',
          text: {
            en: 'Data flows in three steps. A Fabric Data Pipeline orchestrates the extraction: Copy data activities pull each source into the lakehouse unchanged. From there, notebooks refine it layer by layer as a DAG, and the Gold layer is published as a governed semantic model that Power BI reads in Direct Lake mode.',
            es: 'Los datos fluyen en tres pasos. Un Data Pipeline de Fabric orquesta la extracción: las actividades Copy data traen cada fuente al lakehouse sin modificarla. Desde ahí, los notebooks la refinan capa a capa como un DAG, y la capa Gold se publica como un modelo semántico gobernado que Power BI lee en modo Direct Lake.',
          },
        },
        {
          type: 'ul',
          items: [
            { en: 'Bronze: an immutable, raw copy of each source with ingestion metadata. Nothing is cleaned here, so we can always replay.', es: 'Bronze: copia cruda e inmutable de cada fuente con metadatos de ingesta. Aquí no se limpia nada, así siempre se puede reprocesar.' },
            { en: 'Silver: typed, deduplicated and validated Delta tables. Data quality rules run here, before anything reaches the business.', es: 'Silver: tablas Delta tipadas, deduplicadas y validadas. Las reglas de calidad se ejecutan aquí, antes de que nada llegue a negocio.' },
            { en: 'Gold: the business model (facts and dimensions), KPI definitions as measures and row-level security roles.', es: 'Gold: el modelo de negocio (hechos y dimensiones), las definiciones de KPI como medidas y los roles de seguridad a nivel de fila.' },
          ],
        },
        { type: 'layers' },
        {
          type: 'callout',
          label: { en: 'Design decision', es: 'Decisión de diseño' },
          text: {
            en: 'Every layer has a contract: what goes in, what comes out and who owns it. That is what lets a fifth source follow the same path instead of becoming a new project (R6).',
            es: 'Cada capa tiene un contrato: qué entra, qué sale y quién es responsable. Eso es lo que permite que una quinta fuente siga el mismo camino en vez de convertirse en un proyecto nuevo (R6).',
          },
        },
      ],
    },
    {
      id: 'implementation',
      title: { en: 'Implementation', es: 'Implementación' },
      blocks: [
        {
          type: 'p',
          text: {
            en: 'We built layer by layer in short, reviewable increments, so business could see real data early instead of waiting for a big-bang delivery.',
            es: 'Construimos capa por capa en incrementos cortos y revisables, para que negocio viera datos reales pronto en lugar de esperar a una entrega única.',
          },
        },
        {
          type: 'steps',
          items: [
            { title: { en: 'Connections and Bronze', es: 'Conexiones y Bronze' }, text: { en: 'Access method and cadence per source, then Copy data into Bronze with ingestion timestamps.', es: 'Método de acceso y cadencia por fuente, y después Copy data a Bronze con marcas de tiempo de ingesta.' } },
            { title: { en: 'Silver notebooks', es: 'Notebooks de Silver' }, text: { en: 'PySpark notebooks to type, deduplicate and validate, writing with idempotent merges so reruns are safe.', es: 'Notebooks PySpark para tipar, deduplicar y validar, escribiendo con merges idempotentes para que reejecutar sea seguro.' } },
            { title: { en: 'Gold model and DAX', es: 'Modelo Gold y DAX' }, text: { en: 'Star schema, KPI measures and RLS roles in the semantic model.', es: 'Esquema en estrella, medidas de KPI y roles RLS en el modelo semántico.' } },
            { title: { en: 'Orchestration', es: 'Orquestación' }, text: { en: 'The pipeline chains the notebooks in dependency order and stops downstream layers if a quality check fails.', es: 'El pipeline encadena los notebooks por dependencias y detiene las capas siguientes si falla un control de calidad.' } },
          ],
        },
        {
          type: 'code',
          title: { en: 'Silver layer: clean, deduplicate, validate, merge', es: 'Capa Silver: limpiar, deduplicar, validar, hacer merge' },
          language: 'PySpark',
          code: SILVER_NOTEBOOK,
        },
      ],
    },
    {
      id: 'uat',
      title: { en: 'UAT: validating with the business', es: 'UAT: validación con negocio' },
      blocks: [
        {
          type: 'p',
          text: {
            en: 'UAT ran in a dedicated Test workspace, separate from development, so users validated against a stable version while we kept building. The question was never "does it look right" but "does it match what we trust today".',
            es: 'El UAT se hizo en un workspace de Test dedicado, separado del desarrollo, para que los usuarios validaran una versión estable mientras seguíamos construyendo. La pregunta nunca fue "se ve bien", sino "coincide con lo que damos por bueno hoy".',
          },
        },
        {
          type: 'checklist',
          items: [
            { en: 'Reconcile key figures against the reports the business already trusts, and document every difference.', es: 'Conciliar las cifras clave con los informes en los que negocio ya confía y documentar cada diferencia.' },
            { en: 'Test row-level security with real user accounts for each role.', es: 'Probar la seguridad a nivel de fila con cuentas de usuario reales de cada rol.' },
            { en: 'Check behaviour with the filters and date ranges people actually use.', es: 'Comprobar el comportamiento con los filtros y rangos de fechas que la gente realmente usa.' },
            { en: 'Log every finding as a work item in Azure Boards with an owner and a status.', es: 'Registrar cada hallazgo como work item en Azure Boards con responsable y estado.' },
          ],
        },
        {
          type: 'p',
          text: {
            en: 'Business adjustments (metric definitions, formatting, RLS rules) were folded in without touching what was already validated. Each change went through the same pipeline and the reconciliation checks were rerun, so a fix could not silently break a signed-off figure.',
            es: 'Los ajustes de negocio (definiciones de métricas, formato, reglas RLS) se incorporaron sin tocar lo ya validado. Cada cambio pasó por el mismo pipeline y se repitieron las conciliaciones, de modo que una corrección no pudiera romper en silencio una cifra aprobada.',
          },
        },
      ],
    },
    {
      id: 'release',
      title: { en: 'Going to production with Azure DevOps', es: 'Paso a producción con Azure DevOps' },
      blocks: [
        {
          type: 'p',
          text: {
            en: 'Azure DevOps is where the environments are managed. The code lives in Azure Repos, each Fabric workspace maps to an environment, and Azure Pipelines promotes the same versioned artefacts from one environment to the next. Nobody edits Production by hand.',
            es: 'Azure DevOps es donde se gestionan los entornos. El código vive en Azure Repos, cada workspace de Fabric se corresponde con un entorno y Azure Pipelines promueve los mismos artefactos versionados de un entorno al siguiente. Nadie edita Producción a mano.',
          },
        },
        {
          type: 'envflow',
          stages: [
            { name: 'Dev', where: { en: 'Feature branches', es: 'Ramas de feature' }, text: { en: 'Developers work in the Dev workspace connected to Git. Pull requests are reviewed before merging.', es: 'Se desarrolla en el workspace Dev conectado a Git. Las pull requests se revisan antes de fusionar.' } },
            { name: 'Test', where: { en: 'UAT workspace', es: 'Workspace de UAT' }, text: { en: 'A tagged release is deployed here. The business validates and signs off.', es: 'Aquí se despliega una release etiquetada. Negocio valida y da el visto bueno.' } },
            { name: 'Prod', where: { en: 'Approval gate', es: 'Puerta de aprobación' }, text: { en: 'The same release is promoted after a manual approval configured on the environment.', es: 'La misma release se promueve tras una aprobación manual configurada en el entorno.' } },
          ],
        },
        {
          type: 'code',
          title: { en: 'Multi-stage pipeline with an approval on Production', es: 'Pipeline multietapa con aprobación en Producción' },
          language: 'YAML',
          code: PIPELINE_YAML,
        },
        {
          type: 'ul',
          items: [
            { en: 'Every release is tagged, so rolling back means redeploying the previous tag.', es: 'Cada release está etiquetada, así que hacer rollback es volver a desplegar la etiqueta anterior.' },
            { en: 'Environment-specific values (connections, workspace IDs) live in variables, not in the code.', es: 'Los valores propios de cada entorno (conexiones, IDs de workspace) viven en variables, no en el código.' },
            { en: 'The Production release followed a short checklist: approval, deployment, refresh run and a smoke test of the key reports.', es: 'El paso a Producción siguió una lista corta: aprobación, despliegue, ejecución de la carga y prueba rápida de los informes clave.' },
          ],
        },
      ],
    },
    {
      id: 'outcome',
      title: { en: 'What we took away', es: 'Lo que nos llevamos' },
      blocks: [
        {
          type: 'ul',
          items: [
            { en: 'Agreeing KPI definitions early was harder than any technical step, and worth more.', es: 'Acordar pronto las definiciones de KPI fue más difícil que cualquier paso técnico, y valió más.' },
            { en: 'Keeping Bronze raw made every dispute about a number answerable by looking at the source.', es: 'Mantener Bronze en crudo permitió resolver cualquier discusión sobre una cifra mirando el origen.' },
            { en: 'Separate environments plus approvals turned releases into a routine instead of an event.', es: 'Separar entornos y añadir aprobaciones convirtió los despliegues en rutina en vez de en un evento.' },
          ],
        },
      ],
    },
  ],
}
