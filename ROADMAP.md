# Roadmap — Bali Trans / BDM Trans Indonesia

**Updated:** 17 October 2026  
**Current scope:** frontend foundation and verification. Keep implementation on `preview/bali-trans` until the prototype is reviewed; do not treat preview work as production-ready.

## Working rules

- Evidence first: distinguish static checks, automated workflow results, browser/device tests, and live deployment checks.
- Work in small PRs targeting `preview/bali-trans`; do not merge directly into `main` without an explicit release decision.
- Do not add real booking, payment, authentication, supplier, or admin claims before the supporting backend and operational process exist.
- Preserve the experience-led product direction: Discover → Choose → Price → Book → Travel → optional transport. Transport is not the main entry point.
- Keep the public preview clearly marked as a prototype and preserve the no-index / disallow policy until launch readiness is decided.

## Current verified baseline

- Preview head at last check: `fb6d9e0a2d3cca00f37cd69b8ab9e26c520bf294`.
- PR #2 merged into `preview/bali-trans`; the preview publish and Pages build/deployment workflows for that commit succeeded.
- Static link audit: 35 HTML pages, 840 `href`/`src` references checked, no missing local targets reported.
- Wishlist navigation is present in the 33 pages covered by the follow-up static check.
- Browser/mobile/accessibility/end-to-end verification is **not yet confirmed**.
- `main` remains separate from the preview work and must not be assumed to contain the latest prototype.

## Priority order

### P0 — Shared layout and responsive UX audit (next)

- [ ] Compare header, primary navigation order/labels, footer, page title/subtitle spacing, CTA wording and content width across all HTML pages.
- [ ] Record page groups and justified exceptions (for example, a reduced checkout footer) before changing shared patterns.
- [ ] Identify the smallest consistent header/footer standard; avoid an unreviewed mass rewrite.
- [ ] Check mobile menu open/close state, touch reachability, keyboard focus, overflow, and layout at narrow and desktop widths.
- [ ] Implement corrections in a small reviewable PR and rerun the static local-link scan.

**Exit evidence:** documented page coverage and exceptions; static checks pass; browser/mobile checks are reported separately and are not claimed unless actually run.

### P1 — Search and Lovina request flow verification

- [ ] Walk through homepage search to search results with empty and non-empty queries.
- [ ] Test the Lovina flow from experience selection through guest details, review and final state.
- [ ] Verify required fields, date constraints, session-storage behaviour, back/refresh behaviour, and invalid/missing-state handling.
- [ ] Confirm the final state clearly says no reservation/payment is completed unless a real service is connected.
- [ ] Record browser/device and exact results. Fix defects in small PRs.

### P2 — Page content and IA completeness

- [ ] Replace generic Tickets and Tours foundation copy with honest catalogue empty states or clearly labeled sample content.
- [ ] Review destination, dining, marketplace, guide and transport pages for useful purpose and clear navigation.
- [ ] Keep unverified suppliers, prices, availability, ratings and policies out of public copy.
- [ ] Review page titles, descriptions, heading hierarchy and indexation policy after IA stabilizes.

### P3 — Booking/product requirements before backend

- [ ] Define booking lifecycle, quote vs confirmed reservation, cancellation/refund rules, guest notifications and support ownership.
- [ ] Define supplier inventory/availability and pricing source of truth.
- [ ] Specify account and wishlist expectations, privacy/data retention, authorization and admin/partner roles.
- [ ] Create acceptance criteria and error states before implementation.

### P4 — Backend and production engineering (blocked on requirements)

- [ ] Design Go backend and PostgreSQL schema/API only after booking and operational requirements are reviewed.
- [ ] Plan authentication, authorization, payment provider integration, email/invoice, audit logs, secrets and data protection.
- [ ] Add automated tests and staging environments before production deployment.
- [ ] Decide hosting/deployment and release process; do not treat GitHub Pages as the backend or production booking system.

## Done / not done at this checkpoint

**Verified:** preview workflow success for the listed commit; static relative-reference audit as recorded in `AUDIT.md`; Wishlist links statically resolve.

**Not verified:** live site visual rendering, responsive behaviour, accessibility in a browser/assistive technology, external URLs, functional search/booking end-to-end, operational data, backend, payments, or production readiness.
