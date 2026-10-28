# Bali Trans — Template & Component Registry

Updated: 27 October 2026

This file is the canonical index of reusable layouts and shared components. When a page or component is approved, update its status and source path here. Do not create a new visual system for an existing page family.

## Source-of-truth rules

1. **One template per page family.** New pages populate the matching approved template; they do not redesign it.
2. **One source for shared components.** Change the shared component, not copies embedded in individual pages.
3. **Service-specific configuration, shared design.** Different services may change fields, content, validation and submitted data, but must retain the approved form layout and design tokens.
4. **Approval is a gate.** A template is a standard only after Mas Bagus approves its mockup and implementation.
5. **Preserve unrelated pages.** A scoped template change must not redesign the homepage or unrelated page families.
6. **Record actual status.** “Implemented” is not the same as “visually approved” or “verified in the live deployment.”

## Canonical template inventory

| Family | Canonical source | Shared assets | Current status |
|---|---|---|---|
| Site-wide header, navigation, footer | `assets/js/global-shell.js` | `assets/css/global-shell.css`, `assets/css/styles.css` | Shared source exists; preserve it and change it centrally |
| Airport transfer / service booking form | `booking-form.html` | `assets/css/pages/booking-form.css`, `assets/js/pages/booking-form.js` | Canonical booking-form design; service adapter being expanded |
| Tour detail — Bali Dolphin Tour | SPA renderer in `assets/js/views/detail.js` | `assets/css/styles.css`; SEO metadata/schema in `assets/js/navigation.js` | Template SEO layer implemented (heading/alt/meta/JSON-LD); production indexing remains blocked by site-wide noindex and client-rendered SPA architecture |
| Private day-tour service page | `bali-private-day-tour.html` | `assets/css/pages/bali-private-day-tour.css`, `assets/js/pages/bali-private-day-tour-form.js` | Separate service-detail layout; keep scoped |
| Article / destination detail | To be selected and approved | Dedicated article template assets to be recorded here | Not yet approved as canonical |
| Search results | Existing search implementation to be audited before selection | Reuse existing result/filter components where appropriate | Canonical layout pending review |

## Shared booking form contract

The Airport Transfer form is the visual reference. Reuse its progress indicator, two-stage flow, summary card, field styling, fare breakdown, guest/contact details, payment notice, terms consent, responsive layout and WhatsApp request handoff.

- HTML structure: `booking-form.html`
- Visual design: `assets/css/pages/booking-form.css`
- Behaviour and service adapters: `assets/js/pages/booking-form.js`
- Default service when no `service` query parameter is supplied: `airport-transfer`
- Supported service modes: `airport-transfer`, `car-rental`, `full-day-tour`.
- The Dolphin Tour price adapter is activated by `tourId=lovina-dolphin-tour`; other full-day tours use a supplied estimate or display a quote-pending state instead of inheriting Dolphin pricing.
- Optional query context can prefill the selected service, tour/package, vehicle, date/time, guest count, extras and estimated fare.
- Service adapters may hide irrelevant fields and adjust labels, validation, summary and WhatsApp payload. They must not create a second visual design.
- The tour flow must preserve the selected package, vehicle and extras when handing off from the tour page. A request remains a request until the team confirms it.

When a new service is added, extend the adapter/configuration in the canonical JavaScript file and test the existing Airport Transfer flow as a regression. Do not clone the form into a service-specific HTML/CSS/JS trio unless an approved requirement proves the shared layout cannot serve it.

## Shared component contract

- Header/footer: edit `assets/js/global-shell.js` and its shared stylesheet; do not duplicate header/footer markup per content page.
- Global design tokens and shared utilities: keep in shared stylesheets. Page-specific styles stay in that page family's dedicated stylesheet or explicitly scoped component rules.
- Page-family layouts: one canonical source per family, documented above.
- Content data: titles, descriptions, images, labels, prices, itinerary items and FAQs should be supplied as page data where the current architecture supports it, rather than changing layout markup for each product.
- Navigation targets must exist. Do not create fake links to future articles or products.

## Change checklist

Before implementation:
- Identify the matching family in this registry.
- Read its canonical source and the current handoff.
- Confirm the requested change does not duplicate an existing component.

After implementation:
- Run source/HTML/JavaScript validation.
- Test the changed service and at least one existing service using the shared component.
- Verify responsive behaviour and affected interactions.
- Check GitHub Actions deployment and the actual live URL.
- Update this registry and `HANDOFF.md` with what was actually verified.
