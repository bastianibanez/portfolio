# Registro de decisiones del CI/CD

Fecha de implementación: 7 de agosto de 2026  
Repositorio: `bastianibanez/portfolio`  
Plataformas: GitHub Actions y Cloudflare Workers

## Objetivo

Implementar un CI/CD pequeño, rápido y barato para un portafolio estático, con estas garantías:

- Todo pull request debe aprobar un chequeo básico y un build antes de poder fusionarse.
- Cada pull request interno obtiene un preview de Cloudflare, pero una falla del preview no bloquea el merge.
- Producción reutiliza exactamente el build revisado en el pull request; no vuelve a ejecutar CI ni build.
- Los previews y artefactos temporales se eliminan cuando dejan de ser útiles.
- Debe existir una recuperación manual si el artefacto expira antes del despliegue.

## Arquitectura final

```text
Pull request
  └─ CI (obligatorio)
      └─ Build (obligatorio)
          ├─ artifact: site-pr-<PR>-<HEAD_SHA>, 7 días
          └─ Preview (opcional)
              ├─ Worker efímero por PR
              ├─ URL en el summary y logs
              └─ comentario único y actualizable en el PR

Merge a main
  └─ resolver PR y HEAD_SHA revisado
      └─ descargar el artifact exacto
          ├─ desplegarlo a producción sin rebuild
          ├─ eliminar el Worker de preview
          └─ eliminar artifacts consumidos

PR cerrado sin merge
  └─ eliminar preview y artifacts

Artifact ausente o expirado
  └─ workflow_dispatch para reconstruir el SHA exacto, retención 1 día
```

## Decisiones tomadas

### 1. Repositorio público

Se hizo público el repositorio para usar protección de rama y checks obligatorios sin depender de las limitaciones aplicables a repositorios privados del plan disponible. La cuenta GitHub Student no se tomó como garantía suficiente para el comportamiento requerido.

Consecuencia: el código y el historial quedan públicamente visibles. Ningún secreto vive en el repositorio.

### 2. Protección de `main`

La rama `main` exige pull request y los checks exactos `CI` y `Build`, con rama actualizada antes de merge (`strict`) y aplicación también para administradores. No se exige aprobación humana porque es un portafolio personal.

`Preview` no es obligatorio. Una indisponibilidad de Cloudflare no debe bloquear la entrega de código que ya pasó validación y compilación.

### 3. CI deliberadamente básico

El chequeo obligatorio ejecuta solamente:

```text
npm ci --prefer-offline --no-audit --no-fund
npm run check
```

No se agregaron Lighthouse, auditoría de dependencias, pruebas end-to-end ni análisis pesados. El objetivo es detectar rápidamente errores de Astro y TypeScript sin gastar minutos de runner en controles que no eran necesarios para este portafolio.

### 4. CI y Build como jobs separados

`Build` depende de `CI`; por tanto, nunca se compila código que ya falló el chequeo básico. Los dos aparecen como checks independientes y obligatorios en la protección de rama.

Tradeoff: cada job usa un runner distinto y ejecuta `npm ci`, por lo que hay instalación duplicada. Mantuvimos la separación porque expresa el orden solicitado, entrega estados de merge claros y evita producir artifacts cuando CI está rojo. El caché npm reduce, pero no elimina, este costo.

### 5. Artifact inmutable identificado por PR y SHA

El build genera `dist/` una sola vez y lo guarda como:

```text
site-pr-<PR_NUMBER>-<PR_HEAD_SHA>
```

Producción busca un artifact no expirado cuyo `workflow_run.head_sha` coincida con el SHA revisado. El nombre por sí solo no se considera suficiente.

Esta decisión evita desplegar accidentalmente un build antiguo de otro commit y garantiza que producción recibe los mismos archivos que alimentaron el preview.

### 6. Retención de artifacts de siete días

El artifact normal se conserva hasta siete días. Es una ventana suficientemente amplia para revisar o fusionar un PR sin acumular almacenamiento indefinidamente.

- Tras un despliegue exitoso, el artifact consumido se elimina inmediatamente.
- Al cerrar un PR sin merge, sus artifacts se eliminan.
- Si producción falla, no se ejecutan los pasos posteriores y el artifact permanece disponible para reintento.

