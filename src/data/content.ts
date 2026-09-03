export type Locale = "es" | "en";
export type ProjectKey = "erp" | "manufacturing" | "groupfit" | "goAgent";

export interface ProjectDecision {
  title: string;
  why: string;
}

export interface Project {
  key: ProjectKey;
  slug: string;
  alternateSlug: string;
  index: string;
  title: string;
  label: string;
  summary: string;
  contribution: string;
  evidence: string;
  stack: string[];
  asset: string;
  assetAlt: string;
  caption: string;
  decisions: ProjectDecision[];
}

interface EvidenceRow {
  decision: string;
  why: string;
  evidence: string;
}

interface Experience {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

interface CvContent {
  heading: string;
  profileHeading: string;
  profile: string;
  experienceHeading: string;
  experience: Experience[];
  packagesHeading: string;
  packages: { name: string; registry: string; description: string; href: string }[];
  projectsHeading: string;
  projects: { title: string; description: string }[];
  educationHeading: string;
  degree: string;
  school: string;
  educationDates: string;
  technologiesHeading: string;
  technologies: string;
  languagesHeading: string;
  languages: { language: string; level: string }[];
  downloadLabel: string;
}

interface SiteContent {
  locale: Locale;
  alternateLocale: Locale;
  role: string;
  title: string;
  description: string;
  ogDescription: string;
  languageLabel: string;
  alternateLanguageLabel: string;
  routes: {
    home: string;
    cv: string;
    pdf: string;
  };
  nav: {
    projects: string;
    evidence: string;
    profile: string;
    cv: string;
    contact: string;
  };
  hero: {
    heading: string;
    proposition: string;
    context: string;
    emailLabel: string;
    projectsLabel: string;
    cvLabel: string;
    pdfLabel: string;
  };
  sections: {
    projects: string;
    evidence: string;
    profile: string;
    additional: string;
    contact: string;
  };
  projects: Project[];
  projectLabels: {
    context: string;
    contribution: string;
    evidence: string;
    stack: string;
    caseLink: string;
    summary: string;
    decisions: string;
    back: string;
    previous: string;
    next: string;
  };
  evidenceRows: EvidenceRow[];
  profile: {
    paragraphs: string[];
    capabilitiesHeading: string;
    capabilities: string[];
  };
  additional: {
    title: string;
    description: string;
    links?: { label: string; href: string }[];
  }[];
  contact: {
    prompt: string;
    emailLabel: string;
    cvLabel: string;
    pdfLabel: string;
  };
  cv: CvContent;
  notFound: {
    eyebrow: string;
    heading: string;
    description: string;
    action: string;
  };
}

const shared = {
  name: "Bastián Ibáñez",
  cvName: "Bastián Ibáñez Martínez",
  location: "Santiago, Chile",
  email: "ibanezmbastian@gmail.com",
  emailHref: "mailto:ibanezmbastian@gmail.com",
  github: "https://github.com/bastianibanez",
  linkedin: "https://www.linkedin.com/in/ibanezbastian",
};

export const identity = shared;

const esProjects: Project[] = [
  {
    key: "erp",
    slug: "agente-operaciones-erp",
    alternateSlug: "erp-operations-agent",
    index: "01",
    title: "Agente de operaciones ERP con IA",
    label: "Trabajo profesional · Caso anonimizado",
    summary:
      "Agente multi-especialista que convierte solicitudes internas en consultas y operaciones controladas sobre un ERP y fuentes analíticas.",
    contribution:
      "Diseñé la arquitectura del agente, su integración operacional y el camino de despliegue en la nube; también dirigí el trabajo técnico del equipo que lo opera.",
    evidence:
      "Operado en producción · revisión humana para acciones sensibles · buffer, outbox, idempotencia y recuperación dirigida.",
    stack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "PostgreSQL",
      "ERP RPC",
      "BigQuery",
      "Docker",
      "GCP",
    ],
    asset: "/assets/erp-operations.svg?v=2",
    assetAlt:
      "Flujo abstraído desde mensajería y documentos hacia una cola durable, un supervisor con especialistas, controles humanos, ERP y respuesta registrada.",
    caption:
      "Entrada firmada, trabajo durable y efectos ERP controlados antes de una salida registrada.",
    decisions: [
      {
        title: "Efectos externos idempotentes y salida durable",
        why: "Los reintentos no deben duplicar operaciones ni perder respuestas.",
      },
      {
        title: "Revisión humana en el borde sensible",
        why: "La autonomía no sustituye la autorización cuando una acción cambia el negocio.",
      },
    ],
  },
  {
    key: "manufacturing",
    slug: "plataforma-manufactura",
    alternateSlug: "manufacturing-platform",
    index: "02",
    title: "Plataforma operacional para manufactura",
    label: "Trabajo para cliente · Caso anonimizado",
    summary:
      "Producto full-stack para inventario, compras, calidad, fabricación, ventas, mermas y reportes, diseñado alrededor de trazabilidad transaccional.",
    contribution:
      "Diseñé e implementé el producto de extremo a extremo, desde el modelo de dominio y la interfaz responsive hasta autenticación, despliegue y verificación.",
    evidence:
      "Entregada y desplegada · 255 pruebas unitarias en 57 archivos, verificadas el 7 de agosto de 2026 · suite E2E para los flujos operacionales principales.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Convex",
      "Clerk",
      "Vitest",
      "Playwright",
      "Cloudflare Workers",
    ],
    asset: "/assets/manufacturing-platform.svg?v=2",
    assetAlt:
      "Plataforma operacional donde compras, calidad y fabricación escriben en un libro mayor de inventario que alimenta ventas y reportes.",
    caption:
      "Módulos operacionales coordinados alrededor de inventario trazable y fabricación transaccional.",
    decisions: [
      {
        title: "Libro mayor inmutable con mutaciones transaccionales",
        why: "Inventario y fabricación deben conservar trazabilidad y evitar stock negativo por carreras.",
      },
      {
        title: "Gates automatizados antes de desplegar",
        why: "La entrega incluye pruebas y verificación, no solo implementación.",
      },
    ],
  },
  {
    key: "groupfit",
    slug: "groupfit",
    alternateSlug: "groupfit",
    index: "03",
    title: "GroupFit",
    label: "Producto propio · Repositorio privado",
    summary:
      "Planificador que asigna grupos a hoteles y fechas bajo restricciones de capacidad, disponibilidad y transporte, y explica qué no pudo asignar.",
    contribution:
      "Construí el solver, la API y la interfaz del planificador como un sistema end-to-end con límites claros entre dominio, optimización y E/S.",
    evidence:
      "Heurística con reparación + refinamiento ILP opcional · entrada y salida Excel/JSON · resultado parcial explicable ante restricciones incompatibles.",
    stack: [
      "Python",
      "FastAPI",
      "Pydantic",
      "PuLP/HiGHS",
      "Next.js",
      "TypeScript",
      "Docker",
    ],
    asset: "/assets/groupfit.svg?v=2",
    assetAlt:
      "Flujo de GroupFit desde archivos de entrada hacia validación, heurística, reparación, optimización matemática y resultados explicables.",
    caption:
      "Validación y heurística primero; reparación y refinamiento matemático cuando agregan valor.",
    decisions: [
      {
        title: "Solver puro con resultado explicable",
        why: "Una entrada sobre-restringida debe producir orientación útil, no un fallo opaco.",
      },
      {
        title: "Límites explícitos entre dominio, optimización y E/S",
        why: "La lógica de asignación debe poder evolucionar sin acoplarse a archivos, API o interfaz.",
      },
    ],
  },
  {
    key: "goAgent",
    slug: "go-agent",
    alternateSlug: "go-agent",
    index: "04",
    title: "go-agent",
    label: "Proyecto propio · Repositorio privado",
    summary:
      "Agente de programación para terminal escrito en Go, con proveedores de modelos intercambiables y controles explícitos sobre las herramientas.",
    contribution:
      "Diseñé una arquitectura hexagonal que separa el núcleo ReAct, la TUI, los proveedores, las herramientas y la persistencia de conversaciones.",
    evidence:
      "Cuatro adaptadores de modelos · streaming y cancelación · política de confirmación para acciones sensibles · suite Go verificada el 7 de agosto de 2026.",
    stack: ["Go", "Bubble Tea", "SQLite", "APIs de modelos", "Herramientas de sistema"],
    asset: "/assets/go-agent.svg?v=2",
    assetAlt:
      "Arquitectura hexagonal de go-agent con interfaz terminal, núcleo del agente, adaptadores de modelos, herramientas y persistencia.",
    caption:
      "El núcleo del agente permanece aislado de la terminal, los modelos, las herramientas y el almacenamiento.",
    decisions: [
      {
        title: "Puertos y adaptadores",
        why: "Proveedores, herramientas y almacenamiento pueden cambiar sin contaminar el núcleo.",
      },
      {
        title: "Confirmación para acciones sensibles",
        why: "El control de herramientas debe ser explícito incluso cuando el loop del agente es autónomo.",
      },
    ],
  },
];

