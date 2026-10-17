# Handoff — Bali Trans / BDM Trans Indonesia

**Last updated:** 17 October 2026  
**Repository:** `baguskristiansianturi/bali-trans`  
**Working preview branch:** `preview/bali-trans`  
**Production/main branch:** `main` — separate from preview; do not assume it contains these changes.

## Latest verified repository state

- Latest preview commit checked: `4ff48c745edf00c6567482c3eff979274ca60d77` — “Update handoff after keyboard accessibility fixes”.
- PRs #2 through #7 have been merged into `preview/bali-trans`; this does not mean they are merged into `main`.
- For the latest commit, GitHub Actions reports success for both [preview publish](https://github.com/baguskristiansianturi/bali-trans/actions/runs/38982675105) and [Pages build/deployment](https://github.com/baguskristiansianturi/bali-trans/actions/runs/38982675154). This confirms workflow completion, not manual inspection of the live page.
- Static audit records 35 HTML pages and 840 `href`/`src` attributes checked, with no missing local targets found by the repository-relative scan.
- Wishlist links were statically checked on the 33 pages where they were added.
- PR #5 sets `aria-controls` for the mobile menu at runtime in `js/main.js`. PR #6 adds visible `:focus-visible` styles in `css/style.css`.

## Current known gaps

- No confirmed browser-based visual review, narrow-screen/desktop responsive check, keyboard walkthrough, screen-reader check, or end-to-end booking test.
- Header labels, menu markup, brand wording and footer structures still vary across page families. Do not mass-rewrite these without classifying page exceptions first.
- Search and Lovina request flow have only been inspected at source level. `sessionStorage` is client-side prototype state, not a backend booking system.
- Account, wishlist, partner/admin, payment, invoice and booking screens are prototype structures; do not present them as operational services.
- The preview includes `noindex` metadata and the Pages workflow writes a disallow-all `robots.txt`. Preserve this until launch/indexing policy is deliberately reviewed. A public GitHub Pages URL is not private.
- Supplier details, live availability, price, cancellation rules and fulfilment remain unverified.

## Source-level observations

- The shared mobile menu toggles the `mobile-open` class and updates `aria-expanded` and `aria-label`; it also assigns `aria-controls` when both the toggle and navigation exist.
- The CSS opens the menu at the mobile breakpoint when `.mobile-open` is present. Runtime behaviour, focus handling, and visual overflow remain untested in a real browser.
- The search form redirects to `pages/search.html` with an encoded query when submitted. Actual results and empty-query behaviour still need browser verification.
- Lovina flow uses session storage and labels the final state as a test completion, not a real reservation/payment. Verify date validation, state retention, back/refresh and missing-state behaviour in a browser before expanding this pattern.

## Resume instructions

1. Read `HANDOFF.md`, `ROADMAP.md` and `AUDIT.md`, then confirm the latest preview head and workflow statuses.
2. Continue P0 with a small, evidence-based shared-layout change. First classify navigation/footer variants and intentional exceptions; avoid bulk edits without a clear standard.
3. Re-run the static local-reference scan after HTML changes.
4. Next, test homepage search and the Lovina request flow in a browser when a browser-testing environment is available.
5. Report static checks, automated workflows, live deployment, and manual browser/device checks separately. Never mark untested behaviour as verified.


### PR-safe static validation setup — 17 October 2026

- Added `scripts/validate_content_layout.py`, a Python-standard-library validator for the seven public content pages. It checks local `href`/`src` targets, one H1, one balanced main landmark, skip-link target markup, unique menu/nav IDs, shared stylesheet and meta description.
- Added `.github/workflows/content-layout-check.yml` for pull requests targeting `preview/bali-trans` and manual dispatch. It runs the validator without deploying the site.
- Important GitHub Actions limitation: because this workflow is introduced on this branch, GitHub will not use it to validate this same PR before it exists on the base branch. It becomes available to future PRs after being reviewed and merged into `preview/bali-trans`. This PR itself has not been CI-tested by the new workflow.
- Next: review and merge this CI-enablement PR separately if approved, then use the check on PR #10 and future content changes. Browser/device review is still required; static validation cannot replace visual, keyboard or screen-reader testing.


### CI failure analysis and validator correction — 17 October 2026

- GitHub Actions run [39004177941](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004177941) for PR #11 did run and failed. The job checked out GitHub's synthetic merge of PR #11 with the current preview base, which still contains the older versions of the seven pages; the content-layout package and `css/content-layout.css` are only proposed in PR #10.
- The failure was a validation-scope mismatch, not evidence that PR #10's page package failed: the validator required PR #10's skip-link, main landmark and stylesheet contract while running on a revision that did not contain that package.
- Updated the validator so local `href/src` checks still run, but package-specific assertions are only enforced when `css/content-layout.css` exists in the checked-out revision. Once the package is included, all seven page contracts remain required.
- Re-run Actions on the updated PR #11 branch and record the actual outcome. PR #10 still needs the full package checks when the validator is available on the base branch, plus browser/device and keyboard/accessibility review.
- Do not treat a skipped package-contract run as proof that the seven-page layout passes; the output must explicitly say when those assertions were skipped.


### Public content package — consolidated status after CI enablement (17 October 2026)

- PR #10 contains the seven-page public content package: About, Contact, Privacy, Terms, Search, Guides index and Travel Updates, plus `css/content-layout.css`.
- Source-level checks on the package reported 191 local `href/src` references, 23 unique local targets and no missing targets. The seven pages were also checked for one H1, a balanced main landmark, a skip link to a focusable `#mainContent`, one `mainNav`, one `menuToggle`, the shared stylesheet and usable meta descriptions.
- PR #11 has now been merged into `preview/bali-trans` at `89dd3deae1fee67e437aac0e5e597264a30ec598`, enabling the new PR validation workflow. The first run on PR #11 failed because its base revision did not contain PR #10's package; after fixing the validator scope, Actions passed local-reference validation while explicitly skipping the package contract.
- The full validator passed on a package-containing PR #10 revision in [run 39004560674](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004560674): seven pages, the full layout contract and 191 local href/src references. The current head adds explicit accessible names to all seven primary navigation landmarks; the newest run for the current head is pending at this checkpoint. Keep browser/mobile/desktop rendering, keyboard operation, screen-reader review and live deployment marked unverified until performed.
- Search remains a navigation prototype; Contact has no connected support channel; Privacy and Terms are drafts; Travel Updates has no live feed. Do not imply operational booking or support.

**Resume next:** inspect PR #10's latest Actions run, fix any real validation failures, then resolve the documentation conflicts caused by the base update. Keep PR #9's navigation/footer inventory separate.

 
### Relative URL audit clarification — 17 October 2026

- A later review of browser-relative URL resolution found that earlier notes overstated the relative-link issue. Paths such as `../pages/search.html` from `pages/about.html` and `../../pages/search.html` from nested `pages/<family>/index.html` resolve to the intended `pages/search.html`; they do not inherently create a duplicated `pages/pages/` path.
- PR #10 normalizes the seven pages to shorter, locally consistent relative paths, but this should be described as link-path normalization, not as proof that the earlier paths were broken.
- The current package validator has passed the full contract and local-reference checks on a revision containing `css/content-layout.css` in run [39004560674](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004560674). The full contract passed on PR #10's final head in [run 39004821005](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004821005): 7 pages and 191 local href/src references.


### Full route inventory checkpoint — 17 October 2026

- Completed a source-level header/footer inventory for all 35 HTML routes on the current preview branch after PR #10 merged. The row-by-row matrix and variants are in `AUDIT.md`.
- Confirmed primary nav variants: shared six-item nav on 33 routes; homepage uses “Travel guides”; Wishlist uses “Tickets” and omits “Dining”/“Build Your Day”. Both `TRANS` and `TRANS INDONESIA` subtitles remain in use.
- Only Experiences index and Wishlist have an `aria-current="page"` marker. Menu-toggle ARIA attributes vary; the seven PR #10 public-content pages now have all three static attributes, but many other routes still omit some or all.
- Footer variants: 28 standard full footers, one homepage custom footer, one Wishlist footer, one experience-detail footer, and four compact booking-step/confirmation footers.
- PR #10 is merged into `preview/bali-trans` at `87ff23ff9d509f8f24631061f62ae367bf9b3ecf`. GitHub Actions reports success for [preview publish](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004849545) and [Pages build/deployment](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004849189). This confirms workflow completion, not visual or mobile acceptance.
- The earlier relative-link concern was overstated: `../pages/...` and `../../pages/...` can resolve correctly depending on the source file's directory. PR #10 normalized relative paths on its seven pages; do not repeat the claim that those patterns were necessarily broken.

**Resume next:** use the complete inventory to agree the site-wide nav/footer contract, then implement a small, reviewable PR by page family. Do not claim responsive layout, keyboard operation, screen-reader behaviour or booking flows are verified without browser testing.

### Final verification checkpoint — 17 October 2026

- PR #11 (static validator/workflow), PR #10 (seven-page public content package) and PR #9 (35-route header/footer source inventory) are all merged into `preview/bali-trans`.
- PR #10's exact final head passed [workflow run 39004821005](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39004821005): the full layout contract and 191 local href/src references across seven pages.
- Preview publish and Pages deployment succeeded for `87ff23f` after PR #10. After PR #9's documentation merge, the latest preview publish and Pages deployment runs for `ce445d3` were still in progress when this note was written; recheck them before claiming the latest deployment is live.
- Source-level inventory now covers all 35 routes and is recorded in AUDIT.md. It identifies navigation and footer variants but does not implement site-wide normalization.
- Still unverified: browser visual review at mobile/desktop widths, keyboard traversal, screen-reader output, live page visual state, search behaviour and the Lovina request flow. The public content package is statically checked, not fully accepted for UX.
- The current preview remains a prototype: Search is not a backend, Contact has no connected support channel, Privacy/Terms are drafts, Travel Updates has no live feed, and booking/payment/account/admin operations are not operational.

**Next:** confirm latest preview deployment, then review the seven-page package on a real mobile browser and desktop viewport. After that, agree the navigation/footer standard before changing remaining page families. Never mark browser or operational tests complete without running them.


### Site-wide navigation accessibility consistency — verified 17 October 2026

- PR [#13](https://github.com/baguskristiansianturi/bali-trans/pull/13) is merged into `preview/bali-trans` at `b4889983891b4b0cd6ee2f5c9bf7f005d4f4f73f`. `main` remains separate.
- The PR normalized all 35 HTML routes: each `#mainNav` has an accessible name, and each `#menuToggle` declares `aria-label`, `aria-expanded="false"` and `aria-controls="mainNav"` in initial markup. The shared JavaScript continues updating the expanded state and label at runtime.
- The updated validator passed in [Actions run 39007631543](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007631543): 35 HTML pages, site-wide navigation contract, seven-page content layout contract and 852 local `href/src` references.
- Preview publish succeeded in [run 39007651200](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007651200); GitHub Pages build/deployment succeeded in [run 39007651001](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007651001).
- This is static markup and workflow evidence, not manual visual acceptance. Mobile/desktop rendering, keyboard walkthrough, screen-reader output and real booking-flow behaviour remain unverified.


### Strict initial navigation contract — verified 17 October 2026

- PR [#15](https://github.com/baguskristiansianturi/bali-trans/pull/15) is merged into `preview/bali-trans` at `e6508ef864bf1f341a535e33061450b324411733`; `main` remains separate.
- All 35 HTML routes use `aria-label="Primary navigation"` on `#mainNav`. Each menu toggle starts with `aria-label="Open navigation"`, `aria-expanded="false"` and `aria-controls="mainNav"`. Existing JavaScript changes the label and expanded state during interaction.
- Exact-value static validation passed in [run 39007861375](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007861375): 35 HTML pages, seven-page content contract and 852 local `href/src` references.
- Preview publish succeeded in [run 39007886095](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007886095); GitHub Pages build/deployment succeeded in [run 39007886174](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39007886174).
- Still unverified: live visual inspection, mobile/desktop overflow, real keyboard traversal, screen-reader output and end-to-end search/Lovina request flow. Static and deployment workflows are not user-journey acceptance tests.


### Wishlist navigation consistency — merged 17 October 2026

- PR [#17](https://github.com/baguskristiansianturi/bali-trans/pull/17) is merged into `preview/bali-trans` at `508eb060eb5389279ba7b6abbc6c3f3c42ff21e0`; `main` remains separate.
- Wishlist's primary navigation now matches the shared six-item order: Discover, Experiences, Tours, Dining, Build Your Day, Wishlist. The Wishlist item retains `aria-current="page"`.
- Static validation passed in [run 39008026462](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39008026462), including 35 HTML pages and 852 local `href/src` references. Preview publish succeeded in [run 39008045984](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39008045984).
- Check the Pages deployment result separately; responsive fit, keyboard navigation and screen-reader behaviour remain unverified without browser testing.


### Scope correction: simplify navigation and complete existing content — 17 October 2026

- User direction: Dining and Local Products are not needed as standalone features at this stage. Practical guidance belongs in blog articles, not a separate Guides product/menu. Prioritize completing existing pages (especially Terms) instead of creating more demo/foundation pages.
- Working branch: `work/remove-premature-sections`, based on `preview/bali-trans`; production `main` remains untouched.
- This branch begins by removing Dining and Local Products from homepage navigation/footer, relabelling the article hub as Blog, and expanding Terms into a structured draft. The Terms page remains explicitly non-final because the legal operator identity, real booking/payment process, cancellation/refund rules and applicable legal review are not confirmed.
- Do not delete Dining, Guides or marketplace route files until the 35-route inbound-link audit is complete; first remove public promotion and decide whether old URLs should redirect, become articles, or be retired.
- Verification boundary: changes are source edits only until static validator/link checks and GitHub Actions results are inspected. No browser/device or legal review is claimed.
- Next: inspect the diff and validator outcome; search all HTML pages for Dining, Guides and Local Products nav/footer links, normalize page-family navigation in a small PR, then replace remaining generic foundation copy with useful content and honest empty states.


### New product direction: compact blog-like navigation and locale pairing — 17 October 2026

- User asks for a restrained navbar, similar to a blog/site rather than a crowded list of every category. Core pages and shared layout must be completed before adding more custom pages.
- Language and currency should be chosen together in one locale preference (not two separate controls). Candidate locale profiles: Bahasa Indonesia + IDR, Bahasa Melayu + MYR, Singapore English + SGD, international/US English + USD. Do not claim language uniquely determines currency; present these as locale defaults and document fallback/formatting/persistence before implementing.
- Sequence is explicit: (1) simplify and standardize nav/header/footer by page family; (2) complete essential website pages and their real content/states; (3) review UX/UI on mobile and desktop with the user; (4) only then run the Lovina package as a complete end-to-end test. Do not use package QA as a substitute for missing foundation pages.
- Current PR #20 contains the first information-architecture correction and expanded Terms draft. Automated content-layout workflow passed for its latest commit; browser/device review is still unconfirmed. Continue with small reviewable changes and report each verification level separately.


### Content foundation progress — 17 October 2026

- User clarified locale voice: Indonesia = casual Bahasa Indonesia; Malaysia = Bahasa Melayu Malaysia; Singapore = natural Singlish; United States = natural American English. One locale profile pairs language and default currency: IDR, MYR, SGD and USD respectively. This does not mean language alone always determines currency.
- Homepage primary nav is reduced to Discover, Experiences and Blog with one Plan CTA. The Blog hub has conceptual article cards, a shared editorial block system is added to `css/content-layout.css`, and `pages/guides/travel-updates.html` is now the representative concept article layout.
- Transport page placeholder was replaced with substantive conceptual guidance and clear non-live availability language. Search, About, Contact and Privacy copy were also improved in this branch.
- These are source changes, not a verified deployment. Next: validate local links, remove Dining/Local Products promotion from remaining core footers, inspect remaining foundation pages for placeholder copy, and check the newest Actions run. Locale switching/translations are not implemented yet.
- Sequence remains: finish core page copy/layout → user UX/UI review → only then end-to-end Lovina package test.


### Latest continuation checkpoint — 17 October 2026

- Working branch latest checked commit: `966938b6270c0b0fd53869d620cf4bed1a557711` — “Track foundation copy implementation and remaining gates”.
- Static content-layout workflow succeeded on that commit: [run 39022227620](https://github.com/baguskristiansianturi/bali-trans/actions/runs/39022227620).
- A fresh repository-relative link scan across 15 core/public pages found no missing local `href/src` targets. This is a scoped scan, not yet the full 35-route audit.
- Core source updates in this pass: compact Home/Discover/Experiences/Blog navigation; substantive conceptual copy for Transport, Tours, Tickets, Destinations and Plan your day; populated Blog hub; reusable article styles and representative article; improved About, Contact, Privacy and Discover copy; removed Dining/Local Products promotion from the edited core-page footers.
- Still not complete: other route families (account, booking, partner/admin), whole-repository link/footer audit, locale selector and actual translations, visual mobile/desktop testing, and live Pages deployment check.
- Locale voices remain required: casual Bahasa Indonesia; Bahasa Melayu Malaysia; natural Singlish; natural American English. The single language+currency profile control has not been implemented because current page copy is not yet translated into those four distinct voices.
- Keep the sequence: finish all foundation routes and shared blocks → user reviews UX/UI → only then test the Lovina package end-to-end. Do not claim browser or device verification from CI.
