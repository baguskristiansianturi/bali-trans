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
    help: home + '?page=help',
    faq: home + '?page=help-topic&item=faq',
    terms: home + '?page=terms',
    privacy: home + '?page=privacy',
    account: home + '?page=account',
    partners: home + '?page=partners'
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
  const linkHTML = links.map(([label, url]) => '<a href="' + url.replace(/&/g, '&amp;') + '">' + label + '</a>').join('');
  const isHomePage = !!document.querySelector('#appContainer');
  const hasLiveChatBar = !!document.getElementById('topLiveChatState');
  const localeOptions = [
    { code: 'id', flag: '🇮🇩', name: 'Bahasa Indonesia', detail: 'Bahasa Indonesia · IDR', check: 'localeCheckId' },
    { code: 'en', flag: '🇬🇧', name: 'English', detail: 'English · USD ($)', check: 'localeCheckEn' }
  ];
  const localeHTML = localeOptions.map(option =>
    '<button type="button" class="bt-locale-option locale-option" data-locale="' + option.code + '">' +
      '<span class="bt-locale-flag">' + option.flag + '</span>' +
      '<span class="bt-locale-copy"><span class="bt-locale-name">' + option.name + '</span><span class="bt-locale-description">' + option.detail + '</span></span>' +
      '<span id="' + option.check + '" class="bt-locale-check hidden" aria-hidden="true">✓</span>' +
    '</button>'
  ).join('');
  const mobileExtraHTML = isHomePage
    ? '<div class="bt-mobile-extras">' +
        '<button type="button" data-shell-action="help">Help</button>' +
        '<button type="button" data-shell-action="register">Log in / Create account</button>' +
        '<button type="button" data-shell-action="wishlist">Wishlist <span id="mobileWishlistCount">(0)</span></button>' +
        '<button type="button" data-shell-action="recent">Recently viewed</button>' +
      '</div>'
    : '';
  const header = document.createElement('header');
  header.className = 'bt-site-header';
  header.innerHTML =
    '<div class="bt-shell"><div class="bt-header-row">' +
      '<a class="bt-brand" href="' + routes.home + '" aria-label="Bali Trans home">' +
        '<span class="bt-brand-mark">B</span><span class="bt-brand-copy"><span class="bt-brand-name">Bali<span> Trans</span></span></span>' +
      '</a><div class="bt-actions">' +
        '<button class="bt-action" type="button" id="headerSearchButton" aria-label="Search" title="Search" aria-controls="headerSearchPanel" aria-expanded="false"><svg id="headerSearchIcon" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg></button>' +
        '<a class="bt-desktop-link" href="' + routes.help + '" aria-label="Help" title="Help"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M9.6 9a2.5 2.5 0 0 1 4.8.9c0 1.8-2.4 2.1-2.4 3.8M12 17h.01"></path></svg><span>Help</span></a>' +
        '<a class="bt-desktop-link" href="' + routes.guides + '" aria-label="Blog" title="Blog"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h14v15H5zM8 8h8M8 11h8M8 14h5"></path></svg><span>Blog</span></a>' +
        '<button class="bt-desktop-link bt-recent-action" type="button" data-shell-action="recent" aria-label="Recently viewed" title="Recently viewed"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg><span>Recently viewed</span></button>' +
        '<div class="bt-account-control"><button class="bt-action" type="button" id="accountMenuButton" aria-label="Account" title="Account" aria-controls="accountMenu" aria-expanded="false"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20c.6-3.3 3-5 7-5s6.4 1.7 7 5"></path></svg></button><div class="bt-account-menu hidden" id="accountMenu"><a href="' + routes.account + '" data-account-action="login">Log in</a><a href="' + routes.account + '&amp;mode=register" data-account-action="register">Create account</a><button type="button" data-account-action="logout" class="hidden">Log out</button></div></div>' +
        '<div class="bt-locale-control" id="localeControl">' +
          '<button class="bt-locale" type="button" id="localeButton" aria-label="Language and currency" aria-controls="localeMenu" aria-expanded="false"><span class="bt-locale-flag" id="localeCurrentFlag" aria-hidden="true">🇮🇩</span><span id="localeCurrentCode" class="bt-locale-current-code">IDR</span></button>' +
          '<div class="bt-locale-menu hidden" id="localeMenu">' + localeHTML + '</div>' +
        '</div>' +
                '<button class="bt-action bt-mobile-toggle" type="button" id="mobileMenuButton" aria-label="Open menu" aria-controls="mobileMenuPanel" aria-expanded="false"><svg id="mobileMenuIcon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"></path></svg></button>' +
        (hasLiveChatBar ? '' : '<a class="bt-live-chat" href="' + routes.contact + '" aria-label="Live Chat status: offline"><span class="bt-live-dot" aria-hidden="true"></span><span><strong>Live Chat</strong><small>Offline</small></span></a>') +
      '</div>' +
    '</div></div>' +
    '<div class="bt-search-panel hidden" id="headerSearchPanel"><div class="bt-shell">' +
      '<form id="btSearchForm" role="search"><label class="bt-search-label" for="headerSearchInput">Search Bali tours and services</label>' +
      '<input class="bt-search-input" type="search" id="headerSearchInput" placeholder="Search tours, activities or places..." aria-label="Search tours, activities or places">' +
      '<div class="bt-search-results hidden" id="searchResultsDropdown"></div></form>' +
    '</div></div>' +
    '<div class="bt-mobile-panel hidden" id="mobileMenuPanel"><div class="bt-shell">' +
      '<nav class="bt-mobile-links" aria-label="Mobile navigation">' + linkHTML + '</nav>' + mobileExtraHTML +
    '</div></div>';
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
        '<section><h2>Help &amp; support</h2><ul><li><a href="' + routes.help + '">Help centre</a></li><li><a href="' + routes.faq + '">FAQs</a></li><li><a href="' + routes.contact + '">Contact our team</a></li></ul></section>' +
        '<section><h2>About us</h2><ul><li><a href="' + routes.about + '">About Bali Trans</a></li><li><a href="' + routes.terms + '">Terms &amp; conditions</a></li><li><a href="' + routes.privacy + '">Privacy policy</a></li><li><a href="' + routes.partners + '">Partner enquiries</a></li></ul></section>' +
        '<section><h2>Your account</h2><ul><li><a href="' + routes.account + '">Create account</a></li><li><a href="' + routes.tours + '">Continue as guest</a></li><li><a href="' + routes.contact + '">Booking assistance</a></li></ul></section>' +
      '</div></div>' +
      '<div class="bt-footer-note"><span class="bt-footer-note-icon" aria-hidden="true">ⓘ</span><div><strong>Planning something special in Bali?</strong><p>Tell us your destination, dates and group size. Confirm trip details, prices and availability with our team before booking.</p></div></div>' +
      '<div class="bt-footer-bottom"><p>© 2026 Bali Trans. Tours, experiences and private transport in Bali.</p><p>Trip details, prices and availability should be confirmed with our team before booking.</p></div></div>';

  function init() {
    // Rebuild the shared shell from one canonical template instead of retaining stale/duplicated controls.
    document.querySelectorAll('.bt-site-header, .bt-site-footer').forEach(node => node.remove());

    // Preserve the approved four-item mobile bottom navigation on the SPA homepage.
    // The shared header supplements this navigation; it must never remove it.
    const announcement = document.getElementById('countdownTimer');
    const announcementBar = announcement && announcement.parentElement && announcement.parentElement.parentElement;
    if (announcementBar && announcementBar.parentElement === document.body) {
      announcementBar.insertAdjacentElement('afterend', header);
    } else {
      document.body.insertBefore(header, document.body.firstChild);
    }
    document.body.appendChild(footer);

    const localeButton = document.getElementById('localeButton');
    const localeMenu = document.getElementById('localeMenu');
    const searchButton = document.getElementById('headerSearchButton');
    const searchPanel = document.getElementById('headerSearchPanel');
    const searchInput = document.getElementById('headerSearchInput');
    const searchForm = document.getElementById('btSearchForm');
    const mobileButton = document.getElementById('mobileMenuButton');
    const mobilePanel = document.getElementById('mobileMenuPanel');
    const accountButton = document.getElementById('accountMenuButton');
    const accountMenu = document.getElementById('accountMenu');
    function refreshAccountMenu() {
      let signedIn = false;
      try { signedIn = !!(localStorage.getItem('baliTransUser') || localStorage.getItem('baliTransSession')); } catch (e) {}
      accountMenu?.querySelectorAll('[data-account-action="login"],[data-account-action="register"]').forEach(el => el.classList.toggle('hidden', signedIn));
      const logout = accountMenu?.querySelector('[data-account-action="logout"]');
      if (logout) logout.classList.toggle('hidden', !signedIn);
    }
    refreshAccountMenu();

    function closePanels() {
      if (localeMenu) localeMenu.classList.add('hidden');
      if (searchPanel) searchPanel.classList.add('hidden');
      if (mobilePanel) mobilePanel.classList.add('hidden');
      if (accountMenu) accountMenu.classList.add('hidden');
      accountButton?.setAttribute('aria-expanded', 'false');
      localeButton?.setAttribute('aria-expanded', 'false');
      searchButton?.setAttribute('aria-expanded', 'false');
      mobileButton?.setAttribute('aria-expanded', 'false');
      if (searchButton) searchButton.setAttribute('aria-label', 'Open search');
      if (mobileButton) mobileButton.setAttribute('aria-label', 'Open menu');
      const searchIcon = document.getElementById('headerSearchIcon');
      const mobileIcon = document.getElementById('mobileMenuIcon');
      if (searchIcon) searchIcon.innerHTML = '<circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path>';
      if (mobileIcon) mobileIcon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16"></path>';
    }

    localeButton?.addEventListener('click', function (event) {
      event.stopPropagation();
      const opening = localeMenu.classList.contains('hidden');
      closePanels();
      if (opening) {
        localeMenu.classList.remove('hidden');
        localeButton.setAttribute('aria-expanded', 'true');
      }
    });
    localeMenu?.querySelectorAll('[data-locale]').forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.stopPropagation();
        const code = button.dataset.locale;
        closePanels();
        if (isHomePage && typeof window.changeLocale === 'function') {
          window.changeLocale(code);
        } else {
          const target = new URL(home, window.location.href);
          target.searchParams.set('locale', code);
          window.location.href = target.href;
        }
      });
    });
    searchButton?.addEventListener('click', function (event) {
      event.stopPropagation();
      const opening = searchPanel.classList.contains('hidden');
      closePanels();
      if (opening) {
        searchPanel.classList.remove('hidden');
        searchButton.setAttribute('aria-expanded', 'true');
        searchButton.setAttribute('aria-label', 'Close search');
        document.getElementById('headerSearchIcon').innerHTML = '<path d="m6 6 12 12M18 6 6 18"></path>';
        searchInput.focus();
      }
    });
    accountButton?.addEventListener('click', function (event) {
      event.stopPropagation();
      const opening = accountMenu.classList.contains('hidden');
      closePanels();
      if (opening) {
        refreshAccountMenu();
        accountMenu.classList.remove('hidden');
        accountButton.setAttribute('aria-expanded', 'true');
      }
    });
    accountMenu?.addEventListener('click', function(event) {
      const action = event.target.closest('[data-account-action]')?.dataset.accountAction;
      if (action === 'logout') {
        try { localStorage.removeItem('baliTransUser'); localStorage.removeItem('baliTransSession'); } catch(e) {}
        refreshAccountMenu();
        closePanels();
        window.location.href = routes.home;
      } else if (action === 'register') {
        event.preventDefault();
        closePanels();
        if (isHomePage && typeof window.showRegisterPrompt === 'function') window.showRegisterPrompt();
        else window.location.href = routes.account + '&mode=register';
      }
    });
    mobileButton?.addEventListener('click', function (event) {
      event.stopPropagation();
      const opening = mobilePanel.classList.contains('hidden');
      closePanels();
      if (opening) {
        mobilePanel.classList.remove('hidden');
        mobileButton.setAttribute('aria-expanded', 'true');
        mobileButton.setAttribute('aria-label', 'Close menu');
        document.getElementById('mobileMenuIcon').innerHTML = '<path d="m6 6 12 12M18 6 6 18"></path>';
      }
    });

    searchInput?.addEventListener('input', function () {
      if (typeof window.handleGlobalSearch === 'function') window.handleGlobalSearch(searchInput.value);
    });
    searchForm?.addEventListener('submit', function (event) {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (!query) return;
      if (isHomePage && typeof window.handleGlobalSearch === 'function') {
        window.handleGlobalSearch(query);
        return;
      }
      const target = new URL(routes.tours, window.location.href);
      target.searchParams.set('q', query);
      window.location.href = target.href;
    });

    function routeLink(event, link) {
      if (!isHomePage || typeof window.navigateTo !== 'function') return;
      const target = new URL(link.href, window.location.href);
      if (!target.pathname.endsWith('/index.html') && !target.pathname.endsWith('/')) return;
      event.preventDefault();
      const view = target.searchParams.get('page') || 'home';
      const item = target.searchParams.get('item');
      window.navigateTo(view, item);
      closePanels();
    }
    header.addEventListener('click', function (event) {
      const link = event.target.closest('a');
      if (link) routeLink(event, link);
    });
    footer.addEventListener('click', function (event) {
      const link = event.target.closest('a');
      if (link) routeLink(event, link);
    });
    header.querySelectorAll('[data-shell-action]').forEach(function (button) {
      button.addEventListener('click', function () {
        closePanels();
        const action = button.dataset.shellAction;
        const actions = {
          help: 'showHelpMenu',
          register: 'showRegisterPrompt',
          wishlist: 'toggleWishlistModal',
          recent: 'showRecentlyViewed'
        };
        const fn = actions[action];
        if (isHomePage && fn && typeof window[fn] === 'function') window[fn]();
        else window.location.href = routes.contact;
      });
    });
    document.addEventListener('click', function (event) {
      if (event.target && header.contains(event.target)) return;
      closePanels();
    });

    if (typeof window.syncLocaleSelector === 'function') window.syncLocaleSelector();
    const params = new URLSearchParams(window.location.search);
    if (isHomePage && params.has('locale') && typeof window.changeLocale === 'function') {
      window.changeLocale(params.get('locale'));
      params.delete('locale');
      const query = params.toString();
      history.replaceState(history.state, '', window.location.pathname + (query ? '?' + query : '') + window.location.hash);
    }
    if (isHomePage && params.has('q') && typeof window.handleGlobalSearch === 'function') {
      const query = params.get('q');
      searchPanel.classList.remove('hidden');
      searchButton.setAttribute('aria-expanded', 'true');
      searchButton.setAttribute('aria-label', 'Close search');
      document.getElementById('headerSearchIcon').textContent = '×';
      searchInput.value = query;
      window.handleGlobalSearch(query);
    }
    header.dataset.ready = 'true';
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();