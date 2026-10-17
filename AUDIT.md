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
- PR #11 is now merged into `preview/bali-trans` at `89dd3deae1fee67e437aac0e5e597264a30ec598`. The full validator still needs to run against PR #10 with the package present.
- No browser/mobile/desktop, keyboard traversal, screen-reader, live deployment or end-to-end booking check has been performed. Legal pages remain drafts, Contact is not connected to support, Search is a navigation prototype, and Travel Updates has no live feed.
- The broader navigation/footer inconsistencies in PR #9 remain a separate audit task; do not infer site-wide consistency from this seven-page package.
