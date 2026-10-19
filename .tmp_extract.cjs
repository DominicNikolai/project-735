const fs = require('fs');
const buf = fs.readFileSync('.tmp_pen.html', 'utf8');
const marker = '__item&quot;:&quot;';
const idx = buf.indexOf(marker);
if (idx === -1) { console.error('marker not found'); process.exit(1); }
const start = idx + marker.length;
let i = start, s = '';
while (i < buf.length) {
  if (buf.substring(i, i + 6) === '&quot;') {
    if (buf[i - 1] !== '\\') break;
    s += '"';
    i += 6;
    continue;
  }
  if (buf.substring(i, i + 5) === '&amp;') { s += '&'; i += 5; continue; }
  if (buf.substring(i, i + 5) === '&#39;') { s += "'"; i += 5; continue; }
  if (buf.substring(i, i + 4) === '&lt;') { s += '<'; i += 4; continue; }
  if (buf.substring(i, i + 4) === '&gt;') { s += '>'; i += 4; continue; }
  s += buf[i]; i++;
}
const j = JSON.parse(`"${s}"`);
const data = JSON.parse(j);
console.log('html_pre_processor:', data.html_pre_processor);
console.log('css_pre_processor:', data.css_pre_processor);
console.log('js_pre_processor:', data.js_pre_processor);
console.log('resources:', JSON.stringify(data.resources));
fs.writeFileSync('.tmp_html.txt', data.html);
fs.writeFileSync('.tmp_css.txt', data.css);
fs.writeFileSync('.tmp_js.txt', data.js);
console.log('---HTML---\n' + data.html);
console.log('---CSS---\n' + data.css);
console.log('---JS---\n' + data.js);
