# 00 — Bali Trans System Map

Snapshot: `a8d4282293d98923ecf160f52d95fe6168dd905d`  
Status: INITIAL INVENTORY

## 1. How the website is delivered

Bali Trans is currently a static website hosted through GitHub Pages. The repository uses two page-delivery patterns:

### A. Main SPA

- Entry file: `index.html`
- Main content mount: `#appContainer`
- Routes are selected through query-string navigation and rendered by JavaScript.
- Main route controller: `assets/js/navigation.js`
- View renderers: `assets/js/views/`
- Shared state and interactions: `assets/js/state.js`, `assets/js/interactions.js`
- Shared header/footer: `assets/js/global-shell.js` and `assets/css/global-shell.css`

### B. Standalone HTML pages

- Public HTML entry points remain at repository root.
- Page-specific CSS belongs under `assets/css/pages/`.
- Page-specific JavaScript belongs under `assets/js/pages/`.
- Existing public URLs must be preserved unless a URL migration is explicitly approved and tested.
- Do not move root HTML files merely to make the folder structure look cleaner.

## 2. High-level component hierarchy

```text
BALI TRANS WEBSITE
|
+-- GLOBAL SHELL
|   +-- Shared header / navbar
|   +-- Header search panel
|   +-- Account controls
|   +-- Language and currency control
|   +-- Mobile navigation panel
|   +-- Shared footer
|
+-- SPA APPLICATION (index.html)
|   +-- Homepage
|   +-- Discovery / destinations
|   +-- Catalog
|   +-- Package and tour details
|   +-- Blog listing and article detail
|   +-- Cart and checkout prototype
|   +-- Static information pages
|   +-- Mobile bottom navigation
|
+-- STANDALONE PAGE FAMILIES
|   +-- Transport services
|   +-- Airport / port / intercity transfer
|   +-- Private day tour
|   +-- Car rental
|   +-- Watersports
|   +-- Booking / checkout
|   +-- Invoice tools
|
+-- SHARED TECHNICAL SERVICES
    +-- Data and content
    +-- Routing and metadata
    +-- State and interactions
    +-- Locale
    +-- Validation and browser smoke tests
    +-- GitHub Pages deployment
```

This is a responsibility map, not a claim that every item is already an independent code module.

## 3. Global shell exceptions

The shared shell is not universal on every page.

Known exceptions:
- `booking-form.html` is a focused booking form and is documented as the canonical shared booking-form design.
- `bali-airport-transfer-checkout.html` is a focused checkout page.
- `watersport-checkout.html` is a focused watersports checkout page.
- The SPA checkout state applies `checkout-mode`; the shared shell/mobile navigation is intentionally hidden in that mode.
- Verify the actual page source and workflow before adding the global shell to any checkout page.

The exception list must be updated whenever a new page intentionally omits the shell.

## 4. Current shared shell components

| Component | Implementation source | Current mapping |
|---|---|---|
| Navbar / header | `assets/js/global-shell.js`, `assets/css/global-shell.css` | Implemented; desktop/mobile details recorded separately |
| Header search | `assets/js/global-shell.js`, `assets/js/interactions.js`, `assets/css/global-shell.css` | Implemented; behaviour and result coverage need ongoing verification |
| Account menu | `assets/js/global-shell.js`, account/static-page routes | UI exists; real authentication is not implemented |
| Language/currency selector | `assets/js/global-shell.js`, `assets/js/locale.js` | UI exists; current options must not be assumed to include more languages/currencies |
| Mobile menu | `assets/js/global-shell.js`, `assets/css/global-shell.css` | Implemented |
| Footer | `assets/js/global-shell.js`, `assets/css/global-shell.css` | Implemented |
| Mobile bottom navigation | `index.html`, SPA interactions | SPA-specific; not a universal standalone-page component |
| Breadcrumb | `assets/js/views/detail.js` (Dolphin detail) and route SEO metadata | Page-specific/partial; no universal visual component established |
| Hero | Page/view-specific renderers and standalone HTML | Multiple implementations; no single universal hero component established |

## 5. Core source-of-truth boundaries

- SPA package/article/locale data: `assets/js/data.js`.
- Destination master records: `content/bali-master-data.json`.
- SPA routes and route metadata: `assets/js/navigation.js`.
- Shared shell markup and route links: `assets/js/global-shell.js`.
- Shared shell styling: `assets/css/global-shell.css`.
- Page-family template index: `TEMPLATE-REGISTRY.md`.
- Existing route inventory: `content/ROUTE_MASTER_MAPPING.md`.

These sources have different consumers. Do not merge, duplicate or replace them without tracing dependencies.

## 6. System-level constraints

- Static GitHub Pages hosting; no production backend is currently established.
- No live inventory, server-side booking validation, real payment processing or secure account system is established.
- Existing URLs and query routes are compatibility-sensitive.
- Shared files have a larger impact radius and require regression checks.
- A successful commit is not proof of successful deployment or visual correctness.

## 7. Update rule

Whenever a page family, global component, route, source-of-truth data file or deployment workflow changes, update the corresponding master record in the same change set. If a change affects multiple components, list every affected component. Do not mark the map current until the changed implementation has been checked.
