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
- PR #10 must now be rechecked by the enabled workflow on a revision containing the package. Keep browser/mobile/desktop rendering, keyboard operation, screen-reader review and live deployment marked unverified until performed.
- Search remains a navigation prototype; Contact has no connected support channel; Privacy and Terms are drafts; Travel Updates has no live feed. Do not imply operational booking or support.

**Resume next:** inspect PR #10's latest Actions run, fix any real validation failures, then resolve the documentation conflicts caused by the base update. Keep PR #9's navigation/footer inventory separate.
