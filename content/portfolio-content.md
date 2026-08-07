# Final bilingual portfolio copy

The copy below is publication-ready. Bracketed notes are implementation
instructions and must not be rendered.

## Shared identity and links

| Field | Value |
| --- | --- |
| Display name | Bastián Ibáñez |
| CV name | Bastián Ibáñez Martínez |
| Role | Software Engineer · Full-Stack & Applied AI |
| Location ES | Santiago, Chile |
| Location EN | Santiago, Chile |
| Email | `ibanezmbastian@gmail.com` |
| Email href | `mailto:ibanezmbastian@gmail.com` |
| GitHub | `https://github.com/bastianibanez` |
| LinkedIn | `https://www.linkedin.com/in/ibanezbastian` |

---

# Español

## Metadatos globales

- **Título:** Bastián Ibáñez — Software Engineer · Full-Stack & Applied AI
- **Descripción:** Portafolio de Bastián Ibáñez: sistemas full-stack,
  automatización operacional e IA aplicada llevados desde la arquitectura hasta
  producción.
- **Open Graph description:** Casos de ingeniería con evidencia: agentes para
  operaciones ERP, software de manufactura, optimización matemática y tooling en
  Go.

## Navegación

- Proyectos
- Evidencia
- Perfil
- CV
- Contacto
- English

## Portada

### H1

Software Engineer · Full-Stack & Applied AI

### Proposición

Diseño y llevo a producción sistemas full-stack, automatización operacional e IA
aplicada. Trabajo desde la arquitectura y el dominio hasta los flujos de entrega,
observabilidad y recuperación.

### Contexto breve

Con base en Santiago, construyo principalmente con Python, Go y TypeScript. Mi
trabajo reciente conecta agentes, sistemas ERP, productos operacionales y modelos
de optimización con controles explícitos para operar de forma segura.

### Acciones

- **Principal:** Escribirme — `mailto:ibanezmbastian@gmail.com`
- Ver proyectos — `#proyectos`
- Ver CV en la web — `/cv`
- Descargar CV PDF — `/cv.pdf` [habilitar solo cuando exista el PDF regenerado]

## Proyectos seleccionados

### Agente de operaciones ERP con IA

- **Etiqueta:** Trabajo profesional · Caso anonimizado
- **Resumen:** Agente multi-especialista que convierte solicitudes internas en
  consultas y operaciones controladas sobre un ERP y fuentes analíticas.
- **Contribución:** Diseñé la arquitectura del agente, su integración operacional
  y el camino de despliegue en la nube; también dirigí el trabajo técnico del
  equipo que lo opera.
- **Evidencia breve:** Operado en producción · revisión humana para acciones
  sensibles · buffer, outbox, idempotencia y recuperación dirigida.
- **Stack público seguro:** Python, FastAPI, LangGraph, PostgreSQL, ERP RPC,
  BigQuery, Docker, GCP.
- **Ruta:** `/proyectos/agente-operaciones-erp`
- **Enlace externo:** ninguno.

### Plataforma operacional para manufactura

- **Etiqueta:** Trabajo para cliente · Caso anonimizado
- **Resumen:** Producto full-stack para inventario, compras, calidad,
  fabricación, ventas, mermas y reportes, diseñado alrededor de trazabilidad
  transaccional.
- **Contribución:** Diseñé e implementé el producto de extremo a extremo, desde
  el modelo de dominio y la interfaz responsive hasta autenticación, despliegue y
  verificación.
- **Evidencia breve:** Entregada y desplegada · 255 pruebas unitarias en 57
  archivos, verificadas el 7 de agosto de 2026 · suite E2E para los flujos
  operacionales principales.
- **Stack público seguro:** Next.js, React, TypeScript, Convex, Clerk, Vitest,
  Playwright, Cloudflare Workers.
- **Ruta:** `/proyectos/plataforma-manufactura`
- **Enlace externo:** ninguno.

### GroupFit

- **Etiqueta:** Producto propio · Repositorio privado
- **Resumen:** Planificador que asigna grupos a hoteles y fechas bajo restricciones
  de capacidad, disponibilidad y transporte, y explica qué no pudo asignar.
- **Contribución:** Construí el solver, la API y la interfaz del planificador como
  un sistema end-to-end con límites claros entre dominio, optimización y E/S.
- **Evidencia breve:** Heurística con reparación + refinamiento ILP opcional ·
  entrada y salida Excel/JSON · resultado parcial explicable ante restricciones
  incompatibles.
- **Stack público seguro:** Python, FastAPI, Pydantic, PuLP/HiGHS, Next.js,
  TypeScript, Docker.
