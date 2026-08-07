---
title: Publicar bastianibanez.com en Cloudflare
status: closed
labels:
  - wayfinder:task
parent: ../map.md
assignee: codex
blocked_by:
  - 06-verificar-calidad.md
---

## Question

¿Cómo desplegar el artefacto verificado en Cloudflare Workers Static Assets, conectar `bastianibanez.com`, validar HTTPS y redirects, y comprobar el recorrido público completo sin introducir cambios no revisados?

## Resolution comment

El build verificado quedó publicado como el Worker
`bastian-ibanez-portfolio`, versión
`35c771a5-71d7-46ca-8a71-0d9696e7c536`, mediante un Custom Domain en
`https://bastianibanez.com`. La configuración reproducible vive en
`../../../wrangler.jsonc` y `npm run deploy` reconstruye y despliega los assets
estáticos.

- Se retiró únicamente el registro A obsoleto del apex que apuntaba a
  `192.0.2.1`; los demás registros y subdominios de la zona no se modificaron.
- La lista masiva dejó de redirigir el apex a GitHub. `www.bastianibanez.com`
  ahora redirige permanentemente al dominio canónico conservando ruta y query.
- Una regla de zona limitada a los hostnames del portafolio fuerza HTTP a HTTPS;
  se purgaron solamente las URLs antiguas que conservaban respuestas previas.
- El certificado público es válido para el apex y el wildcard. Se comprobaron
  el redirect HTTP → HTTPS, `www` → apex, `/en` → `/en/`, la preservación de
  rutas y query, los 404 reales, los PDF y las cabeceras de seguridad y caché.
- `AUDIT_ORIGIN=https://bastianibanez.com npm run audit:site` recorrió 14 páginas,
  36 combinaciones responsive y 16 enlaces internos sin violaciones Axe, fallos
  de navegación, errores de consola ni solicitudes fallidas.
- Lighthouse en producción obtuvo 100/100/100/100 en rendimiento,
  accesibilidad, buenas prácticas y SEO para inicio ES, inicio EN y el caso ERP;
  midió LCP entre 0,9 y 1,4 s, CLS entre 0,001 y 0,005 y TBT de 0 ms.

Cloudflare Web Analytics no se incorpora en la versión 1: se mantienen cero
scripts cliente y la medición inicial se limita a auditorías técnicas de
producción. Las islas React o rutas dinámicas se evaluarán solamente cuando
exista un requisito interactivo concreto.
