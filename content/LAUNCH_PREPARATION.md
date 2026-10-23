# Public Website Launch Preparation

This checklist covers technical readiness for the Bali Trans travel website. It deliberately excludes private business identity and domain-planning details.

## Before configuring a custom domain

- Confirm domain ownership, DNS access, hosting support, and the preferred canonical host privately.
- Keep the GitHub Pages preview usable until the production host is configured and verified.
- Do not change canonical or Open Graph URLs until the custom domain serves the correct site over HTTPS.
- Verify redirects, TLS certificate, DNS, and direct page loads before launch.
- Update page titles, descriptions, favicon, contact details, and approved brand presentation consistently.
- Keep the sitemap limited to public, canonical, indexable URLs; exclude checkout and other noindex pages.
- Keep `robots.txt` and sitemap URLs aligned with the actual production host.

## Content and UX checklist

- Review the homepage on a narrow Android screen and desktop.
- Test navbar links, search, region cards, activity filters, package/detail cards, article cards, checkout steps, and back navigation.
- Verify every activity card opens the matching detail page and every checkout query selects the correct product or package.
- Confirm prices, included items, service availability, contact information, policies, reviews, and safety claims before publication.
- Do not publish fabricated reviews, customer counts, guarantees, opening hours, or instant-confirmation claims.
- Review image sources, rights, captions, and alt text.
- Check missing assets, console errors, 404 behavior, sitemap coverage, and canonical URLs.

## Booking and payment readiness

- The current checkout journey is a prototype inquiry flow, not a production booking system.
- Do not claim live inventory, payment processing, email delivery, or server-side validation until implemented and tested.
- Make the available contact/inquiry fallback clear until a real booking and payment process is ready.
