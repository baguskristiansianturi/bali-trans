# Bali Trans — Roadmap

Updated: 2026-10-24
Rule: preserve the approved homepage and existing approved page designs. Avoid broad redesigns while fixing specific functionality.

## P0 — Current release integrity

- [x] Correct shared footer Help Centre and FAQ destinations.
- [x] Route Terms and Conditions and Privacy Policy to their actual SPA pages.
- [x] Add Partner Enquiries destination to footer.
- [x] Add Account Access page and connect Create account menu action.
- [x] Explain honestly that real account registration is unavailable until a secure backend is connected.
- [x] Improve large-desktop footer layout for five navigation groups.
- [ ] Confirm latest validation workflow passes.
- [ ] Confirm latest GitHub Pages deployment succeeds.
- [ ] Check footer/header links on live mobile and desktop pages.
- [ ] Update audit with final workflow and browser results.

## P1 — Open pull requests

- [ ] PR #29 — blog topic labels/shareable routes. Currently draft; review against current SPA router before making ready.
- [ ] PR #32 — South Bali destination articles. Prior CI check passed on its head commit; reconcile with current `main` and verify routes/content before merge.
- [ ] PR #33 — consistent service-page heroes. Prior browser smoke test failed while waiting for a destination-guide button; inspect whether this is a stale test selector or a real route regression before merge.
- [x] PR #23 — homepage redesign proposal closed to preserve the approved homepage.

## P2 — Production capability gaps

- [ ] Decide and implement secure account registration/sign-in/password recovery, using a real backend or authentication provider.
- [ ] Replace placeholder WhatsApp number and verify official contact details.
- [ ] Replace or substantiate all unverified reviews, counts, guarantees, payment and availability claims.
- [ ] Implement real booking submission, inventory/availability, payment processing and server-side validation if launch scope requires them.
- [ ] Verify privacy/legal copy against the actual data-processing and booking setup.
- [ ] Complete manual visual QA on a physical Android phone and desktop browser.

## Release criteria

A change is not complete until source validation passes, deployment succeeds, the correct live URL reflects the change, and affected flows are tested. A successful commit alone is not deployment verification.
