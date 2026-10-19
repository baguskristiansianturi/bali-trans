import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp'
};

const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url || '/', 'http://127.0.0.1').pathname;
    const requestedPath = pathname === '/' ? '/index.html' : decodeURIComponent(pathname);
    let filePath = path.resolve(root, '.' + requestedPath);
    if (filePath !== root && !filePath.startsWith(root + path.sep)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    const info = await stat(filePath);
    if (info.isDirectory()) filePath = path.join(filePath, 'index.html');
    const body = await readFile(filePath);
    response.writeHead(200, { 'content-type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404).end('Not found');
  }
});

await new Promise(resolve => server.listen(4173, '127.0.0.1', resolve));
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
const pageErrors = [];
page.on('pageerror', error => pageErrors.push(error.message));

async function checkRoute(label, query, expectedHeading) {
  const url = 'http://127.0.0.1:4173/' + query;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(() => {
    const app = document.querySelector('#appContainer');
    return app && app.textContent.trim().length > 30 && app.querySelector('h1, h2, h3');
  }, { timeout: 20000 });
  const heading = (await page.locator('#appContainer h1, #appContainer h2, #appContainer h3').first().innerText()).trim();
  if (expectedHeading && !heading.includes(expectedHeading)) {
    throw new Error(label + ': expected heading containing "' + expectedHeading + '", got "' + heading + '"');
  }
  const result = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
    textLength: document.querySelector('#appContainer').innerText.trim().length,
    imagesMissingAlt: [...document.querySelectorAll('#appContainer img')].filter(image => !image.hasAttribute('alt')).length
  }));
  if (result.width > result.viewport + 2) {
    throw new Error(label + ': horizontal overflow (' + result.width + 'px document vs ' + result.viewport + 'px viewport)');
  }
  if (result.imagesMissingAlt > 0) {
    throw new Error(label + ': ' + result.imagesMissingAlt + ' images have no alt attribute');
  }
  console.log('PASS ' + label + ' — "' + heading + '" (' + result.textLength + ' characters)');
}

try {
  await checkRoute('homepage', '', 'Find your way around Bali');
  await checkRoute('about', '?page=about', 'A simpler way');
  await checkRoute('contact', '?page=contact', 'Let’s talk');
  await checkRoute('package catalogue', '?page=packages', 'Tours & Activities');
  await checkRoute('North Bali region', '?page=discovery&item=region%3Anorth', 'Explore North Bali');
  await checkRoute('valid package detail', '?page=detail&item=lovina-dolphin-tour', 'Lovina');
  await checkRoute('article list', '?page=blog', 'Plan Your Dream Trip to Bali');
  await checkRoute('article detail', '?page=blog-read&item=blog-1', 'A Practical First-Time Guide to Bali');
  await checkRoute('cart', '?page=cart', 'Cart');
  await checkRoute('checkout', '?page=checkout', 'Vehicle & optional activities');
  await checkRoute('photo credits', '?page=image-credits', 'Photo credits');
  await checkRoute('unknown page', '?page=unknown-page', 'We couldn’t find that page');
  await checkRoute('unknown discovery item', '?page=discovery&item=place%3Aunknown', 'We couldn’t find that page');
  await checkRoute('unknown article ID', '?page=blog-read&item=unknown-article', 'We couldn’t find that page');
  await checkRoute('unknown package ID', '?page=detail&item=unknown-package', 'We couldn’t find that page');

  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelector('#appContainer h1, #appContainer h2, #appContainer h3'));
  await page.evaluate(() => navigateTo('blog'));
  await page.waitForFunction(() => new URLSearchParams(location.search).get('page') === 'blog');
  await page.goBack();
  await page.waitForFunction(() => !new URLSearchParams(location.search).has('page'));
  await page.goForward();
  await page.waitForFunction(() => new URLSearchParams(location.search).get('page') === 'blog');
  console.log('PASS browser Back/Forward navigation');

  if (pageErrors.length) throw new Error('Browser JavaScript errors: ' + pageErrors.join(' | '));
  console.log('PASS no uncaught browser JavaScript errors');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
