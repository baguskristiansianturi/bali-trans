# Bali Trans — Master Blueprint

Status: INITIAL INVENTORY + INCREMENTAL PRODUCT FOUNDATION  \
Last mapped: 2026-11-01  \
Repository: `baguskristiansianturi/bali-trans`  \
Default branch: `main`  \
Implementation snapshot used for initial technical inventory: `a8d4282293d98923ecf160f52d95fe6168dd905d`

## Start every work session here

**Required first read:** [`START-HERE.md`](./START-HERE.md).

This is the team's session-start protocol and working agreement. Read it before continuing project work. It explains the collaboration method, approval checkpoints, documentation sequence, website-protection boundary and current discovery checkpoint.

Current working boundary: **Master discussion and documentation only. The existing website must not be changed unless separately and explicitly authorized.**

## Product and service discovery records

These records are the business-first source of context for future page, content, journey, design and implementation decisions. They are intentionally developed incrementally.

| Document | Responsibility |
|---|---|
| [Product Foundation](./PRODUCT-FOUNDATION.md) | Market positioning, target customers, value proposition, website role and open discovery |
| [Service Master](./SERVICE-MASTER.md) | Current service categories and their service types |
| [Future Ideas](./FUTURE-IDEAS.md) | Unapproved or early concepts kept separate from active services |
| [Work Register](./WORK-REGISTER.md) | Active unfinished discovery and documentation tasks |
| [Master Change Register](./05-CHANGE-REGISTER.md) | Dated history of meaningful Master changes |

**Important:** A future idea is not an active service or implementation task. An unchecked Work Register item remains open even when the team changes topic.

## Technical blueprint

This folder is also the human-readable map of the existing Bali Trans website. It records:
- what components and page modules currently exist;
- what each component is responsible for;
- where its real implementation lives;
- which pages use it and which pages are exceptions;
- the current implementation and approval status;
- known gaps or discrepancies that must be resolved before treating a component as a final standard.

The initial technical inventory documents the existing implementation. It is separate from the business-first product discovery records above.

## This is not source code

Files in `MASTER/` are documentation only. They must not contain executable HTML, CSS, JavaScript, temporary scripts, or experimental code. The website continues to run from the existing implementation files.

The Master describes the implementation and approved decisions; it does not replace them.

## Two connected layers

1. **MASTER BLUEPRINT** — this folder: business decisions, service definitions, system maps, component contracts, page relationships, status and change notes.
2. **IMPLEMENTATION** — the existing HTML, CSS, JavaScript, data and assets that actually run the website.

A component is not considered synchronized merely because its documentation exists. When an approved implementation change is made, the corresponding Master record must be updated in the same scoped change set.

## Status vocabulary

Decision status:
- **DISCUSSION** — being explored; not a decision.
- **PROPOSED** — a candidate recommendation awaiting discussion or approval.
- **AGREED** — explicitly accepted by the team for the current Master version.
- **VALIDATION REQUIRED** — agreed provisionally but needs real-world or usability testing.
- **REVISED** — replaced by a later decision; retain its history.
- **REJECTED** — considered and not adopted.
- **FUTURE IDEA** — an early concept that is not an active service or work commitment.

Implementation status:
- **IMPLEMENTED** — the referenced implementation exists in the repository.
- **PARTIAL** — some parts exist, but the full component contract or behaviour is not established.
- **PRESENT — VERIFY USAGE** — files exist, but active callers and actual runtime use have not been fully confirmed.
- **EXCEPTION** — intentionally different behaviour on a specific page or page family.
- **ARCHIVED** — retained for historical/reference purposes and not treated as active implementation.
- **NOT ESTABLISHED** — no shared implementation or approved rule has been identified yet.

Never infer approval from the fact that code exists or a page is deployed.

## Change and protection rules

- Product and design decisions require explicit agreement before being recorded as approved.
- Add information incrementally; do not force the team through a rigid waterfall.
- Put each decision in the document that owns that subject.
- Keep unresolved ideas clearly marked and separate from current services.
- Record meaningful changes, their reason, date and approval status.
- If implementation and Master disagree, record the discrepancy and discuss it.
- Do not change website implementation during Master discovery without separate explicit authorization.

## Relationship to existing project documentation

This folder complements, not replaces:
- `ARCHITECTURE.md` — technical architecture boundaries.
- `SOP.md` — repository change procedure.
- `ROADMAP.md` — implementation/release roadmap.
- `HANDOFF.md` — current working handoff and verified release state.
- `TEMPLATE-REGISTRY.md` — canonical page templates and shared components.
- `TEMPLATE-PLAYBOOK.md` — how templates are designed and reused.
- `docs/architecture/REPOSITORY_MAP.md` — file and dependency navigation.
- `AUDIT.md` — historical audit findings.
- `content/ROUTE_MASTER_MAPPING.md` — route mapping.
- `content/bali-master-data.json` — destination master data.

The Work Register is the cross-topic checklist for unfinished discovery and documentation. It complements the implementation roadmap; it does not replace it.

## Reading order

1. `START-HERE.md` — session protocol and current checkpoint.
2. `PRODUCT-FOUNDATION.md` — relevant business and customer context.
3. `SERVICE-MASTER.md` — current service structure.
4. `FUTURE-IDEAS.md` — parked concepts, when relevant.
5. `WORK-REGISTER.md` — unfinished work and next actions.
6. `00-SYSTEM-MAP.md`
7. `01-GLOBAL-COMPONENTS.md`
8. `02-PAGE-MODULES.md`
9. `03-TECHNICAL-MODULES.md`
10. `04-STATUS-REGISTER.md`
11. Relevant detailed records under `GLOBAL/` or `SHARED/`.

--- 
