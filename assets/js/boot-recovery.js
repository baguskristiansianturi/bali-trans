/* Recover the SPA if a cached or interrupted script leaves the main view empty. */
(function () {
  'use strict';

  function recoverMainView() {
    const app = document.getElementById('appContainer');
    if (!app || app.textContent.trim().length > 30) return;

    const query = new URLSearchParams(window.location.search);
    const requestedView = query.get('page') || 'home';
    const requestedItem = query.get('item');

    // First retry the normal router, preserving the requested route.
    try {
      if (typeof window.navigateTo === 'function') {
        window.navigateTo(requestedView, requestedItem, { replace: true });
      }
    } catch (error) {
      console.error('Bali Trans route recovery failed:', error);
    }

    if (app.textContent.trim().length > 30) return;

    // If routing failed before the view was injected, render the approved homepage
    // directly as a last resort rather than leaving only the shared header/footer.
    if (!query.has('page') && typeof window.renderHomeView === 'function') {
      try {
        app.innerHTML = window.renderHomeView();
        if (typeof window.initHomeInteractivity === 'function') {
          window.initHomeInteractivity();
        }
      } catch (error) {
        console.error('Bali Trans homepage fallback failed:', error);
      }
    }

    // A visible recovery message is preferable to an unexplained blank content area.
    if (!app.textContent.trim()) {
      app.innerHTML = '<section class="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6"><h1 class="text-3xl font-black text-slate-900">Bali Trans</h1><p class="mt-3 max-w-2xl text-base leading-7 text-slate-600">The page did not finish loading. Please reload this page to try again.</p><button type="button" onclick="window.location.reload()" class="mt-6 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white">Reload page</button></section>';
    }
  }

  function scheduleRecovery() {
    window.setTimeout(recoverMainView, 700);
    window.setTimeout(recoverMainView, 2200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleRecovery, { once: true });
  } else {
    scheduleRecovery();
  }
})();