### 7. Recuperación manual con vida máxima de 24 horas

El workflow `Rebuild artifact` recibe un número de PR, resuelve su SHA exacto, vuelve a ejecutar check y build, y crea el mismo artifact con retención de un día.

No despliega automáticamente. Después de reconstruir, se reintenta el workflow fallido de producción. Esto mantiene explícita la recuperación y evita que un dispatch arbitrario publique código.

### 8. Un Cloudflare Worker efímero por PR

Cada PR interno usa un Worker llamado:

```text
bastian-ibanez-portfolio-pr-<PR_NUMBER>
```

Se eligió un Worker independiente por PR, en vez de una versión de preview dentro del Worker de producción, porque permite una URL estable por PR y una eliminación real y simple al cerrar o fusionar.

### 9. “Promoción” lógica, no promoción nativa de una versión

Producción no promociona internamente una versión del Worker de preview. Preview y producción son Workers distintos. Lo que se promociona es el artifact `dist/` exacto que ya fue construido y revisado.

Esta es la equivalencia práctica solicitada: no hay segundo build y no cambia el contenido estático entre preview y producción. La desventaja es que Cloudflare crea una nueva versión del Worker de producción durante el deploy.

### 10. Preview solo para ramas del mismo repositorio

Los pull requests desde forks ejecutan `CI` y `Build`, pero no despliegan preview. Los secretos de Actions no se entregan a código no confiable de un fork.

Es una frontera de seguridad deliberada, no una limitación accidental.

### 11. Falla de preview no bloqueante

El job `Preview` usa `continue-on-error`. Su URL es una ayuda de revisión, no una condición de integridad del código.

CI y Build siguen siendo estrictos. Si falla la creación del preview, el PR puede fusionarse cuando los dos checks requeridos están verdes.

### 12. URL visible en tres lugares

Después de un despliegue exitoso, la URL aparece en:

- Los logs del step de Wrangler.
- El summary de la ejecución.
- Un comentario de `github-actions[bot]` en el pull request.

El comentario contiene el marcador invisible `<!-- cloudflare-preview -->`. El workflow busca ese marcador y actualiza el comentario existente, en lugar de publicar uno nuevo en cada commit.

### 13. Sin CI ni build después del merge

El push a `main` resuelve el pull request asociado al commit fusionado, extrae el `head.sha` revisado y descarga su artifact. Solo valida que exista `dist/index.html` y lo despliega.

Un push a `main` que no se pueda asociar a un PR fusionado falla de forma explícita. Esto evita despliegues que eludan el flujo revisado.

### 14. Serialización y control de carreras

Solo puede haber un despliegue de producción activo mediante el grupo de concurrencia `production`.

Preview, despliegue y cleanup de un mismo PR comparten `preview-pr-<PR_NUMBER>`. Producción o cleanup pueden cancelar un preview en curso. Esto evita la carrera en la que un preview termina de crearse después de haber sido eliminado.

Los eventos nuevos de un mismo PR cancelan CI/CD obsoleto mediante `pr-<PR_NUMBER>`.

### 15. Cleanup estricto

Después de producción exitosa:

1. Se elimina el Worker de preview.
2. Se eliminan todos los artifacts con el nombre consumido.

Al cerrar sin merge se hace lo mismo. La ausencia previa del Worker se trata como éxito idempotente; otros errores de Cloudflare se propagan. La eliminación de artifacts usa `if: always()` en el cierre abandonado para que un problema con el Worker no deje también artifacts retenidos.

Si producción falla antes del cleanup, se conservan preview y artifact para diagnóstico y reintento.

### 16. Cachés y optimizaciones

Se activó el caché npm de `actions/setup-node` en CI, Build, Preview, producción y cleanup. Las instalaciones usan `--prefer-offline`, y se omiten `audit` y mensajes de financiación dentro del pipeline.

Wrangler se fija en la versión `4.120.0` y se ejecuta con `npx`. El caché npm evita volver a descargar el paquete completo en cada job. Cloudflare también evita subir assets que ya existen: en la validación observada reportó `No updated asset files to upload`.

