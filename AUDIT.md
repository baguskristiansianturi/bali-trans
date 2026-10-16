# Initial Frontend Audit — Bali Trans

**Branch:** `work/site-structure-audit`  
**Audit type:** static repository inspection  
**Date:** 16 October 2026  
**Important:** this is not a browser, responsive-device, end-to-end, or deployment test.

## Scope checked

- Enumerated the repository's HTML pages and local assets.
- Checked relative `href` and `src` targets in all 34 HTML pages currently present on this branch, including the new `pages/account/wishlist.html`.
- Reviewed representative homepage, experiences, Lovina detail, tickets, tours, account, booking, and shared JavaScript/CSS files.
- Confirmed the Pages workflow is configured to run on pushes to `preview/bali-trans`, not this work branch.

## Static link result

**No missing local file targets were found** in the 34 HTML pages during this static pass. This does not prove that external links work, that buttons behave correctly, or that all pages render correctly in a browser.

## Findings

1. The homepage hero previously presented Lovina Dolphin Experience as the single featured starting point. It now points to the general Experiences catalogue, so Lovina remains a test product rather than the homepage's central identity.
2. Tickets and Tours currently contain generic foundation-page copy rather than useful product listings. This is a content/structure gap, not evidence that the categories are ready to sell.
3. Account pages (login, register, profile, bookings, journeys, invoices and reviews) are mostly placeholder structures; static markup does not provide real authentication or account persistence.
4. Wishlist did not exist as a page. A first empty-state page has been added at `pages/account/wishlist.html`. It explicitly says saving/syncing is not connected and does not pretend that favourites are persisted.
5. Header navigation and footer markup are repeated across pages and have differences in labels/brand wording. This makes consistency changes error-prone and requires a dedicated shared-layout audit before bulk restyling.
6. Shared mobile navigation now updates `aria-expanded` and its accessible label as it opens/closes. Browser and assistive-technology behaviour still needs runtime verification.
7. The homepage links to Wishlist in its primary navigation and footer. Other pages do not yet have a consistent Wishlist link; global navigation consistency remains an open task.
8. The homepage and sampled prototype pages carry `noindex` metadata. SEO readiness and final indexing policy must be reviewed before a public launch; a public GitHub Pages URL is not private.

## Changes made on this branch

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
