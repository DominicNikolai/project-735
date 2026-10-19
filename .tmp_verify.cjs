const fs = require('fs');
const path = require('path');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const output = walk('dist')
  .filter((file) => /\.(html|css|js)$/.test(file))
  .map((file) => fs.readFileSync(file, 'utf8'))
  .join('\n');

const checks = [
  ['No CDN scripts', !output.includes('cdn.jsdelivr') && !output.includes('unpkg')],
  ['No global{}', !output.includes('global{')],
  ['No attribution', !output.includes('Made by') && !output.includes('Designed by') && !output.includes('paypalme')],
  ['No preprocessor code', !output.includes('@for ') && !output.includes('adjust-hue')],
  ['No <head>/<body> template leftovers', !output.includes('data-astro-cid') || !/body\[data-astro|canvas\[data-astro/.test(output)],
  ['body selector global', /body\s*\{[^}]*background-color:#000/.test(output.replace(/\s/g, '')) || output.includes('body {')],
  ['canvas selector global', output.includes('canvas {') || output.includes('canvas{')],
  ['No scoped cid on body/canvas', !output.includes('body[data-astro-cid') && !output.includes('canvas[data-astro-cid')],
  ['Shader bundled', output.includes('gl_FragColor') || output.includes('u_warpFreq')],
  ['lil-gui bundled', output.includes('Scene Settings')],
  ['No html/head/body tags in Hero template', !fs.readFileSync('src/components/Hero.astro', 'utf8').match(/<(html|head|body)[\s>]/)],
  ['Single style block', (fs.readFileSync('src/components/Hero.astro', 'utf8').match(/<style/g) || []).length === 1],
  ['No var', !fs.readFileSync('src/components/Hero.astro', 'utf8').match(/\bvar\s+[A-Za-z_$]/)],
];

checks.forEach(([name, ok]) => console.log(ok ? 'PASS' : 'FAIL', name));
