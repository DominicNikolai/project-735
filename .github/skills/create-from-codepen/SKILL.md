---
name: create-from-codepen
description: Fetches a CodePen and consolidates its HTML, CSS, and JavaScript into src/components/Hero.astro. Use when asked to convert a CodePen into the project's Astro hero component.
---

# Convertir un CodePen a Hero.astro

Lee `AGENTS.md` y las instrucciones de Copilot del proyecto antes de empezar. Trabaja únicamente dentro del workspace.

## Obtener el código del Pen

1. Recibe la URL del CodePen. Convierte `/full/` o `/live/` en `/pen/`.
2. Obtén el HTML del Pen con una herramienta de navegación web disponible. CodePen puede devolver 403; prueba entonces `https://cdpn.io/{user}/fullpage/{id}` si la herramienta puede acceder a esa URL.
3. Extrae del objeto `__item` los campos `html_pre_processor`, `css_pre_processor`, `js_pre_processor`, `resources`, `html`, `css` y `js`. El contenido del atributo puede tener entidades HTML y escapes; decodifícalo antes de parsear el JSON.
4. Si no hay una herramienta web disponible o no se puede obtener el Pen, informa el bloqueo y solicita al usuario el HTML/CSS/JS o un volcado de `__item`. No afirmes que se obtuvo el código.

Usa Node.js con módulos ESM para cualquier script auxiliar. Si creas archivos temporales, guárdalos dentro del proyecto y elimínalos al terminar.

## Elegir el flujo

El flujo rápido aplica cuando todos los preprocesadores son `none`, no hay recursos externos y el JavaScript está vacío o es trivial. En los demás casos, convierte los preprocesadores, resuelve los recursos y conserva el comportamiento relevante del Pen.

### Flujo rápido

1. Convierte directamente el HTML, CSS y JavaScript en `src/components/Hero.astro`.
2. No añadas pasos, dependencias ni abstracciones que no hagan falta para ese Pen.

### Convertir preprocesadores y recursos

- Haml: convierte la indentación en anidación HTML. Convierte los bucles como `- (1..N).each do` a `Array.from({ length: N }, (_, i) => (...))` en Astro.
- Pug: convierte manualmente la indentación a HTML.
- SCSS, LESS y Stylus: conviértelos a CSS plano, respetando las reglas de estilo y la estructura original.
- CoffeeScript: conviértelo a JavaScript moderno.
- Si hay Haml + SCSS, busca patrones `@for` + `nth-of-type` que generen reglas repetitivas. Cuando sea equivalente, usa propiedades CSS como `--i` y `--j` en los elementos generados y fórmulas `calc()` en una sola regla. Elimina iteraciones que no correspondan a elementos reales. Convierte funciones de color a CSS moderno solo si puedes preservar su resultado.
- CSS externo: obtén su contenido y fusiónalo antes del CSS del Pen cuando sea accesible.
- Dependencias JavaScript de CDN: identifica el paquete npm equivalente, instala solo si hace falta y usa imports ESM. Nunca agregues scripts de CDN.
- Recursos externos de imagen o fuente: descárgalos solo si son necesarios y accesibles; guárdalos bajo `public/assets/` y actualiza las referencias. Si no se pueden obtener, informa qué recurso falta y evita una conversión que aparente estar completa.

## Reglas de implementación Astro

- Consolida el contenido en `src/components/Hero.astro`, sin etiquetas `<html>`, `<head>` o `<body>` en el template.
- Usa `<script>` sin atributos y `addEventListener`; nunca uses manejadores inline como `onclick`.
- Mantén dos espacios de indentación. No uses `var`.
- Preserva el comportamiento del código fuente, evitando cambios cosméticos o anotaciones innecesarias.
- Usa `<style is:global>` para `@property`, `@keyframes`, `:root`, `html`, `body`, `*`, selectores de elemento o ID, pseudo-elementos y selectores que afecten elementos creados por JavaScript. Para selectores por clase que Astro pueda encapsular, usa `<style>` scoped.
- Si JavaScript crea elementos dinámicamente, pon todos los estilos que los afecten en `<style is:global>`.
- No uses bloques `:global { ... }` ni wrappers `:global()` dentro de `<style is:global>`.
- Conserva las agrupaciones de selectores y no dupliques propiedades CSS del Pen.
- Elimina enlaces de atribución y textos como “Made by” o “Designed by”, además del markup y CSS huérfanos que dejen. No elimines contenido funcional.
- Deja un solo bloque `<style>` y elimina código muerto una vez consolidado.

## Verificación

1. Revisa `package.json` y ejecuta el script existente de lint o typecheck, si lo hay.
2. Ejecuta `pnpm check` antes del build si el proyecto define ese script. Si no existe, comprueba TypeScript/Astro con las herramientas ya instaladas. Añade o instala tooling de typecheck solo si es necesario para validar el componente, usando versiones compatibles con la versión de Astro del proyecto.
3. Ejecuta `pnpm build`.
4. Inspecciona `dist/index.html` y los estilos generados: confirma que el script está empaquetado, que los selectores globales no se han encapsulado incorrectamente, que no hay scripts CDN ni sintaxis de preprocesador sin convertir, y que no quedan atribuciones o enlaces eliminados.
5. Informa los comandos ejecutados y cualquier verificación que no haya podido completarse.
