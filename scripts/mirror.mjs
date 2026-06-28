// Mirror the live page + assets locally (downloads via curl through the egress proxy),
// rewrite asset URLs to local paths, so Chromium can render from 127.0.0.1 only.
import fs from 'fs';
import { execFileSync } from 'child_process';
import crypto from 'crypto';

const DIR = 'scratch/mirror';
const ASSETS = `${DIR}/assets`;
fs.mkdirSync(ASSETS, { recursive: true });

let html = fs.readFileSync('scratch/live.html', 'utf8');
const map = new Map(); // url -> local relative path

function dl(url) {
  if (!url || url.startsWith('data:')) return null;
  if (map.has(url)) return map.get(url);
  let clean = url.replace(/&amp;/g, '&').trim();
  if (clean.startsWith('//')) clean = 'https:' + clean;
  if (!/^https?:/.test(clean)) return null;
  const ext = (clean.split('?')[0].match(/\.([a-z0-9]{2,5})$/i)?.[1] || 'bin').toLowerCase();
  const name = crypto.createHash('md5').update(clean).digest('hex').slice(0, 16) + '.' + ext;
  const local = `assets/${name}`;
  try {
    execFileSync('curl', ['-sS', '--max-time', '45', '-A', 'Mozilla/5.0 Chrome/120', '-o', `${ASSETS}/${name}`, clean], { stdio: ['ignore', 'ignore', 'ignore'] });
    const sz = fs.statSync(`${ASSETS}/${name}`).size;
    if (sz === 0) { return null; }
    map.set(url, local);
    return local;
  } catch { return null; }
}

// 1) stylesheets
const cssUrls = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map(m => m[1]);
const localCss = [];
for (const u of cssUrls) {
  const abs = u.startsWith('//') ? 'https:' + u : u;
  const local = dl(abs);
  if (local) { localCss.push({ abs, local }); }
}

// 2) process CSS files: download url() refs (fonts, bg images) and rewrite
for (const { abs, local } of localCss) {
  const path = `${DIR}/${local}`;
  let css = fs.readFileSync(path, 'utf8');
  const refs = [...css.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)].map(m => m[2]).filter(u => !u.startsWith('data:'));
  for (const r of [...new Set(refs)]) {
    let absRef = r;
    if (r.startsWith('//')) absRef = 'https:' + r;
    else if (r.startsWith('/')) { try { absRef = new URL(r, abs).href; } catch {} }
    else if (!/^https?:/.test(r)) { try { absRef = new URL(r, abs).href; } catch {} }
    const lr = dl(absRef);
    if (lr) css = css.split(r).join('../' + lr.replace('assets/', 'assets/'));
  }
  // url() in css are relative to the css file at assets/x.css -> assets/y => same dir
  css = css.replace(/url\((['"]?)\.\.\/assets\//g, 'url($1');
  fs.writeFileSync(path, css);
}

// 3) images: src, data-src, and srcset (take first/highest)
function pickSrcset(ss) {
  const parts = ss.split(',').map(s => s.trim().split(/\s+/));
  return parts[parts.length - 1]?.[0];
}
// collect candidate image urls
const imgAttrs = [...html.matchAll(/<img[^>]+>/g)].map(m => m[0]);
for (const tag of imgAttrs) {
  const dataSrc = tag.match(/data-src="([^"]+)"/)?.[1];
  const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
  const srcset = tag.match(/data-srcset="([^"]+)"/)?.[1] || tag.match(/\ssrcset="([^"]+)"/)?.[1];
  const chosen = dataSrc || (srcset ? pickSrcset(srcset) : null) || src;
  if (chosen) dl(chosen);
}
// also any squarespace-cdn url anywhere in html
for (const m of html.matchAll(/https:\/\/images\.squarespace-cdn\.com[^\s"')]+/g)) dl(m[0]);

// 4) rewrite html: replace every known url with local; also neutralize lazy-loading by setting src=data-src
for (const [url, local] of map) {
  html = html.split(url).join(local);
  const enc = url.replace(/&/g, '&amp;');
  html = html.split(enc).join(local);
}
// make squarespace lazy images show: copy data-src to src already handled by replacement (both point local now)
// strip remaining external script tags to avoid network + JS reflow that hides content
html = html.replace(/<script\b[^>]*\bsrc="https?:\/\/[^"]*"[^>]*><\/script>/g, '');
html = html.replace(/<script\b[^>]*\bsrc="\/\/[^"]*"[^>]*><\/script>/g, '');
// Squarespace hides sections until JS loads via .sqs-block / opacity; add override
html += `\n<style id="clone-reveal">img{opacity:1!important;visibility:visible!important} .sqs-block,.fluid-engine,section{opacity:1!important}[data-load-status]{opacity:1!important}</style>`;

fs.writeFileSync(`${DIR}/index.html`, html);
fs.writeFileSync(`${DIR}/_map.json`, JSON.stringify(Object.fromEntries(map), null, 2));
console.log('assets downloaded:', map.size);
console.log('css files:', localCss.length);
