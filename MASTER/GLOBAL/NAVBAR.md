# GLB-001 — Navbar / Shared Header Master

Implementation status: IMPLEMENTED  
Approval status: NOT RECORDED IN THIS MASTER  
Canonical markup/logic: `assets/js/global-shell.js`  
Canonical shared styling: `assets/css/global-shell.css`  
Related styling/behaviour: `assets/css/navigation.css`, `assets/js/interactions.js`  
Snapshot: `a8d4282293d98923ecf160f52d95fe6168dd905d`

## Purpose

Provide the shared site identity, navigation entry points and utility controls for pages that use the global shell.

## Current brand mark

- Brand text configured in `global-shell.js`: **Bali Trans**.
- The current mark is generated from the first character of the brand name (a letter “B”) inside a styled element.
- This record does not identify a separate approved logo image asset. Do not replace the mark or invent a new logo without an explicit request.

## Current header elements

| Element | Current implementation | Notes |
|---|---|---|
| Brand/logo link | `.bt-brand` | Links to home; current mark is generated letter B plus brand text |
| Search button | `#headerSearchButton` | Opens the header search panel |
| Help | `.bt-help-link` | Desktop utility link |
| Blog | `.bt-blog-link` | Desktop utility link to Blog route |
| Recently viewed | `.bt-recent-action` | Desktop utility action |
| Account | `#accountMenuButton` | Opens account menu |
| Language/currency | `#localeButton` | Opens locale menu |
| Hamburger | `#mobileMenuButton` | Opens mobile menu panel |
| Live chat | `.bt-live-chat` | Contact link with offline status; omitted when a top live-chat state element is present |

## Mobile menu contents

The menu links are generated from the shared link list:
- Home
- Destinations
- Tours
- Transport service
- Travel guides
- About
- Contact

The mobile account area includes:
- Log in button/link;
- Log out button when applicable;
- registration hint and Register link.

On the SPA homepage only, extra menu actions are added:
- Help
- Wishlist with count
- Recently viewed

## Desktop/mobile observations

- Header uses `.bt-site-header` and is sticky at the top with z-index 1000 in `global-shell.css`.
- Header row minimum height is 68px by default and 78px from 768px viewport width.
- Mobile hamburger is hidden from 768px upward.
- CSS contains a `.bt-main-nav` desktop-navigation rule, but the current header HTML generated in `global-shell.js` does not include a `.bt-main-nav` element. Record this as a mapping discrepancy; do not assume the CSS rule is an active desktop menu.
- Mobile menu uses a two-column link grid in the current shared stylesheet.
- At widths up to 380px, header actions and live-chat label receive compact styling.

## Behaviour and dependencies

- Shared route destinations are configured in the `routes` object in `global-shell.js`.
- Menu link labels and destinations are generated from the `links` array in the same file.
- Search, account, locale and mobile-menu interactions are wired through shared application behaviour; inspect `assets/js/interactions.js` before changing them.
- The shared shell is injected by `global-shell.js`; do not duplicate header markup into individual pages.
- Header styling is shared; do not override it from unrelated page CSS.

## Exceptions

- Checkout pages intentionally omit the shared shell or hide it in checkout mode. See `MASTER/00-SYSTEM-MAP.md` and `ARCHITECTURE.md`.
- The SPA homepage also has a separate mobile bottom navigation; this is not part of the navbar itself.

## Change impact

High impact. A change can affect SPA routes and standalone pages that load the shared shell. Before modifying:
1. Read `SOP.md`, `ARCHITECTURE.md` and this master.
2. Identify all pages loading the shared shell.
3. Confirm the requested scope with Mas Bagus.
4. Regression-test desktop and mobile navigation, search, account and locale controls.
5. Test checkout exceptions and the SPA mobile bottom navigation.
6. Update this master and the repository registry/handoff as required.

## Known gaps — documentation only

- The exact approved logo asset/specification is not recorded here.
- The expected desktop primary-navigation layout needs explicit confirmation against the live page.
- The final approved icon set, touch-target dimensions and detailed tablet behaviour are not yet recorded as locked standards.
- Real-device visual verification must not be claimed from source inspection alone.
