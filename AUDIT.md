# Bali Trans — Code and UX Audit

Date: 2026-10-18
Branch: `main`
Scope: current source architecture, shared site shell, standalone page assets, route integrity, responsive browser smoke tests, and launch risks. This is not a claim that live booking/payment has been tested.

## Confirmed structure issues

- `index.html` previously contained inline Tailwind configuration, custom CSS, and approximately 86 KB of application JavaScript.
- Application data, route rendering, cart/wishlist state, search, checkout, and UI helpers were mixed in one script.
- The page is a client-side single-page prototype: several apparent pages are rendered into `#appContainer` by JavaScript, not separate HTML documents.
- Tailwind is loaded from its CDN at runtime, so extracting files alone does not make the site lightweight. A production build with generated/minified CSS should be evaluated separately.
- External fonts, Font Awesome, QRCode.js, and Unsplash images remain runtime dependencies.

## Architecture and fixes recorded in this audit

- Extracted custom CSS to `assets/css/styles.css`.
- Extracted Tailwind theme configuration to `assets/js/tailwind.config.js` and load it before the Tailwind CDN.
- Extracted data constants to `assets/js/data.js`.
- Split application state, navigation, view rendering, and interactions into focused JavaScript files.
- Split view rendering by feature: homepage, catalog/cards, package detail, articles, and cart/checkout.
- Added GitHub Actions validation and deployment workflows for syntax, route/content references, browser smoke tests, local assets, CSS/JS separation, and sitemap coverage.
- Fixed the homepage search so the entered keyword filters packages, with a clear empty state.
- Fixed article routing to search `BALI_BLOGS`, rather than `BALI_PACKAGES`.
- Added basic checkout guest-field validation and activity-date validation.
- Prevented the “Book now” action from navigating to the cart when validation blocks adding the item.
- Added a clear prototype-only disclaimer to the generated voucher view; the current UI does not process payments or send real bookings.
- Prevented duplicate countdown intervals when the homepage is revisited.

## Risks and items requiring business confirmation

- The current public-facing prototype uses the temporary name Bali Trans. Keep visible brand names, metadata, links, and contact details consistent with the approved public presentation. Do not treat prototype copy as final business claims.
- WhatsApp number `6281234567890` appears to be a placeholder and must be confirmed before launch.
- The UI claims “Verified Booking”, “50,000+ Happy Travelers”, instant confirmation, best-price guarantees, and payment methods without evidence/configuration. These must be removed or substantiated.
- Social, policy, partner and help links still use `#`.
- Cart and wishlist state are in memory only and are lost on refresh.
- Currency rates are hard-coded and should not be presented as live exchange rates.
- A “PDF downloaded” toast does not actually generate a PDF.
- QRCode.js is loaded externally; failure of that CDN can break the voucher preview.
- There is no real backend, booking inventory, email delivery, payment gateway, or server-side validation.

## Verification performed

- Confirmed current HTML contains no inline `<style>` blocks, inline style attributes, or executable inline script bodies. JSON-LD structured data intentionally remains inline.
- Confirmed the monolithic `assets/js/app.js` and combined `assets/js/views.js` were removed and replaced by focused files.
- Confirmed local asset references and script order: Tailwind configuration before Tailwind CDN; data before application logic.
- Confirmed referenced inline handler names found in the static HTML have corresponding application functions.
- Confirmed source contains the targeted search, article-route, date/guest validation, and prototype disclaimer fixes.
- Current GitHub Actions browser smoke tests cover the homepage SPA routes, articles, package detail, navigation, shared shell, 25 standalone pages, 360px overflow, watersport detail routing, and checkout interactions. This is automated smoke coverage, not full manual visual QA or production-readiness approval.

## Next steps

1. Use temporary, plausible prototype copy to validate the hierarchy and user journeys; do not spend time polishing launch copy yet.
2. Confirm final public brand presentation and approved business/contact details before launch.
3. Replace unverified claims and placeholder contact/social/policy links before launch.
4. Decide whether to retain a demo-only booking journey or implement a real inquiry/booking flow.
5. Automated browser smoke coverage is now in CI; manually review visual polish on a physical Android phone, especially homepage carousel behavior and text/spacing.
6. Changes are committed directly to `main` without a PR. Confirm both validation and GitHub Pages deployment workflows succeed, then inspect the live preview.


