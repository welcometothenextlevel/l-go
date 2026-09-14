import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.join(process.cwd(),'dist');
const base = (process.env.SITE_BASE || '/').replace(/\/?$/, '/');
const pages = [];
async function walk(dir) { for (const name of await readdir(dir,{withFileTypes:true})) { const full=path.join(dir,name.name); if(name.isDirectory()) await walk(full); else if(name.name.endsWith('.html')) pages.push(full); } }
await walk(root);
const errors=[];
const titles=new Map();
for (const file of pages) {
  const html=await readFile(file,'utf8');
  const rel=path.relative(root,file);
  const title=html.match(/<title>(.*?)<\/title>/)?.[1];
  const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const h1=(html.match(/<h1[ >]/g)||[]).length;
  if(!title) errors.push(`${rel}: title manquant`);
  if(!description) errors.push(`${rel}: description manquante`);
  if(!canonical) errors.push(`${rel}: URL canonique manquante`);
  if(h1!==1) errors.push(`${rel}: ${h1} H1`);
  if(title && rel!=='404.html') { if(titles.has(title)) errors.push(`${rel}: titre dupliqué avec ${titles.get(title)}`); else titles.set(title,rel); }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(match[1]); } catch { errors.push(`${rel}: JSON-LD invalide`); } }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value=match[1]; if(value.startsWith('http')||value.startsWith('tel:')||value.startsWith('#')||value.startsWith('javascript:')) continue;
    const clean=value.split(/[?#]/)[0]; if(!clean)continue;
    const normalized = clean.startsWith(base) ? clean.slice(base.length) : clean.replace(/^\//,'');
    let target=clean.startsWith('/')?path.join(root,normalized):path.resolve(path.dirname(file),clean);
    if(clean.endsWith('/'))target=path.join(target,'index.html');
    try{await access(target)}catch{errors.push(`${rel}: référence absente ${value}`)}
  }
}
const banned=/Elementra|blockchain|smart contracts|crypto|digital assets|lorem ipsum|ThemeREX/i;
for(const rel of ['src/data.mjs','src/templates.mjs','src/site.js','src/styles.css','README.md']){const text=await readFile(path.join(process.cwd(),rel),'utf8');if(banned.test(text))errors.push(`${rel}: résidu interdit trouvé`)}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Validated ${pages.length} HTML files: metadata, H1s, and local references are consistent.`);
