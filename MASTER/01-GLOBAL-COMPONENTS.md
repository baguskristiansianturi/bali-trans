# 01 — Global Components Index

Status: INITIAL INVENTORY  
Detailed records are in `MASTER/GLOBAL/`.

| ID | Component | Current source | Implementation | Approval |
|---|---|---|---|---|
| GLB-001 | Navbar / shared header | `assets/js/global-shell.js`, `assets/css/global-shell.css` | IMPLEMENTED | NOT RECORDED |
| GLB-002 | Footer | `assets/js/global-shell.js`, `assets/css/global-shell.css` | IMPLEMENTED | NOT RECORDED |
| GLB-003 | Mobile bottom navigation | `index.html` and SPA handlers | IMPLEMENTED for SPA | NOT RECORDED |
| GLB-004 | Header search | `assets/js/global-shell.js`, `assets/js/interactions.js` | IMPLEMENTED | NOT RECORDED |
| GLB-005 | Language/currency selector | `assets/js/global-shell.js`, `assets/js/locale.js` | IMPLEMENTED, scope to verify | NOT RECORDED |
| GLB-006 | Account controls | `assets/js/global-shell.js`, account route | UI IMPLEMENTED; auth unavailable | NOT RECORDED |
| GLB-007 | Breadcrumb | Dolphin detail renderer and SEO metadata | PARTIAL / PAGE-SPECIFIC | NOT RECORDED |
| GLB-008 | Hero | Multiple page-specific renderers | IMPLEMENTED in several page families; not one shared component | NOT RECORDED |
| GLB-009 | Live chat indicator/link | `assets/js/global-shell.js`, `assets/css/global-shell.css` | IMPLEMENTED as contact link/status display | NOT RECORDED |
| GLB-010 | Toast / modal UI | `index.html`, SPA interactions/views | PRESENT; component boundaries need mapping | NOT RECORDED |

## Shared-component rule

A component is global only when it is genuinely shared by multiple pages or page families. Similar-looking sections are not automatically the same component.

Do not promote a page-specific hero, breadcrumb, card, form or carousel to global status without confirming its callers and common contract.

## Device rules

Responsive details are documented only where confirmed by current source. A CSS breakpoint is evidence of a styling rule, not proof that the experience has passed visual QA on a real device.

Physical Android and desktop visual verification remains a separate release check according to the existing project handoff and roadmap.
