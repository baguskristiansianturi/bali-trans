# 02 — Existing Page Modules

Status: INITIAL INVENTORY  
Primary route map: `content/ROUTE_MASTER_MAPPING.md`  
Page/template registry: `TEMPLATE-REGISTRY.md`

## 1. SPA page modules

All SPA views are delivered through `index.html` and rendered into `#appContainer`.

| Page family | Renderer/source | Current status |
|---|---|---|
| Homepage | `assets/js/views/home.js` | Existing; approved design must be preserved unless explicitly requested |
| Discovery / destinations | `assets/js/views/discovery.js` | Existing |
| Catalog / package listing | `assets/js/views/catalog.js` | Existing |
| Package / tour detail | `assets/js/views/detail.js` | Existing; generic and Dolphin-specific rendering paths |
| Blog listing / article detail | `assets/js/views/articles.js` | Existing; canonical article-detail template is not yet approved in TEMPLATE-REGISTRY |
| Cart | `assets/js/views/cart.js` | Prototype view |
| Checkout | `assets/js/views/checkout.js` | Prototype view; shell is hidden in checkout mode |
| Static information pages | `assets/js/views/static-pages.js` | Existing; help, legal, contact, about, account and related routes |
| Route metadata / SEO | `assets/js/navigation.js` | Shared route and metadata layer |

## 2. Standalone page families

These HTML files are public entry points at repository root. Keep their paths stable.

### Transport and service pages
- `transport-service.html`
- `bali-airport-transfer.html`
- `bali-intercity-transfer.html`
- `bali-port-transfer.html`
- `bali-private-day-tour.html`
- `private-transport.html`
- `car-rental.html`
- `bali-adventure-activities.html`

### Booking and checkout
- `booking-form.html`
- `bali-airport-transfer-checkout.html`
- `watersport-checkout.html`

### Watersports
- `watersport-tanjung-benoa.html`
- `watersport-banana-boat.html`
- `watersport-flyboard-tanjung-benoa.html`
- `watersport-flying-fish-donut-boat.html`
- `watersport-flying-fish-tanjung-benoa.html`
- `watersport-glass-bottom-boat-pulau-penyu.html`
- `watersport-jet-ski.html`
- `watersport-paket-2-aktivitas.html`
- `watersport-paket-3-aktivitas.html`
- `watersport-paket-watersport-wisata-laut.html`
- `watersport-parasailing.html`
- `watersport-rolling-donut-tanjung-benoa.html`
- `watersport-scuba-diving-tanjung-benoa.html`
- `watersport-sea-walker-snorkeling.html`
- `watersport-sea-walker-tanjung-benoa.html`
- `watersport-snorkeling-tanjung-benoa.html`
- `watersport-wakeboard-tanjung-benoa.html`

### Utility and policy pages
- `invoice.html`
- `invoice-generator.html`
- `terms-and-conditions.html` (legacy/canonical URL compatibility is documented in AUDIT.md)

## 3. Template status from the existing registry

- Shared site header/footer: shared source exists.
- Airport Transfer booking form: canonical visual reference.
- Dolphin Tour detail: implemented in the SPA detail renderer; do not assume all tour families have the same approved final template.
- Private day-tour service page: separate standalone layout.
- Article/destination detail: canonical template not yet approved.
- Search results: canonical layout pending review.

## 4. Page master rule

Each page-family master must eventually record:
- route or public URL;
- purpose and user journey;
- canonical template;
- sections in exact order;
- components used;
- content/data sources;
- CTA and form behaviour;
- mobile/tablet/desktop behaviour;
- exceptions;
- tests and verified deployment;
- approval/version status.

Do not create a page-family specification by copying a different page's structure unless reuse is explicitly established.
