# Bali Trans — Code and UX Audit

Date: 2026-10-18
Branch: `refactor/separate-assets-and-audit`
Scope: static source audit and safe refactor of the existing single-page prototype. This is not a claim that live booking/payment has been tested.

## Confirmed structure issues

- `index.html` previously contained inline Tailwind configuration, custom CSS, and approximately 86 KB of application JavaScript.
- Application data, route rendering, cart/wishlist state, search, checkout, and UI helpers were mixed in one script.
- The page is a client-side single-page prototype: several apparent pages are rendered into `#appContainer` by JavaScript, not separate HTML documents.
- Tailwind is loaded from its CDN at runtime, so extracting files alone does not make the site lightweight. A production build with generated/minified CSS should be evaluated separately.
- External fonts, Font Awesome, QRCode.js, and Unsplash images remain runtime dependencies.

## Changes on this branch

- Extracted custom CSS to `assets/css/styles.css`.
- Extracted Tailwind theme configuration to `assets/js/tailwind.config.js` and load it before the Tailwind CDN.
- Extracted data constants to `assets/js/data.js`.
- Split application state, navigation, view rendering, and interactions into focused JavaScript files.
- Split view rendering by feature: homepage, catalog/cards, package detail, articles, and cart/checkout.
- Added a GitHub Actions validation workflow to check JavaScript syntax and local asset references on pull requests.
- Fixed the homepage search so the entered keyword filters packages, with a clear empty state.
- Fixed article routing to search `BALI_BLOGS`, rather than `BALI_PACKAGES`.
- Added basic checkout guest-field validation and activity-date validation.
- Prevented the “Book now” action from navigating to the cart when validation blocks adding the item.
- Added a clear prototype-only disclaimer to the generated voucher view; the current UI does not process payments or send real bookings.
- Prevented duplicate countdown intervals when the homepage is revisited.

## Risks and items requiring business confirmation

- The repository's working business target is BDM Trans. The current page still mixes “Bali Explorer” and “Bali Trans” in visible brand areas. During this prototype phase, temporary copy is acceptable for testing page structure and flows; before launch, all visible brand names, metadata, links, and contact details must be standardized to BDM Trans. Do not treat prototype copy as final business claims.
- WhatsApp number `6281234567890` appears to be a placeholder and must be confirmed before launch.
- The UI claims “Verified Booking”, “50,000+ Happy Travelers”, instant confirmation, best-price guarantees, and payment methods without evidence/configuration. These must be removed or substantiated.
- Social, policy, partner and help links still use `#`.
- Cart and wishlist state are in memory only and are lost on refresh.
- Currency rates are hard-coded and should not be presented as live exchange rates.
- A “PDF downloaded” toast does not actually generate a PDF.
- QRCode.js is loaded externally; failure of that CDN can break the voucher preview.
- There is no real backend, booking inventory, email delivery, payment gateway, or server-side validation.

## Verification performed

- Confirmed on the branch that the HTML contains no inline `<style>` blocks or inline application script bodies.
- Confirmed the monolithic `assets/js/app.js` and combined `assets/js/views.js` were removed and replaced by focused files.
- Confirmed local asset references and script order: Tailwind configuration before Tailwind CDN; data before application logic.
- Confirmed referenced inline handler names found in the static HTML have corresponding application functions.
- Confirmed source contains the targeted search, article-route, date/guest validation, and prototype disclaimer fixes.
- Full browser/mobile interaction testing has **not** been completed in this environment. The new GitHub Actions syntax/reference checks are configured, but their passing result has not yet been confirmed. Do not merge or claim production readiness based on static checks alone.

## Next steps

1. Use temporary, plausible prototype copy to validate the hierarchy and user journeys; do not spend time polishing launch copy yet.
2. Standardize all launch branding to BDM Trans at the final content/launch stage.
3. Replace unverified claims and placeholder contact/social/policy links before launch.
4. Decide whether to retain a demo-only booking journey or implement a real inquiry/booking flow.
5. Run mobile browser QA across homepage swipe/carousels, breadcrumbs/back navigation, search and category filters, package detail/date/options, cart, wishlist, article listing/detail, footer links, currency selector, checkout validation, and empty states.
6. Merge/deploy only after the branch has passed the agreed checks.
