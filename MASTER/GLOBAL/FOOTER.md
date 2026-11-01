# GLB-002 — Footer Master

Implementation status: IMPLEMENTED  
Approval status: NOT RECORDED IN THIS MASTER  
Canonical markup/logic: `assets/js/global-shell.js`  
Canonical styling: `assets/css/global-shell.css`  
Snapshot: `a8d4282293d98923ecf160f52d95fe6168dd905d`

## Purpose

Provide a shared site footer for pages using the global shell.

## Current structure

1. Footer brand link and generated brand mark.
2. Short Bali Trans introduction.
3. Contact CTA: “Talk to our team”.
4. Two highlight blocks:
   - Explore Bali
   - Private transport
5. Five navigation groups:
   - Discover
   - Plan your trip
   - Help & support
   - About us
   - Your account
6. Planning note with instruction to confirm trip details, prices and availability.
7. Copyright and booking-information note.

## Current navigation groups

The exact link labels and targets are generated in `assets/js/global-shell.js`. Update the source there; do not create separate footer copies in page HTML.

## Responsive rules observed in CSS

- Default footer grid: one column.
- Footer link groups: two columns by default.
- From 768px: footer introduction and link area become a two-part layout; link groups use four columns.
- From 1100px: link groups use five columns.
- Footer bottom row changes from stacked to horizontal from 768px.
- At narrow widths, spacing is reduced.

These are current source rules, not a claim of completed physical-device QA.

## Exceptions

Pages that intentionally omit the global shell do not display this footer. Checkout exceptions are listed in `MASTER/00-SYSTEM-MAP.md`.

## Change impact

High impact. Footer links affect multiple page families. Check all footer routes, mobile column layout, tablet/desktop columns, and shell-exempt checkout pages after a change.

## Known gaps

- The current footer structure and labels are recorded as implementation facts; do not assume every label or group is the final locked business-approved content.
- Payment logos/icons are not identified as a confirmed part of the current shared footer source.
- Do not add a floating WhatsApp CTA or other unrequested global CTA.
