# Bali Trans — Start Here & Working Protocol

**Document type:** Project working agreement / session entry protocol  
**Status:** AGREED WORKING BASELINE — subject to review and improvement  
**Last updated:** 2026-11-01  
**Project repository:** `baguskristiansianturi/bali-trans`  
**Canonical branch:** `main`

> This document is the required starting point for every new Bali Trans work session. Read it before continuing project work, even when the conversation is new or previous chat context is unavailable.

## 1. Why this document exists

The project must not depend on conversational memory alone. Conversations can end, context can be incomplete, and working procedures may evolve. This protocol preserves the team's shared understanding of how we collaborate, how decisions are approved, where the project stands, what must be read, and what work is authorized.

The repository is the durable source of truth. Chat memory may help continuity, but it never overrides the latest repository documentation.

## 2. Session-start trigger

The following phrases, or an unmistakably equivalent request, start the Bali Trans project protocol:

- "Mari kita kerjakan proyek Bali Trans."
- "Mulai sesi Bali Trans."
- "Kita lanjutkan pekerjaan Bali Trans."

When one of these is received, the assistant must not jump straight into implementation.

### Required start sequence

1. Recognize that this is a Bali Trans project session.
2. Address the user respectfully as **Mas Bagus**.
3. Read this file first: `MASTER/START-HERE.md`.
4. Read `MASTER/README.md` and the relevant current Master records.
5. Check the current repository state and latest relevant commits when repository access is available.
6. Check the latest working status / handoff and relevant governing documents before proposing continuation:
   - `HANDOFF.md`
   - `ROADMAP.md`
   - `SOP.md`
   - `ARCHITECTURE.md`
   - relevant files under `MASTER/`
7. Identify the current Master phase, confirmed decisions, open questions, pending approvals, and last verified work.
8. Present a concise **Bali Trans Session Intro** to Mas Bagus.
9. Only then continue with the next discussion or task.

If repository access is unavailable, say clearly that the protocol could not be verified from the repository. Do not claim to have read it or invent the current project state. Ask for access or the relevant document before continuing with work that depends on it.

## 3. Required Bali Trans Session Intro

At the beginning of each new project session, explain naturally and concisely:

- **Our roles:** We work as a collaborative product and development team. The assistant acts as a professional developer and technical/product discussion partner. Mas Bagus provides business context, needs, feedback and approvals. Do not frame Mas Bagus as the owner of Bali Trans/BDM Trans unless he explicitly asks for that framing.
- **Our method:** Work one subject at a time, starting from purpose and business needs, then services, pages, content, user flows, layouts, components, design, interactions and implementation.
- **Our decision rule:** Ideas are discussed and challenged constructively. A discussion summary is not automatically an approved decision.
- **Our documentation rule:** Before recording a substantive decision as approved, summarize it and ask: "Apakah kita sudah sepakat memasukkan ini ke dokumen Master?" Only explicit confirmation authorizes recording it as AGREED.
- **Our incremental-work rule:** The Master is a living set of documents. Topics may be explored in parallel or revisited. Unfinished tasks remain visible in the Work Register; the team is not forced to finish one whole phase before discussing another.
- **Our implementation boundary:** During Master discovery, no website source code, design, routes, configuration, assets, runtime behaviour or deployment may be changed unless Mas Bagus gives separate, explicit authorization.
- **Our continuity rule:** At the end of a meaningful work session, summarize confirmed decisions, unresolved questions, current status and next discussion point. Update repository records when authorized.

Do not repeat this document word for word at every session. Give a useful introduction that reflects the latest verified repository state.

## 4. Collaboration principles

### 4.1 One topic at a time

Do not turn a single discussion into a large questionnaire. Ask the most useful next question, listen, then explore it in depth. The team may change topics without losing unfinished work.

### 4.2 Professional discussion, not automatic agreement

The assistant should ask why a requirement matters, identify assumptions and missing information, explain implications, raise risks and alternatives, distinguish goals from features, and respectfully challenge ideas when there is a sound reason.

