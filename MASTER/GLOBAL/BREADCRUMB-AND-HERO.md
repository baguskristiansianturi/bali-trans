# GLB-007 / GLB-008 — Breadcrumb and Hero Mapping

Implementation status: PAGE-SPECIFIC / NOT A SINGLE GLOBAL COMPONENT  
Approval status: NOT RECORDED IN THIS MASTER  
Relevant sources:
- `assets/js/views/detail.js`
- `assets/js/views/home.js`
- `assets/js/views/discovery.js`
- `assets/js/views/articles.js`
- Standalone page HTML and page-specific CSS

## A. Breadcrumb

A visual breadcrumb is present in the Dolphin Tour detail renderer in `assets/js/views/detail.js` (class `.dolphin-breadcrumb`).

Route metadata in `assets/js/navigation.js` also creates structured-data breadcrumb information. Structured-data breadcrumbs are not the same thing as a visible breadcrumb component.

Current conclusion:
- A universal visual breadcrumb component has not been established in the current master inventory.
- Do not add breadcrumbs to every page by assumption.
- Page usage and exceptions must be mapped before a shared breadcrumb standard is declared.

## B. Hero

Hero sections are implemented in multiple page-specific contexts, including the SPA homepage, Dolphin Tour detail and standalone service pages.

Current conclusion:
- There is no verified single universal hero component for all page families.
- Different page families may require different hero structures.
- Do not force one hero layout onto unrelated pages.
- The exact section order, labels, CTA and responsive behaviour must be recorded per approved page template.

## Next mapping requirement

When a page template is inspected and approved, record its hero/breadcrumb contract under that page family and link it here. This file is a map of current implementation, not a new design instruction.
