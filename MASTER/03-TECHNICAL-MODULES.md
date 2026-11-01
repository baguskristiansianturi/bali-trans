# 03 — Technical Modules and Source Ownership

Status: INITIAL INVENTORY  
Detailed architecture: `ARCHITECTURE.md` and `docs/architecture/REPOSITORY_MAP.md`

## 1. SPA entry and shared runtime

| File | Responsibility recorded in repository map | Impact |
|---|---|---|
| `index.html` | SPA entry, asset loading, mobile bottom nav and shared UI containers | Very high |
| `assets/js/data.js` | SPA packages, article, locale/currency datasets | High |
| `assets/js/state.js` | Shared in-memory UI state | High |
| `assets/js/navigation.js` | Query routing, route metadata and SEO metadata | High |
| `assets/js/interactions.js` | Shared search, cart, wishlist and UI event handlers | Very high |
| `assets/js/global-shell.js` | Shared header/footer injection and global navigation actions | Very high |
| `assets/js/locale.js` | Locale-related logic | Cross-view |
| `assets/js/boot-recovery.js` | Startup recovery helper | Verify callers/behaviour before changing |
| `assets/js/tailwind.config.js` | Tailwind CDN configuration | Shared styling |
| `assets/js/views/home.js` | Homepage renderer | Homepage-only renderer; protected |
| `assets/js/views/discovery.js` | Discovery/destination renderer | Feature-scoped |
| `assets/js/views/catalog.js` | Catalog renderer | Feature-scoped |
| `assets/js/views/detail.js` | Package/tour detail renderer | Feature-scoped; Dolphin-specific path exists |
| `assets/js/views/articles.js` | Blog/article renderer | Feature-scoped |
| `assets/js/views/cart.js` | Cart renderer | Cart flow |
| `assets/js/views/checkout.js` | Checkout renderer | Checkout flow |
| `assets/js/views/static-pages.js` | Static SPA page renderers | Multiple informational routes |

## 2. Standalone page controllers

Page-specific scripts are grouped under `assets/js/pages/`. Existing files include controllers/adapters for:
- Airport search, fare calculation and airport checkout.
- Intercity and port transfer forms.
- Private day-tour form.
- Shared booking form and booking notice scroll.
- Car-rental search.
- Invoice and invoice generator.
- Private transport form.
- Review carousel.
- Legacy service SPA compatibility.
- Watersports catalogue filters, checkout and detail/pricing interactions.

Do not assume a file is unused from its name. Check HTML script references, imports, workflow tests and runtime callers before removing or moving it.

## 3. CSS ownership

### Shared / application styles
- `assets/css/base.css`
- `assets/css/styles.css`
- `assets/css/site.css`
- `assets/css/navigation.css`
- `assets/css/footer.css`
- `assets/css/global-shell.css`
- `assets/css/dolphin-responsive.css`
- Watersports feature-level stylesheets.

### Page-specific styles
- `assets/css/pages/` contains dedicated styles for account, airport search/cards/transfer, transfer checkout, intercity, port, private day tour, booking form, invoice, private transport, terms, transport service and individual watersports pages.

The precise ownership of every overlapping selector has not been exhaustively traced in this initial master. Use the page's actual HTML links and CSS imports before changing styles.

## 4. Data and editorial sources

- `assets/js/data.js`: SPA runtime datasets.
- `content/bali-master-data.json`: destination master records and editorial metadata.
- `content/ROUTE_MASTER_MAPPING.md`: route mapping.
- `content/PAGE_AND_ARTICLE_AUDIT.md`: existing page/article audit.
- `TEMPLATE-REGISTRY.md`: reusable template index.

These sources have distinct roles. Do not assume the JSON destination master automatically replaces SPA runtime data.

## 5. Validation and release modules

- `.github/workflows/validate-prototype.yml`: source and browser validation workflow.
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow.
- `scripts/browser-smoke.mjs`: browser smoke tests.
- `AUDIT.md`, `HANDOFF.md` and `ROADMAP.md`: audit, current handoff and planned work.

## 6. Archived code

- `assets/js/legacy/app.js` is documented as the archived monolithic predecessor and is not loaded by `index.html`.
- It remains for historical/reference purposes.
- Do not delete it until all possible callers and compatibility requirements have been checked.

## 7. Change boundary

A technical module can be shared even when its filename looks page-specific, and a similarly named file may serve a different purpose. Trace actual references before editing. Never move, rename or delete a file solely to make the folder tree look cleaner.
