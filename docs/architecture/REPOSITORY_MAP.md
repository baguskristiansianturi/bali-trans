# Bali Trans — Repository Map

Last reviewed: 2026-10-28  
Baseline: `main` at `259229f09219e9d076a77a59ff22c7862cf5d2e9`

This is a navigation index, not a claim that every file has been fully dependency-traced. Verify references before changing or moving code.

## 1. Delivery and route entry points

| Area | Entry point | Responsibility |
|---|---|---|
| Main SPA and homepage | `index.html` | Loads SPA shell, CSS, global controls and ordered JS modules |
| Airport transfer | `bali-airport-transfer.html` | Standalone transfer search/service page |
| Airport booking | `bali-airport-transfer-checkout.html`, `booking-form.html` | Booking request forms; booking form is shared by supported services |
| Intercity transfer | `bali-intercity-transfer.html` | Intercity service page |
| Port transfer | `bali-port-transfer.html` | Port transfer page |
| Private day tour | `bali-private-day-tour.html` | Private tour sales page |
| Private transport | `private-transport.html` | Transport service and enquiry |
| Transport service index | `transport-service.html` | Transport category entry |
| Activities directory | `bali-adventure-activities.html` | Adventure/activity listing |
| Watersports | `watersport-*.html` | Individual watersport product pages and checkout |
| Car rental | `car-rental.html` | Car rental page/search |
| Legal | `terms-and-conditions.html` | Legacy/canonical Terms route compatibility |
| Invoice tools | `invoice.html`, `invoice-generator.html` | Standalone invoice view and generator |

The SPA itself also renders homepage, discovery, catalog, package detail, Dolphin Tour detail, blog/article, cart/checkout, account/help/contact/about and policy views based on query routes. These are not separate HTML documents.

## 2. SPA JavaScript dependency areas

| File/path | Owns | Change caution |
|---|---|---|
| `assets/js/data.js` | SPA package/article/locale/currency datasets | Shared data affects multiple views |
| `assets/js/state.js` | Shared in-memory UI state | Can affect navigation/cart/wishlist flows |
| `assets/js/navigation.js` | Query routing, route metadata and page SEO metadata | Route-wide impact; test direct links/back navigation |
| `assets/js/interactions.js` | Shared search, cart, wishlist and UI event handlers | High blast radius; avoid page-specific styling/logic here |
| `assets/js/global-shell.js` | Shared header/footer injection and global navigation actions | Shared by many routes; homepage and mobile shell must be regression-tested |
| `assets/js/views/home.js` | SPA homepage renderer | Protected: change only on explicit homepage request |
| `assets/js/views/discovery.js` | Discovery/destination routes | Check route keys and metadata mapping |
| `assets/js/views/catalog.js` | Catalog/package cards | Shared card changes can affect many categories |
| `assets/js/views/detail.js` | Generic package detail and tour-template dispatch | Dolphin-specific changes need regression checks |
| `assets/js/views/articles.js` | Blog listing/article renderer | Verify article IDs and internal routes |
| `assets/js/views/cart.js`, `checkout.js` | Cart and checkout views | Booking prototype only; no live payment |
| `assets/js/views/static-pages.js` | Static SPA pages such as help/legal/contact/account | Verify all footer destinations |
| `assets/js/views/` other modules | Feature-level view renderers | Keep renderers feature-scoped |

## 3. Standalone page assets

Rule: a standalone page's HTML should reference its dedicated page CSS and page JS from `assets/css/pages/` and `assets/js/pages/`. Some legacy shared/SPA styles and compatibility scripts still exist; check the actual HTML references before editing.

- Airport: `bali-airport-transfer.css`, `airport-search-experience.css`, `airport-vehicle-cards.css`; scripts include airport search, fare calculator and page interactions.
- Booking/checkout: `booking-form.css`, `bali-airport-transfer-checkout.css`; scripts include `booking-form.js`, `bali-airport-transfer-checkout.js`.
- Intercity/port/private tour/private transport: similarly named page CSS and form/controller scripts.
- Watersports: individual `watersport-*.css` files and relevant catalogue/checkout controllers.
- Invoice: `invoice.css`, `invoice-generator.css` and matching scripts.

## 4. Data and content

- `assets/js/data.js`: SPA runtime datasets (packages, blogs, locale/currency and related view data).
- `content/bali-master-data.json`: destination master records, regions, categories, source/check status and editorial routing.
- `content/*.md`: launch preparation, audits and route/content reconciliation.
- `TEMPLATE-REGISTRY.md`: canonical list of approved/reusable templates.
- `TEMPLATE-PLAYBOOK.md`: standards for creating and modifying templates.

These sources are not interchangeable. When editing destination facts, inspect the master record and current runtime content before deciding which source is authoritative for the visible page.

## 5. Validation and release

- `.github/workflows/validate-prototype.yml`: source checks, route/data checks, browser smoke tests, local asset/anchor checks.
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment.
- `scripts/browser-smoke.mjs`: automated browser flows and mobile-width checks.
- `HANDOFF.md`: verified state, known failures and recent work.
- `ROADMAP.md`: next tasks and release criteria.
- `AUDIT.md`: confirmed architecture/UX risks and historical fixes.

## 6. Files with broad impact

Treat these as high-risk shared files and regression-test more than the target page when they change:
- `index.html`
- `assets/css/styles.css`, `assets/css/base.css`
- `assets/js/data.js`, `assets/js/state.js`
- `assets/js/navigation.js`, `assets/js/interactions.js`
- `assets/js/global-shell.js`
- workflow files and browser smoke tests

## 7. Known architectural debt

- Several standalone HTML entry points remain at repository root to preserve current public paths.
- `assets/js/app.js` is a legacy large script and must not be removed until its remaining callers and role are verified.
- `assets/js/interactions.js` and `assets/js/data.js` are sizeable shared modules.
- Styles are split across shared entry files, page-specific CSS and some feature-level watersport styles; cascade ownership should be checked before moving rules.
- No package/build pipeline is assumed; the site is served statically and depends on external CDN assets.
- The architecture map should be updated when a page, template, shared module or source of truth changes.
