# Bali Trans — Handoff

Updated: 2026-10-25
Default branch: `main`
Repository: https://github.com/baguskristiansianturi/bali-trans
Live preview: https://baguskristiansianturi.github.io/bali-trans/

## Verified working state

- The current site is a static GitHub Pages prototype with a client-rendered SPA and standalone service pages.
- Shared header/footer are injected by `assets/js/global-shell.js`; checkout pages intentionally omit the shared shell.
- The homepage design is approved and must not be changed unless explicitly requested.
- Footer routes were corrected: Help Centre, FAQ guide, Contact, About, Terms, Privacy Policy, Partner Enquiries, Account Access, and guest browsing.
- Account Access is now an honest status page. Account creation, sign-in, password recovery and saved booking history are not implemented because there is no secure account backend.
- Footer now has five groups at desktop width; CSS has a five-column breakpoint for large screens.
- Latest verified source validation and GitHub Pages deployment passed on commit `9c78bdf` (25 Oct 2026). CI covers 360px browser smoke checks, shared navigation overlays, SPA/static routes, private-transport/Contact/intercity/port/day-tour/Dolphin Tour WhatsApp handoffs, service-tab behaviour, and local HTML anchor targets. Manual visual QA on a physical Android phone and desktop browser remains outstanding.

## Recent commits

- `f8a9226` Fix shared footer links and account navigation
- `2fcf001` Add honest account access page for unsupported registration
- `73b4f27` Wire account page into SPA router
- `86eafca` Route registration and help actions to their real pages
- `a6fd616` Route FAQ footer link to FAQ guide
- `b0c4cfb` Connect account menu action to account page
- `c75cb96` Fix account route metadata syntax
- `0e5f515` Balance expanded footer columns on desktop

## Known limitations / next verification

- Real registration cannot be completed on static hosting alone; connect a secure backend/auth provider before enabling account creation.
- WhatsApp is configured as `628218187917` for Contact and transport enquiries; confirm this is the final official business number before launch.
- Automated 360px navigation and route smoke checks are passing; physical-device visual review is still outstanding.
- PR #29 (blog labels/shareable routes) and PR #32 (South Bali articles) remain separate, unmerged work; do not merge them into the transport soft-opening scope without checking the current router and launch priorities.
- PR #33 was closed as superseded because the current service-page CSS already shares hero rules.
- PR #23 was closed to preserve the approved homepage.
- `invoice.html` and `invoice-generator.html` now use external CSS and JavaScript files; their visual design was not changed.


## Verified work — 25 October 2026

- Removed the unrequested WhatsApp button from the global footer; WhatsApp remains available through intended enquiry forms only.
- Private transport, Contact, intercity transfer, port transfer, private day-tour and Lovina Dolphin Tour flows are covered by browser tests that capture generated WhatsApp URLs and assert the shared number and submitted details. Requests remain subject to team confirmation; no online payment is collected.
- Contact form's minimum planned date now uses the visitor's local calendar date rather than UTC.
- The legacy `terms-and-conditions.html` path redirects to the canonical SPA Terms view, where the general and car rental/private transport sections are expandable.
- CI now checks local HTML anchor links in addition to existing syntax, route, responsive overflow, and asset checks.
- Latest verified functional commit at time of this handoff: `9c78bdf221539012007dbe38c9006e8c2497d980`. Validation: https://github.com/baguskristiansianturi/bali-trans/actions/runs/40179651514. Deployment: https://github.com/baguskristiansianturi/bali-trans/actions/runs/40179651546.


## Private Tour Bali page update — 27 October 2026

