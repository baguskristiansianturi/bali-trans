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
page.on('pageerror', error => pageErrors.push(page.url() + ': ' + error.message));

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
  await page.waitForSelector('.bt-site-header[data-ready="true"]');
  await page.waitForSelector('.bt-site-footer');
  const homepageShellCounts = await page.evaluate(() => ({
    headers: document.querySelectorAll('.bt-site-header').length,
    footers: document.querySelectorAll('.bt-site-footer').length
  }));
  if (homepageShellCounts.headers !== 1 || homepageShellCounts.footers !== 1) {
    throw new Error('Homepage must use exactly one shared header and footer: ' + JSON.stringify(homepageShellCounts));
  }
  await page.locator('#localeButton').click();
  if (!(await page.locator('#localeMenu').isVisible())) throw new Error('Shared language/currency menu did not open on the homepage');
  await page.locator('#headerSearchButton').click();
  if (!(await page.locator('#headerSearchPanel').isVisible()) || await page.locator('#localeMenu').isVisible()) {
    throw new Error('Opening search should close the locale menu and reveal the search overlay');
  }
  await page.locator('#mobileMenuButton').click();
  if (!(await page.locator('#mobileMenuPanel').isVisible()) || await page.locator('#headerSearchPanel').isVisible()) {
    throw new Error('Opening the mobile menu should close search and reveal navigation');
  }
  await page.locator('#mobileMenuButton').click();
  if (await page.locator('#mobileMenuPanel').isVisible()) throw new Error('Mobile navigation did not close when toggled');
  console.log('PASS homepage uses the shared shell with functional locale, search and mobile overlays');
  await checkRoute('about', '?page=about', 'A simpler way');
  await checkRoute('contact', '?page=contact', 'Let’s talk');
  await checkRoute('package catalogue', '?page=packages', 'Tours & Activities');
  await checkRoute('North Bali region', '?page=discovery&item=region%3Anorth', 'Explore North Bali');
  await checkRoute('valid package detail', '?page=detail&item=lovina-dolphin-tour', 'Lovina');
  await checkRoute('article list', '?page=blog', 'Plan Your Dream Trip to Bali');
  await checkRoute('article detail', '?page=blog-read&item=blog-1', 'A Practical First-Time Guide to Bali');
  if (await page.locator('#article-sources-title').count() !== 1) throw new Error('Existing article detail is missing its source list');
  await checkRoute('Nusa Islands region', '?page=discovery&item=region%3Anusa', 'Explore the Nusa Islands');
  await checkRoute('Kelingking Beach article', '?page=blog-read&item=nusa-penida-kelingking-beach', 'Kelingking Beach: Viewpoints, Access and Safety');
  if (await page.locator('#article-sources-title').count() !== 1) throw new Error('Kelingking article is missing its source list');
  await checkRoute('Crystal Bay article', '?page=blog-read&item=nusa-penida-crystal-bay', 'Crystal Bay: Coastal Views and Marine Activities');
  if (await page.locator('#article-sources-title').count() !== 1) throw new Error('Crystal Bay article is missing its source list');
  await checkRoute('Diamond Beach article', '?page=blog-read&item=nusa-penida-diamond-beach', 'Diamond Beach: Access, Views and Safety');
  if (await page.locator('#article-sources-title').count() !== 1) throw new Error('Diamond Beach article is missing its source list');
  await checkRoute('Atuh Beach article', '?page=blog-read&item=nusa-penida-atuh-beach', 'Atuh Beach: A Guide to Nusa Penida’s Eastern Coast');
  if (await page.locator('#article-sources-title').count() !== 1) throw new Error('Atuh Beach article is missing its source list');
  await page.goto('http://127.0.0.1:4173/?page=discovery&item=region%3Anusa', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelector('#appContainer h1'));
  await page.getByRole('button', { name: 'Explore destination' }).first().click();
  await page.waitForFunction(() => new URLSearchParams(location.search).get('item') === 'place:kelingking-beach');
  await page.waitForFunction(() => document.querySelector('#appContainer h1, #appContainer h2')?.textContent.includes('Kelingking Beach'));
  console.log('PASS Nusa region card opens its matching destination detail');
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

  await page.goto('http://127.0.0.1:4173/transport-service.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.bt-site-header[data-ready="true"]');
  await page.waitForSelector('.bt-site-footer');
  const shellCheck = await page.evaluate(() => {
    const header = document.querySelectorAll('.bt-site-header');
    const footer = document.querySelectorAll('.bt-site-footer');
    const main = document.querySelector('main');
    const topbar = document.getElementById('countdownTimer')?.parentElement?.parentElement;
    return {
      headers: header.length,
      footers: footer.length,
      headerBeforeMain: !!(main && header[0].compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING),
      topbarBeforeHeader: !!(topbar && topbar.compareDocumentPosition(header[0]) & Node.DOCUMENT_POSITION_FOLLOWING),
      viewport: window.innerWidth,
      width: document.documentElement.scrollWidth
    };
  });
  if (shellCheck.headers !== 1 || shellCheck.footers !== 1) throw new Error('Standalone page must have exactly one shared header and footer');
  if (!shellCheck.headerBeforeMain || !shellCheck.topbarBeforeHeader) throw new Error('Shared header order is incorrect on standalone page');
  if (shellCheck.width > shellCheck.viewport + 2) throw new Error('Standalone transport page has horizontal overflow');
  await page.locator('#mobileMenuButton').click();
  const menuState = await page.evaluate(() => ({ className: document.querySelector('#mobileMenuPanel')?.className, expanded: document.querySelector('#mobileMenuButton')?.getAttribute('aria-expanded'), display: getComputedStyle(document.querySelector('#mobileMenuPanel')).display, height: document.querySelector('#mobileMenuPanel').getBoundingClientRect().height }));
  if (!(await page.locator('#mobileMenuPanel').isVisible())) throw new Error('Shared mobile navigation did not open: ' + JSON.stringify(menuState));
  await page.getByRole('link', { name: 'Travel guides' }).last().click();
  await page.waitForURL('**/index.html?page=blog');
  console.log('PASS shared shell, mobile menu and working travel-guide route');

  await page.goto('http://127.0.0.1:4173/watersport-tanjung-benoa.html', { waitUntil: 'domcontentloaded' });
  const penyuLink = page.locator('a[href*="watersport-glass-bottom-boat-pulau-penyu.html"]').first();
  if (!(await penyuLink.count())) throw new Error('Watersport catalogue is missing the Glass Bottom Boat + Pulau Penyu detail link');
  await penyuLink.click();
  await page.waitForURL('**/watersport-glass-bottom-boat-pulau-penyu.html*', { waitUntil: 'domcontentloaded', timeout: 15000 });
  if (!(await page.locator('h1').first().innerText()).includes('Glass Bottom Boat')) {
    throw new Error('Pulau Penyu card opened the wrong activity detail');
  }
  console.log('PASS Pulau Penyu card opens its matching detail page');

  await page.goto('http://127.0.0.1:4173/watersport-checkout.html?product=glass-bottom-boat', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelector('#product')?.value === 'glass-bottom-boat');
  if (await page.locator('.bt-site-header, .bt-site-footer, .brand').count()) throw new Error('Watersport checkout must remain form-only without site shell or logo');
  const watersportWidth = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: window.innerWidth }));
  if (watersportWidth.width > watersportWidth.viewport + 2) throw new Error('Watersport checkout has horizontal overflow: ' + JSON.stringify(watersportWidth));
  if (!(await page.locator('#activityDate').getAttribute('min'))) throw new Error('Watersport checkout must set a minimum activity date');
  await page.locator('input[name="forSomeone"]').check();
  if (!(await page.locator('[data-guest-fields]').first().isVisible())) throw new Error('Watersport checkout did not reveal guest fields for someone-else bookings');
  await page.locator('input[name="forSomeone"]').uncheck();
  if (await page.locator('[data-guest-fields]').first().isVisible()) throw new Error('Watersport checkout did not hide guest fields for self bookings');
  await page.locator('#product').selectOption('package');
  if (!(await page.locator('[data-package-wrap]').isVisible()) || await page.locator('#quantity').getAttribute('min') !== '2') {
    throw new Error('Watersport package selection did not show package fields or enforce the minimum participant count');
  }
  console.log('PASS watersport checkout query selection, guest toggle, package rules and clean layout');

  await page.goto('http://127.0.0.1:4173/bali-airport-transfer-checkout.html', { waitUntil: 'domcontentloaded' });
  if (await page.locator('.bt-site-header, .bt-site-footer, .brand').count()) throw new Error('Airport checkout must not show the site shell or logo');
  if (!(await page.locator('.back-link').isVisible())) throw new Error('Airport checkout must retain a clear Back control');
  const futureDate = await page.evaluate(() => { const d = new Date(); d.setDate(d.getDate() + 1); return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-'); });
  await page.locator('#date').fill(futureDate);
  await page.locator('#address').fill('Kuta');
  await page.locator('#flight').fill('QZ 506');
  await page.locator('#nextButton').click();
  await page.waitForFunction(() => document.querySelector('#step2') && !document.querySelector('#step2').hidden);
  await page.locator('label.payment-option').filter({ hasText: 'For someone else' }).click();
  if (!(await page.locator('#guestFields').isVisible()) || !(await page.locator('#guestName').evaluate(el => el.required))) {
    throw new Error('Airport checkout did not enable required guest details for someone-else bookings');
  }
  await page.locator('label.payment-option').filter({ hasText: 'For myself' }).click();
  if (await page.locator('#guestFields').isVisible() || await page.locator('#guestName').evaluate(el => el.required)) {
    throw new Error('Airport checkout did not reset guest fields for self bookings');
  }
  const airportWidth = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: window.innerWidth }));
  if (airportWidth.width > airportWidth.viewport + 2) throw new Error('Airport checkout has horizontal overflow: ' + JSON.stringify(airportWidth));
  console.log('PASS airport checkout clean layout and self/guest validation');

  const standalonePages = [
    'bali-adventure-activities.html', 'bali-airport-transfer.html',
    'bali-intercity-transfer.html', 'bali-port-transfer.html',
    'bali-private-day-tour.html', 'private-transport.html',
    'terms-and-conditions.html', 'transport-service.html',
    'watersport-banana-boat.html', 'watersport-flyboard-tanjung-benoa.html',
    'watersport-flying-fish-donut-boat.html', 'watersport-flying-fish-tanjung-benoa.html',
    'watersport-glass-bottom-boat-pulau-penyu.html', 'watersport-jet-ski.html',
    'watersport-paket-2-aktivitas.html', 'watersport-paket-3-aktivitas.html',
    'watersport-paket-watersport-wisata-laut.html', 'watersport-parasailing.html',
    'watersport-rolling-donut-tanjung-benoa.html', 'watersport-scuba-diving-tanjung-benoa.html',
    'watersport-sea-walker-snorkeling.html', 'watersport-sea-walker-tanjung-benoa.html',
    'watersport-snorkeling-tanjung-benoa.html', 'watersport-tanjung-benoa.html',
    'watersport-wakeboard-tanjung-benoa.html'
  ];
  for (const route of standalonePages) {
    await page.goto('http://127.0.0.1:4173/' + route, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.bt-site-header[data-ready="true"]');
    const audit = await page.evaluate(() => ({
      headers: document.querySelectorAll('.bt-site-header').length,
      footers: document.querySelectorAll('.bt-site-footer').length,
      width: document.documentElement.scrollWidth,
      viewport: window.innerWidth
    }));
    if (audit.headers !== 1 || audit.footers !== 1) throw new Error(route + ': expected exactly one shared header and footer');
    if (audit.width > audit.viewport + 2) throw new Error(route + ': horizontal overflow (' + audit.width + 'px vs ' + audit.viewport + 'px)');
  }
  console.log('PASS shared shell and 360px overflow audit across ' + standalonePages.length + ' standalone pages');

  await page.goto('http://127.0.0.1:4173/watersport-jet-ski.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.bt-site-header[data-ready="true"]');
  if (await page.locator('.bt-site-header').count() !== 1 || await page.locator('.bt-site-footer').count() !== 1) {
    throw new Error('Watersport detail must use one shared site shell');
  }
  await page.goto('http://127.0.0.1:4173/watersport-checkout.html', { waitUntil: 'domcontentloaded' });
  if (await page.locator('.bt-site-header, .bt-site-footer').count() !== 0) throw new Error('Watersport checkout must remain distraction-free without global shell');
  await page.goto('http://127.0.0.1:4173/bali-airport-transfer-checkout.html', { waitUntil: 'domcontentloaded' });
  if (await page.locator('.bt-site-header, .bt-site-footer').count() !== 0) throw new Error('Airport checkout must remain distraction-free without global shell');
  console.log('PASS shared shell on service details and clean checkout layouts');

  if (pageErrors.length) throw new Error('Browser JavaScript errors: ' + pageErrors.join(' | '));
  console.log('PASS no uncaught browser JavaScript errors');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