- **Ruta:** `/proyectos/groupfit`
- **Enlace externo:** ninguno mientras el repositorio siga privado.

### go-agent

- **Etiqueta:** Proyecto propio · Repositorio privado
- **Resumen:** Agente de programación para terminal escrito en Go, con proveedores
  de modelos intercambiables y controles explícitos sobre las herramientas.
- **Contribución:** Diseñé una arquitectura hexagonal que separa el núcleo ReAct,
  la TUI, los proveedores, las herramientas y la persistencia de conversaciones.
- **Evidencia breve:** Cuatro adaptadores de modelos · streaming y cancelación ·
  política de confirmación para acciones sensibles · suite Go verificada el 7 de
  agosto de 2026.
- **Stack público seguro:** Go, Bubble Tea, SQLite, APIs de modelos, herramientas
  de sistema.
- **Ruta:** `/proyectos/go-agent`
- **Enlace externo:** ninguno mientras el repositorio siga privado.

## Evidencia de ingeniería

| Decisión | Por qué importa | Evidencia |
| --- | --- | --- |
| Efectos externos idempotentes y salida durable | Los reintentos no deben duplicar operaciones ni perder respuestas. | Agente de operaciones ERP con IA |
| Revisión humana en el borde sensible | La autonomía no sustituye la autorización cuando una acción cambia el negocio. | Agente de operaciones ERP con IA |
| Libro mayor inmutable con mutaciones transaccionales | Inventario y fabricación deben conservar trazabilidad y evitar stock negativo por carreras. | Plataforma operacional para manufactura |
| Solver puro con resultado explicable | Una entrada sobre-restringida debe producir orientación útil, no un fallo opaco. | GroupFit |
| Puertos y adaptadores | Proveedores, herramientas y almacenamiento pueden cambiar sin contaminar el núcleo. | go-agent |
| Gates automatizados antes de desplegar | La entrega incluye pruebas y verificación, no solo implementación. | Manufactura, GroupFit y go-agent |

## Perfil

Soy ingeniero de software enfocado en sistemas full-stack, automatización
operacional e IA aplicada. Me interesa el trabajo donde un modelo o algoritmo
debe convivir con estado real, permisos, fallos parciales y personas que necesitan
entender qué ocurrió.

Actualmente trabajo en automatización para operaciones de comercio electrónico y
curso Ingeniería Civil en Informática en la Universidad Andrés Bello. Hablo
español y cuento con certificaciones C1 de inglés y alemán.

### Capacidades

- Arquitectura y entrega de productos full-stack.
- Agentes, workflows durables e integración con sistemas operacionales.
- APIs y servicios en Python y Go.
- Interfaces en TypeScript y React.
- Modelado de dominio, pruebas automatizadas y despliegue en nube.

## Trabajo adicional

### env-manager para Python y TypeScript

Dos librerías públicas que unifican configuración local y Google Cloud Secret
Manager mediante YAML declarativo, coerción de tipos, validación, entornos y
enmascarado de secretos.

- Python — `https://github.com/NotoriosTI/env-manager`
- TypeScript — `https://github.com/NotoriosTI/env-manager-js`

### Sitio industrial B2B

Entrega freelance anonimizada: arquitectura y desarrollo de un sitio corporativo
responsive con rutas SEO data-driven y un flujo de contacto protegido contra
abuso. Sin enlace ni identidad del cliente en este portafolio.

## CV y contacto

¿Tienes un problema donde software, operaciones e IA se encuentran? Escríbeme a
`ibanezmbastian@gmail.com`.

- Ver CV en la web — `/cv`
- Descargar CV PDF — `/cv.pdf` [habilitar después de regenerarlo]
- GitHub — `https://github.com/bastianibanez`
- LinkedIn — `https://www.linkedin.com/in/ibanezbastian`

## CV web — `/cv`

### Bastián Ibáñez Martínez

Software Engineer · Full-Stack & Applied AI — Santiago, Chile —
`ibanezmbastian@gmail.com`

#### Perfil

Ingeniero de software enfocado en productos full-stack, automatización operacional
e IA aplicada. Diseño sistemas que conectan modelos, datos y operaciones reales
con límites explícitos, trazabilidad y caminos de recuperación.

#### Experiencia

**Lead Software Engineer — NotoriosTI**<br>
Agosto de 2025 — actualidad

- Lidero un equipo de tres ingenieros que desarrolla automatización con IA para
  operaciones de comercio electrónico.
- Definí la arquitectura y operación en nube de un agente multi-especialista para
  producción, compras y análisis sobre datos de ERP.
- Diseñé integraciones y servicios para eventos de marketplaces, monitoreo
  operacional y configuración segura entre entornos.

