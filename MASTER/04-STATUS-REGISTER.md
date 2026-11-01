# 04 — Master Status Register

Last mapped: 2026-11-01  
Implementation snapshot: `a8d4282293d98923ecf160f52d95fe6168dd905d`

## 1. Status meaning

| Status | Meaning |
|---|---|
| MAPPED | Current implementation and source location recorded |
| PARTIALLY MAPPED | Some behaviour or dependencies still need inspection |
| PENDING APPROVAL | Implementation exists, but reusable standard is not approved |
| EXCEPTION | Deliberate difference from the common shell/template |
| ARCHIVED | Retained code not treated as active implementation |
| VERIFIED LIVE | Exact deployed page and behaviour were checked after deployment |
| NOT VERIFIED LIVE | No current live verification evidence in this master |

## 2. Initial component status

| Component | Implementation | Approval | Notes |
|---|---|---|---|
| Shared navbar/header | MAPPED | NOT RECORDED | Desktop primary nav discrepancy requires review |
| Shared footer | MAPPED | NOT RECORDED | Current five link groups mapped |
| SPA mobile bottom nav | MAPPED | NOT RECORDED | Four items in index.html |
| Header search | PARTIALLY MAPPED | NOT RECORDED | Trace all handlers and result states before changes |
| Locale selector | PARTIALLY MAPPED | NOT RECORDED | Current shell offers Indonesian and English |
| Account controls | MAPPED | NOT RECORDED | Real authentication not implemented |
| Breadcrumb | PARTIALLY MAPPED | NOT RECORDED | Visual breadcrumb is page-specific in Dolphin detail |
| Hero | PARTIALLY MAPPED | NOT RECORDED | Several page-specific implementations |
| Shared booking form | MAPPED | Canonical reference recorded | Verify final locked approval separately |
| Article detail template | IMPLEMENTATION EXISTS | PENDING APPROVAL | TEMPLATE-REGISTRY says canonical template not yet approved |
| Search-results template | IMPLEMENTATION EXISTS | PENDING REVIEW | Canonical layout pending review |
| Homepage | IMPLEMENTED | APPROVED per HANDOFF | Preserve unless explicitly requested |
| Legacy monolithic app.js | ARCHIVED | N/A | Kept under assets/js/legacy/ |

## 3. Known exceptions

- Checkout pages may omit the global header/footer.
- SPA checkout mode hides the global shell and mobile bottom navigation.
- The SPA mobile bottom navigation is not a universal standalone-page component.
- Standalone HTML page families retain root-level public URLs.
- Dolphin Tour has a specific detail/landing-page renderer; do not assume every tour detail uses the same final layout.

## 4. Known documentation/implementation gaps

1. `.bt-main-nav` has CSS rules but is not emitted in the currently inspected shared-header markup. Verify the intended desktop navigation against the deployed page before changing it.
2. The current shared brand mark is a generated “B”; the approved final logo asset/specification is not recorded in this master.
3. A universal visual breadcrumb component has not been established.
4. A universal hero component has not been established.
5. Physical-device visual QA on Android and desktop is still recorded as outstanding in project handoff/roadmap.
6. Article/destination detail and search-results templates still have approval/review work recorded in TEMPLATE-REGISTRY.md and ROADMAP.md.
7. This initial inventory does not prove every JS/CSS file is active. Usage must be checked before any deletion.

## 5. Future notes (documentation only; no code created)

- Confirm and document the final desktop navigation arrangement.
- Record the final logo source and usage rules when supplied/approved.
- Map breadcrumb usage page by page before making it a shared component.
- Map hero structures by page family.
- Continue component-level mapping for cards, carousels, tabs, accordions, modals, forms and other repeated UI only after verifying their actual sources and callers.

These are notes, not implementation tasks or permission to change code.

## 6. Updating this register

Update status only when supported by repository evidence or explicit approval from Mas Bagus. Add the commit SHA for each verified change. Do not mark a component complete because its file exists; distinguish implemented, approved, tested and deployed.
