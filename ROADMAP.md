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
