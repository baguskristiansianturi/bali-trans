# Initial Frontend Audit — Bali Trans

**Branch awal:** `work/site-structure-audit`  
**Pembaruan:** `work/shared-navigation-audit-2026-10-17`  
**Audit type:** static repository inspection  
**Date:** 16 October 2026  
**Important:** this is not a browser, responsive-device, end-to-end, or deployment test.

## Scope checked

- Enumerated the repository's HTML pages and local assets.
- Checked relative `href` and `src` targets in all 35 HTML pages present on the preview baseline, including the new `pages/account/wishlist.html`.
- Reviewed representative homepage, experiences, Lovina detail, tickets, tours, account, booking, and shared JavaScript/CSS files.
- Confirmed the Pages workflow is configured to run on pushes to `preview/bali-trans`, not this work branch.

## Static link result

**No missing local file targets were found** in the 34 HTML pages checked during the first static pass. This does not prove that external links work, that buttons behave correctly, or that all pages render correctly in a browser.

## Findings

1. The homepage hero previously presented Lovina Dolphin Experience as the single featured starting point. It now points to the general Experiences catalogue, so Lovina remains a test product rather than the homepage's central identity.
2. Tickets and Tours currently contain generic foundation-page copy rather than useful product listings. This is a content/structure gap, not evidence that the categories are ready to sell.
3. Account pages (login, register, profile, bookings, journeys, invoices and reviews) are mostly placeholder structures; static markup does not provide real authentication or account persistence.
4. Wishlist did not exist as a page. A first empty-state page has been added at `pages/account/wishlist.html`. It explicitly says saving/syncing is not connected and does not pretend that favourites are persisted.
5. Header navigation and footer markup are repeated across pages and have differences in labels/brand wording. This makes consistency changes error-prone and requires a dedicated shared-layout audit before bulk restyling.
6. Shared mobile navigation now updates `aria-expanded` and its accessible label as it opens/closes. Browser and assistive-technology behaviour still needs runtime verification.
7. Initially, Wishlist was linked from the homepage only. A follow-up change now adds a Wishlist link to the primary navigation of the other 33 HTML pages; this is a narrow accessibility improvement, not a full header/footer standardization.
8. The homepage and sampled prototype pages carry `noindex` metadata. SEO readiness and final indexing policy must be reviewed before a public launch; a public GitHub Pages URL is not private.

## Changes made on the initial implementation branch

- Homepage hero changed from a single-product feature to a general Experiences entry point.
- Added a Wishlist empty-state page with honest preview limitations.
- Added Wishlist links to the homepage navigation/footer.
- Improved mobile navigation's `aria-expanded` and accessible label state in `js/main.js`.

## Not yet verified

- Browser visual review at mobile and desktop widths.
- Touch navigation, keyboard focus, screen-reader behaviour, and horizontal overflow.
- Actual search submission and full Lovina request flow in a browser.
- Form validation and state retention through every step.
- GitHub Pages deployment from the preview branch.
- Operational product details, supplier, prices, capacity, and booking fulfilment.

## Next implementation priority

Continue the shared-layout audit: compare header/footer, spacing, page headings, CTA labels, and mobile behaviour across all pages; identify one reusable standard and correct inconsistencies in small, reviewable groups. Then test the Lovina flow end-to-end in the browser before adding more product content.


## Follow-up: shared navigation link audit — 17 October 2026

**Branch:** `work/shared-navigation-audit-2026-10-17`  
**Scope:** add the existing Wishlist page to the primary navigation on 33 HTML pages that did not yet expose it.