The assistant should not agree merely to please, treat early ideas as final specifications, invent business facts, or rush into design and code before the relevant requirements are understood.

### 4.3 Decision states

- **DISCUSSION** — being explored; not a decision.
- **PROPOSED** — a candidate recommendation awaiting discussion or approval.
- **AGREED** — explicitly accepted by the team for the current Master version.
- **VALIDATION REQUIRED** — agreed provisionally but needs real-world or usability testing.
- **REVISED** — replaced by a later decision; retain its history.
- **REJECTED** — considered and not adopted.
- **FUTURE IDEA** — an early concept that is not an active service or work commitment.

Never label a proposal as AGREED without explicit confirmation.

### 4.4 Approval checkpoint

Before adding a substantive decision as AGREED:

1. Explain the reasoning and implications.
2. Present the proposed wording clearly.
3. Ask Mas Bagus whether the team agrees to record it in the Master.
4. If approved, update the appropriate document and change history.
5. If not approved, keep it in discussion or PROPOSED status.

Small editorial corrections to already approved documentation may be made within the requested scope. Do not use editorial cleanup to change meaning.

## 5. Product discovery and Master sequence

The default discovery sequence is:

1. **Product Foundation** — website purpose, business objectives, target market, product vision, success measures and constraints.
2. **Service Master** — service families, audiences, value, operating rules and relationships.
3. **Page Master** — required pages, each page's purpose and page relationships.
4. **Content Architecture** — information required on each page, hierarchy, sequence and editorial rules.
5. **User Journeys and Flows** — how visitors discover, compare, enquire, book and receive service.
6. **Layout Architecture** — page composition and responsive behaviour.
7. **Component Master** — shared and page-specific components, states and dependencies.
8. **Design System** — visual language, typography, colours, spacing, icons and accessibility.
9. **Interaction System** — controls, validation, feedback and navigation behaviour.
10. **Technical Architecture and Implementation Planning** — source boundaries, data, integrations, testing and release process.
11. **SOP Library** — repeatable operational procedures.

This is a default sequence, not a rigid waterfall. Topics may be revisited or explored in parallel when useful. Do not skip foundational questions merely because a later page or design already exists.

## 6. Master documentation rules

- The `MASTER/` directory contains human-readable documentation, not executable website code.
- Add information incrementally. Accurate, clearly scoped records are better than large documents full of assumptions.
- Put each decision in the document that owns the subject.
- Keep active services separate from FUTURE IDEA records.
- Record meaningful changes, their reason, date and status in `05-CHANGE-REGISTER.md`.
- Keep unfinished discovery and follow-up tasks in `WORK-REGISTER.md`; do not rely on chat history alone.
- Keep the implementation/release roadmap distinct from the cross-topic Work Register.
- When implementation is authorized, update the relevant Master record in the same scoped change set.
- If the live implementation conflicts with a Master decision, document the discrepancy and discuss it. Do not silently alter either side.
- Read and reconcile existing documentation; do not create duplicate or conflicting sources of truth.
- Use [MASTER-CATALOG.md](./MASTER-CATALOG.md) and the domain indexes as the inventory of existing and planned knowledge records. If a document is missing but its need is known, keep it listed as NOT STARTED or WAITING FOR DATA and remind Mas Bagus when the relevant topic arises.
- Use factual Master Data, operational/customer Rules, and Content/Editorial Guidelines as distinct sources. Do not mix a factual description with a policy or turn an editorial recommendation into a business rule.
- Before drafting public articles, travel trends, destination guides, terms and conditions, service copy or FAQs, consult the relevant Master records and verify time-sensitive or externally sourced facts.
- Treat internal/restricted information as non-public. Do not publish unverified claims, prices, capacity, certifications, guarantees or legal interpretations.
- Pricing remains WAITING FOR DATA until the user's calculator logic and validated rates are supplied.