**Junior Software Engineer — NotoriosTI**<br>
Mayo de 2025 — agosto de 2025

- Construí las bases del agente operacional y la integración con mensajería y ERP.
- Configuré infraestructura en GCP para servicios, datos, secretos y despliegues
  en contenedores.

#### Proyectos

- **Plataforma operacional para manufactura:** producto full-stack entregado y
  desplegado; inventario trazable, fabricación transaccional y flujos E2E.
- **GroupFit:** solver híbrido para asignación de grupos bajo restricciones, con
  salida Excel/JSON y explicaciones para casos no asignados.
- **go-agent:** agente de terminal en Go con arquitectura hexagonal, cuatro
  proveedores, herramientas controladas y persistencia.

#### Educación

**Ingeniería Civil en Informática — Universidad Andrés Bello**<br>
2022 — 2027 (esperado)

#### Tecnologías

Python, Go, TypeScript, FastAPI, LangGraph, React, Next.js, PostgreSQL, BigQuery,
Docker, GCP y Cloudflare.

#### Idiomas

- Español — nativo
- Inglés — C1, Cambridge FCE (2021)
- Alemán — C1, DSD II (2021)

## Footer

Bastián Ibáñez · Santiago, Chile · GitHub · LinkedIn · English

---

# English

## Global metadata

- **Title:** Bastián Ibáñez — Software Engineer · Full-Stack & Applied AI
- **Description:** Bastián Ibáñez's portfolio: full-stack systems, operational
  automation, and applied AI taken from architecture through production.
- **Open Graph description:** Evidence-led engineering cases spanning ERP
  operations agents, manufacturing software, mathematical optimization, and Go
  tooling.

## Navigation

- Projects
- Evidence
- Profile
- CV
- Contact
- Español

## Hero

### H1

Software Engineer · Full-Stack & Applied AI

### Proposition

I design and ship full-stack systems, operational automation, and applied AI. I
work from architecture and domain boundaries through delivery, observability,
and recovery flows.

### Short context

Based in Santiago, I build primarily with Python, Go, and TypeScript. My recent
work connects agents, ERP systems, operations products, and optimization models
with explicit controls for safe operation.

### Actions

- **Primary:** Email me — `mailto:ibanezmbastian@gmail.com`
- View projects — `#projects`
- View web CV — `/en/cv`
- Download CV PDF — `/en/cv.pdf` [enable only after the PDF is regenerated]

## Selected projects

### AI agent for ERP operations

- **Label:** Professional work · Anonymized case study
- **Summary:** A multi-specialist agent that turns internal requests into
  controlled queries and operations across an ERP and analytical sources.
- **Contribution:** I designed the agent architecture, operational integration,
  and cloud delivery path, and led the technical work of the team operating it.
- **Evidence:** Operated in production · human review for sensitive actions ·
  buffering, outbox delivery, idempotency, and targeted recovery.
- **Public-safe stack:** Python, FastAPI, LangGraph, PostgreSQL, ERP RPC,
  BigQuery, Docker, GCP.
- **Route:** `/en/projects/erp-operations-agent`
- **External link:** none.

### Manufacturing operations platform

- **Label:** Client work · Anonymized case study
- **Summary:** A full-stack product for inventory, purchasing, quality,
  manufacturing, sales, waste, and reporting, built around transactional
  traceability.
- **Contribution:** I designed and implemented the product end to end, from the
  domain model and responsive interface to authentication, delivery, and
  verification.
- **Evidence:** Delivered and deployed · 255 unit tests across 57 files, verified
  on August 7, 2026 · E2E coverage for the main operational flows.
- **Public-safe stack:** Next.js, React, TypeScript, Convex, Clerk, Vitest,
  Playwright, Cloudflare Workers.
- **Route:** `/en/projects/manufacturing-platform`
- **External link:** none.

### GroupFit

- **Label:** Independent product · Private repository
- **Summary:** A planner that assigns groups to hotels and dates under capacity,
  availability, and transport constraints, and explains what it could not place.
- **Contribution:** I built the solver, API, and planner interface as an end-to-end
  system with clear boundaries between domain logic, optimization, and I/O.
- **Evidence:** Heuristic scheduling with repair + optional ILP refinement ·
  Excel/JSON input and output · explainable partial results when constraints
  conflict.
- **Public-safe stack:** Python, FastAPI, Pydantic, PuLP/HiGHS, Next.js,
  TypeScript, Docker.
- **Route:** `/en/projects/groupfit`
- **External link:** none while the repository remains private.

### go-agent

- **Label:** Independent project · Private repository
- **Summary:** A terminal coding agent written in Go, with interchangeable model
  providers and explicit controls around tool execution.