No se cachea `dist/` con un caché mutable: se usa un artifact inmutable, auditable y descargable entre ejecuciones. Esta distinción es importante para seguridad y reproducibilidad.

### 17. Versiones reproducibles y permisos mínimos

- Node está fijado en `22.12.0`.
- Wrangler está fijado en `4.120.0`.
- Las GitHub Actions de terceros están fijadas por SHA completo, con la versión legible en un comentario.
- El token activo de Cloudflare está limitado a escritura de Workers en la cuenta.
- `CLOUDFLARE_API_TOKEN` es un secret de Actions.
- `CLOUDFLARE_ACCOUNT_ID` es una variable del repositorio.
- Los workflows declaran permisos GitHub mínimos por caso.

Durante la configuración, un token inicial apareció en la salida de una herramienta. Fue revocado inmediatamente y reemplazado. El token activo no se imprimió ni se guardó en archivos del repositorio.

### 18. Límites de tiempo

Todos los jobs tienen `timeout-minutes` bajos, entre tres y diez minutos. Esto limita consumo y evita runners colgados:

- Resolver PR: 3 minutos.
- CI y Build: 5 minutos cada uno.
- Preview y cleanup: 8 minutos.
- Producción y recuperación: 10 minutos.

## Resultados medidos

La ejecución final validada fue GitHub Actions run `31218199167`, para el SHA `d991692c037548c94749bf23996f7a14e4357144`:

| Etapa               | Resultado | Duración |
| ------------------- | --------- | -------: |
| CI                  | Correcto  |     23 s |
| Build               | Correcto  |     21 s |
| Preview             | Correcto  |     32 s |
| Endpoint de preview | HTTP 200  |        — |

El artifact exacto se creó con expiración de siete días. El comentario del PR se creó una vez y, en la siguiente ejecución, conservó el mismo ID y cambió su fecha de actualización. Esto comprobó que el mecanismo es idempotente.

La protección de `main` se verificó con `CI` y `Build` como checks obligatorios. El PR quedó `MERGEABLE` y `CLEAN` con todos los checks verdes.

## Qué fue efectivo

- La cadena CI → Build → Preview respetó el orden previsto.
- La separación de checks entregó señales claras y permitió proteger `main` exactamente con CI y Build.
- El artifact quedó vinculado al SHA correcto y fue consumido por el preview sin volver a compilar.
- El preview efímero quedó accesible y actualizable bajo una URL estable por PR.
- El comentario idempotente evitó spam en el pull request.
- La concurrencia compartida cerró la carrera entre deploy de preview y cleanup.
- Los forks quedan cubiertos por validación sin exponer credenciales.
- La acción manual permite recuperar un artifact expirado sin cambiar el commit desplegado.
- Los SHA fijos, permisos mínimos y rotación del token redujeron riesgo de supply chain y credenciales.

## Qué no funcionó o tuvo costo

### Primera ejecución lenta de Preview

Antes de restaurar el caché npm en el job de Preview, `npx` tardó aproximadamente 62 segundos descargando Wrangler y el job completo demoró cerca de 1 minuto 20 segundos.

Después de agregar caché, Preview bajó a 32 segundos. El caché restaurado medía aproximadamente 142 MB y su restauración tomó cerca de 10 segundos. Es un ahorro neto para la ejecución observada, aunque no es gratuito.

### Warning de `tsconfig` durante Preview

Wrangler mostró `Cannot find base config file "astro/tsconfigs/strict"` porque el job descarga `dist/` y la configuración, pero no instala `node_modules` completo. El despliegue estático terminó correctamente y el endpoint respondió HTTP 200.

Decidimos aceptar este warning antes que ejecutar otro `npm ci` completo solo para silenciarlo. Si el warning se vuelve error en una futura versión de Wrangler, se deberá reevaluar esta decisión.

### Instalación duplicada entre CI y Build

La claridad y protección independiente cuestan un segundo runner y un segundo `npm ci`. Para este proyecto, las duraciones de 23 y 21 segundos siguen siendo pequeñas. Si el proyecto crece, se puede valorar un único job obligatorio o compartir dependencias, teniendo cuidado de no convertir `node_modules` en un artifact inseguro o dependiente del entorno.

