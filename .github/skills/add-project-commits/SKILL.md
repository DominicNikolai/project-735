---
name: add-project-commits
description: Applies the project's standard numbered setup changes and creates a separate git commit for each change using the existing git adco commands.
---

# Preparar commits numerados del proyecto

Lee `AGENTS.md` y las instrucciones del proyecto antes de empezar. Trabaja únicamente dentro del workspace.

## Reglas

- Ejecuta cada paso por separado, en el orden indicado. No combines pasos ni omitas commits para ahorrar tiempo.
- Los comandos `git adco`, `git adco2` … `git adco9` ya existen: ejecútalos cuando corresponda; no los crees ni los reemplaces.
- Antes de cada commit, confirma que el único cambio pendiente corresponde al archivo de ese paso. No incluyas cambios preexistentes o ajenos.
- Si hay cambios pendientes que el comando de commit podría incluir y no puedes aislarlos con seguridad, detente y solicita indicaciones.
- No inventes ni fuerces cambios cuando el archivo, el texto esperado o la estructura del proyecto no coincidan con lo descrito. Informa la diferencia y solicita indicaciones.

## Valores

- `{NUM}` es el nombre numérico del directorio raíz actual del proyecto.
- `{PREV}` es `{NUM} - 1`.
- `{NEXT}` es `{NUM} + 1`.
- Si el nombre del directorio no es numérico o no identifica claramente el proyecto, detente y pregunta; no deduzcas el número de otra fuente.

## Pasos

1. Obtén `{NUM}` del nombre del directorio raíz actual y calcula `{PREV}` y `{NEXT}`.
2. Si no existe `.git` en la raíz, ejecuta `git init`. No ejecutes ningún `git adco` para este paso.
3. Revisa `src/components/Hero.astro` y ejecuta `git adco` para crear el commit de Hero (v0.0.1).
4. En el `Layout.astro` del proyecto, cambia `<title>Project</title>` a `<title>Project {NUM}</title>` y ejecuta `git adco2`.
5. Si existe `global.css` en la raíz, formatéalo de acuerdo con el estilo o formatter ya usado por el proyecto, guarda el cambio y ejecuta `git adco3`. Si no existe, omite este paso sin crear el archivo ni ejecutar el comando.
6. En `astro.config.mjs`, reemplaza las dos apariciones configuradas de `project-239` por `project-{NUM}`: la del `site` y la del `base` de producción. Verifica ambas y ejecuta `git adco4`.
7. En la primera línea de `README.md`, actualiza a `{NUM}` tanto el nombre `project-XXX.avif` de la imagen de preview como el destino del enlace de despliegue, y ejecuta `git adco5`.
8. En el enlace izquierdo de `README.md`, identificado por `&#8592;`, cambia `project-XXX` a `project-{PREV}` y ejecuta `git adco6`.
9. En el enlace derecho de `README.md`, identificado por `&#8594;`, cambia `project-XXX` a `project-{NEXT}` y ejecuta `git adco7`.
10. Al final del `Layout.astro`, elimina el `<style></style>` vacío y el bloque `<script>` comentado, si ambos coinciden con lo descrito. Ejecuta `git adco8`.
11. Si el `.gitignore` de la raíz no contiene `.opencode/*`, agrega esa línea y ejecuta `git adco9`. Si ya está presente, omite el paso sin cambiar el archivo ni ejecutar el comando.

## Comprobación

Después de cada comando `git adco`, confirma que se creó el commit esperado antes de avanzar. Al terminar, revisa el estado de Git y resume los commits creados y cualquier paso omitido o bloqueado.
