---
title: Refinar el Dossier de sistemas seleccionado
status: closed
labels:
  - wayfinder:prototype
parent: ../map.md
assignee: codex
blocked_by:
  - 02-generar-direcciones-stitch.md
---

## Question

¿Qué correcciones de contenido, jerarquía y detalle necesita el Dossier de sistemas para conservar la composición aprobada, eliminar placeholders y afirmaciones inventadas, usar español como idioma principal y convertirse en la referencia definitiva de implementación?

## Resolution comment

Se refinó en Stitch la dirección **Dossier de sistemas** sin cambiar su composición aprobada: rail lateral persistente, retícula editorial asimétrica, columna de metadatos, narrativa principal y separación mediante reglas estructurales.

La versión definitiva de referencia ahora:

- usa español como idioma principal y conserva `/en/` como destino de la versión inglesa;
- muestra el email real `ibanezmbastian@gmail.com` como acción principal;
- desarrolla los cuatro proyectos verificados: Agente de operaciones ERP con IA, Plataforma operacional para manufactura, GroupFit y go-agent;
- limita la evidencia a hechos confirmados; la auditoría posterior corrigió la cifra de manufactura a 255 pruebas unitarias en 57 archivos y confirmó que GroupFit y go-agent mantienen repositorios privados;
- sustituye versiones, proveedores, porcentajes, cargos y stacks inventados por lenguaje factual;
- incorpora una matriz breve que conecta decisiones de ingeniería con proyectos concretos;
- resuelve las rutas de CV como `/cv` y `/cv.pdf`, y deja GitHub/LinkedIn como texto hasta verificar sus URLs;
- mantiene una adaptación responsive con header móvil compacto.

Artefactos locales de composición:

- `.stitch/designs/02-dossier-sistemas.png`
- `.stitch/designs/02-dossier-sistemas.html`
- `.stitch/metadata.json`

La composición sigue siendo la referencia visual definitiva. El copy y la evidencia
de implementación fueron reemplazados por `content/portfolio-content.md` y
`content/asset-manifest.md` al resolver **Preparar el contenido bilingüe y los
artefactos de proyecto**.

Pantalla refinada en Stitch: `236a5bfc7a4f4122bbfca0d092c511c2`, dentro del proyecto privado **Bastián Ibáñez — Portfolio 2026**. El contenido bilingüe completo, las URLs sociales definitivas y los artefactos saneados de cada caso se resolverán en el ticket 04.
