---
title: Regenerar los CV PDF bilingües de una página
status: closed
labels:
  - wayfinder:task
parent: ../map.md
assignee: codex
blocked_by:
  - 04-preparar-contenido.md
---

## Question

¿Cómo convertir las secciones de CV aprobadas en `content/portfolio-content.md`
en dos PDF de una página —español para `/cv.pdf` e inglés para `/en/cv.pdf`— sin
fotografía, con el email y enlaces definitivos, texto seleccionable, jerarquía
accesible y una composición coherente con el Dossier de sistemas?

## Resolution comment

Se generaron los dos CV A4 de una página desde el contenido bilingüe aprobado:

- `../../../output/pdf/cv.pdf` es el artefacto en español destinado a `/cv.pdf`.
- `../../../output/pdf/en/cv.pdf` es el artefacto en inglés destinado a
  `/en/cv.pdf`.
- `../../../scripts/generate_cv_pdfs.py` conserva una fuente reproducible para
  ambos archivos y descarga IBM Plex desde el repositorio oficial al construir.

La composición aplica el Dossier de sistemas: fondo grafito, jerarquía editorial,
rail de metadatos, reglas estructurales y turquesa reservado a enlaces e
indicadores. No usa fotografía ni expone información privada. Ambos PDF contienen
el email definitivo, GitHub y LinkedIn como enlaces activos; texto seleccionable;
fuentes IBM Plex embebidas; título, autor e idioma del documento; orden lógico de
lectura y marcadores de secciones.

La verificación final confirmó una sola página A4 por idioma, cero recortes o
solapamientos en renders de página completa, cuatro anotaciones de enlace, correo
actualizado sin rastros del anterior y extracción completa de texto. El ticket
**Implementar el portafolio en Astro** puede publicar estos artefactos sin volver
a generarlos.
