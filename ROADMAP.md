# Bali Trans — Roadmap

Updated: 2026-10-25
Rule: preserve the approved homepage and existing approved page designs. Avoid broad redesigns while fixing specific functionality.

## P0 — Current release integrity

- [x] Correct shared footer Help Centre and FAQ destinations.
- [x] Route Terms and Conditions and Privacy Policy to their actual SPA pages.
- [x] Add Partner Enquiries destination to footer.
- [x] Add Account Access page and connect Create account menu action.
- [x] Explain honestly that real account registration is unavailable until a secure backend is connected.
- [x] Improve large-desktop footer layout for five navigation groups.
- [x] Confirm source validation workflow passes (run 755 on commit `9fb63cd`).
- [x] Confirm GitHub Pages deployment succeeds for the same commit.
- [x] Extend CI to audit local HTML anchor targets and run 360px mobile-browser checks for SPA routes and standalone pages.
- [x] Add automated browser coverage for private transport, Contact, intercity transfer, port transfer, private day-tour, and Lovina Dolphin Tour WhatsApp handoffs; confirm requests carry entered details and remain requests pending team confirmation.
- [x] Route the legacy `terms-and-conditions.html` URL to the single canonical expandable Terms view.
- [ ] Manually inspect the deployed pages on a physical Android phone and desktop browser (still requires human visual review).
- [x] Update audit with final workflow and browser results.

## P1 — Open pull requests

- [ ] PR #29 — blog topic labels/shareable routes. Currently draft; review against current SPA router before making ready.
- [ ] PR #32 — South Bali destination articles. Prior CI check passed on its head commit; reconcile with current `main` and verify routes/content before merge.
- [x] PR #33 — closed as superseded after confirming current service-page styles already share hero rules.
- [x] PR #23 — homepage redesign proposal closed to preserve the approved homepage.

## P2 — Production capability gaps

- [ ] Decide and implement secure account registration/sign-in/password recovery, using a real backend or authentication provider.
- [ ] Confirm that the configured WhatsApp number (`628218187917`) is the final official business contact before launch.
- [ ] Replace or substantiate all unverified reviews, counts, guarantees, payment and availability claims.
- [ ] Implement real booking submission, inventory/availability, payment processing and server-side validation if launch scope requires them.
- [ ] Verify privacy/legal copy against the actual data-processing and booking setup.
- [ ] Complete manual visual QA on a physical Android phone and desktop browser.

## Release criteria

A change is not complete until source validation passes, deployment succeeds, the correct live URL reflects the change, and affected flows are tested. A successful commit alone is not deployment verification.


## 27 October 2026 — Dolphin Tour landing page refresh

- [x] Replace the existing Dolphin Tour detail layout with a landing-page hierarchy aligned to the approved mockup.
- [x] Add Regular vs All-Inclusive package choices, route-specific Avanza base and illustrative vehicle upgrades, optional add-ons, and live price summary.
- [x] Pair itinerary timeline with a destination panel that scrolls on desktop and becomes a horizontal scroller on mobile.
- [x] Add separate recommendation sections for Full Day Tours and Long Trips before the closing CTA/footer.
- [x] Keep CSS scoped to the Dolphin landing page; preserve global shell and mobile bottom navigation.
- [x] Pass selected package, vehicle, and add-ons into the existing booking flow as locked selections.
- [ ] Replace temporary recommendation content with actual available products and route each destination card to its specific published blog article.
- [ ] Confirm real vehicle upgrade prices and package inclusion/price rules before public advertising.
- [x] GitHub Pages deployment succeeded on `5cc160c48cb5a2a380d0dcc03845e68300f29080`.
- [x] Browser smoke tests passed the Dolphin Tour page and booking request handoff.
- [ ] Resolve the unrelated Airport Transfer checkout radio-click failure in its own scoped task; do not change Airport Transfer as part of Dolphin Tour work.
- [ ] Manually inspect the live Dolphin Tour page on Android and desktop.


## Template-first design system — 27 October 2026

- [x] Create `TEMPLATE-REGISTRY.md` as the canonical index for page-family templates and shared components.
- [x] Extend the canonical `booking-form.html` / CSS / JS form so tour booking can reuse the Airport Transfer design with service-specific fields and payload.
- [ ] Validate the shared Airport Transfer and Dolphin Tour booking flows, including mobile layout and WhatsApp payload, before calling the shared-form refactor verified.
- [ ] Use `TEMPLATE-PLAYBOOK.md` as the working standard for all new template work.
- [ ] Approve the reusable tour/service detail template, including semantic H1/H2/H3 hierarchy and section order, before polishing final copy or scaling pages.
- [ ] Approve one article/destination detail template before creating destination articles in quantity.
- [ ] Approve the search-results layout, including mobile filters, result cards, empty states, and responsive behaviour.
- [x] Refactor the Dolphin Tour booking form to reuse the approved Airport Transfer booking form in `booking-form.html` and its dedicated CSS/JS; preserve the same typography, colours, spacing, controls, and visual hierarchy, changing only service-specific fields and behaviour.
- [ ] Complete the full validation workflow; the shared-form-specific browser checks pass, but the workflow currently fails later on the known Airport Transfer direction-radio interaction in a separate page.
- [ ] Keep Dolphin Tour itinerary concise (time + stop + brief activity cue); use destination cards for short place descriptions. Wire specific article links only after those target pages exist.
- [ ] Once each template is approved, record it and reuse it for related pages. Do not create new visual systems or write batches of article content before their templates are approved.
