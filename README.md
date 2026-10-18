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
- `assets/js/app.js` — client-side routing, rendering, and interactions.

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
