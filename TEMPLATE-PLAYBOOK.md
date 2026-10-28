# Bali Trans — Reusable UI/UX & SEO Template Playbook

Updated: 27 October 2026

## Canonical registry

Use [`TEMPLATE-REGISTRY.md`](./TEMPLATE-REGISTRY.md) as the source-of-truth index for canonical template files, shared components, and approval status. Before implementing a page, identify its family in the registry; after implementation, update the registry and handoff with verified status. Shared components must be edited at their single source rather than copied into individual pages.

## Purpose

Bali Trans is being designed as a reusable website system. The immediate goal is not to publish every article, destination page, or finished service. The goal is to approve clear, attractive, responsive templates that can later be populated with final content and connected to real destinations and functions.

## Working order

1. Define the page's purpose and the visitor's decision path.
2. Establish the section sequence from hero to footer, including the role of each section and its primary CTA.
3. Set visual hierarchy and responsive behaviour: typography, spacing, colour, cards, controls, mobile layout, and interaction states.
4. Build semantic SEO structure into the template from the start: one clear H1; H2s for main sections; H3s for subsections/cards where appropriate; lower heading levels only when the content hierarchy needs them. Do not choose heading tags merely for their visual size.
5. Use representative placeholder copy/content only where needed to test the layout. Do not treat prototype prices, claims, destinations, or sample content as approved business facts.
6. Validate the template visually and structurally on mobile and desktop. Once approved, record it as the reusable standard.
7. Only then populate the template at scale, refine keyword targeting and copy, publish supporting pages, and wire destination links and production functionality.

## Template families to design and approve

- Service / tour detail page.
- Individual article / destination detail page.
- Search results page, including result cards, filters, empty/loading states, and mobile behaviour.
- Booking form / checkout flow.

Each family should have a stable section map and heading hierarchy so later pages can replace text and data without redesigning the layout.

## Reuse before rebuilding

- Reuse approved components and source markup from existing pages whenever possible.
- The current approved booking-form visual reference is the Airport Transfer flow at `booking-form.html`, styled by `assets/css/pages/booking-form.css` and powered by `assets/js/pages/booking-form.js`.
- When adapting that form for a different service, start by cloning/reusing the existing HTML structure and CSS. Change only service-specific fields, summaries, validation, and submission payload. Do not invent a new visual system, typography scale, colour palette, or spacing unless explicitly approved.
- Keep service-specific changes scoped so they do not damage the reference form, global shell, homepage, or other pages.
- Before creating a new component, inspect the repository for an existing approved equivalent and explain why reuse is not suitable if a new implementation is necessary.

## Content placement rules

- Hero: communicate the offer and main benefit quickly; one H1, supporting copy, and a clear next action.
- Package/options section: help visitors compare what each option includes and choose confidently.
- Itinerary: show the order of stops and approximate times. Keep each timeline description brief; do not turn the itinerary into a destination article.
- Destination/place cards: show the place name and a short, useful description of its appeal. A future detail/article link may be prepared structurally, but do not link to a page that does not exist or route every destination to a generic blog list.
- FAQs and practical details: answer genuine decision-making questions without repeating whole sections.
- Closing CTA and footer: provide a clear next step and consistent site navigation.

## SEO and accessibility

- Keep one descriptive H1 per detail page. Use H2 for major content sections and H3 for nested itinerary items, package cards and FAQ-related subsections; never select heading tags only for visual size.
- Generate a unique title and meta description from each package's content data. Keep the description specific and useful in search snippets; do not stuff keywords or copy the same description across packages.
- Generate canonical URL, Open Graph title/description/URL/image, and Twitter card metadata for each published detail route.
- Add valid JSON-LD for the tour entity and breadcrumb hierarchy. Structured data must match visible page content; do not invent ratings, reviews, availability, or fixed offers.
- Give content images concise, contextual alt text that describes the image. Use empty alt text only for decorative images or thumbnails whose adjacent text already provides the same information. CSS background images do not provide an alt attribute, so ensure the main subject is also represented by an accessible content image where appropriate.
- Use meaningful breadcrumb labels, internal links with real destinations, and accessible names for controls.
- A good template does not make a prototype indexable by itself. Before launch, remove the intentional site-wide noindex, establish the final canonical domain and sitemap, and ensure important package URLs can be crawled and rendered reliably. Client-rendered metadata is a useful interim layer, not a substitute for crawlable production URLs or server/pre-rendered HTML.
- Mobile-first readability and usability are required; desktop and mobile should share the same design system.

## Change-control rules

- Preserve approved designs and existing page behaviour outside the requested scope.
- Do not change placeholder prices into a pricing strategy discussion unless pricing is explicitly in scope.
- Do not build articles or destination pages before the corresponding detail-page template is approved.
- Do not claim work is complete based on a commit alone. Verify source checks, deployment, the correct live page, and the affected mobile/desktop experience.
