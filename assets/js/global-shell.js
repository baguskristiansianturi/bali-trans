/* Shared shell for standalone content pages. Checkout pages intentionally stay distraction-free. */
(function () {
  'use strict';

  const home = './index.html';
  const routes = {
    home,
    destinations: home + '?page=discovery&item=region%3Asouth',
    tours: home + '?page=packages',
    guides: home + '?page=blog',
    about: home + '?page=about',
    contact: home + '?page=contact',
    help: home + '?page=help'
  };
  const links = [
    ['Home', routes.home],
    ['Destinations', routes.destinations],
    ['Tours', routes.tours],
    ['Transport service', './transport-service.html'],
    ['Travel guides', routes.guides],
    ['About', routes.about],
    ['Contact', routes.contact]
  ];
  const linkHTML = links.map(([label, url]) => '<a href="' + url + '">' + label + '</a>').join('');

  const header = document.createElement('header');
  header.className = 'bt-site-header';
  header.innerHTML =
    '<div class="bt-shell"><div class="bt-header-row">' +
      '<a class="bt-brand" href="' + routes.home + '" aria-label="Bali Trans home">' +
        '<span class="bt-brand-mark">B</span><span class="bt-brand-copy"><span class="bt-brand-name">Bali<span> Trans</span></span><span class="bt-brand-tag">TOURS · TRIPS · TRANSFER</span></span>' +
      '</a><nav class="bt-main-nav" aria-label="Main navigation">' + linkHTML + '</nav>' +
      '<div class="bt-actions"><a class="bt-locale" href="' + routes.home + '" aria-label="Language and currency">🇮🇩 <span>IDR</span>⌄</a>' +
        '<button class="bt-action" type="button" id="btSearchToggle" aria-label="Open search" aria-controls="btSearchPanel" aria-expanded="false"><span aria-hidden="true">⌕</span></button>' +
        '<button class="bt-action bt-mobile-toggle" type="button" id="btMenuToggle" aria-label="Open menu" aria-controls="btMobilePanel" aria-expanded="false"><span aria-hidden="true">☰</span></button>' +
      '</div></div></div>' +
    '<div class="bt-search-panel bt-hidden" id="btSearchPanel"><div class="bt-shell"><form id="btSearchForm" role="search"><label class="bt-search-label" for="btSearchInput">Search Bali tours and services</label><input class="bt-search-input" type="search" id="btSearchInput" placeholder="Search tours, activities or places..." aria-label="Search tours, activities or places"><p class="bt-search-hint">Search is available from the main Bali Trans homepage.</p></form></div></div>' +
    '<div class="bt-mobile-panel bt-hidden" id="btMobilePanel"><div class="bt-shell"><nav class="bt-mobile-links" aria-label="Mobile navigation">' + linkHTML + '</nav></div></div>';

  const footer = document.createElement('footer');
  footer.className = 'bt-site-footer';
  footer.innerHTML =
    '<div class="bt-footer-inner"><div class="bt-footer-grid">' +
      '<div class="bt-footer-intro"><a class="bt-footer-brand" href="' + routes.home + '" aria-label="Bali Trans home"><span class="bt-brand-mark">B</span><span class="bt-brand-name">Bali<span> Trans</span></span></a>' +
        '<p class="bt-footer-copy">Discover Bali tours, local experiences and private transport. Compare trip details and contact our team to discuss your plans before booking.</p>' +
        '<a class="bt-footer-cta" href="' + routes.contact + '">Talk to our team <span aria-hidden="true">→</span></a>' +
        '<div class="bt-footer-highlights"><div><strong>Explore Bali</strong><span>Tours and places worth discovering.</span></div><div><strong>Private transport</strong><span>Discuss routes, pickup and timing.</span></div></div></div>' +
      '<div class="bt-footer-cols">' +
        '<section><h2>Discover</h2><ul><li><a href="' + routes.tours + '">All tours &amp; activities</a></li><li><a href="' + routes.destinations + '">South Bali</a></li><li><a href="' + home + '?page=discovery&amp;item=region%3Acentral">Central Bali</a></li><li><a href="' + home + '?page=discovery&amp;item=region%3Anorth">North Bali</a></li><li><a href="' + routes.guides + '">Blog</a></li></ul></section>' +
        '<section><h2>Plan your trip</h2><ul><li><a href="' + routes.tours + '">Tour packages</a></li><li><a href="./transport-service.html">Private transport</a></li><li><a href="./bali-airport-transfer.html">Airport transfer</a></li><li><a href="./bali-port-transfer.html">Port transfer</a></li><li><a href="./bali-private-day-tour.html">Private day tour</a></li></ul></section>' +
        '<section><h2>Help &amp; support</h2><ul><li><a href="' + routes.help + '">Help centre</a></li><li><a href="' + routes.help + '">FAQs</a></li><li><a href="' + routes.contact + '">Contact our team</a></li></ul></section>' +
        '<section><h2>About us</h2><ul><li><a href="' + routes.about + '">About Bali Trans</a></li><li><a href="./terms-and-conditions.html">Terms &amp; conditions</a></li><li><a href="' + routes.contact + '">Privacy questions</a></li></ul></section>' +
      '</div></div>' +
      '<div class="bt-footer-note"><span class="bt-footer-note-icon" aria-hidden="true">ⓘ</span><div><strong>Planning something special in Bali?</strong><p>Tell us your destination, dates and group size. Confirm trip details, prices and availability with our team before booking.</p></div></div>' +
      '<div class="bt-footer-bottom"><p>© 2026 Bali Trans. Tours, experiences and private transport in Bali.</p><p>Trip details, prices and availability should be confirmed with our team before booking.</p></div></div>';

  function init() {
    if (document.querySelector('.bt-site-header')) return;
    const announcement = document.getElementById('countdownTimer');
    const announcementBar = announcement && announcement.parentElement && announcement.parentElement.parentElement;
    if (announcementBar && announcementBar.parentElement === document.body) {
      announcementBar.insertAdjacentElement('afterend', header);
    } else {
      document.body.insertBefore(header, document.body.firstChild);
    }
    document.body.appendChild(footer);

    const menu = document.getElementById('btMenuToggle');
    const panel = document.getElementById('btMobilePanel');
    const search = document.getElementById('btSearchToggle');
    const searchPanel = document.getElementById('btSearchPanel');
    const form = document.getElementById('btSearchForm');
    const input = document.getElementById('btSearchInput');

    function closePanels() {
      panel.classList.add('bt-hidden');
      searchPanel.classList.add('bt-hidden');
      menu.setAttribute('aria-expanded', 'false');
      search.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open menu');
      menu.innerHTML = '<span aria-hidden="true">☰</span>';
      search.setAttribute('aria-label', 'Open search');
    }
    document.addEventListener('click', function (event) {
      const target = event.target && typeof event.target.closest === 'function'
        ? event.target.closest('button')
        : null;
      if (target && target.id === 'btMenuToggle') {
        const open = panel.classList.contains('bt-hidden');
        closePanels();
        if (open) {
          panel.classList.remove('bt-hidden');
          menu.setAttribute('aria-expanded', 'true');
          menu.setAttribute('aria-label', 'Close menu');
          menu.innerHTML = '<span aria-hidden="true">×</span>';
        }
        return;
      }
      if (target && target.id === 'btSearchToggle') {
        const open = searchPanel.classList.contains('bt-hidden');
        closePanels();
        if (open) {
          searchPanel.classList.remove('bt-hidden');
          search.setAttribute('aria-expanded', 'true');
          search.setAttribute('aria-label', 'Close search');
          input.focus();
        }
        return;
      }
      if (event.target && typeof event.target.closest === 'function' && event.target.closest('.bt-site-header')) return;
      closePanels();
    });
    header.querySelectorAll('.bt-mobile-links a, .bt-main-nav a').forEach(function (link) {
      link.addEventListener('click', closePanels);
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const query = input.value.trim();
      if (!query) return;
      location.href = routes.tours + '&q=' + encodeURIComponent(query);
    });
    header.dataset.ready = 'true';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();