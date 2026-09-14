import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRenderer } from '../src/templates.mjs';

const root = process.cwd();
const out = path.join(root, 'dist');
const base = (process.env.SITE_BASE || '/').replace(/\/?$/, '/');
const { pageMap, document } = createRenderer(base);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, 'public'), out, { recursive: true });
await cp(path.join(root, 'src/styles.css'), path.join(out, 'styles.css'));
await cp(path.join(root, 'src/site.js'), path.join(out, 'site.js'));

for (const [slug, page] of Object.entries(pageMap)) {
  const folder = slug ? path.join(out, slug) : out;
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, 'index.html'), document(slug, page));
}

const urls = Object.keys(pageMap).map(slug => `  <url><loc>https://welcometothenextlevel.github.io/l-go/${slug ? `${slug}/` : ''}</loc></url>`).join('\n');
await writeFile(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://welcometothenextlevel.github.io/l-go/sitemap.xml\n`);
const notFoundBody = `<main id="contenu"><section class="not-found"><p class="eyebrow"><span></span> Erreur 404</p><h1>Cette route<br><em>n’existe pas.</em></h1><a class="button button-primary" href="${base}">Retour à l’accueil →</a></section></main>`;
const notFound = document('', pageMap['']).replace(/<main id="contenu">[\s\S]*?<\/main>/, notFoundBody).replace('<title>L-GO | Réussis ton permis</title>','<title>Page introuvable | L-GO</title>');
await writeFile(path.join(out, '404.html'), notFound);
await writeFile(path.join(out, '.nojekyll'), '');
await mkdir(path.join(out, 'server'), { recursive:true });
await writeFile(path.join(out, 'server', 'index.js'), `export default { fetch(request, env) { return env.ASSETS.fetch(request); } };\n`);
console.log(`Built ${Object.keys(pageMap).length} L-GO pages in ${out}`);
