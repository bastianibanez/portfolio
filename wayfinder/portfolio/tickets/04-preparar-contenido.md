---
title: Preparar el contenido bilingüe y los artefactos de proyecto
status: closed
labels:
  - wayfinder:task
parent: ../map.md
assignee: codex
blocked_by:
  - 03-elegir-direccion.md
---

## Question

¿Qué copy final en español e inglés, diagramas, capturas saneadas y metadatos verificables necesita cada página para implementar la dirección elegida con evidencia concreta y sin divulgar información sensible?

## Resolution comment

Se preparó un paquete de contenido bilingüe listo para implementar:

- `../../../content/portfolio-content.md` contiene el copy final de portada,
  proyectos, matriz de evidencia, perfil, trabajo adicional, contacto, SEO y CV
  web en español e inglés.
- `../../../content/asset-manifest.md` define el uso, texto alternativo y límites
  de privacidad de cada artefacto.
- `../../../content/assets/` contiene cuatro diagramas SVG saneados para los casos
  de agente ERP, plataforma de manufactura, GroupFit y go-agent.
- `../../../content/README.md` fija los enlaces públicos verificados y las reglas
  que la implementación no puede contradecir.

La auditoría corrigió dos afirmaciones del prototipo: la plataforma de manufactura
tiene 255 pruebas unitarias en 57 archivos, verificadas el 7 de agosto de 2026,
y tanto GroupFit como go-agent mantienen repositorios privados. Por ello no se
publicarán enlaces de código ni se los describirá como productos públicos u open
source. Los casos privados usarán diagramas abstractos; se descartaron capturas
que pudieran exponer identidad de clientes, datos operacionales, rutas internas o
detalles de despliegue.

GitHub, LinkedIn y las dos librerías públicas env-manager quedaron fijados con
URLs definitivas. Los PDF de CV localizados fuera del repositorio usan un correo
antiguo y no son aptos para `/cv.pdf`; la regeneración bilingüe se graduó como el
nuevo ticket **Regenerar los CV PDF bilingües de una página**.
