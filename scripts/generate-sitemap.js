/**
 * Generate sitemap.xml by scanning Next.js App Router folders for page.tsx files.
 */
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://sajalkmr.github.io';

function collectRoutes(dir, baseRoute = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const newBase = baseRoute ? `${baseRoute}/${entry.name}` : entry.name;
      routes = routes.concat(collectRoutes(fullPath, newBase));
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      if (baseRoute.includes('[') || baseRoute.includes('(')) continue; // skip dynamic or group routes
      const routePath = baseRoute === '' ? '/' : `/${baseRoute}`;
      routes.push(routePath);
    }
  }

  return routes;
}

const pagesDir = path.join(__dirname, '..', 'src', 'app');
const routes = Array.from(new Set(collectRoutes(pagesDir))).sort();

const urls = routes
  .map((route) => `  <url>\n    <loc>${BASE_URL}${route === '/' ? '' : route}</loc>\n  </url>`) // prettier-ignore
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');

console.log(`✅ Sitemap generated with ${routes.length} routes`); 