const enProjects: Project[] = [
  {
    key: "erp",
    slug: "erp-operations-agent",
    alternateSlug: "agente-operaciones-erp",
    index: "01",
    title: "AI agent for ERP operations",
    label: "Professional work · Anonymized case study",
    summary:
      "A multi-specialist agent that turns internal requests into controlled queries and operations across an ERP and analytical sources.",
    contribution:
      "I designed the agent architecture, operational integration, and cloud delivery path, and led the technical work of the team operating it.",
    evidence:
      "Operated in production · human review for sensitive actions · buffering, outbox delivery, idempotency, and targeted recovery.",
    stack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "PostgreSQL",
      "ERP RPC",
      "BigQuery",
      "Docker",
      "GCP",
    ],
    asset: "/assets/erp-operations.svg?v=2",
    assetAlt:
      "Abstract flow from messaging and documents through a durable queue, supervisor and specialists, human controls, ERP, and a recorded response.",
    caption:
      "Signed input, durable work, and controlled ERP effects before a recorded response.",
    decisions: [
      {
        title: "Idempotent external effects and durable output",
        why: "Retries must not duplicate operations or lose replies.",
      },
      {
        title: "Human review at the sensitive boundary",
        why: "Autonomy does not replace authorization when an action changes the business.",
      },
    ],
  },
  {
    key: "manufacturing",
    slug: "manufacturing-platform",
    alternateSlug: "plataforma-manufactura",
    index: "02",
    title: "Manufacturing operations platform",
    label: "Client work · Anonymized case study",
    summary:
      "A full-stack product for inventory, purchasing, quality, manufacturing, sales, waste, and reporting, built around transactional traceability.",
    contribution:
      "I designed and implemented the product end to end, from the domain model and responsive interface to authentication, delivery, and verification.",
    evidence:
      "Delivered and deployed · 255 unit tests across 57 files, verified on August 7, 2026 · E2E coverage for the main operational flows.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Convex",
      "Clerk",
      "Vitest",
      "Playwright",
      "Cloudflare Workers",
    ],
    asset: "/assets/manufacturing-platform.svg?v=2",
    assetAlt:
      "Operations platform where purchasing, quality and manufacturing write to an inventory ledger that feeds sales and reporting.",
    caption:
      "Operations modules coordinated around traceable inventory and transactional manufacturing.",
    decisions: [
      {
        title: "Immutable ledger with transactional mutations",
        why: "Inventory and manufacturing need traceability and protection from race-driven negative stock.",
      },
      {
        title: "Automated gates before deployment",
        why: "Delivery includes tests and verification, not implementation alone.",
      },
    ],
  },
  {
    key: "groupfit",
    slug: "groupfit",
    alternateSlug: "groupfit",
    index: "03",
    title: "GroupFit",
    label: "Independent product · Private repository",
    summary:
      "A planner that assigns groups to hotels and dates under capacity, availability, and transport constraints, and explains what it could not place.",
    contribution:
      "I built the solver, API, and planner interface as an end-to-end system with clear boundaries between domain logic, optimization, and I/O.",
    evidence:
      "Heuristic scheduling with repair + optional ILP refinement · Excel/JSON input and output · explainable partial results when constraints conflict.",
    stack: [
      "Python",
      "FastAPI",
      "Pydantic",
      "PuLP/HiGHS",
      "Next.js",
      "TypeScript",
      "Docker",
    ],
    asset: "/assets/groupfit.svg?v=2",
    assetAlt:
      "GroupFit flow from input files through validation, heuristic scheduling, repair, mathematical optimization, and explainable outputs.",
    caption:
      "Validation and heuristics first; repair and mathematical refinement when they add value.",
    decisions: [
      {
        title: "Pure solver with explainable output",
        why: "Over-constrained input should produce useful guidance rather than an opaque failure.",
      },
      {
        title: "Explicit boundaries between domain, optimization, and I/O",
        why: "Assignment logic should evolve without coupling to files, APIs, or interface code.",
      },
    ],
  },
  {
    key: "goAgent",
    slug: "go-agent",
    alternateSlug: "go-agent",
    index: "04",
    title: "go-agent",
    label: "Independent project · Private repository",
    summary:
      "A terminal coding agent written in Go, with interchangeable model providers and explicit controls around tool execution.",
    contribution:
      "I designed a hexagonal architecture that separates the ReAct core, TUI, providers, tools, and conversation persistence.",
    evidence:
      "Four model adapters · streaming and cancellation · confirmation policy for sensitive actions · Go test suite verified on August 7, 2026.",
    stack: ["Go", "Bubble Tea", "SQLite", "Model APIs", "System tools"],
    asset: "/assets/go-agent.svg?v=2",
    assetAlt:
      "Hexagonal go-agent architecture with a terminal interface, agent core, model adapters, tools, and persistence.",
    caption:
      "The agent core remains isolated from the terminal, models, tools, and storage.",
    decisions: [
      {
        title: "Ports and adapters",
        why: "Providers, tools, and storage can change without contaminating the core.",
      },
      {
        title: "Confirmation for sensitive actions",
        why: "Tool control must remain explicit even when the agent loop is autonomous.",
      },
    ],
  },
];

