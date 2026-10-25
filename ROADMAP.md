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
- [x] Add automated browser coverage for private-transport WhatsApp enquiry contents, service-tab behaviour, and Contact-to-WhatsApp handoff.
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
