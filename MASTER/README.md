# Bali Trans — Master Blueprint

Status: INITIAL INVENTORY  
Last mapped: 2026-11-01  
Repository: `baguskristiansianturi/bali-trans`  
Default branch: `main`  
Implementation snapshot used for this inventory: `a8d4282293d98923ecf160f52d95fe6168dd905d`

## Purpose

This folder is the human-readable master map of the Bali Trans website. It is intended to be understandable in GitHub and in VS Code, including by a project owner who does not need to know the technical implementation details.

It records:
- what components and page modules currently exist;
- what each component is responsible for;
- where its real implementation lives;
- which pages use it and which pages are exceptions;
- the current implementation and approval status;
- known gaps or discrepancies that must be resolved before treating a component as a final standard.

## This is not source code

Files in `MASTER/` are documentation only. They must not contain executable HTML, CSS, JavaScript, temporary scripts, or experimental code. The website continues to run from the existing implementation files.

The master describes the implementation and approved decisions; it does not replace them.

## Two connected layers

1. **MASTER BLUEPRINT** — this folder: the map, component contracts, page relationships, status and change notes.
2. **IMPLEMENTATION** — the existing HTML, CSS, JavaScript, data and assets that actually run the website.

A component is not considered synchronized merely because its documentation exists. When an approved implementation change is made, the corresponding master record must be updated in the same change set. A future automated consistency check may enforce this; no new runtime script is introduced as part of this initial documentation inventory.

## Status vocabulary

Implementation status:
- **IMPLEMENTED** — the referenced implementation exists in the repository.
- **PARTIAL** — some parts exist, but the full component contract or behaviour is not established.
- **PRESENT — VERIFY USAGE** — files exist, but active callers and actual runtime use have not been fully confirmed.
- **EXCEPTION** — intentionally different behaviour on a specific page or page family.
- **ARCHIVED** — retained for historical/reference purposes and not treated as active implementation.
- **NOT ESTABLISHED** — no shared implementation or approved rule has been identified yet.

Approval status is separate:
- **APPROVED** — explicitly approved by Mas Bagus.
- **LOCKED** — approved and protected from changes without explicit owner authorization.
- **PENDING** — not yet approved as a reusable standard.
- **NOT RECORDED** — repository evidence does not establish approval.

Never infer APPROVED or LOCKED from the fact that code exists or a page is deployed.

## Required fields for every component master

Each component record should identify:
1. Component ID and name.
2. Purpose and responsibility.
3. Implementation status and approval status.
4. Canonical source files (HTML/JS/CSS/data/assets).
5. Pages that use it.
6. Explicit exceptions.
7. Desktop, tablet and mobile behaviour as observed or approved.
8. Interactions and functional rules.
9. Dependencies and change impact.
10. Known gaps and unresolved decisions.
11. Last verified commit and change history.

If a detail has not been verified, write **NOT VERIFIED**. Do not fill gaps with assumptions.

## Change and protection rules

- Mas Bagus is the owner of product and design decisions.
- The assistant may inspect, document and recommend; it may not silently change an approved/locked standard.
- A request to change a component must identify the component and scope.
- Changes outside the requested component/page are prohibited unless explicitly approved.
- If implementation and master disagree, record the discrepancy and stop before silently choosing one.
- Keep future ideas as documentation notes only. Do not leave unused scripts, placeholder components or unconnected code in the deployed website.
- Before deleting any file, verify imports, script tags, CSS links, routes, links/forms, workflows, tests and sitemap references.

## Relationship to existing project documentation

This folder complements, not replaces:
- `ARCHITECTURE.md` — technical architecture boundaries.
- `SOP.md` — repository change procedure.
- `ROADMAP.md` — planned work and priorities.
- `HANDOFF.md` — current working handoff and verified release state.
- `TEMPLATE-REGISTRY.md` — canonical page templates and shared components.
- `TEMPLATE-PLAYBOOK.md` — how templates are designed and reused.
- `docs/architecture/REPOSITORY_MAP.md` — file and dependency navigation.
- `AUDIT.md` — historical audit findings.
- `content/ROUTE_MASTER_MAPPING.md` — route mapping.
- `content/bali-master-data.json` — destination master data.

Do not copy entire SOPs or roadmaps into this folder. Link to their source documents.

## Reading order

1. `00-SYSTEM-MAP.md`
2. `01-GLOBAL-COMPONENTS.md`
3. `02-PAGE-MODULES.md`
4. `03-TECHNICAL-MODULES.md`
5. `04-STATUS-REGISTER.md`
6. The relevant detailed record under `GLOBAL/` or `SHARED/`

## Initial scope

This first version documents existing repository structures only. It does not refactor code, redesign pages, approve unfinished templates, create new page functionality, or implement planned features.
