# Initial Frontend Audit — Bali Trans

**Branch awal:** `work/site-structure-audit`  
**Pembaruan:** `work/shared-navigation-audit-2026-10-17`  
**Audit type:** static repository inspection  
**Date:** 16 October 2026  
**Important:** this is not a browser, responsive-device, end-to-end, or deployment test.

## Scope checked

- Enumerated the repository's HTML pages and local assets.
- Checked relative `href` and `src` targets in all 35 HTML pages present on the preview baseline, including the new `pages/account/wishlist.html`.
- Reviewed representative homepage, experiences, Lovina detail, tickets, tours, account, booking, and shared JavaScript/CSS files.
- Confirmed the Pages workflow is configured to run on pushes to `preview/bali-trans`, not this work branch.

## Static link result

**No missing local file targets were found** in the 34 HTML pages checked during the first static pass. This does not prove that external links work, that buttons behave correctly, or that all pages render correctly in a browser.

## Findings

1. The homepage hero previously presented Lovina Dolphin Experience as the single featured starting point. It now points to the general Experiences catalogue, so Lovina remains a test product rather than the homepage's central identity.
2. Tickets and Tours currently contain generic foundation-page copy rather than useful product listings. This is a content/structure gap, not evidence that the categories are ready to sell.
3. Account pages (login, register, profile, bookings, journeys, invoices and reviews) are mostly placeholder structures; static markup does not provide real authentication or account persistence.
4. Wishlist did not exist as a page. A first empty-state page has been added at `pages/account/wishlist.html`. It explicitly says saving/syncing is not connected and does not pretend that favourites are persisted.
5. Header navigation and footer markup are repeated across pages and have differences in labels/brand wording. This makes consistency changes error-prone and requires a dedicated shared-layout audit before bulk restyling.
6. Shared mobile navigation now updates `aria-expanded` and its accessible label as it opens/closes. Browser and assistive-technology behaviour still needs runtime verification.
7. Initially, Wishlist was linked from the homepage only. A follow-up change now adds a Wishlist link to the primary navigation of the other 33 HTML pages; this is a narrow accessibility improvement, not a full header/footer standardization.
8. The homepage and sampled prototype pages carry `noindex` metadata. SEO readiness and final indexing policy must be reviewed before a public launch; a public GitHub Pages URL is not private.

## Changes made on the initial implementation branch

- Homepage hero changed from a single-product feature to a general Experiences entry point.
- Added a Wishlist empty-state page with honest preview limitations.
- Added Wishlist links to the homepage navigation/footer.
- Improved mobile navigation's `aria-expanded` and accessible label state in `js/main.js`.

## Not yet verified

- Browser visual review at mobile and desktop widths.
- Touch navigation, keyboard focus, screen-reader behaviour, and horizontal overflow.
- Actual search submission and full Lovina request flow in a browser.
- Form validation and state retention through every step.
- GitHub Pages deployment from the preview branch.
- Operational product details, supplier, prices, capacity, and booking fulfilment.

## Next implementation priority

Continue the shared-layout audit: compare header/footer, spacing, page headings, CTA labels, and mobile behaviour across all pages; identify one reusable standard and correct inconsistencies in small, reviewable groups. Then test the Lovina flow end-to-end in the browser before adding more product content.


## Follow-up: shared navigation link audit — 17 October 2026

**Branch:** `work/shared-navigation-audit-2026-10-17`  
**Scope:** add the existing Wishlist page to the primary navigation on 33 HTML pages that did not yet expose it.

- Added exactly one `Wishlist` navigation link to 33 pages; the homepage and Wishlist page already had their own link and were left unchanged.
- Checked the generated relative path for each of the 33 changed pages. **33/33 links resolve to `pages/account/wishlist.html` in the repository path model.**
- This is a static path check only. It does not verify browser navigation, keyboard focus, menu wrapping/overflow, or screen-reader behaviour.
- The broader header/footer audit remains open: navigation item order and labels vary, footer structures differ, and some checkout pages intentionally use a reduced footer.
- The preview branch at commit `fc5b16ee0eb445ab5dc1bfbb2373ddb0b1ada407` has successful GitHub Actions publish and Pages build/deployment runs. The live URL itself was not verifiable from the current tool environment, and browser/mobile review remains outstanding.
- No code from this follow-up branch has been merged into `preview/bali-trans` or `main` at the time this note was written.
