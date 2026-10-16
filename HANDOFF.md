# Handoff — Bali Trans / BDM Trans Indonesia

**Last updated:** 17 October 2026  
**Repository:** `baguskristiansianturi/bali-trans`  
**Working preview branch:** `preview/bali-trans`  
**Production/main branch:** `main` — do not assume preview changes are present here.

## Last verified state

- Latest verified preview commit: `fb6d9e0a2d3cca00f37cd69b8ab9e26c520bf294` — “Make Wishlist reachable from every page header”.
- PR [#2](https://github.com/baguskristiansianturi/bali-trans/pull/2) is merged into `preview/bali-trans`; it is not a merge into `main`.
- GitHub Actions preview publish run and GitHub Pages build/deployment run for that commit report **success**. This verifies workflow completion, not a manual check of the live page.
- Static audit in `AUDIT.md`: 35 HTML pages and 840 `href`/`src` attributes checked; no missing local file targets found by the repository-relative scan.
- Wishlist navigation was added to the 33 pages that did not already have it; the reported static path check was 33/33.
- `main` is still the original foundation commit in the latest repository commit listing. Do not describe the preview as production or imply the branches are synchronized.
- `HANDOFF.md` and `ROADMAP.md` were absent from the preview tree before this documentation branch; this file is the first explicit handoff record.

## Known limitations — still open

- No browser-based visual verification, mobile/desktop responsive check, keyboard/screen-reader check, or full end-to-end booking test has been confirmed.
- Header/footer structures and navigation labels are not yet standardized across all pages.
- The search and Lovina request flow need runtime testing; client-side session storage is not a backend booking system.
- Account, wishlist, partner/admin, payment, invoice and booking screens are prototype structures; do not present them as operational services.
- The prototype includes `noindex` metadata and the preview workflow writes a disallow-all `robots.txt`. Review launch/indexing policy before any public launch. A public GitHub Pages URL is not private.
- Product details, supplier confirmation, live availability, price, cancellation rules and fulfilment have not been verified.

## Resume instructions

1. Read this file, `ROADMAP.md`, and the latest `AUDIT.md` before editing.
2. Confirm the current preview branch head and Actions status; do not rely on old PR descriptions if a newer commit exists.
3. Continue with the first open roadmap task: a narrow shared header/footer and responsive UX audit. Keep changes in a work branch and open a PR targeting `preview/bali-trans`, not `main`.
4. After each change, report exactly what was checked (static, automated, browser, or live deployment). Do not call a task complete based on code changes alone.
5. Update `AUDIT.md` with findings and `HANDOFF.md` with the new commit, test evidence, remaining gaps, and the next concrete action.
