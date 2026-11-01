# 05 — Master Change Register

This register records changes to the Master Blueprint itself and links them to the implementation commit they describe.

It is not a backlog and must not contain experimental code or unapproved implementation tasks.

## Entry format

For every master update, record:
- Date.
- Component or page module.
- Master document changed.
- Previous status/version.
- New status/version.
- Reason and explicit owner instruction.
- Implementation commit (if code changed).
- Verification performed.
- Deployment status when the website implementation changed.

## Initial entry

### 2026-11-01 — Initial Master Blueprint inventory

- Created the `MASTER/` documentation folder.
- Recorded the existing SPA and standalone-page delivery patterns.
- Mapped shared header, footer, mobile bottom navigation, search, locale, account, breadcrumb/hero and shared booking form at an initial level.
- Recorded page families and technical source ownership from the current repository structure and existing architecture documentation.
- Recorded known exceptions and unresolved mapping gaps.
- No HTML, CSS, JavaScript, data, assets, routes or runtime behaviour changed.
- Baseline implementation snapshot: `a8d4282293d98923ecf160f52d95fe6168dd905d`.
- Verification: repository tree and referenced source/documentation inspected; no live UI change was part of this documentation-only update.

### 2026-11-01 — Initial Product Foundation and Service Master records

- Added [`PRODUCT-FOUNDATION.md`](./PRODUCT-FOUNDATION.md) with the discussed premium Muslim-friendly positioning, inclusive global target market, customer groups, Muslim-friendly support value, premium driver experience, pricing philosophy and website-as-travel-resource role.
- Added [`SERVICE-MASTER.md`](./SERVICE-MASTER.md) with the current Private Transport category and four service types: Airport Transfer, Port Transfer, Intercity Transfer and Private Bali Tour.
- Added [`FUTURE-IDEAS.md`](./FUTURE-IDEAS.md), recording Bali–Java Transfer strictly as a FUTURE IDEA, not an active service, page or implementation task.
- Added [`WORK-REGISTER.md`](./WORK-REGISTER.md) to track unfinished discovery incrementally across topics.
- Updated the Master index and session checkpoint to point to the new records.
- Status: initial baseline recorded from the discussion; the website's fundamental purpose and several operational/commercial details remain open for further discovery and validation.
- Scope: documentation only. No HTML, CSS, JavaScript, runtime data, routes, design, deployment configuration or live website behaviour changed.
- Verification: new and updated Markdown files fetched from GitHub after writing; repository documentation links and status notes reviewed.

### 2026-11-01 — Master knowledge architecture and document inventory

- Added [Master Catalog](./MASTER-CATALOG.md) as the central index of existing and planned knowledge records.
- Added domain indexes under `00-FOUNDATION/`, `01-DATA/`, `02-RULES/`, `03-GUIDELINES/`, `04-EXPERIENCE/`, `05-WEBSITE/` and `06-GOVERNANCE/`.
- Added [Fleet Master](./01-DATA/FLEET-MASTER.md) to capture the initial vehicle information supplied in discussion, while keeping model naming, Xpander classification, seat-count convention and luggage details explicitly unresolved.
- Updated the Master README, Work Register and Start Here checkpoint so missing documents remain visible and can be raised in future sessions.
- Established the intended separation between factual data, operating/customer rules, editorial guidelines, customer experience, technical architecture and governance/source verification.
- Pricing documentation is identified but marked WAITING FOR DATA until the user's pricing calculator and validated rates are ready.
- Status: documentation inventory created; most listed records are placeholders or NOT STARTED and are not approved policies or complete specifications.
- Scope: documentation only. No website source code, runtime data, routes, design, assets or deployment configuration changed.
- Verification: each newly created file and the four updated index/protocol files are fetched from GitHub after writing; commit history is checked.