export const content: Record<Locale, SiteContent> = {
  es: {
    locale: "es",
    alternateLocale: "en",
    role: "Software Engineer · Sistemas distribuidos confiables & IA aplicada",
    title: "Bastián Ibáñez — Software Engineer · Sistemas distribuidos confiables & IA aplicada",
    description:
      "Portafolio de Bastián Ibáñez: sistemas full-stack, automatización operacional e IA aplicada llevados desde la arquitectura hasta producción.",
    ogDescription:
      "Casos de ingeniería con evidencia: agentes para operaciones ERP, software de manufactura, optimización matemática y tooling en Go.",
    languageLabel: "Español",
    alternateLanguageLabel: "English",
    routes: { home: "/", cv: "/cv", pdf: "https://bastianibanez.com/bastian-ibanez-cv-es.pdf" },
    nav: {
      projects: "Proyectos",
      evidence: "Evidencia",
      profile: "Perfil",
      cv: "CV",
      contact: "Contacto",
    },
    hero: {
      heading: "Software Engineer · Sistemas distribuidos confiables & IA aplicada",
      proposition:
        "Diseño y llevo a producción sistemas full-stack, automatización operacional e IA aplicada. Trabajo desde la arquitectura y el dominio hasta los flujos de entrega, observabilidad y recuperación.",
      context:
        "Con base en Santiago, construyo principalmente con Python y TypeScript. Mi trabajo reciente conecta agentes, sistemas ERP, productos operacionales y modelos de optimización con controles explícitos para operar de forma segura.",
      emailLabel: "Escribirme",
      projectsLabel: "Ver proyectos",
      cvLabel: "Ver CV en la web",
      pdfLabel: "Descargar CV PDF",
    },
    sections: {
      projects: "Proyectos seleccionados",
      evidence: "Evidencia de ingeniería",
      profile: "Perfil",
      additional: "Trabajo adicional",
      contact: "CV y contacto",
    },
    projects: esProjects,
    projectLabels: {
      context: "Contexto",
      contribution: "Contribución",
      evidence: "Evidencia",
      stack: "Stack público seguro",
      caseLink: "Leer caso",
      summary: "Resumen",
      decisions: "Decisiones de ingeniería",
      back: "Volver a proyectos",
      previous: "Caso anterior",
      next: "Caso siguiente",
    },
    evidenceRows: [
      {
        decision: "Efectos externos idempotentes y salida durable",
        why: "Los reintentos no deben duplicar operaciones ni perder respuestas.",
        evidence: "Agente de operaciones ERP con IA",
      },
      {
        decision: "Revisión humana en el borde sensible",
        why: "La autonomía no sustituye la autorización cuando una acción cambia el negocio.",
        evidence: "Agente de operaciones ERP con IA",
      },
      {
        decision: "Libro mayor inmutable con mutaciones transaccionales",
        why: "Inventario y fabricación deben conservar trazabilidad y evitar stock negativo por carreras.",
        evidence: "Plataforma operacional para manufactura",
      },
      {
        decision: "Solver puro con resultado explicable",
        why: "Una entrada sobre-restringida debe producir orientación útil, no un fallo opaco.",
        evidence: "GroupFit",
      },
      {
        decision: "Puertos y adaptadores",
        why: "Proveedores, herramientas y almacenamiento pueden cambiar sin contaminar el núcleo.",
        evidence: "go-agent",
      },
      {
        decision: "Gates automatizados antes de desplegar",
        why: "La entrega incluye pruebas y verificación, no solo implementación.",
        evidence: "Manufactura, GroupFit y go-agent",
      },
    ],
    profile: {
      paragraphs: [
        "Soy ingeniero de software enfocado en sistemas full-stack, automatización operacional e IA aplicada. Me interesa el trabajo donde un modelo o algoritmo debe convivir con estado real, permisos, fallos parciales y personas que necesitan entender qué ocurrió.",
        "Actualmente trabajo en automatización para operaciones de comercio electrónico y curso Ingeniería Civil en Informática en la Universidad Andrés Bello. Hablo español y cuento con certificaciones C1 de inglés y alemán.",
      ],
      capabilitiesHeading: "Capacidades",
      capabilities: [
        "Arquitectura y entrega de productos full-stack.",
        "Agentes, workflows durables e integración con sistemas operacionales.",
        "APIs y servicios en Python.",
        "Interfaces en TypeScript y React.",
        "Modelado de dominio, pruebas automatizadas y despliegue en nube.",
      ],
    },
    additional: [
      {
        title: "env-manager para Python y TypeScript",
        description:
          "Dos librerías públicas que unifican configuración local y Google Cloud Secret Manager mediante YAML declarativo, coerción de tipos, validación, entornos y enmascarado de secretos.",
        links: [
          { label: "Python", href: "https://github.com/NotoriosTI/env-manager" },
          { label: "TypeScript", href: "https://github.com/NotoriosTI/env-manager-js" },
        ],
      },
      {
        title: "Sitio industrial B2B",
        description:
          "Entrega freelance anonimizada: arquitectura y desarrollo de un sitio corporativo responsive con rutas SEO data-driven y un flujo de contacto protegido contra abuso. Sin enlace ni identidad del cliente en este portafolio.",
      },
    ],
    contact: {
      prompt: "¿Tienes un problema donde software, operaciones e IA se encuentran?",
      emailLabel: "Escribirme",
      cvLabel: "Ver CV en la web",
      pdfLabel: "Descargar CV PDF",
    },
    cv: {
      heading: shared.cvName,
      profileHeading: "Perfil",
      profile:
        "Ingeniero de software que diseña plataformas de agentes de IA y la maquinaria de confiabilidad que las sostiene en producción: entrega exactly-once, idempotencia, control de concurrencia y trazabilidad. Construyo con límites explícitos entre dominio, integración e infraestructura, y con caminos de recuperación pensados desde el diseño.",
      experienceHeading: "Experiencia",
      experience: [
        {
          role: "Lead Software Engineer",
          company: "NotoriosTI",
          dates: "Agosto de 2025 — actualidad",
          bullets: [
            "Primer ingeniero contratado de la empresa. Construí la plataforma técnica desde cero y fui promovido a Lead a medida que el equipo creció a tres.",
            "Diseñé la maquinaria de confiabilidad de una plataforma multi-agente sobre ERP: outbox transaccional con fencing tokens para entrega exactly-once, saga con recuperación por fingerprint sobre operaciones de Odoo y locks de conversación de dos capas.",
            "Backpressure acoplado a la cuota del modelo, con ~1:1 test-a-código, 40 ADRs y 15 migraciones idempotentes.",
            "CI/CD y seguridad de despliegue: Workload Identity Federation sin llaves de larga vida, build-once con despliegue por digest y atestación firmada, y cutover de tráfico compare-and-swap en Cloud Run con recuperación automática.",
            "Middleware MercadoLibre–Odoo: validación de firmas HMAC de webhooks, mapeo de productos por SKU desde PostgreSQL y rotación de tokens OAuth con Secret Manager como fuente única.",
          ],
        },
        {
          role: "Junior Software Engineer",
          company: "NotoriosTI",
          dates: "Mayo de 2025 — agosto de 2025",
          bullets: [
            "Levanté desde cero la infraestructura técnica de la empresa: configuración completa de GCP (Cloud Run, Cloud SQL, Secret Manager, BigQuery), pipelines Docker y estrategia de despliegue.",
            "Construí las bases del asistente multi-agente LangGraph y odoo-engine, librería Python publicada que encapsula la integración con Odoo (JSON-RPC, modelos, CRUD).",
          ],
        },
      ],
      packagesHeading: "Paquetes publicados",
      packages: [
        {
          name: "env-manager",
          registry: "PyPI",
          description:
            "Cargador de configuración con soporte para GCP Secret Manager, coerción de tipos y validación agregada de errores. Dependencia de runtime de 20+ repositorios.",
          href: "https://github.com/NotoriosTI/env-manager",
        },
        {
          name: "@notoriosti/env-manager",
          registry: "npm",
          description:
            "Port TypeScript con dotenv cifrado ECIES/secp256k1 y CLI; build dual ESM+CJS, tipado estricto.",
          href: "https://github.com/NotoriosTI/env-manager-js",
        },
      ],
      projectsHeading: "Proyectos",
      projects: [
        {
          title: "Plataforma operacional para manufactura",
          description:
            "Producto full-stack: inventario trazable, fabricación transaccional, compras, calidad y mermas. Next.js 16 + React 19 + Convex (mutations ACID serializables) sobre Cloudflare Workers; 120 archivos de test, 1.749 aserciones.",
        },
        {
          title: "GroupFit",
          description:
            "Planificador que asigna grupos a hoteles y fechas bajo restricciones de capacidad, disponibilidad y transporte, con resultado parcial explicable. Heurística con reparación + refinamiento ILP opcional (PuLP/HiGHS).",
        },
        {
          title: "go-agent",
          description:
            "Agente de programación para terminal en Go, arquitectura hexagonal: núcleo ReAct aislado de TUI, cuatro adaptadores de modelos, streaming, cancelación y confirmación para acciones sensibles.",
        },
        {
          title: "issue-agent",
          description:
            "Agente de triage LangGraph: reportes de error en Slack → issues de GitHub enrutados con fix sugerido. Cloud Tasks como buffer de debounce sin base de datos, sobre Cloud Run escala-a-cero con WIF.",
        },
      ],
      educationHeading: "Educación",
      degree: "Ingeniería Civil en Informática",
      school: "Universidad Andrés Bello",
      educationDates: "2022 — 2028 (esperado)",
      technologiesHeading: "Tecnologías",
      technologies:
        "Python, TypeScript, SQL/PL-pgSQL, FastAPI, LangGraph, LangChain, React, Next.js, Convex, PostgreSQL, BigQuery, pgvector, Docker, GCP (Cloud Run, Cloud SQL, Secret Manager, Cloud Tasks, WIF) y Cloudflare Workers.",
      languagesHeading: "Idiomas",
      languages: [
        { language: "Español", level: "nativo" },
        { language: "Inglés", level: "C1, Cambridge FCE (2021)" },
        { language: "Alemán", level: "C1, DSD II (2021)" },
      ],
      downloadLabel: "Descargar CV PDF",
    },
    notFound: {
      eyebrow: "404 / RUTA NO ENCONTRADA",
      heading: "Esta ruta no forma parte del dossier.",
      description: "Puedes volver al registro principal o cambiar al sitio en inglés.",
      action: "Volver al inicio",
    },
  },
  en: {
    locale: "en",
    alternateLocale: "es",
    role: "Software Engineer · Reliable distributed systems & applied AI",
    title: "Bastián Ibáñez — Software Engineer · Reliable distributed systems & applied AI",
    description:
      "Bastián Ibáñez's portfolio: full-stack systems, operational automation, and applied AI taken from architecture through production.",
    ogDescription:
      "Evidence-led engineering cases spanning ERP operations agents, manufacturing software, mathematical optimization, and Go tooling.",
    languageLabel: "English",
    alternateLanguageLabel: "Español",
    routes: { home: "/en/", cv: "/en/cv", pdf: "https://bastianibanez.com/bastian-ibanez-cv-en.pdf" },
    nav: {
      projects: "Projects",
      evidence: "Evidence",
      profile: "Profile",
      cv: "CV",
      contact: "Contact",
    },
    hero: {
      heading: "Software Engineer · Reliable distributed systems & applied AI",
      proposition:
        "I design and ship full-stack systems, operational automation, and applied AI. I work from architecture and domain boundaries through delivery, observability, and recovery flows.",
      context:
        "Based in Santiago, I build primarily with Python and TypeScript. My recent work connects agents, ERP systems, operations products, and optimization models with explicit controls for safe operation.",
      emailLabel: "Email me",
      projectsLabel: "View projects",
      cvLabel: "View web CV",
      pdfLabel: "Download CV PDF",
    },
    sections: {
      projects: "Selected projects",
      evidence: "Engineering evidence",
      profile: "Profile",
      additional: "Additional work",
      contact: "CV and contact",
    },
    projects: enProjects,
    projectLabels: {
      context: "Context",
      contribution: "Contribution",
      evidence: "Evidence",
      stack: "Public-safe stack",
      caseLink: "Read case",
      summary: "Summary",
      decisions: "Engineering decisions",
      back: "Back to projects",
      previous: "Previous case",
      next: "Next case",
    },
    evidenceRows: [
      {
        decision: "Idempotent external effects and durable output",
        why: "Retries must not duplicate operations or lose replies.",
        evidence: "AI agent for ERP operations",
      },
      {
        decision: "Human review at the sensitive boundary",
        why: "Autonomy does not replace authorization when an action changes the business.",
        evidence: "AI agent for ERP operations",
      },
      {
        decision: "Immutable ledger with transactional mutations",
        why: "Inventory and manufacturing need traceability and protection from race-driven negative stock.",
        evidence: "Manufacturing operations platform",
      },
      {
        decision: "Pure solver with explainable output",
        why: "Over-constrained input should produce useful guidance rather than an opaque failure.",
        evidence: "GroupFit",
      },
      {
        decision: "Ports and adapters",
        why: "Providers, tools, and storage can change without contaminating the core.",
        evidence: "go-agent",
      },
      {
        decision: "Automated gates before deployment",
        why: "Delivery includes tests and verification, not implementation alone.",
        evidence: "Manufacturing, GroupFit, and go-agent",
      },
    ],
    profile: {
      paragraphs: [
        "I am a software engineer focused on full-stack systems, operational automation, and applied AI. I am drawn to work where a model or algorithm must coexist with real state, permissions, partial failure, and people who need to understand what happened.",
        "I currently work on automation for e-commerce operations while studying Computer Science and Engineering at Universidad Andrés Bello. I speak Spanish and hold C1 certifications in English and German.",
      ],
      capabilitiesHeading: "Capabilities",
      capabilities: [
        "Full-stack product architecture and delivery.",
        "Agents, durable workflows, and operational-system integration.",
        "APIs and services in Python.",
        "Interfaces in TypeScript and React.",
        "Domain modeling, automated testing, and cloud delivery.",
      ],
    },
    additional: [
      {
        title: "env-manager for Python and TypeScript",
        description:
          "Two public libraries that unify local configuration and Google Cloud Secret Manager through declarative YAML, type coercion, validation, environments, and secret masking.",
        links: [
          { label: "Python", href: "https://github.com/NotoriosTI/env-manager" },
          { label: "TypeScript", href: "https://github.com/NotoriosTI/env-manager-js" },
        ],
      },
      {
        title: "Industrial B2B website",
        description:
          "An anonymized freelance delivery: architecture and implementation of a responsive corporate website with data-driven SEO routes and an abuse-resistant contact flow. No client identity or link is published in this portfolio.",
      },
    ],
    contact: {
      prompt: "Working on a problem where software, operations, and AI meet?",
      emailLabel: "Email me",
      cvLabel: "View web CV",
      pdfLabel: "Download CV PDF",
    },
    cv: {
      heading: shared.cvName,
      profileHeading: "Profile",
      profile:
        "Software engineer who designs AI agent platforms and the reliability machinery that keeps them running in production: exactly-once delivery, idempotency, concurrency control, and traceability. I build with explicit boundaries between domain, integration, and infrastructure, and with recovery paths designed in from the start.",
      experienceHeading: "Experience",
      experience: [
        {
          role: "Lead Software Engineer",
          company: "NotoriosTI",
          dates: "August 2025 — present",
          bullets: [
            "First engineering hire. Built the technical platform from scratch and was promoted to Lead as the team grew to three.",
            "Designed the reliability machinery of a multi-agent platform over ERP: transactional outbox with fencing tokens for exactly-once delivery, saga with fingerprint-based recovery over Odoo operations, and two-layer conversation locks.",
            "Backpressure coupled to model quota, with a ~1:1 test-to-code ratio, 40 ADRs, and 15 idempotent migrations.",
            "CI/CD and deployment security: Workload Identity Federation with no long-lived keys, build-once with digest-pinned deploys and signed attestation, and compare-and-swap traffic cutover on Cloud Run with automatic rollback.",
            "MercadoLibre–Odoo middleware: HMAC webhook signature validation, SKU-based product mapping from PostgreSQL, and OAuth token rotation with Secret Manager as the single source of truth.",
          ],
        },
        {
          role: "Junior Software Engineer",
          company: "NotoriosTI",
          dates: "May 2025 — August 2025",
          bullets: [
            "Stood up the company's technical infrastructure from zero: full GCP setup (Cloud Run, Cloud SQL, Secret Manager, BigQuery), Docker pipelines, and deployment strategy.",
            "Built the foundations of the LangGraph multi-agent assistant and odoo-engine, a published Python library encapsulating Odoo integration (JSON-RPC, models, CRUD).",
          ],
        },
      ],
      packagesHeading: "Published packages",
      packages: [
        {
          name: "env-manager",
          registry: "PyPI",
          description:
            "Configuration loader with GCP Secret Manager support, type coercion, and aggregated error validation. Runtime dependency of 20+ repositories.",
          href: "https://github.com/NotoriosTI/env-manager",
        },
        {
          name: "@notoriosti/env-manager",
          registry: "npm",
          description:
            "TypeScript port with ECIES/secp256k1 encrypted dotenv and CLI; dual ESM+CJS build, strict typing.",
          href: "https://github.com/NotoriosTI/env-manager-js",
        },
      ],
      projectsHeading: "Projects",
      projects: [
        {
          title: "Manufacturing operations platform",
          description:
            "Full-stack product: traceable inventory, transactional manufacturing, purchasing, quality, and scrap. Next.js 16 + React 19 + Convex (serializable ACID mutations) on Cloudflare Workers; 120 test files, 1,749 assertions.",
        },
        {
          title: "GroupFit",
          description:
            "Planner that assigns groups to hotels and dates under capacity, availability, and transport constraints, with an explainable partial result. Heuristic with repair plus optional ILP refinement (PuLP/HiGHS).",
        },
        {
          title: "go-agent",
          description:
            "Terminal coding agent in Go, hexagonal architecture: ReAct core isolated from TUI, four model adapters, streaming, cancellation, and confirmation gates for sensitive actions.",
        },
        {
          title: "issue-agent",
          description:
            "LangGraph triage agent: bug reports in Slack → routed GitHub issues with a suggested fix. Cloud Tasks as a database-free debounce buffer, on scale-to-zero Cloud Run with WIF.",
        },
      ],
      educationHeading: "Education",
      degree: "Computer Science and Engineering",
      school: "Universidad Andrés Bello",
      educationDates: "2022 — 2028 (expected)",
      technologiesHeading: "Technologies",
      technologies:
        "Python, TypeScript, SQL/PL-pgSQL, FastAPI, LangGraph, LangChain, React, Next.js, Convex, PostgreSQL, BigQuery, pgvector, Docker, GCP (Cloud Run, Cloud SQL, Secret Manager, Cloud Tasks, WIF), and Cloudflare Workers.",
      languagesHeading: "Languages",
      languages: [
        { language: "Spanish", level: "native" },
        { language: "English", level: "C1, Cambridge FCE (2021)" },
        { language: "German", level: "C1, DSD II (2021)" },
      ],
      downloadLabel: "Download CV PDF",
    },
    notFound: {
      eyebrow: "404 / ROUTE NOT FOUND",
      heading: "This route is not part of the dossier.",
      description: "Return to the systems register or switch to the Spanish site.",
      action: "Back to home",
    },
  },
};

export function projectPath(locale: Locale, project: Project): string {
  return locale === "es"
    ? `/proyectos/${project.slug}`
    : `/en/projects/${project.slug}`;
}

export function alternateProjectPath(locale: Locale, project: Project): string {
  return locale === "es"
    ? `/en/projects/${project.alternateSlug}`
    : `/proyectos/${project.alternateSlug}`;
}