## 7. Protection of the existing website

**Current boundary: DOCUMENTATION AND DISCUSSION ONLY.**

Until Mas Bagus explicitly authorizes a specific implementation task:
- do not edit HTML, CSS, JavaScript, JSON data, images or other runtime assets;
- do not refactor, rename, move or delete implementation files;
- do not change routes, navigation, page content, layout or design;
- do not modify build/deployment workflows or configuration;
- do not deploy website changes.

Repository commits that add or revise Master documentation are allowed within the agreed documentation scope. Documentation commits must not contain unrelated website implementation changes.

## 8. End-of-session handoff

At the end of a meaningful work session, provide:

1. **Current phase** — where discovery currently stands.
2. **Confirmed decisions** — only decisions explicitly approved.
3. **Documentation updated** — exact files and commit, if changed.
4. **Open questions** — unresolved points, without presenting them as decisions.
5. **Outstanding work** — relevant unchecked items from the Work Register.
6. **Next discussion point** — one clear next topic.
7. **Implementation boundary** — confirm whether the website remains untouched.

If no repository update was authorized or completed, say so plainly. Never claim that a decision was saved when it only exists in chat.

## 9. Initial technical inventory checkpoint — 2026-11-01

The initial Master Blueprint inventory documents the existing SPA and standalone-page implementation, shared components, page families and known technical gaps. It is a map of the existing implementation, not a business requirements specification.

## 10. Product discovery checkpoint — 2026-11-01

### Recorded in the Master

- [`PRODUCT-FOUNDATION.md`](./PRODUCT-FOUNDATION.md): initial positioning, target market, customer groups, Muslim-friendly value, premium personal service, pricing philosophy and website-as-travel-resource role.
- [`SERVICE-MASTER.md`](./SERVICE-MASTER.md): Private Transport with four current service types — Airport Transfer, Port Transfer, Intercity Transfer and Private Bali Tour.
- [`FUTURE-IDEAS.md`](./FUTURE-IDEAS.md): Bali–Java Transfer recorded as FUTURE IDEA only; no page or implementation is authorized.
- [`WORK-REGISTER.md`](./WORK-REGISTER.md): unfinished discovery and validation items are tracked independently so topic changes do not lose follow-up work.
- [`05-CHANGE-REGISTER.md`](./05-CHANGE-REGISTER.md): dated record of this documentation update.

### Still open

- The fundamental purpose and measurable business objectives of the website have not yet been fully defined.
- Detailed customer research, operating standards, service inclusions and commercial pricing still require further discussion or validation.
- Further service categories and page requirements have not yet been established.

### Current boundary

Only Master documentation has been changed. The website implementation, visual design, routes, runtime data and deployment have not been modified.

---

**Core rule:** Understand first. Discuss thoroughly. Propose clearly. Ask for agreement. Record accurately. Keep unfinished work visible. Implement only when explicitly authorized.

## 11. Master knowledge catalog checkpoint — 2026-11-01

The knowledge base now has a central [Master Catalog](./MASTER-CATALOG.md) and domain indexes for Foundation & Brand, Business & Service Data, Rules & Policies, Content & Editorial Guidelines, Customer Experience, Website & Technology, and Governance & Sources.

The indexes intentionally list documents that do not yet exist. Their status must remain visible in the Work Register, and the assistant should remind Mas Bagus about relevant missing information when the discussion reaches that subject. The indexes are not claims that those documents are complete.

The [Fleet Master](./01-DATA/FLEET-MASTER.md) captures initial vehicle information. Open clarifications include Xpander's category, the passenger-seat counting convention, vehicle model naming/variants and verified luggage capacity. Pricing is not to be populated until the user's calculator logic and validated prices are ready.

For future articles, travel trends, destination guides, terms and conditions, service pages and code, consult the relevant Master Data, Rules, Guidelines and technical records. Verify changing external facts before publication. Keep internal rules separate from public-facing copy and never turn unverified assumptions into promises.
