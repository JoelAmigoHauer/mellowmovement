import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const DIR = 'scratch/mirror';
const REF = 'docs/design-references/mellowmovement';
const OUT = 'docs/research/mellowmovement';
fs.mkdirSync(REF, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.eot': 'application/vnd.ms-fontobject', '.bin': 'image/jpeg' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const fp = path.join(DIR, p);
  if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
    res.writeHead(200, { 'content-type': MIME[path.extname(fp).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(fp).pipe(res);
  } else { res.writeHead(404); res.end('nf'); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const base = `http://127.0.0.1:${port}/index.html`;

let execPath; for (const b of ['/opt/pw-browsers/chromium-1194', '/opt/pw-browsers/chromium']) { const f = `${b}/chrome-linux/chrome`; if (fs.existsSync(f)) { execPath = f; break; } }
const browser = await chromium.launch({ executablePath: execPath, headless: true, args: ['--no-sandbox'] });

async function shoot(w, h, name) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'load', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.evaluate(() => { document.querySelectorAll('img[data-src]').forEach(i => { if (i.dataset.src) i.src = i.src; }); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${REF}/${name}.png`, fullPage: true });
  return { ctx, page };
}

const { page } = await shoot(1440, 900, 'desktop-full');
await shoot(390, 844, 'mobile-full');

// Extract computed design tokens + per-section structure from the rendered local copy
const data = await page.evaluate(() => {
  const get = (el, props) => { const cs = getComputedStyle(el); const o = {}; props.forEach(p => o[p] = cs[p]); return o; };
  const TXT = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'textTransform'];
  const body = getComputedStyle(document.body);
  const sections = [...document.querySelectorAll('#sections > .page-section, [data-section-id]')].filter(s => s.closest('#sections') || s.id === 'header').map((s, i) => {
    const cs = getComputedStyle(s);
    return {
      i, id: s.getAttribute('data-section-id'),
      bg: cs.backgroundColor, padding: cs.padding, minHeight: cs.minHeight,
      heads: [...s.querySelectorAll('h1,h2,h3,h4')].map(h => ({ tag: h.tagName, text: h.innerText.trim(), ...get(h, TXT) })),
      paras: [...s.querySelectorAll('p')].map(p => ({ text: p.innerText.trim(), ...get(p, TXT) })).filter(p => p.text),
      buttons: [...s.querySelectorAll('a.sqs-block-button-element, .sqs-button-element--primary, a[href]')].map(b => ({ text: b.innerText.trim(), href: b.getAttribute('href'), bg: getComputedStyle(b).backgroundColor, color: getComputedStyle(b).color, padding: getComputedStyle(b).padding, borderRadius: getComputedStyle(b).borderRadius, border: getComputedStyle(b).border })).filter(b => b.text),
      imgs: [...s.querySelectorAll('img')].map(im => ({ src: im.getAttribute('src'), alt: im.alt, w: im.naturalWidth, h: im.naturalHeight })),
    };
  });
  return {
    title: document.title,
    body: { fontFamily: body.fontFamily, fontSize: body.fontSize, color: body.color, backgroundColor: body.backgroundColor, lineHeight: body.lineHeight },
    nav: [...document.querySelectorAll('.header-nav-item a, .header-menu-nav-item a, nav a')].map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') })).filter(a => a.text),
    headerBtn: (() => { const b = document.querySelector('.header-actions-action a, .header-actions a'); return b ? { text: b.innerText.trim(), href: b.getAttribute('href') } : null; })(),
    logo: (() => { const t = document.querySelector('.header-title-text a'); const img = document.querySelector('.header-title-logo img'); return img ? { type: 'img', src: img.getAttribute('src') } : t ? { type: 'text', text: t.innerText.trim(), ...get(t, TXT) } : null; })(),
    sections,
  };
});
fs.writeFileSync(`${OUT}/computed.json`, JSON.stringify(data, null, 2));

console.log('TITLE:', data.title);
console.log('BODY:', JSON.stringify(data.body));
console.log('LOGO:', JSON.stringify(data.logo));
console.log('NAV:', JSON.stringify(data.nav));
console.log('HEADER BTN:', JSON.stringify(data.headerBtn));
for (const s of data.sections) {
  console.log(`\n=== SECTION ${s.i} id=${s.id} bg=${s.bg} pad=${s.padding} minH=${s.minHeight} imgs=${s.imgs.length}`);
  s.heads.forEach(h => console.log(`  ${h.tag} "${h.text}" | ${h.fontFamily} ${h.fontSize}/${h.fontWeight} lh=${h.lineHeight} ls=${h.letterSpacing} ${h.color} ${h.textTransform}`));
  s.paras.slice(0, 5).forEach(p => console.log(`  P "${p.text.slice(0, 90)}" | ${p.fontFamily} ${p.fontSize} ${p.color}`));
  s.buttons.slice(0, 5).forEach(b => console.log(`  BTN "${b.text}" -> ${b.href} | bg=${b.bg} color=${b.color} pad=${b.padding} r=${b.borderRadius}`));
  s.imgs.forEach(im => console.log(`  IMG ${im.src} (${im.w}x${im.h}) alt="${im.alt}"`));
}
await browser.close(); server.close();
console.log('\nDONE render');