- Added exactly one `Wishlist` navigation link to 33 pages; the homepage and Wishlist page already had their own link and were left unchanged.
- Checked the generated relative path for each of the 33 changed pages. **33/33 links resolve to `pages/account/wishlist.html` in the repository path model.**
- This is a static path check only. It does not verify browser navigation, keyboard focus, menu wrapping/overflow, or screen-reader behaviour.
- The broader header/footer audit remains open: navigation item order and labels vary, footer structures differ, and some checkout pages intentionally use a reduced footer.
- The preview branch at commit `fc5b16ee0eb445ab5dc1bfbb2373ddb0b1ada407` has successful GitHub Actions publish and Pages build/deployment runs. The live URL itself was not verifiable from the current tool environment, and browser/mobile review remains outstanding.
- No code from this follow-up branch has been merged into `preview/bali-trans` or `main` at the time this note was written.


### Full static reference check — 17 October 2026

- Enumerated the current preview baseline and confirmed **35 HTML pages**.
- Scanned **840 `href`/`src` attributes** across all 35 pages on `work/shared-navigation-audit-2026-10-17`.
- **No missing local file targets** were found by the repository-relative path check.
- The 33 newly added Wishlist navigation links were individually checked and all resolve to `pages/account/wishlist.html`.
- This check cannot establish whether external links respond, JavaScript interactions work, the layout fits mobile screens, or the live site renders correctly.


### Repository status re-check — 17 October 2026

