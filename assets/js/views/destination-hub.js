/* Destination Hub — catalog view, separate from editorial article detail. */
(function () {
  'use strict';

  let destinationMasterPromise = null;
  const publishedStatus = 'PUBLISHED';

  function escapeDestinationText(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[character]));
  }

  function getDestinationMaster() {
    if (!destinationMasterPromise) {
      destinationMasterPromise = fetch('./content/bali-master-data.json')
        .then(response => {
          if (!response.ok) throw new Error('Destination master data could not be loaded.');
          return response.json();
        })
        .catch(error => {
          destinationMasterPromise = null;
          throw error;
        });
    }
    return destinationMasterPromise;
  }

  function getPublishedDestinationEntries(master) {
    const records = Array.isArray(master.destinations) ? master.destinations : [];
    const articles = Array.isArray(BALI_BLOGS) ? BALI_BLOGS : [];
    return articles
      .filter(article => article.publicationStatus === publishedStatus && article.relatedDestinationId)
      .map(article => {
        const destination = records.find(record => record.id === article.relatedDestinationId);
        if (!destination || destination.record_kind !== 'place') return null;
        const category = (master.destination_categories || []).find(item => item.id === destination.primary_category_id);
        const region = (master.editorial_regions || []).find(item => item.id === destination.region_id);
        return {
          article,
          destination,
          category,
          region,
          masterIndex: records.indexOf(destination)
        };
      })
      .filter(Boolean);
  }

  function sortByMasterRecency(entries) {
    return entries.slice().sort((a, b) => {
      const aDate = Date.parse(a.destination.master_added_at || a.destination.master_updated_at || '') || 0;
      const bDate = Date.parse(b.destination.master_added_at || b.destination.master_updated_at || '') || 0;
      if (aDate !== bDate) return bDate - aDate;
      return b.masterIndex - a.masterIndex;
    });
  }

  function renderDestinationHubView() {
    return `
      <div class="destination-hub">
        <div class="destination-hub__intro destination-hub__container">
          <nav class="destination-hub__breadcrumb" aria-label="Breadcrumb">
            <a href="./index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Destinations</span>
          </nav>
          <header class="destination-hub__heading">
            <p class="destination-hub__kicker">FIND YOUR PLACE IN BALI</p>
            <h1>Explore Bali’s Destinations</h1>
            <p class="destination-hub__description">From quiet highland lakes and forest paths to sunlit beaches and centuries-old temples, discover the places that give Bali its remarkable character.</p>
            <div class="destination-hub__island-tags"><span>#BaliIsland</span><span>#Indonesia</span></div>
          </header>
        </div>
        <div class="destination-hub__filter-wrap">
          <nav class="destination-hub__filters destination-hub__container" id="destinationHubFilters" aria-label="Destination categories">
            <span class="destination-hub__filter-loading">Loading categories…</span>
          </nav>
        </div>
        <main class="destination-hub__container destination-hub__main">
          <section class="destination-hub__results" aria-labelledby="destinationHubResultsTitle">
            <div class="destination-hub__section-heading">
              <div><p class="destination-hub__kicker">EXPLORE THE ISLAND</p><h2 id="destinationHubResultsTitle">Destinations in Bali</h2></div>
              <span class="destination-hub__result-count" id="destinationHubResultCount">— places</span>
            </div>
            <div id="destinationHubCards" aria-live="polite">
              <div class="destination-hub__loading"><span class="destination-hub__spinner"></span><p>Preparing destination collection…</p></div>
            </div>
          </section>
          <section class="destination-hub__editorial" aria-labelledby="destinationHubEditorialTitle">
            <p class="destination-hub__kicker">A JOURNEY THROUGH THE ISLAND</p>
            <h2 id="destinationHubEditorialTitle">Discover the many sides of Bali</h2>
            <p>Bali is an island of contrasts, where coastal life meets volcanic highlands, and everyday village traditions sit alongside celebrated cultural landmarks. Each part of the island has its own rhythm, scenery and stories waiting to be discovered.</p>
            <p>Follow the shoreline to find beaches shaped by the sea, travel inland for green terraces and mountain air, or take time to explore temples, gardens and historic places that remain part of local life. Beyond the familiar names, smaller communities and quieter landscapes reveal another side of the island.</p>
            <p>Wherever the journey leads, the character of Bali is found not in one landmark alone, but in the connection between its landscapes, culture and people.</p>
          </section>
        </main>
      </div>`;
  }

  function renderDestinationCard(entry, isLatest) {
    const article = entry.article;
    const destination = entry.destination;
    const region = entry.region ? entry.region.name : 'Bali';
    const category = entry.category ? entry.category.name : 'Destination';
    const image = article.image || '';
    const title = article.destinationDisplayName || destination.name;
    const description = article.snippet || article.description || 'Explore this destination in Bali and discover what makes the place special.';
    const href = '?page=blog-read&item=' + encodeURIComponent(article.id);
    return `
      <a class="destination-hub__card" href="${href}" aria-label="Read about ${escapeDestinationText(title)}">
        <div class="destination-hub__card-image">
          <img src="${escapeDestinationText(image)}" alt="${escapeDestinationText(article.imageAlt || title)}" loading="lazy" decoding="async" width="800" height="560">
          <span class="destination-hub__image-label destination-hub__image-label--region">${escapeDestinationText(region)}</span>
          <span class="destination-hub__image-label destination-hub__image-label--category">${escapeDestinationText(category)}</span>
          ${isLatest ? '<span class="destination-hub__latest-label">Latest</span>' : ''}
        </div>
        <div class="destination-hub__card-copy">
          <h3>${escapeDestinationText(title)}</h3>
          <p>${escapeDestinationText(description)}</p>
          <span class="destination-hub__card-link">Explore destination <span aria-hidden="true">→</span></span>
        </div>
      </a>`;
  }

  function renderDestinationEmptyState(categoryName) {
    const label = categoryName ? 'in ' + categoryName : 'in this collection';
    return `
      <div class="destination-hub__empty">
        <div class="destination-hub__empty-mark" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M7 36.5 18.5 13l8 15 5-8 9.5 16.5H7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="34" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/></svg></div>
        <h3>No published destinations yet</h3>
        <p>We’re preparing the next collection of places ${escapeDestinationText(label)}. Check back as new destination stories are published.</p>
      </div>`;
  }

  function initDestinationHub() {
    const root = document.querySelector('.destination-hub');
    if (!root) return;
    const filters = root.querySelector('#destinationHubFilters');
    const cards = root.querySelector('#destinationHubCards');
    const count = root.querySelector('#destinationHubResultCount');
    const title = root.querySelector('#destinationHubResultsTitle');

    getDestinationMaster().then(master => {
      if (!root.isConnected) return;
      const entries = getPublishedDestinationEntries(master);
      const latestEntries = sortByMasterRecency(entries);
      const categories = (master.destination_categories || []).filter(category => category.id !== 'other-review');
      const tabs = [
        { id: 'all', label: 'All destinations', count: entries.length },
        { id: 'latest', label: 'Latest', count: latestEntries.length },
        ...categories.map(category => ({
          id: category.id,
          label: category.plural || category.name,
          count: entries.filter(entry => entry.destination.primary_category_id === category.id).length
        }))
      ];

      let selected = 'all';
      function paintTabs() {
        filters.innerHTML = tabs.map(tab => `
          <button type="button" class="destination-hub__filter${selected === tab.id ? ' is-active' : ''}" data-destination-filter="${escapeDestinationText(tab.id)}" aria-pressed="${selected === tab.id}">
            <span>${escapeDestinationText(tab.label)}</span><small>${tab.count}</small>
          </button>`).join('');
      }

      function paintResults() {
        let visible = selected === 'latest'
          ? latestEntries
          : selected === 'all'
            ? entries
            : entries.filter(entry => entry.destination.primary_category_id === selected);
        const selectedCategory = categories.find(category => category.id === selected);
        title.textContent = selected === 'all' ? 'All destinations in Bali' : selected === 'latest' ? 'Recently added to the destination collection' : (selectedCategory ? selectedCategory.plural : 'Destinations in Bali');
        count.textContent = visible.length + (visible.length === 1 ? ' place' : ' places');
        cards.innerHTML = visible.length
          ? '<div class="destination-hub__grid">' + visible.map(entry => renderDestinationCard(entry, selected === 'latest')).join('') + '</div>'
          : renderDestinationEmptyState(selectedCategory ? selectedCategory.plural : selected === 'latest' ? 'the latest collection' : '');
      }

      paintTabs();
      paintResults();
      filters.addEventListener('click', event => {
        const button = event.target.closest('[data-destination-filter]');
        if (!button) return;
        selected = button.getAttribute('data-destination-filter');
        paintTabs();
        paintResults();
      });
    }).catch(() => {
      if (!root.isConnected) return;
      filters.innerHTML = '<span class="destination-hub__filter-loading">Categories are temporarily unavailable.</span>';
      cards.innerHTML = '<div class="destination-hub__empty"><h3>Destination collection is temporarily unavailable</h3><p>Please refresh the page to try again.</p></div>';
      count.textContent = '— places';
    });
  }

  window.renderDestinationHubView = renderDestinationHubView;
  window.initDestinationHub = initDestinationHub;
})();