# BDMTrans.com — Domain & Launch Preparation

**Target domain:** https://bdmtrans.com/  
**Target launch window:** before December 2026  
**Current preview:** https://baguskristiansianturi.github.io/bali-trans/  
**Status:** PLANNING — domain ownership/DNS and production hosting have not been verified.

## Goal

Prepare Bali Trans as the official BDM Trans travel website. The site should present BDM Trans's own travel regions, destination guides, activities, itineraries/packages, and transport services. Do not build the main content architecture as a directory of third-party tour operators.

## Rules before connecting the domain

1. Keep the preview address usable for testing until the custom domain is configured and the live site is checked.
2. Do not add `https://bdmtrans.com/` as the canonical URL while the custom domain is not serving the correct production site.
3. Confirm the preferred host name before launch: `bdmtrans.com` or `www.bdmtrans.com`. Pick one canonical host; redirect the other to it.
4. Update page titles, meta descriptions, Open Graph URL/image, canonical links, favicon, brand name and contact details consistently with the approved BDM Trans identity.
5. Add a sitemap containing only public, canonical URLs and a correct `robots.txt`. Do not submit preview URLs as production URLs.
6. Use stable, readable page routes for region, destination, activity and package pages. Avoid accidental duplicate pages and query variants being indexed as separate pages.
7. Preserve useful old URLs with redirects when URL structure changes. Test internal links, browser back/forward, direct page loads, refresh, and mobile navigation.
8. Configure HTTPS and verify the certificate, redirects, DNS, and domain verification in the hosting provider.
9. Set up Google Search Console for the domain and submit the sitemap after production is stable. Analytics/consent should be added only if selected and configured.
10. Do not publish fabricated reviews, customer counts, guarantees, prices, opening hours or service availability. Publish only business/contact details approved by BDM Trans.

## Pre-launch checklist

- [ ] Confirm domain purchase/ownership and DNS access.
- [ ] Confirm production hosting target and custom-domain support.
- [ ] Approve exact brand styling: “BDM Trans” vs “BDMTrans”.
- [ ] Approve primary language and currency display rules.
- [ ] Review homepage on a narrow Android screen and desktop.
- [ ] Test each navbar link, search, region card, activity filter, package card, article card, and CTA.
- [ ] Verify direct-load and refresh behavior for every public route.
- [ ] Finalize destination/article content and image sourcing.
- [ ] Create and test canonical URLs, sitemap, and robots rules.
- [ ] Test HTTP → HTTPS and non-canonical host → canonical host redirects.
- [ ] Check 404 page, missing images, console errors and dead links.
- [ ] Connect Search Console and submit sitemap after launch.

## Important technical finding

The current HTML preview has the title “Bali Trans | Bali Tours, Activities & Private Transport”. In the reviewed `index.html`, no canonical tag, Open Graph URL, sitemap reference, or robots reference was found. The file also contains at least one absolute link pointing to the GitHub Pages preview. These must be reviewed deliberately before launch; do not blindly replace every preview URL because some links may be used for testing.

## Next implementation order

1. Stabilize the homepage brand, navigation, and content hierarchy.
2. Finalize canonical routes for region → destination → activity/package.
3. Build and verify the content inventory against those routes.
4. Complete the destination and package content required for launch.
5. Configure the custom domain and SEO deployment files only after the production host is confirmed.