## Follow-up UI fixes (2026-10-18)

- Added mobile overflow safeguards and reduced mobile header spacing while preserving horizontal swipe on category/filter strips.
- Added targeted text-contrast overrides for white text placed on pale backgrounds.
- Replaced category-tab emoji with Font Awesome icons, removed template-attribution text from the header, and removed flag/cart/close emoji-style placeholders where practical.
- Automated source validation and Playwright browser smoke tests now run in CI. Manual visual verification on a physical phone is still required; horizontal scrolling inside category strips is intentional, while page-level horizontal overflow is not.


## UI/UX follow-up (2026-10-18)

- Strengthened contrast rules for text placed inside pale cards and controls, including areas outside the main app container.
- Added visible keyboard focus styles, stronger placeholder contrast, and mobile bottom-navigation safe-area spacing.
- Replaced countdown/discount urgency and instant-booking claims with accurate prototype wording.
- Standardized visible brand text to Bali Trans and replaced homepage category emoji with Font Awesome icons.
- Automated validation checks source structure only; final visual verification still requires checking the live GitHub Pages page on a phone at narrow viewport widths.


## Current verified status — 23 October 2026

- Changes are made directly on `main`; no pull request is required for this workflow.
- Standalone HTML page styles and executable inline scripts have been moved into external files under `assets/css/pages/` and `assets/js/pages/`. JSON-LD structured data remains inline intentionally.
- Inline style attributes in HTML and static style attributes in JS-generated markup have been replaced with classes and stylesheet rules.
- CI checks JavaScript syntax, SPA route/content references, browser smoke tests, local HTML assets, CSS URLs/imports, absence of inline styles/scripts in HTML, JS-generated style markup, and sitemap coverage for public pages.
- Homepage and standalone public pages now use the same injected header/footer component. Both checkout pages intentionally omit the shared shell; the airport checkout also omits branding and uses a glass-style form surface.
- Latest confirmed deployment at the time of this audit must be read from the most recent successful `Deploy Bali Trans to GitHub Pages` workflow run; do not infer live deployment from a commit alone.
- Still not production-ready: there is no real booking backend, live inventory, online payment processing, email delivery, or server-side validation. Final manual visual QA and destination/operator fact-checking remain necessary.


## Footer and account navigation audit — 24 October 2026

### Fixed in source

- Footer FAQ previously pointed to the Help Centre landing page instead of the FAQ guide. It now targets the dedicated FAQ topic.
- Footer Privacy questions previously pointed to Contact; it now opens the Privacy Policy view.
- Terms & Conditions now points to the actual Terms view.
- Partner Enquiries now has a direct route to the existing Partners page.
- Added a dedicated Account Access page and connected the Create account menu action to it.
- The account page explicitly states that account registration is not active in this static preview; it does not collect credentials or pretend to save an account.
- Help menu now opens the Help Centre rather than redirecting to Contact.
- Expanded footer navigation from four to five groups and added a large-desktop five-column layout.

### Account capability status

Real sign-up, sign-in, password recovery, saved booking history, and server-side identity storage are **not implemented**. GitHub Pages is static hosting; do not imply these functions work until a secure backend/authentication provider is connected.

### Open pull-request inventory

- PR #23 homepage redesign was closed on 24 October 2026 because it conflicts with the explicit requirement to preserve the approved homepage.
- PR #29 remains a draft and needs reconciliation with the current SPA router.
- PR #32 adds South Bali destination articles; its recorded head check passed, but the branch must be reconciled with current `main` before merge.
- PR #33 was closed as superseded after confirming the current service-page stylesheets already share hero rules; its old branch had a stale browser-smoke selector.

### Current release verification

- Source validation passed on commit `9fb63cd` in workflow run 755: https://github.com/baguskristiansianturi/bali-trans/actions/runs/40002061000
- GitHub Pages deployment succeeded for the same commit: https://github.com/baguskristiansianturi/bali-trans/actions/runs/40002060328
- Browser smoke coverage now includes Help Centre, FAQ, Terms, Privacy Policy, Partner Enquiries and Account Access routes.
- `invoice.html` and `invoice-generator.html` have had inline CSS and executable script bodies extracted into `assets/css/pages/` and `assets/js/pages/`; the validation workflow checks these references.
- Manual visual QA on a physical Android phone remains outstanding.