- Pull request [#2](https://github.com/baguskristiansianturi/bali-trans/pull/2), “Make Wishlist reachable from every page header”, is now merged into `preview/bali-trans` at `fb6d9e0a2d3cca00f37cd69b8ab9e26c520bf294`.
- GitHub Actions reports success for the preview publish workflow and Pages build/deployment workflow associated with that preview commit.
- This updates the earlier historical note above that the follow-up branch had not yet been merged. The merge target was the preview branch, **not `main`**.
- `HANDOFF.md` and `ROADMAP.md` did not exist in the preview branch tree at the verified baseline; they are being added in a separate documentation PR.
- Next priority remains the shared header/footer and responsive UX audit. No browser, device, assistive-technology, or booking end-to-end test is claimed by this re-check.


### Header/footer source audit — 17 October 2026

Reviewed source for all 35 HTML pages on `preview/bali-trans` at baseline `1fc61249263794343ea64427c91a66226b92f8a0`. This is a source-level audit, not browser testing.

Findings:
- The pages do not share one consistent header implementation: navigation links/labels differ by page family. The homepage uses “Travel guides”; most internal pages use “Build Your Day”; the Wishlist page has a different “Tickets” navigation item.
- The menu-toggle markup is inconsistent. Some pages include `aria-label`, `aria-expanded`, and `aria-controls`; other pages omit one or more of these attributes. The admin/account/booking pages do not all expose the same accessible control markup.
- Footer markup exists across the reviewed pages, but structure/content varies between the homepage and internal page families. Do not assume visual consistency without browser comparison.
- Relative local `href`/`src` targets remain covered by the previous 840-attribute static audit; no new link-resolution scan was performed in this pass.

Recommended next implementation: standardize the menu-toggle accessibility contract and navigation labels/structure in a small, reviewable change, while preserving intentional page-specific links and active states. Before changing all pages, confirm the shared JavaScript selectors and responsive CSS; validate static links after edits. Browser/mobile and keyboard testing remain outstanding.


### Keyboard accessibility follow-up — 17 October 2026

- PR #5 merged the runtime assignment of `aria-controls` in `js/main.js`, using the actual `mainNav` element ID. This supplements the existing `aria-expanded` and dynamic `aria-label` updates.
- PR #6 added `:focus-visible` indicators for links, buttons, form controls, summaries and tabindex elements, including a visible focus indicator for the homepage search field.
- Both changes are source-level improvements. Browser keyboard traversal, focus visibility against every background, contrast, mobile interaction and screen-reader behaviour are **not verified**.
- Latest preview commit: `ea155fe2317d18db1adea213b4dd178c61d01418`. The publish and Pages workflows were queued when checked; do not claim this commit deployed until those runs complete successfully.


### PR-safe validation workflow setup — 17 October 2026

- Added `scripts/validate_content_layout.py` to check the seven agreed pages for local links/assets, H1/main structure, skip link and focusable main target, unique nav/menu IDs, shared stylesheet and meta description.
- Added `.github/workflows/content-layout-check.yml`, triggered by relevant pull requests targeting `preview/bali-trans` and by manual dispatch. It only validates source; it does not deploy.
- The workflow is currently on branch `ci/content-layout-validation-2026-10-17`. Since GitHub uses workflows present on the base branch for PR events, this workflow cannot validate the PR that introduces it until merged to the base; it will apply to subsequent PRs. Do not claim a passing Actions run for this branch.
- Manual static verification from PR #10 already checked 191 local references with zero missing targets, but this new script has not yet been run by Actions. Browser/mobile/desktop and assistive-technology checks remain outstanding.


### PR #11 validation failure investigation — 17 October 2026

- Inspected failed GitHub Actions run [39004177941](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004177941) and its job log. It checked 175 local references, but the page-layout assertions failed on all seven old preview pages because the PR #10 package (skip links, focusable `#mainContent`, and `css/content-layout.css`) was not in PR #11's merge revision.
- This is a real failure of the initial validator's assumptions about the checked-out revision. It is not evidence that the proposed PR #10 pages failed their contract, because those changes are not included in PR #11.
- Corrected `scripts/validate_content_layout.py`: local references are still checked; the seven-page layout contract is enforced only when `css/content-layout.css` exists in the checked-out revision. The script explicitly reports when package checks are skipped.
- Next acceptance evidence: obtain a successful run for the corrected PR #11 branch, then run the full contract on a revision containing PR #10. Keep browser/mobile/desktop, keyboard and screen-reader checks marked unverified until performed.


### Public content package and validator follow-up — 17 October 2026

- PR #10's seven pages are About, Contact, Privacy, Terms, Search, Guides index and Travel Updates. The package adds `css/content-layout.css`, page-specific copy, skip links to `#mainContent`, a focusable main landmark, and shared skip-link focus/reduced-motion styling.
- Static checks recorded 191 local `href/src` references and 23 unique local targets, with no missing targets. Source checks also recorded one H1, one balanced main landmark, one `mainNav`, one `menuToggle`, a shared stylesheet reference and a meaningful meta description on each page.
- PR #11's first Actions run failed because the infrastructure-only PR's merge revision did not contain PR #10's content package. The validator was corrected to retain local-reference checks and enforce the full page contract only when `css/content-layout.css` is present. The corrected run passed local-reference validation and explicitly reported that package-specific assertions were skipped.
- PR #11 is now merged into `preview/bali-trans` at `89dd3deae1fee67e437aac0e5e597264a30ec598`. The full validator passed on a package-containing PR #10 revision in [run 39004560674](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004560674): seven pages, the full layout contract and 191 local href/src references. The current head adds explicit accessible names to all seven primary navigation landmarks; the newest run for the current head is pending at this checkpoint.
- No browser/mobile/desktop, keyboard traversal, screen-reader, live deployment or end-to-end booking check has been performed. Legal pages remain drafts, Contact is not connected to support, Search is a navigation prototype, and Travel Updates has no live feed.
- The broader navigation/footer inconsistencies in PR #9 remain a separate audit task; do not infer site-wide consistency from this seven-page package.

 
### Relative URL audit clarification — 17 October 2026

- A later review of browser-relative URL resolution found that earlier notes overstated the relative-link issue. Paths such as `../pages/search.html` from `pages/about.html` and `../../pages/search.html` from nested `pages/<family>/index.html` resolve to the intended `pages/search.html`; they do not inherently create a duplicated `pages/pages/` path.
- PR #10 normalizes the seven pages to shorter, locally consistent relative paths, but this should be described as link-path normalization, not as proof that the earlier paths were broken.
- The current package validator has passed the full contract and local-reference checks on a revision containing `css/content-layout.css` in run [39004560674](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004560674). The full contract passed on PR #10's final head in [run 39004821005](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004821005): 7 pages and 191 local href/src references.


## Complete header/footer source inventory — 17 October 2026

**Scope:** inspected the source of all 35 HTML routes on the current `preview/bali-trans` branch after PR #10 merged. This is a row-by-row source inventory, not browser, responsive, keyboard, screen-reader or end-to-end verification.

**Codes:** `Shared` navigation = Discover / Experiences / Tours / Dining / Build Your Day / Wishlist. `Home` = Discover / Experiences / Tours / Dining / Travel guides / Wishlist. `Wishlist` = Discover / Experiences / Tours / Tickets / Wishlist. Toggle `All` means the source contains `aria-label`, `aria-expanded` and `aria-controls`; `Label` means only `aria-label`; `None` means none of those three attributes is present in initial HTML. Footer `Full` is the standard 14-link footer; `Home` is the homepage's 15-link Discover/Plan/Information variant; `Wish` is the Wishlist's 13-link variant; `Detail` is the experience detail's 12-link variant; `Compact` is the booking-step footer with Privacy and Terms only.

| Route | Nav variant | Logo subtitle | Toggle source attributes | Footer | `aria-current=page` |
| --- | --- | --- | --- | --- | --- |
| `index.html` | Home | TRANS | All | Home (15 links) | None |
| `pages/about.html` | Shared | TRANS | All | Full | None |
| `pages/contact.html` | Shared | TRANS INDONESIA | All | Full | None |
| `pages/privacy.html` | Shared | TRANS INDONESIA | All | Full | None |
| `pages/terms.html` | Shared | TRANS INDONESIA | All | Full | None |
| `pages/search.html` | Shared | TRANS INDONESIA | All | Full | None |
| `pages/experiences/index.html` | Shared | TRANS | Label | Full | Experiences |
| `pages/experiences/lovina-dolphin.html` | Shared | TRANS | Label | Detail (12 links; includes Home) | None |
| `pages/tickets/index.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/tours/index.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/destinations/index.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/dining/index.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/marketplace/index.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/guides/index.html` | Shared | TRANS INDONESIA | All | Full | None |
| `pages/guides/travel-updates.html` | Shared | TRANS INDONESIA | All | Full | None |
| `pages/transport/index.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/itinerary/build.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/itinerary/itinerary.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/account/bookings.html` | Shared | TRANS | None | Full | None |
| `pages/account/dashboard.html` | Shared | TRANS | None | Full | None |
| `pages/account/invoices.html` | Shared | TRANS | None | Full | None |
| `pages/account/journeys.html` | Shared | TRANS | None | Full | None |
| `pages/account/login.html` | Shared | TRANS | None | Full | None |
| `pages/account/profile.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/account/register.html` | Shared | TRANS | None | Full | None |
| `pages/account/reviews.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/account/wishlist.html` | Wishlist | TRANS | All | Wish (13 links) | Wishlist |
| `pages/booking/step-1.html` | Shared | TRANS | Label | Compact (2 links) | None |
| `pages/booking/step-2.html` | Shared | TRANS | Label | Compact (2 links) | None |
| `pages/booking/step-3.html` | Shared | TRANS | Label | Compact (2 links) | None |
| `pages/booking/confirmation.html` | Shared | TRANS | Label | Compact (2 links) | None |
| `pages/booking/payment.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/booking/invoice.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/partner/index.html` | Shared | TRANS INDONESIA | None | Full | None |
| `pages/admin/index.html` | Shared | TRANS INDONESIA | None | Full | None |

### Cross-route findings

- **Navigation labels:** 33 routes use the Shared variant; homepage substitutes “Travel guides” for “Build Your Day”; Wishlist substitutes “Tickets” for both “Dining” and “Build Your Day”. The Wishlist variant is not documented as an intentional product decision yet.
- **Logo subtitle:** both `TRANS` and `TRANS INDONESIA` are used across the site. The difference is not tied consistently to page family.
- **Header CTA:** homepage uses “Plan your day” and points to the itinerary builder; most pages use “Plan Your Journey” and point to booking step 1. Lovina detail uses “Plan your journey”; Wishlist uses “Explore experiences”; booking steps use contextual back/detail CTAs. Preserve contextual labels only where the destination warrants them, and normalize generic casing.
- **Menu toggle:** 7 public content package pages (About, Contact, Privacy, Terms, Search, Guides index, Travel Updates) now contain all three static ARIA attributes after PR #10. Homepage and Wishlist also contain all three. Experiences index/detail and booking steps 1–3/confirmation contain only `aria-label`; the remaining 20 routes contain none in initial HTML. Runtime code may initialize state, but source differences remain.
- **Navigation naming:** the seven PR #10 content pages explicitly label their nav landmark “Primary navigation”; this has not yet been standardized across the other routes.
- **Active state:** only Experiences index and Wishlist currently expose `aria-current="page"` in the primary nav. The other 33 routes have no current-page marker in the inspected nav markup. Do not claim active-state consistency.
- **Footer:** 28 routes use the standard 14-link full footer; homepage uses a 15-link custom footer; Wishlist has a 13-link variant; Lovina detail has a 12-link variant including a Home link; booking steps 1–3 and confirmation use a compact two-link footer. The compact checkout footer is a likely intentional exception, but it still needs visual and task-flow validation.
- **Footer copy:** generic labels vary, including “My Bali Trans”, “My Bali”, “My account”, “Local Products” and “Local products”. Footer link order is mostly repeated, but homepage and Wishlist use different groupings.
- **Relative URL clarification:** relative paths such as `../pages/search.html` from a top-level `pages/*.html` file and `../../pages/search.html` from a nested `pages/<family>/index.html` file resolve to `pages/search.html`; these patterns are not inherently broken. PR #10 normalized its seven-page package to shorter relative paths; earlier notes that those prior patterns necessarily created `pages/pages/` targets were overstated.
- **Prototype caveat:** repeated header/footer markup does not mean account, booking, payment, partner/admin or search operations are live. Keep the prototype limitations in public copy.

### Recommended next implementation (not yet applied)

1. Agree one shared public navigation order and decide whether the homepage and Wishlist variants are intentional.
2. Approve one logo subtitle and normalize generic CTA casing; retain destination-specific CTA copy where useful.
3. Add static menu-toggle ARIA attributes consistently to remaining pages, preserving the JS state update.
4. Add `aria-current="page"` only where a reliable page/current-section rule can be applied; avoid false active states.
5. Keep the compact booking footer as a documented exception unless browser testing identifies a usability problem.
6. Implement changes by complete page family in a separate code PR; rerun local-reference validation and test the deployed preview at mobile/desktop widths plus keyboard/focus. No browser/runtime result is claimed by this inventory.

### Final verification checkpoint — 17 October 2026

- PR #11, #10 and #9 are merged into `preview/bali-trans`; `main` remains a separate production/release branch.
- PR #10's final head passed [content-layout workflow run 39004821005](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004821005): 7 target pages, full package contract and 191 local href/src references.
- Preview publish and Pages deployment succeeded for commit `87ff23f` after PR #10. The runs for the newest preview commit `ce445d3` (after PR #9 documentation merge) were still in progress at the last check.
- The complete 35-route source inventory is above. It is not a visual, keyboard, screen-reader or end-to-end audit.
- No site-wide navigation/footer rewrite was made. The inventory recommends deciding shared labels and intentional exceptions before touching remaining page families.
- Keep operational limitations explicit: the current preview is noindex, Search is a navigation prototype, Contact has no connected support channel, Privacy/Terms are drafts, Travel Updates has no live feed, and booking/payment/account/admin flows are not live services.


### Site-wide navigation accessibility consistency — verified 17 October 2026

- PR [#13](https://github.com/baguskristiansianturi/bali-trans/pull/13) is merged into `preview/bali-trans` at `b4889983891b4b0cd6ee2f5c9bf7f005d4f4f73f`; it does not change `main`.
- Across all 35 HTML routes, primary navigation landmarks now have explicit accessible names. Every mobile menu toggle has `aria-label`, initial `aria-expanded="false"` and `aria-controls="mainNav"` in source markup. The existing shared JavaScript still handles runtime open/close state.
- The updated validator passed [Actions run 39007631543](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007631543): site-wide navigation contract, seven-page content layout contract and 852 local `href/src` references.
- Preview publishing succeeded [run 39007651200](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007651200), and GitHub Pages build/deployment succeeded [run 39007651001](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007651001).
- **Still unverified:** visual quality and responsive overflow on mobile/desktop, real keyboard traversal, screen-reader behaviour, and end-to-end search/Lovina request flow. This audit establishes source and CI outcomes only.


### Strict initial navigation contract — verified 17 October 2026

- PR [#15](https://github.com/baguskristiansianturi/bali-trans/pull/15) is merged into `preview/bali-trans` at `e6508ef864bf1f341a535e33061450b324411733`; `main` is unchanged.
- All 35 HTML routes now use the exact same primary navigation label, `Primary navigation`. Every menu toggle starts with `Open navigation`, `aria-expanded="false"` and `aria-controls="mainNav"`; runtime state changes remain in the shared script.
- Exact-value static validation passed [run 39007861375](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007861375), checking 35 pages, the seven-page content contract and 852 local references. Preview publishing and Pages deployment also succeeded: [run 39007886095](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007886095), [run 39007886174](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007886174).
- Still unverified: actual responsive visual layout, keyboard traversal, screen-reader output, search interactions and the Lovina request flow in a real browser.


### Wishlist navigation consistency — merged 17 October 2026

- PR [#17](https://github.com/baguskristiansianturi/bali-trans/pull/17) is merged into `preview/bali-trans` at `508eb060eb5389279ba7b6abbc6c3f3c42ff21e0`; `main` is unchanged.
- Wishlist now uses the shared navigation order: Discover / Experiences / Tours / Dining / Build Your Day / Wishlist, with `aria-current="page"` on Wishlist.
- Static validation passed [run 39008026462](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39008026462); preview publishing succeeded [run 39008045984](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39008045984).
- Still unverified: mobile menu fit and scrolling, visual responsive layout, keyboard traversal and screen-reader behaviour. Check the Pages deployment workflow separately.


### Information architecture review — 17 October 2026

User review identified three premature standalone sections: Dining, Guides, and Local Products. Decision: remove Dining and Local Products from primary navigation and homepage/footer promotion; treat Guides as a Blog/article hub, not a separate product feature. Keep relevant dining and destination guidance as blog articles. Do not delete route files before checking inbound links and deciding redirect/retirement behaviour.

Terms page was a foundation draft listing policy requirements but offering little visitor-facing explanation. It is expanded on branch `work/remove-premature-sections` into a structured working draft covering prototype limitations, information accuracy, enquiries vs confirmed bookings, third-party providers, price/cancellation policies, travel decisions, website availability, privacy and launch review. It must remain marked draft until business details and qualified legal review are complete.

**Verification boundary:** repository source edits do not establish visual consistency, mobile layout, legal validity, working booking operations or deployment success. Run the static content-layout validator and local-reference audit after completing the navigation edits.


## Follow-up: navbar density, locale pairing and foundation-page sequencing — 17 October 2026

User direction: the global navbar should remain compact and blog-like, not expose every category. Language and currency must be selected as one locale preference to avoid two separate user actions. Suggested defaults are Bahasa Indonesia/IDR, Bahasa Melayu/MYR, Singapore English/SGD and international/US English/USD; these are locale profiles, not a universal language-to-currency rule. Do not implement a misleading language-only currency switch or suggest all translations exist until translation coverage is real.

The build sequence is: classify existing routes; standardize header/footer and core pages; finish accurate content, metadata, empty/error states and responsive UX; obtain user UX/UI review; then test the Lovina request/booking package as one journey. Custom product pages and package-level acceptance remain downstream. Keep navigation short; promote only primary discovery, Blog and one primary planning action, while considering wishlist/account and secondary categories in less prominent locations after route-family review.


### Content foundation changes — 17 October 2026

The working branch now includes a reusable editorial article style in `css/content-layout.css`, a conceptual representative article at `pages/guides/travel-updates.html`, a populated Blog hub, and replacement of the Transport foundation placeholder with visitor-facing conceptual copy. Homepage primary navigation has been shortened. About, Contact, Privacy and Discover copy has also been adjusted.

Locale requirement is now explicit: casual Bahasa Indonesia / IDR; Bahasa Melayu Malaysia / MYR; natural Singlish / SGD; natural American English / USD. A single control must choose a locale profile and its default currency together. No locale switcher or complete translations should be claimed yet.

Static link validation, workflow status, browser responsiveness and deployment still need separate verification. Article image/source details are deliberately marked as pending rather than presented as verified.


### Detail navigation follow-up — 17 October 2026

Terms and Lovina detail now use the compact public navigation pattern. Account, booking, partner and admin route families remain outside the completed pass and still need classification. Do not treat this as a site-wide route audit.

### Homepage navigation scope note — 17 October 2026

- Homepage source change removes its Dining nav/footer links only. Dining pages and other routes remain untouched pending a complete inbound-link audit.
- This is source-only evidence; no live browser, mobile, keyboard or screen-reader check is claimed.


### Visitor-facing copy audit follow-up — 17 October 2026

Source edits on `preview/bali-trans` replaced “Structure ready” / “Foundation page” copy with visitor-facing explanations on account, payment/invoice, partner/admin and itinerary pages. Tours, Tickets, Destinations, Discover/Search, Transport and Blog were revised to give practical planning guidance rather than generic category-template text. The representative planning article now reads as a usable checklist instead of editorial scaffolding. Dining and Marketplace routes have been repurposed as practical guidance rather than promoted as standalone catalogue features. Compact navigation was also applied to the account and booking routes touched in this pass.

**Remaining verification:** this is not proof that every paragraph on all 35 routes is final. Continue route-by-route to identify any remaining developer-facing wording, empty states, inconsistent header/footer labels, and CTAs that suggest unavailable services. Then run local-link validation and inspect GitHub Actions and Pages deployment. Browser/mobile/keyboard/screen-reader behaviour remains unverified. Do not mark site-wide copy acceptance complete until all 35 routes are inspected.


### Latest source-level copy/navigation checkpoint — 17 October 2026

The latest pass updated visitor-facing copy on the homepage, Blog/article, Tours, Tickets, Destinations, Discover/Search, Transport, itinerary, account, booking, payment/invoice, partner/admin, Dining and Marketplace routes. It also aligned compact Discover / Experiences / Blog navigation on additional account, booking, itinerary, partner/admin and legacy secondary routes, and removed Dining/Local Products promotion from the footer links inspected in this pass.

A repository-wide search of all 35 routes has not been completed after these edits. Remaining acceptance work: inspect every route for internal/editor-facing phrases and inconsistent CTAs; verify all local references; check GitHub Actions and Pages deployment; then do browser-based mobile/desktop, keyboard and assistive-technology review. The latest queried combined commit status returned an empty statuses array, so no CI pass can be claimed. No open PRs were returned by the current PR search.


### Focused legacy-link sweep — 17 October 2026

A source scan of all 35 HTML routes checked linked labels and destinations for the legacy Dining, Local Products, Travel guides and Guides promotions. The identified links were removed or renamed to Blog, and the affected routes were re-read after the changes. This closes the focused promotion sweep only; it does not certify every href/src target, every paragraph of copy, or the retirement/redirect decision for the Dining and Marketplace route files.


### Homepage marketplace card source check — 17 October 2026

- Source inspection confirms the homepage includes four marketplace-style service cards and the responsive CSS rules are present.
- JavaScript syntax check passed; tours and transport destination files exist in the same preview branch.
- Live rendering, external image availability, deployment completion and browser interaction remain unverified. This is a source-level check only.
