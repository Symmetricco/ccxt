/**
 * site/index.html es la fuente única. Este script NO la modifica.
 * Genera artifact.html: el mismo documento adaptado al publicador de Artifacts,
 * que no admite <!doctype>/<html>/<head>/<body> ni archivos locales.
 *
 * La estructura de site/index.html es particular: el <head> lleva un bloque
 * <style> con los estilos del conmutador de idioma, y el <title>, los <meta>
 * y la hoja principal viven dentro del <body>. El generador se apoya en eso.
 *
 *   node portfolio/build-artifact.mjs
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(here, 'site/index.html'), 'utf8');

const need = (value, label) => {
  if (!value) throw new Error('No encuentro ' + label + ' en site/index.html');
  return value;
};

// — el <head>: sus estilos hacen falta (conmutador de idioma), su reset claro no —
const head = need(src.match(/<head>([\s\S]*?)<\/head>/), 'el <head>')[1];
const headStyle = (head.match(/<style>([\s\S]*?)<\/style>/) || [, ''])[1]
  // ese reset viene del envoltorio de otra sesión y pinta fondo claro sobre un sitio oscuro
  .replace(/:root\{color-scheme:light\}/, '')
  .replace(/body\{margin:0;padding:0;font:[^}]*\}/, '')
  .trim();

// — el <body> ya trae título, metadatos, hoja principal y contenido —
let body = need(src.match(/<body>([\s\S]*)<\/body>/), 'el <body>')[1];

// el artifact es una sola página: la versión inglesa vive en otro archivo
body = body.replace(/<a href="en\/index\.html"([^>]*)>/g, '<a href="https://jordipeguero.com/en/" target="_blank" rel="noopener"$1>');

// las imágenes de caso no viajan con el artifact: se incrustan como data URI
const MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', svg: 'image/svg+xml' };
let incrustadas = 0, ausentes = [];
body = body.replace(/--img:url\('([^']+)'\)/g, (todo, ruta) => {
  if (ruta.includes('/x.jpg')) return todo;                 // marcador de la documentación
  const limpia = ruta.replace(/^\.\.\//, '');
  const abs = join(here, 'site', limpia);
  if (!existsSync(abs)) { ausentes.push(ruta); return todo; }
  const ext = limpia.split('.').pop().toLowerCase();
  const mime = MIME[ext];
  if (!mime) { ausentes.push(ruta); return todo; }
  incrustadas++;
  return "--img:url('data:" + mime + ";base64," + readFileSync(abs).toString('base64') + "')";
});
if (ausentes.length) console.warn('  aviso · sin incrustar: ' + ausentes.join(', '));

const casos = (body.match(/class="row__title"/g) || []).length;
if (casos < 1) throw new Error('El cuerpo no contiene ninguna fila de caso');

const GOOGLE_FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?' +
  'family=Archivo:wdth,wght@62..125,100..900&family=DM+Mono:wght@300;400;500' +
  '&family=Instrument+Sans:wght@400..700&display=swap">';

const out = [
  '<title>Jordi Peguero</title>',
  GOOGLE_FONTS,
  headStyle ? '<style>\n' + headStyle + '\n</style>' : '',
  body,
].filter(Boolean).join('\n');

writeFileSync(join(here, 'artifact.html'), out);
console.log('artifact.html · ' + casos + ' casos · ' + incrustadas + ' imágenes incrustadas · ' + Math.round(out.length/1024) + ' KB');