- **Contribution:** I designed a hexagonal architecture that separates the ReAct
  core, TUI, providers, tools, and conversation persistence.
- **Evidence:** Four model adapters · streaming and cancellation · confirmation
  policy for sensitive actions · Go test suite verified on August 7, 2026.
- **Public-safe stack:** Go, Bubble Tea, SQLite, model APIs, system tools.
- **Route:** `/en/projects/go-agent`
- **External link:** none while the repository remains private.

## Engineering evidence

| Decision | Why it matters | Evidence |
| --- | --- | --- |
| Idempotent external effects and durable output | Retries must not duplicate operations or lose replies. | AI agent for ERP operations |
| Human review at the sensitive boundary | Autonomy does not replace authorization when an action changes the business. | AI agent for ERP operations |
| Immutable ledger with transactional mutations | Inventory and manufacturing need traceability and protection from race-driven negative stock. | Manufacturing operations platform |
| Pure solver with explainable output | Over-constrained input should produce useful guidance rather than an opaque failure. | GroupFit |
| Ports and adapters | Providers, tools, and storage can change without contaminating the core. | go-agent |
| Automated gates before deployment | Delivery includes tests and verification, not implementation alone. | Manufacturing, GroupFit, and go-agent |

## Profile

I am a software engineer focused on full-stack systems, operational automation,
and applied AI. I am drawn to work where a model or algorithm must coexist with
real state, permissions, partial failure, and people who need to understand what
happened.

I currently work on automation for e-commerce operations while studying Computer
Science and Engineering at Universidad Andrés Bello. I speak Spanish and hold C1
certifications in English and German.

### Capabilities

- Full-stack product architecture and delivery.
- Agents, durable workflows, and operational-system integration.
- APIs and services in Python and Go.
- Interfaces in TypeScript and React.
- Domain modeling, automated testing, and cloud delivery.

## Additional work

### env-manager for Python and TypeScript

Two public libraries that unify local configuration and Google Cloud Secret
Manager through declarative YAML, type coercion, validation, environments, and
secret masking.

- Python — `https://github.com/NotoriosTI/env-manager`
- TypeScript — `https://github.com/NotoriosTI/env-manager-js`

### Industrial B2B website

An anonymized freelance delivery: architecture and implementation of a responsive
corporate website with data-driven SEO routes and an abuse-resistant contact
flow. No client identity or link is published in this portfolio.

## CV and contact

Working on a problem where software, operations, and AI meet? Email me at
`ibanezmbastian@gmail.com`.

- View web CV — `/en/cv`
- Download CV PDF — `/en/cv.pdf` [enable after regeneration]
- GitHub — `https://github.com/bastianibanez`
- LinkedIn — `https://www.linkedin.com/in/ibanezbastian`

## Web CV — `/en/cv`

### Bastián Ibáñez Martínez

Software Engineer · Full-Stack & Applied AI — Santiago, Chile —
`ibanezmbastian@gmail.com`

#### Profile

Software engineer focused on full-stack products, operational automation, and
applied AI. I design systems that connect models, data, and real operations with
explicit boundaries, traceability, and recovery paths.

#### Experience

**Lead Software Engineer — NotoriosTI**<br>
August 2025 — present

- Lead a three-engineer team building AI-powered automation for e-commerce
  operations.
- Defined the architecture and cloud operation of a multi-specialist agent for
  production, purchasing, and analysis over ERP data.
- Designed integrations and services for marketplace events, operational
  monitoring, and secure configuration across environments.

**Junior Software Engineer — NotoriosTI**<br>
May 2025 — August 2025

- Built the foundations of the operations agent and its messaging and ERP
  integration.
- Configured GCP infrastructure for services, data, secrets, and container
  delivery.

#### Projects

- **Manufacturing operations platform:** delivered and deployed full-stack
  product with traceable inventory, transactional manufacturing, and E2E flows.
- **GroupFit:** hybrid constrained-assignment solver with Excel/JSON output and
  explanations for unplaced cases.
- **go-agent:** terminal agent in Go with hexagonal architecture, four providers,
  controlled tools, and persistence.

#### Education

**Computer Science and Engineering — Universidad Andrés Bello**<br>
2022 — 2027 (expected)

#### Technologies

Python, Go, TypeScript, FastAPI, LangGraph, React, Next.js, PostgreSQL, BigQuery,
Docker, GCP, and Cloudflare.

#### Languages

- Spanish — native
- English — C1, Cambridge FCE (2021)
- German — C1, DSD II (2021)

## Footer

Bastián Ibáñez · Santiago, Chile · GitHub · LinkedIn · Español
