---
title: Implementar el portafolio en Astro
status: closed
labels:
  - wayfinder:task
parent: ../map.md
assignee: codex
blocked_by:
  - 03-elegir-direccion.md
  - 04-preparar-contenido.md
  - 08-regenerar-cv.md
---

## Question

¿Cómo convertir el sistema visual y el contenido aprobados en un sitio Astro bilingüe, responsive, mantenible y listo para Cloudflare, preservando semántica, rendimiento y accesibilidad?

## Resolution comment

Se implementó el portafolio completo como sitio estático con Astro 7.2.0:

- `../../../src/data/content.ts` centraliza el contenido tipado en español e
  inglés, incluida la relación entre rutas equivalentes.
- `../../../src/layouts/BaseLayout.astro` y `../../../src/components/` componen
  el rail editorial, navegación móvil, inicio, CV, casos, 404 y metadatos sin
  duplicar estructuras entre idiomas.
- `../../../src/styles/global.css` implementa el Dossier de sistemas responsive
  con IBM Plex local, foco visible, objetivos táctiles de 44 px, contraste dark,
  reduced motion y estilos de impresión.
- `../../../public/` publica los cuatro diagramas saneados, los CV PDF aprobados,
  la tarjeta social, robots y cabeceras de seguridad.
- `../../../wrangler.jsonc` sirve `dist` mediante Workers Static Assets, conserva
  URLs HTML naturales, devuelve el 404 localizado más cercano y no ejecuta un
  Worker para recursos estáticos.

La salida contiene 14 páginas: inicio, CV y cuatro casos en cada idioma, más un
404 localizado por idioma. `/en` redirige a `/en/`; las rutas de CV y casos se
sirven sin extensión. El sitio no incorpora islas ni JavaScript cliente: todo el
contenido principal está presente en el HTML inicial.

`npm run check` terminó con cero errores, advertencias o sugerencias y
`npm run build` generó el artefacto estático. La vista local de Wrangler confirmó
respuesta 200 para todas las rutas y ambos PDF, 307 de `/en` a `/en/`, 404 real
para rutas inexistentes y aplicación de CSP y cabeceras defensivas. También se
comprobó que los 14 documentos tienen el idioma correcto, que todos los enlaces
internos resuelven, que el sitemap excluye los 404, que los PDF publicados son
idénticos a los aprobados y que el bundle no contiene JavaScript cliente.

La auditoría visual y de calidad completa queda deliberadamente en el siguiente
ticket **Verificar accesibilidad, rendimiento, SEO y privacidad**; el despliegue
continúa separado en **Publicar bastianibanez.com en Cloudflare**.
