# Audit — BDM Trans Homepage Reset

**Date:** 17 October 2026  
**Scope:** static source/repository review of the one-page redesign.

## Changes observed
- `index.html` is now a standalone page with inline CSS and JavaScript.
- Visual direction is intentionally colorful: coral, aqua, sunflower yellow, lilac and deep green.
- Content has been reduced to a small number of functional sections.
- Previous secondary page files and unused legacy CSS/JS were removed from `preview/bali-trans`. Git history remains intact.
- The Pages workflow was changed to copy only `index.html` into the deploy artifact.
- The static validator now checks one H1, one balanced main landmark, duplicate IDs and image alt attributes.

## Known issues / risks
- Deployment after the reset is pending verification.
- No browser/device visual review has been performed.
- Search is a front-end filter over the three inspiration cards, not a live product search.
- Cards are not verified offers and do not represent bookable inventory.
- WhatsApp enquiry URL lacks the actual business number and must be configured before launch.
- Unsplash images require network access and should be reviewed for final selection and licensing.
- Navigation is anchor-based because secondary routes are intentionally absent.

## Next audit
1. Check latest Actions runs and deployed output.
2. Inspect at narrow mobile width and desktop width.
3. Test mobile menu, search, anchor links, keyboard focus and image loading.
4. Ask for visual approval before restoring any secondary pages.
