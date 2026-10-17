# BDM Trans — Bali Homepage Reset

The preview is intentionally reset to **one homepage** while the visual direction is reviewed. This is a static concept, not a live booking platform.

## Design direction
- Color-led editorial travel design: coral, tropical aqua, sunflower yellow, lilac and deep green.
- Large destination photography and expressive serif display type.
- Klook-inspired discovery patterns (search, useful categories, experience cards), without copying Klook's branding or adding marketplace complexity.
- Mobile-first responsive layout with a short path from inspiration to an enquiry.
- Every visible section should help a visitor discover Bali, understand the offer, or ask about transport.

## Current files
- `index.html` — standalone homepage, styles and interactions in one file.
- `.github/workflows/pages.yml` — publishes the homepage-only preview.
- `scripts/validate_content_layout.py` — static structural checks.
- `HANDOFF.md`, `ROADMAP.md`, `AUDIT.md` — project state and next steps.

## Important limitations
- This is a homepage concept only. Old secondary page routes were removed from the preview branch for the reset.
- Experience cards are editorial directions, not verified bookable inventory. No real prices or instant bookings are claimed.
- The WhatsApp enquiry link has no configured business phone number yet; it opens a generic prefilled enquiry and must be connected to the real number before launch.
- External photos load from Unsplash and require internet access.
- GitHub Pages preview is noindex/disallowed by the workflow. Do not treat it as production-ready.
