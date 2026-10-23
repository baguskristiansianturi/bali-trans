# Bali Trans — Handoff

Updated: 2026-10-24
Default branch: `main`
Repository: https://github.com/baguskristiansianturi/bali-trans
Live preview: https://baguskristiansianturi.github.io/bali-trans/

## Verified working state

- The current site is a static GitHub Pages prototype with a client-rendered SPA and standalone service pages.
- Shared header/footer are injected by `assets/js/global-shell.js`; checkout pages intentionally omit the shared shell.
- The homepage design is approved and must not be changed unless explicitly requested.
- Footer routes were corrected: Help Centre, FAQ guide, Contact, About, Terms, Privacy Policy, Partner Enquiries, Account Access, and guest browsing.
- Account Access is now an honest status page. Account creation, sign-in, password recovery and saved booking history are not implemented because there is no secure account backend.
- Footer now has five groups at desktop width; CSS has a five-column breakpoint for large screens.
- The last known successful validation before these edits was not current enough to verify the latest changes. Recheck Actions runs before claiming completion.

## Recent commits

- `f8a9226` Fix shared footer links and account navigation
- `2fcf001` Add honest account access page for unsupported registration
- `73b4f27` Wire account page into SPA router
- `86eafca` Route registration and help actions to their real pages
- `a6fd616` Route FAQ footer link to FAQ guide
- `b0c4cfb` Connect account menu action to account page
- `c75cb96` Fix account route metadata syntax
- `0e5f515` Balance expanded footer columns on desktop

## Known limitations / next verification

- Real registration cannot be completed on static hosting alone; connect a secure backend/auth provider before enabling account creation.
- The official WhatsApp number and other business/contact details still require confirmation.
- Check all footer/header links in a browser at mobile and desktop sizes.
- Confirm latest source validation and GitHub Pages deployment workflows have both succeeded, then inspect the live site.
- Open PRs #29, #32 and #33 still need reconciliation against current `main`; do not merge blindly because their recorded mergeability/check states are not all clean.
- PR #23 (homepage redesign) was closed to preserve the approved homepage.