- Redesigned only `bali-private-day-tour.html` and its dedicated stylesheet `assets/css/pages/bali-private-day-tour.css` to match the approved Private Tour Bali mockup.
- Added vehicle categories and fleet names, service inclusions, Regular Full-Day Tour vs Long Trip explanation, driver/service benefits, booking steps, enquiry form, terms notice and FAQs.
- Preserved the existing shared header/footer injection via `assets/js/global-shell.js` and restored the original four-item mobile bottom navigation (Explore, Activities, Guides, Cart). No homepage or global-shell changes were made.
- Added the preferred vehicle category to the WhatsApp enquiry payload in `assets/js/pages/bali-private-day-tour-form.js`.
- Source-level checks confirmed the page has one main element, references the page stylesheet/form script, includes all listed vehicle models, retains the mobile cart badge, and closes its document structure.
- **Pending release verification:** wait for GitHub Actions source validation and GitHub Pages deployment; then check the live page on Android/mobile and desktop. Do not treat this source update as visually verified until the deployed URL is inspected.


## Bali Dolphin Tour landing page refresh — 27 October 2026

- Reworked only the Dolphin Tour renderer in `assets/js/views/detail.js` and isolated styling appended to `assets/css/styles.css`; refreshed asset cache keys in `index.html` without changing homepage visuals, shared navigation, footer, or mobile bottom navigation.
- New hierarchy: promotional hero, benefits, Regular vs All-Inclusive cards, route-based vehicle selection, optional add-ons, live estimate, itinerary timeline with a paired scrollable destination panel, trip information, FAQ, Full Day Tour recommendations, separate Long Trips recommendations, and closing CTA before the shared footer.
- Regular Tour uses an illustrative route-specific base: Avanza Rp700,000, Innova Rp900,000, HiAce Rp1,300,000. These are prototype examples for the Lovina route, not verified final tariffs. All-Inclusive uses an illustrative Rp750,000/person starting estimate plus vehicle upgrade/add-ons; final business pricing still needs confirmation.
- Tour-page selections are passed into the existing Dolphin booking flow as a locked package/vehicle/add-on draft. Booking requests remain subject to confirmation and WhatsApp handoff; no real payment or inventory is implemented.
- Destination cards currently open the Blog list because destination-specific article routes for all stops are not yet present in `BALI_BLOGS`. Replace these with the exact article routes once the destination articles are published.
- The recommendation cards are structural examples; they route to the tour catalog and should later be driven by real package metadata/categories. Ensure the catalog has the corresponding products before treating them as live offerings.
- Source-level JavaScript parsing succeeded for `detail.js` and `checkout.js`. GitHub Pages deployment succeeded on `5cc160c48cb5a2a380d0dcc03845e68300f29080`: https://github.com/baguskristiansianturi/bali-trans/actions/runs/40498712484. Browser smoke tests passed the Dolphin Tour detail and booking-to-WhatsApp handoff, but the overall validation workflow later failed in an unrelated Airport Transfer checkout radio-click test (`input[name="btDirection"][value="to"]` intercepted by `.bt-form-grid`). Do not change Airport Transfer as part of this task; physical Android and desktop visual QA remains outstanding.


## Reusable template direction — 27 October 2026

