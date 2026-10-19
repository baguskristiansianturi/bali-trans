# BDM Trans — Travel Website Prototype

This repository is being prepared as a **structural and UX prototype** for the future BDM Trans travel business. The public copy, brand presentation, and offers in this phase are temporary working content: they help us validate page hierarchy, navigation, responsive layouts, and user journeys. They must not be treated as final launch claims.

## Prototype priorities

- Validate the homepage discovery flow and horizontal swipe/carousel behavior on mobile.
- Validate breadcrumb hierarchy and back-navigation for every detail view.
- Keep navigation, category filters, search, cards, and calls to action consistent.
- Validate activity/package detail, date and option selection, cart, checkout steps, and the demo confirmation state.
- Validate article listing, article detail, related content, and return navigation.
- Keep footer sections, contact paths, and policy links consistent.
- Clearly label any booking/payment UI as a prototype until a real backend and payment/booking process exist.

## Code structure

- `index.html` — page shell and semantic markup.
- `assets/css/styles.css` — custom CSS.
- `assets/js/tailwind.config.js` — Tailwind theme configuration (loaded before the CDN runtime).
- `assets/js/data.js` — prototype package and article data.
- `assets/js/state.js` — shared application state.
- `assets/js/navigation.js` — route switching.
- `assets/js/views/home.js` — homepage rendering.
- `assets/js/views/catalog.js` — package catalog and cards.
- `assets/js/views/detail.js` — package detail rendering.
- `assets/js/views/articles.js` — article list and detail rendering.
- `assets/js/views/checkout.js` — cart and checkout rendering.
- `assets/js/interactions.js` — search, cart, wishlist, checkout, and UI actions.
- `.github/workflows/validate-prototype.yml` — JavaScript syntax and local asset checks.

Tailwind, fonts, icons, QR rendering, and remote images still use external runtime dependencies. Splitting the files improves maintainability, but production asset-size optimization is a separate task.

## Not production-ready

- Package/activity cards are prototype content, not verified inventory or bookable offers.
- Search is client-side and filters local prototype data; it is not live inventory search.
- Checkout does not submit a real booking or process payment.
- Voucher/QR output is illustrative and is not a valid ticket.
- Any visitor counts, reviews, verification badges, instant-confirmation claims, guarantees, payment logos, exchange rates, contact numbers, social links, or policy links must be verified, replaced, or removed before launch.
- The actual WhatsApp number and final legal/business details must be confirmed before launch.
- Remote Unsplash images need final selection and licensing/use review.
- Keep the preview noindex until launch policy is reviewed.

## Audit and release discipline

See [AUDIT.md](./AUDIT.md) for confirmed static findings and known risks. Changes are being prepared on a draft pull request and must not be considered deployed until merged and verified on GitHub Pages.

Before merge, test the homepage, mobile swipe/carousels, breadcrumbs, package detail, article detail, filters/search, cart, wishlist, checkout validation, empty states, currency selector, and footer links in a real browser at mobile and desktop widths.


## Current source layout

The implementation remains a client-rendered SPA with query-based routes. The existing visual design is intentionally preserved while source code is separated into maintainable files.

- `assets/css/styles.css`: CSS entry point importing `base.css`, `navigation.css`, and `footer.css`.
- `assets/js/tailwind.config.js`: shared Tailwind theme configuration.
- `assets/js/data.js`: package, article, locale, and currency data.
- `assets/js/state.js`: shared UI state.
- `assets/js/navigation.js`: route handling and page metadata.
- `assets/js/views/`: discovery, static pages, home, catalog, detail, articles, cart, and checkout renderers.
- `assets/js/interactions.js`: shared UI handlers.
- `content/bali-master-data.json`: destination/category inventory and readiness.
- `content/PAGE_AND_ARTICLE_AUDIT.md`: destination inventory and audit findings.
- `content/ROUTE_MASTER_MAPPING.md`: reconciliation of 41 discovery route keys plus four individual Nusa Penida article routes against the destination master data.

Static validation does not replace browser QA. Prototype checkout is not a real booking/payment flow.
