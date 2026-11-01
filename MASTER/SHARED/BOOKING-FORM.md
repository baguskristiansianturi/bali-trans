# SHR-001 — Shared Booking Form Master

Implementation status: IMPLEMENTED as a reusable form and service adapters  
Approval status: Canonical visual reference recorded in `TEMPLATE-REGISTRY.md`; verify final owner approval before treating every detail as LOCKED  
Canonical HTML: `booking-form.html`  
Canonical CSS: `assets/css/pages/booking-form.css`  
Canonical JavaScript: `assets/js/pages/booking-form.js`  
Related airport checkout: `bali-airport-transfer-checkout.html`, `assets/css/pages/bali-airport-transfer-checkout.css`, `assets/js/pages/bali-airport-transfer-checkout.js`

## Purpose

Reuse one booking-form visual structure while adapting fields, validation, summary and submission payload to the selected service.

## Service modes recorded in TEMPLATE-REGISTRY.md

- `airport-transfer`
- `car-rental`
- `full-day-tour`

The Dolphin Tour adapter is activated by `tourId=lovina-dolphin-tour`. Other full-day tours must not inherit Dolphin Tour prices; they use a supplied estimate or a quote-pending state.

## Reuse rules

- Reuse the canonical form structure and visual design.
- Service adapters may change relevant fields, labels, validation, summary and WhatsApp payload.
- Do not create a second visual design for each service without explicit approval.
- Preserve the selected package, vehicle and extras when handing off from a tour page.
- A request remains a request until the team confirms it.

## Important capability boundary

This is a static prototype and WhatsApp request handoff. Do not describe it as a live booking inventory, confirmed reservation or online payment system. The repository does not currently establish a production booking backend or payment processing.

## Regression requirements

When a service adapter changes, test the affected service and at least one existing service using the shared form. Preserve Airport Transfer behaviour and the approved form layout.
