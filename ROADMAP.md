# Roadmap — Bali Trans / BDM Trans Indonesia

**Updated:** 17 October 2026  
**Scope:** frontend foundation and verification. Work on `preview/bali-trans` until the prototype has been reviewed; do not treat it as production-ready.

## Working rules

- Evidence first: distinguish source/static checks, automated workflow results, browser/device tests and live deployment checks.
- Use small PRs targeting `preview/bali-trans`; do not merge into `main` without an explicit release decision.
- Do not imply real booking, payment, authentication, supplier inventory or admin operations exist before the supporting backend and processes exist.
- Preserve the experience-led journey: Discover → Choose → Price → Book → Travel → optional transport.
- Keep `noindex` and the disallow-all preview policy until launch/indexing readiness is deliberately reviewed.

## Current verified baseline

- Preview commit checked: `4ff48c745edf00c6567482c3eff979274ca60d77`.
- Both workflows for that commit succeeded: [preview publish](https://github.com/baguskristiansianturi/bali-trans/actions/runs/38982675105) and [Pages build/deployment](https://github.com/baguskristiansianturi/bali-trans/actions/runs/38982675154).
- Static link audit: 35 HTML pages and 840 `href`/`src` attributes checked; no missing local targets were reported.
- Wishlist navigation links were added to 33 pages and statically checked.
- Source fixes: mobile menu gets `aria-controls` at runtime; shared CSS has visible `:focus-visible` outlines.
- Browser/mobile/keyboard/screen-reader/end-to-end verification remains **not confirmed**. `main` is separate from preview.

## P0 — Shared layout and responsive UX audit (in progress)

- [x] Compare header/navigation/footer source across 35 HTML pages and record initial findings in `AUDIT.md`.
- [x] Add a Wishlist link to the 33 pages that lacked one; statically check relative targets.
- [x] Add runtime `aria-controls` assignment for the shared mobile menu.
- [x] Add shared keyboard focus-visible styling.
- [ ] Classify header/footer variants by page family and document justified exceptions (e.g. reduced checkout footer).
- [ ] Define consistent navigation labels/order and brand wording before applying changes.
- [ ] Compare page title/subtitle spacing, CTA wording and content width.
- [ ] Check mobile menu open/close, touch reachability, focus visibility, overflow and narrow/desktop layouts in a browser.
- [ ] Implement the smallest agreed corrections in a reviewable PR and rerun the static local-reference scan.

**Exit evidence:** documented page coverage and exceptions; static checks pass; browser/mobile checks reported separately and only claimed when run.

## P1 — Search and Lovina request flow

- [ ] Test homepage search with empty and non-empty queries and inspect result handling.
- [ ] Test Lovina selection → guest details → review → final state in a browser.
- [ ] Verify required fields, date constraints, session-storage behaviour, back/refresh and invalid/missing-state handling.
- [ ] Ensure the final state clearly says no real reservation/payment was created.
- [ ] Record device/browser and exact outcomes; fix defects in small PRs.

## P2 — Page content and information architecture

- [ ] Replace generic Tickets and Tours foundation copy with honest empty states or clearly labelled sample content.
- [ ] Review destination, dining, marketplace, guide and transport pages for clear purpose and navigation.
- [ ] Keep unverified suppliers, prices, availability, ratings and policies out of public copy.
- [ ] Review titles, descriptions, heading hierarchy and indexation policy after information architecture stabilizes.

## P3 — Booking/product requirements

- [ ] Define booking lifecycle, quote vs confirmed reservation, cancellation/refund rules, guest notifications and support ownership.
- [ ] Define supplier inventory/availability and pricing source of truth.
- [ ] Specify account/wishlist expectations, privacy/data retention, authorization, and admin/partner roles.
- [ ] Set acceptance criteria and error states before implementation.

## P4 — Backend and production engineering (blocked on requirements)

- [ ] Design Go backend and PostgreSQL schema/API only after booking and operational requirements are reviewed.
- [ ] Plan authentication, authorization, payment provider, email/invoice, audit logs, secrets and data protection.
- [ ] Add automated tests and staging environments before production deployment.
- [ ] Decide hosting and release process; GitHub Pages is not a backend or production booking system.

## Done / not done at this checkpoint

**Verified:** source-level changes listed above; static local-reference scan as described; GitHub Actions publish and Pages workflows succeeded for the recorded preview commit.

**Not verified:** live-site visual rendering, responsive behaviour, accessibility with a browser/assistive technology, external URLs, functional search/booking end-to-end, operational product data, backend, payments or production readiness.


### PR-safe content validation — 17 October 2026

- [x] Add a dependency-free Python validator for the seven-page public content layout package.
- [x] Add a GitHub Actions workflow for PRs targeting `preview/bali-trans` and manual dispatch; it does not deploy.
- [ ] Review and merge the CI-enablement PR before expecting the workflow to run on future PRs. The workflow cannot validate its own introducing PR while absent from the base branch.
- [ ] Once enabled, run the validator against PR #10 and resolve any failures before considering merge.
- [ ] Complete real browser/device, keyboard and screen-reader checks; automated source validation alone is not acceptance.


### Validation failure and scope fix — 17 October 2026

- [x] Inspect the first Actions run for PR #11 rather than treating the empty status lookup as inconclusive: run [39004177941](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004177941) failed because PR #11's merge revision contains the older preview pages, not the seven-page package proposed in PR #10.
- [x] Adjust the validator to retain local reference checks on the older base while enabling the full page-layout contract only when `css/content-layout.css` is present.
- [ ] Re-run the workflow after this fix and record its actual result.
- [ ] Once the workflow is available on the base branch, validate PR #10's seven-page package against the full contract; do not count a skipped contract as a package pass.
- [ ] Complete real browser/device, keyboard and screen-reader checks; automation does not replace them.


### Public content package and validation enablement — 17 October 2026

- [x] Implement page-specific content and shared styles for About, Contact, Privacy, Terms, Search, Guides index and Travel Updates.
- [x] Source-check 191 local `href/src` references across the seven pages; all 23 unique local targets exist.
- [x] Add skip links, focusable main landmarks, menu-toggle ARIA attributes and shared focus/reduced-motion styles to the seven-page package.
- [x] Merge PR #11 into `preview/bali-trans` (`89dd3deae1fee67e437aac0e5e597264a30ec598`) to enable PR-safe static validation.
- [x] Full layout contract passed on a package-containing PR #10 revision in [run 39004560674](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004560674): seven pages and 191 local href/src references.
- [ ] Confirm the newest workflow run for the current head, which adds explicit accessible names to all seven primary navigation landmarks; resolve any failure.
- [ ] Resolve PR #10 documentation conflicts against the updated preview base without dropping either PR's notes.
- [ ] Review all seven pages together in a real browser at narrow mobile and desktop widths; test keyboard focus/navigation and screen-reader behaviour where available.
- [ ] Continue PR #9's page-family header/footer audit only after its branch is reconciled with the current base.

**Acceptance boundary:** static source checks do not establish rendered visual quality, runtime accessibility, live deployment, or real booking/support functionality.

 
### Relative URL audit clarification — 17 October 2026

- A later review of browser-relative URL resolution found that earlier notes overstated the relative-link issue. Paths such as `../pages/search.html` from `pages/about.html` and `../../pages/search.html` from nested `pages/<family>/index.html` resolve to the intended `pages/search.html`; they do not inherently create a duplicated `pages/pages/` path.
- PR #10 normalizes the seven pages to shorter, locally consistent relative paths, but this should be described as link-path normalization, not as proof that the earlier paths were broken.
- The current package validator has passed the full contract and local-reference checks on a revision containing `css/content-layout.css` in run [39004560674](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004560674). The full contract passed on PR #10's final head in [run 39004821005](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004821005): 7 pages and 191 local href/src references.


### Header/footer inventory — completed source pass (17 October 2026)

- [x] Inspect the header/navigation/footer source for all 35 HTML routes on `preview/bali-trans`.
- [x] Record each route's nav variant, logo subtitle, static menu-toggle ARIA attributes, footer variant and `aria-current` marker in `AUDIT.md`.
- [x] Record CTA and footer-copy variations and identify the compact booking footer as a likely intentional exception.
- [x] Correct the audit note that overstated relative URL breakage: `../pages/...` and `../../pages/...` resolve correctly in the inspected directory contexts; PR #10 normalized paths but did not prove those patterns were broken.
- [ ] Agree shared nav labels/order, logo subtitle and generic CTA casing before any site-wide markup changes.
- [ ] Decide whether Wishlist's “Tickets” variant and homepage “Travel guides” variant are intentional.
- [ ] Standardize static menu-toggle ARIA attributes and current-page markers by page family, while preserving valid exceptions.
- [ ] Implement the agreed contract in small PRs; run local reference checks and test mobile/desktop, keyboard/focus and relevant user journeys in a real browser.

**Evidence boundary:** inventory is source-level only. PR #10 is merged and preview publish/Pages deployment workflows succeeded at `87ff23f`; no visual, responsive, keyboard, screen-reader or end-to-end booking test has been performed.

### Final checkpoint after PR #9–#11 — 17 October 2026

- [x] Merge PR #11: static content validator and PR workflow enabled on `preview/bali-trans`.
- [x] Merge PR #10: seven-page public content package.
- [x] Full content-layout contract passed on PR #10's final head in [run 39004821005](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004821005): 7 pages and 191 local href/src references.
- [x] Merge PR #9: source-level row-by-row header/footer inventory for all 35 HTML routes.
- [ ] Confirm publish and Pages deployment runs for current preview head `ce445d3`; they were still in progress at the last check.
- [ ] Review the seven-page package in a real browser at mobile and desktop widths; test keyboard/focus and screen-reader behaviour where available.
- [ ] Agree shared navigation labels/order, logo subtitle, generic CTA casing and intentional exceptions before making site-wide markup changes.
- [ ] Standardize missing menu-toggle ARIA attributes and current-page markers by page family after agreement; preserve contextual booking/product CTAs and the compact checkout footer if validated.
- [ ] Test homepage search and the Lovina request flow in a browser, including invalid/missing state, back/refresh and session-storage behaviour.

**Boundary:** source validation and workflow results are not visual acceptance or proof of live booking/payment functionality.


### Site-wide navigation consistency — verified 17 October 2026

- [x] Normalize accessible names for primary navigation and initial ARIA attributes for the mobile menu across all 35 HTML routes.
- [x] Expand static validation to all HTML routes for local references and the shared navigation contract, while retaining the seven-page content layout contract.
- [x] Merge [PR #13](https://github.com/baguskristiansianturi/bali-trans/pull/13) into `preview/bali-trans` at `b4889983891b4b0cd6ee2f5c9bf7f005d4f4f73f`.
- [x] Verify static checks passed: [run 39007631543](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007631543), 35 HTML pages and 852 local `href/src` references.
- [x] Verify preview publish and GitHub Pages build/deployment succeeded: [publish run 39007651200](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007651200), [Pages run 39007651001](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007651001).
- [ ] Test the live preview at mobile/desktop widths, including menu open/close, keyboard focus and screen-reader behaviour.
- [ ] Test homepage search and the Lovina request flow end-to-end in a real browser. Static checks do not establish runtime behaviour or operational booking readiness.


### Strict initial navigation contract — verified 17 October 2026

- [x] Normalize all 35 routes to the exact primary-navigation accessible name and initial closed-menu ARIA state.
- [x] Enforce exact values in the static validator across all HTML routes.
- [x] Merge [PR #15](https://github.com/baguskristiansianturi/bali-trans/pull/15) into `preview/bali-trans` at `e6508ef864bf1f341a535e33061450b324411733`.
- [x] Verify [static validation run 39007861375](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007861375): 35 HTML pages and 852 local `href/src` references.
- [x] Verify [preview publish run 39007886095](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007886095) and [Pages deployment run 39007886174](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007886174) succeeded.
- [ ] Test real mobile/desktop rendering, menu interaction, keyboard traversal and screen-reader behaviour.
- [ ] Test homepage search and the Lovina request flow in a real browser. Do not infer operational booking readiness from static checks.


### Wishlist navigation consistency — merged 17 October 2026

- [x] Align Wishlist navigation to the shared six-item order while retaining its current-page marker.
- [x] Verify static validation passed: [run 39008026462](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39008026462), 35 HTML pages and 852 local `href/src` references.
- [x] Merge [PR #17](https://github.com/baguskristiansianturi/bali-trans/pull/17) into `preview/bali-trans` at `508eb060eb5389279ba7b6abbc6c3f3c42ff21e0`.
- [x] Verify preview publish succeeded: [run 39008045984](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39008045984).
- [ ] Confirm the latest Pages deployment result and test menu fit on a narrow mobile viewport.
- [ ] Complete real mobile/desktop, keyboard and screen-reader checks separately.


### Information architecture and existing-page content — 17 October 2026

- [ ] Remove Dining from primary navigation and homepage/footer discovery links; retain useful dining advice as dated blog articles where relevant.
- [ ] Treat the existing Guides area as the Blog/article hub, not a separate product feature. Article content should be useful, dated, source-backed for factual claims, and not imply a live travel-alert feed.
- [ ] Remove Local Products/marketplace promotion from primary discovery and footers for this phase; do not expand marketplace scope without a later explicit product decision.
- [x] Expand the Terms page into a structured, honest working draft covering preview limitations, enquiries, providers, prices/cancellations, travel information, privacy and launch review requirements. It remains a draft, not legally approved or ready for live bookings.
- [ ] Audit all 35 HTML routes for remaining Dining, Guides and Local Products navigation/footer links and inbound links before deleting or redirecting any pages.
- [ ] Review existing Experiences, Tours, Tickets, Destinations, Transport, Contact and Privacy pages for useful complete content; replace generic demo/foundation copy and clearly label unavailable services.
- [ ] Run HTML/local-link validation and content-layout workflow after changes. Browser/mobile/desktop and live deployment checks remain separate acceptance gates.

**Decision recorded:** no standalone Dining or Local Products feature for the current scope; travel guidance belongs in blog articles. Preserve source pages temporarily until route references are audited to avoid broken links.


## Product scope clarification — core website before Lovina package QA (17 October 2026)

### Navigation and locale
- [ ] Keep the global navbar deliberately compact and blog-like; do not expose every future product/category as a top-level item. Proposed core: Discover/Experiences, Blog, one clear Plan CTA, and one compact locale control. Wishlist/account links should be secondary unless a tested user journey proves they need global prominence.
- [ ] Standardize shared header/footer by page family before applying to all routes; preserve justified reduced layouts for checkout/request steps.
- [ ] Treat language and currency as one **locale preference** control (one selection updates both), not two separate selectors. Initial proposed profiles for review: Bahasa Indonesia → IDR; Bahasa Melayu → MYR; Singlish (Singapore) → SGD; American English (United States) → USD. These are defaults only: language does not inherently determine currency, so label profiles clearly and let users change the locale as a pair later if required.
- [ ] Do not imply that all pages are translated merely because a locale control exists. Build locale infrastructure and visible selector only after the supported locales, default, persistence, formatting, and untranslated-content fallback are specified.

### Foundation-page completion before custom pages
- [ ] Inventory all 35 routes and classify: essential public pages, content/blog, conversion/request flow, account prototype, future/parked feature.
- [ ] Complete the essentials first: Home, Discover/Search, Experiences, Blog/article detail, About, Contact, Privacy, Terms, and honest 404/empty/error states. Review Tours, Tickets, Destinations and Transport against real product scope before deciding to keep as core navigation or move to secondary links.
- [ ] Make all public-facing pages purposeful and content-complete; replace generic demo copy with useful copy, or label genuinely unavailable functionality honestly. Verify page title/description, one clear H1, primary CTA, mobile reading width, and consistent header/footer.
- [ ] Only after the core page set and shared UX/UI are reviewed and accepted should the team test the Lovina booking/request package as one end-to-end journey. No package-level acceptance before the user approves the page experience.


## Content foundation correction — approved direction (17 October 2026)

- Singapore profile must use natural, context-appropriate Singlish, not generic/formal English with a Singapore currency label. Malaysia profile must use Bahasa Melayu Malaysia, not Bahasa Indonesia. Indonesia profile must use casual, natural Bahasa Indonesia. United States/international profile must use natural American English, not stiff corporate copy.
- One locale control selects the language profile and its default currency together: Indonesia → IDR; Malaysia → MYR; Singapore/Singlish → SGD; United States/American English → USD. Keep the pair explicit as a profile; do not imply language alone determines a user's currency in every circumstance.
- Every in-scope page needs complete conceptual copy before SEO/copy optimization. A concept is acceptable at this stage, but empty “structure ready” placeholders are not. State clearly when real supplier, price, availability, or operational information is not yet confirmed.
- Reuse a single article content-block system and one representative article layout so the team can review the visual model consistently: title/deck, byline or update date, hero/media, contents where useful, readable body sections, callout/source notes, related articles and a clear next step. Build the block once and reuse it rather than inventing a different layout for every article.
- Keep the navbar compact and blog-like. Dining and Local Products are not top-level features; useful advice can be published as blog content. Keep the page label “Transport” for now and evaluate the actual scope before considering “Car Rental”.
- Delivery sequence: complete the shared article/page blocks and conceptual copy for all core pages; review the full UX/UI with the user; only after explicit approval test the Lovina package end-to-end. Do not mark the Lovina package as the next acceptance gate before the foundation review.


## Conceptual content foundation — 17 October 2026

- Singapore locale means natural Singlish, not generic English; Malaysia uses Bahasa Melayu Malaysia; Indonesia uses casual, natural Bahasa Indonesia; United States uses natural American English.
- A single locale profile selects language and default currency together: Indonesia/IDR, Malaysia/MYR, Singapore/Singlish/SGD, United States/American English/USD. Do not imply the language alone determines currency in all cases.
- Every in-scope page needs complete conceptual copy before SEO/copy optimisation. Empty “structure ready” sections do not count as complete.
- Reuse the shared article content blocks in `css/content-layout.css` and the representative article in `pages/guides/travel-updates.html` for layout review. Replace the placeholder image and add verified sources/review dates before publishing.
- Keep the global navbar compact: Discover, Experiences, Blog and one Plan CTA. Dining and Local Products are not top-level features; publish relevant advice as blog content. Keep “Transport” as the working label until service scope is assessed.
- Finish core page copy and shared page-family layouts, then review UX/UI with the user. Only after explicit approval should the Lovina package receive end-to-end acceptance testing.


## Foundation content implementation status — 17 October 2026

### Completed as source changes on `work/remove-premature-sections`
- [x] Homepage primary navigation reduced to Discover, Experiences and Blog, with Plan your day as the separate primary CTA.
- [x] Core public-page navigation aligned on Home, Discover, Experiences, Blog, About, Contact, Privacy, Transport and the article model.
- [x] Added reusable article blocks in `css/content-layout.css` and a representative conceptual article with contents, headings, callouts, related content and explicit draft/source caveats.
- [x] Replaced Transport, Tours, Tickets, Destinations and Plan your day foundation placeholders with substantive concept copy and honest availability/functionality notes.
- [x] Improved About, Contact, Privacy and Discover conceptual copy; removed Dining/Local Products promotion from the core pages edited in this pass.
- [x] Updated HANDOFF.md and AUDIT.md to record the locale voice requirement and remaining verification gates.

### Still open — do not mark the foundation complete yet
- [ ] Audit and normalize every remaining route family, including booking, account, partner and admin screens; some may require intentionally reduced navigation.
- [ ] Audit every remaining footer and internal link for premature Dining/Local Products promotion and broken destinations.
- [ ] Implement a single locale-profile control only after the copy strategy is ready for actual language-specific content. Required voices: casual Bahasa Indonesia; Bahasa Melayu Malaysia; natural Singlish; natural American English. Defaults: IDR, MYR, SGD, USD. No selector or translation completeness is claimed yet.
- [ ] Review the latest content-layout workflow result; it was still in progress at the last check.
- [ ] Browser/mobile/desktop review and live deployment verification remain outstanding.
- [ ] User must review and approve the full UX/UI before Lovina end-to-end package testing begins.

### Focused homepage navigation correction — 17 October 2026

- Removed the Dining link from the homepage primary navigation and Plan footer group only; no Dining route files were deleted.
- This is deliberately narrower than the open PR #20: internal-route navigation and the guide/article hub were not changed in this commit.
- Recheck local links and the latest Pages workflow before treating this change as deployed. Browser/mobile review remains outstanding.


## Visitor-ready copy pass — 17 October 2026

### Completed directly on `preview/bali-trans`
- Replaced the internal “Structure ready”/“Foundation page” copy on account pages (login, register, dashboard, profile, bookings, journeys, invoices and reviews) with visitor-facing explanations of what is and is not available.
- Rewrote visitor copy for Tours, Tickets, Destinations, Plan your day, Discover/Search, Transport and the Blog hub to provide practical guidance rather than category-template language.
- Reworked the representative Blog article so it reads as a usable planning checklist; removed internal notes instructing the editor to add an image or treat the body as concept copy.
- Replaced internal placeholders on itinerary overview, payment, invoice, partner and admin pages with clear status copy and safer expectations.
- Repurposed Dining and Marketplace routes as practical travel guidance rather than promoting standalone dining/product catalogue features.
- Standardized compact Discover / Experiences / Blog navigation on the account and booking pages updated in this pass.

### Still required — do not mark the site-wide copy audit complete
- [ ] Review all 35 HTML routes for remaining developer-facing language, generic/unfinished copy, contradictory CTAs and unsupported claims. This pass changed many routes but did not complete a full human review of every paragraph on every route.
- [ ] Reconcile all header/footer variants, including reduced checkout layout and internal partner/admin screens; confirm every CTA matches a real available action.
- [ ] Validate all local links after edits, run the relevant GitHub Actions workflows and verify the resulting Pages deployment.
- [ ] Review responsive layout, touch navigation and keyboard focus in a real browser. No visual/browser acceptance is claimed by source edits alone.
- [ ] Keep locale voice requirements on the roadmap: casual Bahasa Indonesia; Bahasa Melayu Malaysia; natural Singlish; natural American English. Do not claim translations or a locale selector exist yet.
- [ ] Obtain Mas Bagus's UX/UI review before the Lovina request journey is accepted end-to-end.

**Copy acceptance rule:** visitor-facing copy must be coherent and usable before SEO optimization. Do not expose internal phrases such as “foundation page”, “structure ready”, “concept article”, or editor instructions in published-facing content. Where service data or functionality is not real yet, explain that limitation plainly without turning the whole page into developer notes.


### Next execution checkpoint — 17 October 2026

**Next task: finish the full route-by-route acceptance audit, not add features.** Inspect all 35 HTML pages and their shared header/footer for (1) remaining developer-facing/template language, (2) content that reads as a category placeholder rather than useful visitor copy, (3) inconsistent or misleading CTA destinations, (4) Dining/Local Products promotion, and (5) missing local files/assets. Correct issues directly on preview/bali-trans, keep the PR list empty, and update this roadmap only with changes actually applied and verification evidence. Then inspect Actions and deployment; only after that should Mas Bagus review the complete UX/UI before Lovina end-to-end acceptance.


### Focused legacy-link sweep — 17 October 2026

A source scan of all 35 HTML routes checked linked labels and destinations for the legacy Dining, Local Products, Travel guides and Guides promotions. The identified links were removed or renamed to Blog, and the affected routes were re-read after the changes. This closes the focused promotion sweep only; it does not certify every href/src target, every paragraph of copy, or the retirement/redirect decision for the Dining and Marketplace route files.