- Canonical template/component index: `TEMPLATE-REGISTRY.md`. Check it before creating a page or component; update it when template status or source-of-truth files change.
- Shared booking form source is `booking-form.html` + `assets/css/pages/booking-form.css` + `assets/js/pages/booking-form.js`. Airport Transfer remains the visual reference; service adapters must customize fields, summary, validation and WhatsApp payload without inventing a new form design.
- The Dolphin Tour package CTA now uses the shared booking form with `service=full-day-tour` and `tourId=lovina-dolphin-tour`, passing package, vehicle, guest count, extras and return URL.
- GitHub Pages deployment succeeded on commit `49bb873` (workflow: https://github.com/baguskristiansianturi/bali-trans/actions/runs/40524000654). Browser smoke checks passed the default Airport Transfer form configuration and the Dolphin Tour shared-form flow through the WhatsApp request payload. The overall validation workflow still fails later on the known, separate Airport Transfer direction-radio interaction (`.bt-form-grid` intercepts the click); do not confuse that with the shared booking-form checks. Manual visual review on a physical Android phone and desktop is still outstanding.

- The project is in template/UI-UX design stage. The business offer is known; current work defines how it is presented and sold through clear section order, visual hierarchy, responsive behaviour, and a reusable information architecture. Do not treat the prototype as launched or assume sample prices/copy are approved commercial facts.
- Build semantic SEO structure into every approved template from the start: one clear H1, H2s for main sections, and H3s for relevant subsections/cards. Heading levels follow content hierarchy, not visual styling. Later copy/keyword refinement should fit the approved layout rather than trigger a redesign.
- Approve reusable templates before producing content at scale: (1) tour/service detail, (2) article/destination detail, (3) search results, and (4) booking form. Do not write a large batch of destination articles before the single-article detail template is approved.
- Reuse existing approved code before making new UI. The Airport Transfer booking form chosen as the visual reference is `booking-form.html` + `assets/css/pages/booking-form.css` + `assets/js/pages/booking-form.js`. Adapt that markup and styling for Dolphin Tour; do not recreate its visual system from scratch. Change only service-specific fields, validation, summary, and submission data. Keep existing reference form and other pages intact.
- Dolphin Tour itinerary is a concise schedule: approximate time, stop name, and a brief activity cue. Destination cards carry the short place description. Destination-specific detail links are future wiring work and must not point to nonexistent pages or a generic blog list.
- Full working principles and change-control rules: `TEMPLATE-PLAYBOOK.md`.


## Repository modularization — 28 October 2026

- Added `ARCHITECTURE.md`, `docs/architecture/REPOSITORY_MAP.md`, and `assets/README.md` as guides for module ownership, page families, and safe scoped changes.
- Added `.editorconfig` and `.vscode/` workspace defaults for consistent local editing in VS Code.
- Moved the former 309 KB `assets/js/app.js` to `assets/js/legacy/app.js` as an archive. `index.html` loads the active modular files and does not load the archived predecessor.
- Preserved public root-level HTML paths. Moving those documents without a tested compatibility strategy could break links and relative assets, so standalone HTML files remain entry points while page CSS/controllers live under `assets/css/pages/` and `assets/js/pages/`.
- Current validation is not fully green: JavaScript syntax and route/data checks pass, but Playwright fails on the existing Airport Transfer direction radio (`bt-form-grid` intercepts the click). The full suite must be rerun after that scoped failure is fixed.


## Destination architecture and editorial taxonomy — 1 November 2026

- Updated `TEMPLATE-REGISTRY.md`, `ROADMAP.md`, and `MASTER/03-GUIDELINES/ARTICLE-PRODUCTION-SOP.md` to separate the Destination Hub, Destination Category Catalog, Destination Place Detail and Editorial Article/Blog Detail page families.
- Public destination hierarchy: Destinations → Category → Place. Region is a secondary grouping/catalog destination, not a separate main section on the Destination Hub. Curated collections (Latest, Popular, Hidden Gems) remain editorial groupings.
- Breadcrumbs follow their actual page family. Destination place detail: Home → Destinations → Category → Place. Editorial article: Home → Blog → Article Title. Cross-links between the article and its related destination page are allowed, but the two page identities/templates remain separate.
- Editorial labels must reflect article contents. Do not default to Guide/Panduan. Use Travel Information for general travel information and add Tips when practical tips are genuinely present; Tips can apply across travel, shopping, transport, activities and other topics.
- Destination Master remains the source of place facts and analysis notes, not the article template or editorial taxonomy.
- No website code, route, visual layout or public URL was changed in this documentation update. Destination templates and current SPA route mapping remain pending audit and approval.


## Destination grouping implementation — 1 November 2026

- Added separate destination primary taxonomy to `content/bali-master-data.json`: each of the 87 existing records now has one `primary_category_id`, `characteristic_tags`, `record_kind` and `classification_status`; ambiguous and compound entries retain explicit review notes.
- Preserved `destinations[].categories` as the existing activity/theme cross-link field for compatibility. It must not be mistaken for the primary physical place category.
- Added three island-region identities (Nusa Penida, Nusa Lembongan, Nusa Ceningan) beneath the existing Nusa Islands parent group while preserving existing region IDs/routes.
- Added manual curated collection definitions for Latest, Popular and Hidden Gems; memberships remain empty pending editorial selection.
- Classified the Kuta blog article as Travel Information with Tips, linked its data to destination ID `kuta-beach`, and corrected its blog breadcrumb hierarchy. No visual layout or route migration was made.
- The Destination Master remains the source for place analysis and validation notes; current taxonomy classifications are provisional and do not mean all destination facts are verified.


## Destination Hub first implementation — 1 November 2026

- Added a dedicated SPA route `?page=destinations` and a separate Destination Hub renderer at `assets/js/views/destination-hub.js`, with page-scoped responsive styling in `assets/css/pages/destination-hub.css`.
- The page presents a landscape hero, breadcrumb, title/description, #BaliIsland and #Indonesia labels, a horizontally scrollable sticky category rail below the global sticky navbar, responsive destination cards, a designed zero-result state for every empty category, long-form Bali editorial copy, and the existing shared footer.
- Category names and destination identity come from `content/bali-master-data.json`; only articles explicitly marked `publicationStatus: 'PUBLISHED'` and linked by `relatedDestinationId` to a Master record of `record_kind: 'place'` become public cards. The current published destination article is Pantai Kuta; other categories remain visible with zero counts and empty states.
- Counts are derived from published article-to-Master relations. Latest uses Master record `master_added_at` / `master_updated_at` metadata and falls back to Master array order for legacy records; it does not sort by article upload date.
- Cards link to the published editorial article route, not to the legacy region discovery view. Destination Hub and Editorial Article remain distinct page families.
- Added the Destination Hub publication/count/Latest checklist to `SOP.md` and updated `TEMPLATE-REGISTRY.md`. Physical Android visual QA and final visual approval remain pending.


## BDM Trans Indonesia backend foundation — 4 November 2026

- Started the separate Supabase backend project `bdm-trans-indonesia` (Singapore, PostgreSQL 17); this does not replace the public Bali Trans brand or repository and is not connected to Bagusin.
- Verified the existing private `bdm` schema, service/vehicle master data, tariff engine, customer/booking/quote/invoice tables, booking-link flow, admin auth bootstrap and four active Edge Functions.
- Added and verified migration `20261104144950_bdm_driver_assignments_and_payment_collections`: driver profiles, driver assignment history, payment collection ledger and receipt references.
- New operational tables have RLS enabled and are accessible only to the server `service_role`; public `anon` and `authenticated` roles have no schema/table privileges. Keep service credentials server-side.
- Added `supabase/migrations/20261104144950_bdm_driver_assignments_and_payment_collections.sql` and `docs/backend/BDM-BACKEND.md` as repository source-of-truth notes.
- Admin portal URL: `https://ulekpblspvmcdcxefwas.supabase.co/functions/v1/bdm-admin-app`. The owner must register there using the allowlisted owner email; the database trigger grants the owner role. No matching Auth user/admin record existed during inspection, so owner login is not yet verified.
- Current operational data is still empty: no approved tariff rows, fleet unit records, drivers, bookings, invoices or collections. Existing vehicle models are master catalogue entries, not registered physical fleet units.
- **Not production-ready yet:** admin screens/API actions for drivers and payment verification, atomic invoice reconciliation, booking/availability conflict tests, quote-to-booking lifecycle tests, PDF documents, Resend secrets, gateway/webhook integration, and end-to-end security tests remain open.
- The Supabase security advisor flags RLS-enabled private tables without policies. This is currently intentional because the `bdm` schema is not granted to browser roles; reassess before exposing any table through the Data API.
- Public GitHub Pages frontend was not changed or redeployed as part of this backend-only task. Preserve the approved homepage and service layouts when later integrating the booking API.