### Producción todavía no ejecutada en vivo

El flujo de producción pasó validación de sintaxis, `actionlint`, dry-run de Wrangler y revisión de resolución del artifact, pero no se desplegó realmente porque el PR aún no se ha fusionado. La primera fusión es la prueba end-to-end pendiente de deploy, eliminación de preview y eliminación del artifact.

No debe declararse esa parte como comprobada hasta observar una ejecución exitosa de `Production`.

## Dónde se ahorran recursos

| Decisión                                | Ahorro o beneficio                                                   |
| --------------------------------------- | -------------------------------------------------------------------- |
| No ejecutar CI/build al merge           | Evita repetir dos etapas que ya pasaron sobre el mismo SHA.          |
| Reutilizar `dist/` como artifact        | Mantiene igualdad entre lo revisado y lo desplegado.                 |
| Caché npm                               | Reduce descargas en `npm ci` y, especialmente, en `npx wrangler`.    |
| `--prefer-offline --no-audit --no-fund` | Reduce tráfico y trabajo accesorio en instalaciones de CI.           |
| Cancelar ejecuciones obsoletas del PR   | No termina pipelines de commits que ya fueron reemplazados.          |
| Preview no obligatorio                  | Una falla externa no fuerza reejecutar CI/Build para poder fusionar. |
| No desplegar previews de forks          | Evita runners de deploy y protege secretos.                          |
| Cloudflare omite assets sin cambios     | Reduce transferencia y tiempo de upload.                             |
| Cleanup inmediato                       | Reduce almacenamiento de artifacts y cantidad de Workers efímeros.   |
| Retención limitada                      | Evita acumulación si un evento de cleanup no llega a ejecutarse.     |
| Timeouts cortos                         | Acota el gasto máximo ante bloqueos.                                 |
| Sin Lighthouse/E2E/audit en cada PR     | Conserva el pipeline enfocado en errores que bloquean compilación.   |

## Archivos que implementan el diseño

- `.github/workflows/pull-request.yml`: CI, Build, artifact, preview y comentario.
- `.github/workflows/production.yml`: deploy sin rebuild y cleanup.
- `.github/workflows/rebuild-artifact.yml`: recuperación manual por PR y SHA.
- `wrangler.preview.jsonc`: Worker efímero de assets estáticos.
- `wrangler.jsonc`: Worker y dominio de producción.

## Operación y diagnóstico

### Si falla CI o Build

Corregir el commit del PR. No se crea ni actualiza el preview cuando Build falla.

### Si falla Preview

Revisar el job opcional. El merge puede continuar si CI y Build están verdes. Un nuevo commit o `Re-run failed jobs` vuelve a intentar el deploy.

### Si producción no encuentra el artifact

1. Ejecutar `Rebuild artifact` desde GitHub Actions.
2. Ingresar el número del PR fusionado.
3. Esperar que reconstruya el SHA exacto.
4. Reintentar el workflow de producción antes de 24 horas.

### Si producción falla durante Cloudflare

No eliminar manualmente el artifact ni el preview antes de diagnosticar. Ambos se conservan porque el cleanup ocurre solo después del deploy exitoso. Corregir credenciales o disponibilidad y reintentar el job.

### Si queda un preview huérfano

Reintentar el workflow `Production` o el evento de cleanup correspondiente. El delete es idempotente cuando el Worker ya no existe.

## Criterios para reevaluar el diseño

Revisar estas decisiones si ocurre alguno de los siguientes cambios:

- CI o Build superan de forma habitual los dos minutos.
- El caché npm cuesta más tiempo de transferencia que una descarga limpia.
- Wrangler convierte el warning de `tsconfig` en error.
- El portafolio incorpora backend, migraciones o datos con estado.
- Se necesitan previews seguros para forks externos.
- Se requiere rollback atómico nativo entre versiones de Cloudflare.
- La retención de siete días resulta insuficiente para el ritmo real de revisión.

En esos casos convendría evaluar instalación local fija de Wrangler, artifacts con procedencia firmada, ambientes protegidos de GitHub, promoción nativa de versiones o una plataforma de preview con aislamiento específico para contribuciones externas.
