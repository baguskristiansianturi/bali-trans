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
