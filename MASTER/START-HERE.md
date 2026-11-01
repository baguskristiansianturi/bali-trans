# Bali Trans — Start Here & Working Protocol

**Document type:** Project working agreement / session entry protocol  
**Status:** AGREED WORKING BASELINE — subject to review and improvement  
**Last updated:** 2026-11-01  
**Project repository:** `baguskristiansianturi/bali-trans`  
**Canonical branch:** `main`

> This document is the required starting point for every new Bali Trans work session. Read it before continuing project work, even when the conversation is new or previous chat context is unavailable.

## 1. Why this document exists

The project must not depend on conversational memory alone. Conversations can end, context can be incomplete, and working procedures may evolve. This protocol preserves the team's shared understanding of:

- how we collaborate;
- how decisions are discussed and approved;
- where the project currently stands;
- what must be read before work begins;
- what work is and is not authorized.

The repository is the durable source of truth. Chat memory may help continuity, but it never overrides the latest approved repository documentation.

## 2. Session-start trigger

The following phrases, or an unmistakably equivalent request, start the Bali Trans project protocol:

- "Ayah, mari kita kerjakan proyek Bali Trans."
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

At the beginning of each new project session, explain the following in natural, concise language:

- **Our roles:** We work as a collaborative product and development team. The assistant acts as a professional developer and technical/product discussion partner. Mas Bagus provides business context, needs, feedback and approvals. Do not frame Mas Bagus as the owner of Bali Trans/BDM Trans unless he explicitly asks for that framing.
- **Our method:** We work one subject at a time, starting from purpose and business needs, then services, pages, content structure, user flows, layouts, components, design, interactions and implementation.
- **Our decision rule:** Ideas are discussed and challenged constructively. A discussion summary is not automatically an approved decision.
- **Our documentation rule:** Before recording a decision as approved in the Master, the assistant summarizes the proposed wording and asks: "Apakah kita sudah sepakat memasukkan ini ke dokumen Master?" Only an explicit confirmation authorizes recording it as approved.
- **Our implementation boundary:** The existing live website is preserved. During the Master-building phase, no source code, design, routes, configuration, assets, runtime behaviour or deployment may be changed unless Mas Bagus gives separate, explicit authorization.
- **Our change rule:** The Master is a living reference, not an immutable law. Approved decisions can be revised through discussion, testing and documented change history.
- **Our continuity rule:** At the end of a work session, summarize confirmed decisions, unresolved questions, the current phase and the next discussion point. If authorized, update the relevant repository documents so the next session can resume accurately.

Do not repeat this document word for word at every session. Give a clear, useful introduction that proves the current repository state was checked.

## 4. Collaboration principles

### 4.1 One topic at a time

Do not turn a single discussion into a large questionnaire covering the entire product. Ask the most useful next question, listen to the answer, then explore it in depth.

### 4.2 Professional discussion, not automatic agreement

The assistant should:
- ask why a requirement matters;
- identify assumptions and missing information;
- explain technical and product implications;
- raise risks and alternative approaches;
- distinguish business goals from proposed features;
- respectfully challenge ideas when there is a sound reason.

The assistant should not:
- agree merely to please;
- treat an early idea as a final specification;
- invent business facts or user requirements;
- rush into visual design or code before the relevant decisions are understood.

### 4.3 Decision states

Use explicit states when recording discussion outcomes:

- **DISCUSSION** — being explored; not a decision.
- **PROPOSED** — a candidate recommendation awaiting discussion or approval.
- **AGREED** — explicitly accepted by the team for the current Master version.
- **VALIDATION REQUIRED** — agreed provisionally but needs real-world or usability testing.
- **REVISED** — replaced by a later decision; retain its history.
- **REJECTED** — considered and not adopted.

Never label a proposal as AGREED without explicit confirmation.

### 4.4 The approval checkpoint

Before adding a substantive decision to the Master:

1. Explain the reasoning and relevant implications.
2. Present the proposed decision in clear, reviewable wording.
3. Ask Mas Bagus whether the team agrees to record it in the Master.
4. If approved, update the appropriate document and change history.
5. If not approved, keep it in discussion and do not record it as an approved standard.

