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
  await checkRoute('help centre', '?page=help', 'How can we help?');
  await checkRoute('FAQ guide', '?page=help-topic&item=faq', 'Frequently asked questions');
  await checkRoute('terms and conditions', '?page=terms', 'Terms and conditions');
  await checkRoute('privacy policy', '?page=privacy', 'Privacy policy');
  await checkRoute('partner enquiries', '?page=partners', 'Local partners');
  await checkRoute('account access', '?page=account', 'Account access');
  await checkRoute('package catalogue', '?page=packages', 'Tours & Activities');
  await checkRoute('North Bali region', '?page=discovery&item=region%3Anorth', 'Explore North Bali');
  await checkRoute('valid package detail', '?page=detail&item=lovina-dolphin-tour', 'Bali Dolphin Tour');
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

  await page.goto('http://127.0.0.1:4173/?page=detail&item=lovina-dolphin-tour', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelector('#appContainer h1')?.textContent.includes('Dolphin Tour'));
  await page.getByRole('button', { name: 'Book Now' }).first().click();
  await page.waitForURL(url => url.pathname.endsWith('/booking-form.html'));
  await page.waitForSelector('#guestBookingForm');
  const dolphinDate = await page.evaluate(() => { const d = new Date(); d.setDate(d.getDate() + 4); return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-'); });
  await page.locator('#travelDate').fill(dolphinDate);
  await page.locator('#destination').fill('Kuta family hotel');
  await page.locator('#adults').selectOption('2');
  await page.locator('[name="bookerName"]').fill('Browser Test Guest');
  await page.locator('[name="bookerEmail"]').fill('guest@example.com');
  await page.locator('[name="bookerPhone"]').fill('+628123456789');
  await page.locator('[name="terms"]').check();
  await page.getByRole('button', { name: /Continue to guest details/ }).click();
  await page.getByRole('button', { name: /Send request via WhatsApp/ }).click();
  await page.waitForURL(url => url.hostname === 'wa.me' && url.pathname === '/628218187917');
  const dolphinRequestUrl = new URL(page.url());
  const dolphinRequestMessage = dolphinRequestUrl.searchParams.get('text') || '';
  if (dolphinRequestUrl.hostname !== 'wa.me' || dolphinRequestUrl.pathname !== '/628218187917') throw new Error('Dolphin tour request must use the shared WhatsApp number');
  for (const detail of ['BALI TRANS | BOOKING REQUEST', 'Bali Dolphin Tour', 'All-Inclusive Tour', dolphinDate, 'Kuta family hotel', 'Browser Test Guest', 'guest@example.com', 'This is a booking request, not a confirmed reservation.']) { if (!dolphinRequestMessage.includes(detail)) throw new Error('Dolphin tour request is missing or misstates: ' + detail); }
  console.log('PASS Dolphin Tour uses the shared booking-form template and carries tour, guest and pickup details to WhatsApp');
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
  await page.locator('#headerSearchButton').click();
  await page.locator('#headerSearchInput').fill('North Bali');
  await page.locator('#btSearchForm').press('Enter');
  await page.waitForFunction(() => location.pathname.endsWith('/index.html') && new URLSearchParams(location.search).get('q') === 'North Bali');
  await page.waitForFunction(() => document.querySelector('#searchResultsDropdown')?.textContent.includes('North Bali'));
  console.log('PASS search from standalone pages returns to matching homepage results');

  await page.goto('http://127.0.0.1:4173/transport-service.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.bt-site-header[data-ready="true"]');
  await page.locator('#mobileMenuButton').click();
  const menuState = await page.evaluate(() => ({ className: document.querySelector('#mobileMenuPanel')?.className, expanded: document.querySelector('#mobileMenuButton')?.getAttribute('aria-expanded'), display: getComputedStyle(document.querySelector('#mobileMenuPanel')).display, height: document.querySelector('#mobileMenuPanel').getBoundingClientRect().height }));
  if (!(await page.locator('#mobileMenuPanel').isVisible())) throw new Error('Shared mobile navigation did not open: ' + JSON.stringify(menuState));
  await page.mouse.click(2, 790);
  if (await page.locator('#mobileMenuPanel').isVisible()) throw new Error('Shared mobile navigation did not close after an outside click');
  await page.locator('#mobileMenuButton').click();
  await page.getByRole('link', { name: 'Travel guides' }).last().click();
  await page.waitForURL('**/index.html?page=blog');
  console.log('PASS shared shell, outside-click close and working travel-guide route');
  await page.goto('http://127.0.0.1:4173/private-transport.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.bt-site-header[data-ready="true"]');
  await page.evaluate(() => { window.__capturedWhatsApp = []; window.open = (url) => { window.__capturedWhatsApp.push(String(url)); return null; }; });
  await page.locator('input[name="direction"][value="to"]').check();
  await page.locator('#pickup').fill('Kuta family hotel');
  await page.locator('#destinationAirport').selectOption({ index: 0 });
  const nextDay = await page.evaluate(() => { const d = new Date(); d.setDate(d.getDate() + 2); return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-'); });
  await page.locator('#travelDate').fill(nextDay);
  await page.locator('#travelTime').fill('10:30');
  await page.locator('#flightNumber').fill('QZ 506');
  await page.locator('#passengers').selectOption({ label: '3 passengers' });
  await page.locator('#notes').fill('Please quote a child seat.');
  await page.locator('#transportForm button[type="submit"]').click();
  await page.waitForFunction(() => window.__capturedWhatsApp && window.__capturedWhatsApp.length === 1);
  const privateTransportRequest = await page.evaluate(() => window.__capturedWhatsApp[0]);
  const privateTransportUrl = new URL(privateTransportRequest);
  const privateTransportMessage = privateTransportUrl.searchParams.get('text') || '';
  if (privateTransportUrl.hostname !== 'wa.me' || privateTransportUrl.pathname !== '/628218187917') throw new Error('Private transport must target the configured WhatsApp number');
  for (const detail of ['Airport transfer', 'Kuta family hotel', 'Ngurah Rai International Airport', nextDay, '10:30', 'QZ 506', '3 passengers', 'Please quote a child seat.']) { if (!privateTransportMessage.includes(detail)) throw new Error('Private transport WhatsApp message is missing: ' + detail); }
  await page.locator('[data-service="daily"]').click();
  if (!(await page.locator('#durationWrap').isVisible()) || await page.locator('#flightWrap').isVisible()) throw new Error('Daily car hire must show duration and hide flight-only fields');
  await page.locator('[data-service="harbour"]').click();
  if (!(await page.locator('#directionField').isVisible()) || await page.locator('#flightWrap').isVisible()) throw new Error('Harbour transfer must show direction and hide airport flight fields');
  console.log('PASS private transport WhatsApp enquiry includes trip details; service tabs switch correctly');

  await page.goto('http://127.0.0.1:4173/index.html?page=contact', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelector('#contactEnquiryForm'));
  await page.evaluate(() => { window.__capturedWhatsApp = []; window.open = (url) => { window.__capturedWhatsApp.push(String(url)); return null; }; });
  await page.locator('#contactName').fill('Browser Test Guest');
  await page.locator('#contactEmail').fill('guest@example.com');
  await page.locator('#contactService').selectOption({ label: 'Private transport' });
  await page.locator('#contactMessage').fill('Please quote a private car from Kuta to Ubud.');
  await page.locator('#contactEnquiryForm button[type="submit"]').click();
  await page.waitForFunction(() => window.__capturedWhatsApp && window.__capturedWhatsApp.length === 1);
  const contactRequest = await page.evaluate(() => window.__capturedWhatsApp[0]);
  const contactUrl = new URL(contactRequest);
  const contactMessage = contactUrl.searchParams.get('text') || '';
  if (contactUrl.hostname !== 'wa.me' || contactUrl.pathname !== '/628218187917') throw new Error('Contact enquiry must target the configured WhatsApp number');
  for (const detail of ['Browser Test Guest', 'guest@example.com', 'Private transport', 'Please quote a private car from Kuta to Ubud.']) { if (!contactMessage.includes(detail)) throw new Error('Contact WhatsApp message is missing: ' + detail); }
  console.log('PASS Contact enquiry opens configured WhatsApp with guest details');

  const quoteFormCases = [
    { route: 'bali-intercity-transfer.html', service: 'Bali Intercity Transfer', fields: { pickup: 'Kuta family hotel', destination: 'Ubud family hotel' } },
    { route: 'bali-port-transfer.html', service: 'Bali Port Transfer', fields: { port: 'Padangbai Harbour', route: 'Ubud family hotel' } },
    { route: 'bali-private-day-tour.html', service: 'Bali Private Day Tour', fields: { pickup: 'Kuta family hotel', places: 'Uluwatu Temple and Jimbaran Bay' } }
  ];
  for (const item of quoteFormCases) {
    await page.goto('http://127.0.0.1:4173/' + item.route, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => { window.__capturedWhatsApp = []; window.open = (url) => { window.__capturedWhatsApp.push(String(url)); return null; }; });
    await page.locator('#date').fill(nextDay);
    await page.locator('#time').fill('10:00');
    for (const [id, value] of Object.entries(item.fields)) {
      const field = page.locator('#' + id);
      if (await field.evaluate(el => el.tagName === 'SELECT')) await field.selectOption({ label: value });
      else await field.fill(value);
    }
    await page.locator('#tripForm button[type="submit"]').click();
    await page.waitForFunction(() => window.__capturedWhatsApp && window.__capturedWhatsApp.length === 1);
    const requestUrl = new URL(await page.evaluate(() => window.__capturedWhatsApp[0]));
    const requestMessage = requestUrl.searchParams.get('text') || '';
    if (requestUrl.hostname !== 'wa.me' || requestUrl.pathname !== '/628218187917') throw new Error(item.route + ': request must use the shared WhatsApp number');
    if (!requestMessage.includes(item.service)) throw new Error(item.route + ': WhatsApp request is missing its service name');
    for (const value of Object.values(item.fields)) if (!requestMessage.includes(value)) throw new Error(item.route + ': WhatsApp request is missing ' + value);
  }
  console.log('PASS intercity, port and day-tour enquiry forms use the shared WhatsApp number and preserve entered details');

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

  await page.goto('http://127.0.0.1:4173/bali-airport-transfer.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.bt-site-header[data-ready="true"]');
  if (await page.locator('.bt-service-tab, .bt-car-carousel, .bt-fleet-section, .bt-meal-stop').count()) throw new Error('Airport transfer page must not show service/vehicle carousels or meal add-ons inside the availability filter');
  const airportMin = await page.locator('#btDate').getAttribute('min');
  if (!airportMin || await page.locator('#btDate').inputValue() < airportMin) throw new Error('Airport search must default to a date at least three days ahead');
  if (!(await page.locator('input[name="btDirection"][value="from"]').count()) || !(await page.locator('input[name="btDirection"][value="to"]').count())) throw new Error('Airport transfer must offer both directions');
  if (await page.locator('#btDateGuide, #btDateNote, .bt-date-guide').count()) throw new Error('Airport search filter must not display schedule dates; availability dates belong on vehicle cards only');
  const fleetNames = ['Wuling Confero', 'Toyota Avanza', 'R3', 'Toyota Innova Reborn', 'Toyota Innova Zenix', 'Toyota HiAce Commuter', 'Toyota HiAce Premio'];
  const fleetText = await page.locator('#btFleetShowcase').innerText();
  for (const name of fleetNames) if (!fleetText.includes(name)) throw new Error('Airport fleet showcase missing: ' + name);
  if (await page.locator('#btFleetShowcase .bt-card-date-chips .bt-date-chip').count() < 7) throw new Error('Each airport vehicle card must include a compact date guide');
  // Deep regression check: the catalogue itself must be a horizontal carousel,
  // distinct from the photo gallery inside each card.
  const savedViewport = page.viewportSize() || { width: 1280, height: 900 };
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(100);
  const fleetLayout = await page.locator('#btFleetShowcase #btFleetSliderTrack').evaluate(track => {
    const cards = [...track.querySelectorAll(':scope > .bt-fleet-card')];
    const first = cards[0]?.getBoundingClientRect();
    const second = cards[1]?.getBoundingClientRect();
    const style = getComputedStyle(track);
    return {
      display: style.display,
      flexWrap: style.flexWrap,
      cardCount: cards.length,
      scrollWidth: track.scrollWidth,
      clientWidth: track.clientWidth,
      firstTop: first?.top,
      secondTop: second?.top,
      firstLeft: first?.left,
      secondLeft: second?.left
    };
  });
  if (fleetLayout.display !== 'flex' || fleetLayout.flexWrap !== 'nowrap' || fleetLayout.cardCount !== 7 ||
      fleetLayout.scrollWidth <= fleetLayout.clientWidth ||
      Math.abs(fleetLayout.firstTop - fleetLayout.secondTop) > 2 ||
      fleetLayout.secondLeft <= fleetLayout.firstLeft) {
    throw new Error('Airport fleet must be a horizontally scrolling single-row carousel on mobile: ' + JSON.stringify(fleetLayout));
  }
  await page.locator('#btFleetShowcase #btFleetSliderTrack').evaluate(track => { track.scrollLeft = track.clientWidth * 0.75; });
  await page.waitForTimeout(50);
  if (await page.locator('#btFleetShowcase #btFleetSliderTrack').evaluate(track => track.scrollLeft) <= 0) {
    throw new Error('Airport fleet carousel must respond to horizontal scrolling');
  }
  await page.setViewportSize(savedViewport);
  await page.locator('input[name="btDirection"][value="to"]').check();
  if (!(await page.locator('#btTerminalField').isHidden())) throw new Error('Airport terminal field should hide for trips to the airport');
  await page.locator('input[name="btDirection"][value="from"]').check();
  await page.locator('#btDestination').fill('Ubud');
  await page.locator('#btAvailabilityForm button[type="submit"]').click();
  await page.waitForFunction(() => document.querySelector('#btAvailabilityResult')?.textContent.includes('Vehicle options for your journey'));
  if (!(await page.locator('#btAvailabilityResult .bt-results-group').count())) throw new Error('Airport search must group results by regular, premium and van category');
  if (!(await page.locator('#btAvailabilityResult [data-book-car]').first().isVisible())) throw new Error('Airport search must show a per-vehicle booking CTA');
  const searchTrack = page.locator('#btAvailabilityResult .bt-results-list').first();
  const searchLayout = await searchTrack.evaluate(el => ({display:getComputedStyle(el).display,wrap:getComputedStyle(el).flexWrap,overflow:getComputedStyle(el).overflowX,scrollWidth:el.scrollWidth,clientWidth:el.clientWidth,cards:el.querySelectorAll('.bt-result-vehicle').length}));
  if (searchLayout.display !== 'flex' || searchLayout.wrap !== 'nowrap' || searchLayout.overflow === 'visible' || searchLayout.cards < 2 || searchLayout.scrollWidth <= searchLayout.clientWidth) throw new Error('Airport search results must form a responsive horizontal carousel');
  if (!(await page.locator('#btAvailabilityResult .bt-result-trip-date').first().isVisible())) throw new Error('Each airport search result card must show the selected trip date and time full-width');
  if (await page.locator('#btAvailabilityResult .bt-date-status-legend').count()) throw new Error('Airport vehicle cards must not show the small bookable/not-bookable legend');
  await page.locator('#btAvailabilityResult [data-book-car]').first().click();
  await page.waitForURL('**/booking-form.html?**');
  if (await page.locator('.bt-site-header, .bt-site-footer, .booking-footer').count()) throw new Error('Booking form must not show the global navbar or footer');
  if (!(await page.locator('#summaryVehicle').textContent()).includes('Wuling Confero') || !(await page.locator('#summaryLocation').textContent()).includes('Ubud') || !(await page.locator('#summaryDate').textContent()).length) throw new Error('Airport booking form must preserve selected vehicle, destination and date');
  console.log('PASS airport transfer filter, three-day booking rule, fleet display, date guide, category results and clean booking form');

  await page.goto('http://127.0.0.1:4173/car-rental.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.bt-site-header[data-ready="true"]');
  if (await page.locator('.bt-service-tab').count() !== 4 || await page.locator('.bt-car-card').count() !== 10) {
    throw new Error('Car rental page must show four service tabs and ten vehicle cards');
  }
  const rentalMin = await page.locator('#rentalDate').getAttribute('min');
  if (!rentalMin || await page.locator('#rentalDate').inputValue() < rentalMin) throw new Error('Car rental must default to a date at least two days ahead');
  for (const label of ['All Car', 'Regular Car', 'Premium Car', 'Minivan / Minibus']) if (!(await page.getByRole('button', { name: label, exact: true }).count())) throw new Error('Rental vehicle category missing: ' + label);
  if (!(await page.locator('#rentalPassengers option[value="15"]').count())) throw new Error('Rental passenger selector must support groups up to 15');
  await page.locator('#rentalPassengers').selectOption('6');
  if (!(await page.locator('[data-rental-class="minivan"].is-active').count())) throw new Error('Six rental passengers must automatically select Minivan / Minibus');
  if (await page.locator('#btRentalCarousel .bt-car-card:visible').count() !== 1 || !(await page.locator('#btRentalCarousel [data-car="Toyota HiAce"]:visible').count())) throw new Error('Six rental passengers must see the minivan option only');
  await page.locator('#rentalPassengers').selectOption('2');
  if (!(await page.locator('[data-rental-class="all"].is-active').count())) throw new Error('Changing back to fewer than six rental passengers must restore All Car');
  await page.locator('#rentalPickup').fill('Seminyak hotel');
  await page.locator('#btRentalForm button[type="submit"]').click();
  await page.waitForFunction(() => document.querySelector('#rentalAvailabilityResult')?.textContent.includes('vehicles available'));
  const rentalBookButton = page.locator('#rentalAvailabilityResult [data-book-rental]').first();
  if (!(await rentalBookButton.isVisible())) throw new Error('Car rental search must show a per-vehicle booking CTA');
  await rentalBookButton.click();
  await page.waitForURL('**/booking-form.html?**');
  if (await page.locator('.bt-site-header, .bt-site-footer, .booking-footer').count()) throw new Error('Rental booking form must not show the global navbar or footer');
  if (!(await page.locator('#summaryVehicle').textContent()).includes('Toyota Avanza') || !(await page.locator('#summaryLocation').textContent()).includes('Seminyak hotel') || !(await page.locator('#summaryDuration').textContent()).includes('8 hours')) throw new Error('Rental booking form must preserve vehicle, pickup and duration');
  console.log('PASS rental vehicle CTA opens clean booking form with trip details preserved');

  const standalonePages = [
    'car-rental.html', 'bali-adventure-activities.html', 'bali-airport-transfer.html',
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

  await page.goto('http://127.0.0.1:4173/transport-service.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.bt-site-header[data-ready="true"]');
  await page.locator('#localeButton').click();
  if (await page.locator('#localeMenu [data-locale]').count() !== 2) {
    throw new Error('Language menu must contain exactly English and Indonesian');
  }
  await page.locator('#localeMenu [data-locale="en"]').click();
  await page.waitForFunction(() => location.pathname.endsWith('/index.html') && localStorage.getItem('baliTransLanguage') === 'en');
  await page.waitForFunction(() => document.querySelector('#localeCurrentCode')?.textContent.trim() === 'EN');
  if (await page.locator('.bt-site-header').count() !== 1 || await page.locator('#localeButton #localeCurrentCode').count() !== 1) {
    throw new Error('English selection duplicated the shared header or language label');
  }
  await page.locator('#localeButton').click();
  await page.locator('#localeMenu [data-locale="id"]').click();
  await page.waitForFunction(() => localStorage.getItem('baliTransLanguage') === 'id');
  await page.waitForFunction(() => document.querySelector('#localeCurrentCode')?.textContent.trim() === 'ID');
  if (await page.locator('#localeMenu [data-locale]').count() !== 2) {
    throw new Error('Language menu changed unexpectedly after switching back to Indonesian');
  }
  console.log('PASS English/Indonesian switching, persisted locale, and single shared header');

  if (pageErrors.length) throw new Error('Browser JavaScript errors: ' + pageErrors.join(' | '));
  console.log('PASS no uncaught browser JavaScript errors');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
