# Asset manifest

## Approved for v1

| Case | Asset | Public-safe evidence | ES alt text | EN alt text |
| --- | --- | --- | --- | --- |
| ERP operations agent | `assets/erp-operations.svg` | Signed input, durable queue, supervisor/specialists, controlled ERP effects, human review and durable output; no provider, tenant or service identifiers | Flujo abstraído desde mensajería y documentos hacia una cola durable, un supervisor con especialistas, controles humanos, ERP y respuesta registrada. | Abstract flow from messaging and documents through a durable queue, supervisor and specialists, human controls, ERP, and a recorded response. |
| Manufacturing operations platform | `assets/manufacturing-platform.svg` | Operational modules around an immutable inventory ledger and transactional manufacturing; no client name or production data | Plataforma operacional donde compras, calidad y fabricación escriben en un libro mayor de inventario que alimenta ventas y reportes. | Operations platform where purchasing, quality and manufacturing write to an inventory ledger that feeds sales and reporting. |
| GroupFit | `assets/groupfit.svg` | Input validation, greedy schedule, repair, optional ILP refinement and explainable Excel output | Flujo de GroupFit desde archivos de entrada hacia validación, heurística, reparación, optimización matemática y resultados explicables. | GroupFit flow from input files through validation, heuristic scheduling, repair, mathematical optimization, and explainable outputs. |
| go-agent | `assets/go-agent.svg` | Hexagonal boundaries between terminal UI, agent core, tools, providers and persistent sessions | Arquitectura hexagonal de go-agent con interfaz terminal, núcleo del agente, adaptadores de modelos, herramientas y persistencia. | Hexagonal go-agent architecture with a terminal interface, agent core, model adapters, tools, and persistence. |

These SVGs are decorative when the adjacent case-study copy and caption are
present. Implement them with `alt=""` in that context; use the localized alt text
above only when an asset appears without the full explanatory caption.

## Deliberately excluded

- ERP architecture diagrams from the private source repository: they expose the
  tenant, staff channels, internal databases, cloud project names and deployment
  details.
- Manufacturing screenshots: even empty screens contain client-specific product
  identity and production navigation. The abstract diagram communicates the
  engineering decision without disclosure risk.
- Existing GroupFit development screenshots: they contain synthetic school and
  hotel names plus development overlays. A fresh synthetic capture can be added
  later only after removing all overlays and confirming every entity is fictional.
- Terminal screenshots for go-agent: the diagram is stronger evidence of the
  architecture and avoids leaking local paths, prompts or keys.

## Image treatment

- Render diagrams on the graphite canvas without a card shadow or decorative
  frame. A one-pixel structural rule is enough.
- Keep the native `viewBox`; never rasterize below 1200 px wide.
- Captions name the decision shown, not the tool used to draw it.
- No logos, client marks, provider marks, generated photography or fake UI.