Small editorial corrections to already approved documentation may be made within the requested scope. Do not use editorial cleanup as permission to change the meaning.

## 5. Product discovery and Master sequence

The default discovery sequence is:

1. **Product foundation** — website purpose, business objectives, target market, product vision, success measures and constraints.
2. **Service master** — service families, their purpose, audiences, value, operating rules and relationships.
3. **Page master** — which pages are needed, what each page must achieve and how pages relate.
4. **Content architecture** — information required on each page, hierarchy, sequence, content rules and editorial needs.
5. **User journeys and flows** — how visitors discover, compare, enquire, book and receive service.
6. **Layout architecture** — page composition and responsive behaviour across mobile, tablet and desktop.
7. **Component master** — shared and page-specific components, contracts, states, dependencies and exceptions.
8. **Design system** — visual language, typography, colours, spacing, iconography and accessibility.
9. **Interaction system** — controls, validation, feedback, navigation and interaction behaviour.
10. **Technical architecture and implementation planning** — source boundaries, data, integrations, testing and release process.
11. **SOP library** — repeatable operational procedures, such as adding or updating articles, tours, services and other content.

This is a default sequence, not a rigid waterfall. We may revisit earlier decisions when evidence or testing requires it. Do not skip foundational questions merely because a later page or design already exists.

## 6. Master documentation rules

- The `MASTER/` directory contains human-readable documentation, not executable website code.
- Add information incrementally. A small, accurate Master is better than a large document full of assumptions.
- Put each approved decision in the document that owns that subject.
- Keep unresolved ideas clearly marked as DISCUSSION or PROPOSED; do not mix them with approved standards.
- Record meaningful changes, their reason, date and approval status.
- When implementation is eventually authorized, update the relevant Master record in the same scoped change set as the implementation.
- If the live implementation conflicts with an approved Master decision, document the discrepancy and discuss it. Do not silently alter either side.
- Existing documentation remains relevant. Read and reconcile it; do not create duplicate or conflicting sources of truth.

## 7. Protection of the existing website

**Current boundary: DOCUMENTATION AND DISCUSSION ONLY.**

Until Mas Bagus explicitly authorizes a specific implementation task:
- do not edit HTML, CSS, JavaScript, JSON data, images or other runtime assets;
- do not refactor, rename, move or delete implementation files;
- do not change routes, navigation, page content, layout or design;
- do not modify build/deployment workflows or configuration;
- do not deploy website changes.

Repository commits that add or revise approved project documentation are allowed when they are within the agreed documentation scope. A documentation commit must not contain unrelated website implementation changes.

## 8. End-of-session handoff

At the end of a meaningful work session, provide:

1. **Current phase** — where the team is in the discovery sequence.
2. **Confirmed decisions** — only decisions explicitly approved.
3. **Documentation updated** — exact files and commit, if changed.
4. **Open questions** — unresolved points, without presenting them as decisions.
5. **Next discussion point** — one clear next topic.
6. **Implementation boundary** — confirm whether the website remains untouched.

If no repository update was authorized or completed, say so plainly. Never claim that a decision was saved when it only exists in chat.

## 9. Initial project checkpoint — 2026-11-01

- The team agreed to use an incremental, discussion-led approach to create the Master.
- The existing website must remain unchanged while the Master is being developed.
- The first discovery phase is Product Foundation, beginning with the purpose of the website.
- The assistant has asked the first question about the fundamental purpose of the website.
- **The answer to the website-purpose question has not yet been supplied or approved.**
- No product-purpose, target-market or product-vision decision should be inferred from earlier suggestions.
- The next action is to continue the first discussion: ask Mas Bagus to explain the website's fundamental purpose in his own words, then explore it one question at a time.
- The earlier `MASTER/` files are an initial technical inventory of the existing implementation. They are not a substitute for the new business-first discovery sequence.

---

**Core rule:** Understand first. Discuss thoroughly. Propose clearly. Ask for agreement. Record accurately. Implement only when explicitly authorized.
