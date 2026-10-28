# Bali Trans — Travel Website Prototype

This repository is being prepared as a **structural and UX prototype** for the Bali Trans travel website. The public copy, brand presentation, and offers in this phase are temporary working content: they help us validate page hierarchy, navigation, responsive layouts, and user journeys. They must not be treated as final launch claims.

## Prototype priorities

- Validate the homepage discovery flow and horizontal swipe/carousel behavior on mobile.
- Validate breadcrumb hierarchy and back-navigation for every detail view.
- Keep navigation, category filters, search, cards, and calls to action consistent.
- Validate activity/package detail, date and option selection, cart, checkout steps, and the demo confirmation state.
- Validate article listing, article detail, related content, and return navigation.
- Keep footer sections, contact paths, and policy links consistent.
- Clearly label any booking/payment UI as a prototype until a real backend and payment/booking process exist.

## Repository architecture

Start here before changing code:

1. [Architecture rules](./ARCHITECTURE.md) — module boundaries, protected areas, safe change workflow.
2. [Repository map](./docs/architecture/REPOSITORY_MAP.md) — page families, source ownership and high-risk shared files.
3. [Asset ownership rules](./assets/README.md) — CSS/JavaScript responsibilities.
4. [Template registry](./TEMPLATE-REGISTRY.md) — existing templates and reusable components.
5. [Template playbook](./TEMPLATE-PLAYBOOK.md) — standards for new or updated templates.
6. [Handoff](./HANDOFF.md), [roadmap](./ROADMAP.md), and [audit](./AUDIT.md) — current state, pending work and known risks.

### Main source layout

```text
/
├── index.html                 # SPA entry point; protect approved homepage
├── *.html                     # Existing standalone URLs; keep paths compatible
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── navigation.css
│   │   ├── footer.css
│   │   ├── global-shell.css
│   │   ├── styles.css         # SPA stylesheet entry
│   │   └── pages/              # Page-scoped CSS
│   └── js/
│       ├── data.js             # SPA runtime data
│       ├── state.js            # Shared SPA state
│       ├── navigation.js       # SPA routes and metadata
│       ├── interactions.js     # Shared SPA interactions
│       ├── global-shell.js     # Shared standalone shell
│       ├── views/              # SPA views by feature
│       └── pages/              # Standalone page controllers/forms
├── content/                    # Destination master data, audits and editorial content
├── scripts/                    # Browser smoke tests and validation helpers
├── docs/architecture/          # Architecture and dependency maps
└── .github/workflows/          # Validation and GitHub Pages deployment
```

The project has two delivery patterns: a query-routed client-rendered SPA in `index.html`, plus standalone HTML pages whose current root URLs must remain compatible. Therefore, standalone pages are not being bulk-moved into a new folder until links, relative assets, form actions, canonical URLs and tests can be migrated safely in one verified change. Organizing source ownership first is safer than moving files for appearance alone.

For page-specific work, edit the page's own HTML/CSS/JS where possible. Shared files such as `assets/js/global-shell.js`, `assets/js/navigation.js`, `assets/js/interactions.js`, `assets/js/data.js` and `assets/css/styles.css` have a larger blast radius and require regression checks. The homepage renderer `assets/js/views/home.js` is protected unless homepage changes are explicitly requested.

## Not production-ready

- Package/activity cards are prototype content, not verified inventory or bookable offers.
- Search is client-side and filters local prototype data; it is not live inventory search.
- Checkout does not submit a real booking or process payment.
- Voucher/QR output is illustrative and is not a valid ticket.
- Any visitor counts, reviews, verification badges, instant-confirmation claims, guarantees, payment logos, exchange rates, contact numbers, social links, or policy links must be verified, replaced, or removed before launch.
- The actual WhatsApp number and final legal/business details must be confirmed before launch.
- Remote Unsplash images need final selection and licensing/use review.
- Keep the preview noindex until launch policy is reviewed.

## Audit and release discipline

See [AUDIT.md](./AUDIT.md) for confirmed static findings and known risks. The default branch is `main`; changes are committed directly without pull requests when requested. A change is only considered deployed after the GitHub Pages workflow succeeds and the live site is checked.

The automated browser suite covers SPA routes, articles, package detail, mobile navigation, 360px overflow, the shared shell, watersport detail routing, and checkout interactions. Manual visual QA on a physical phone is still required before launch.


## Current source layout

The implementation remains a client-rendered SPA with query-based routes. The existing visual design is intentionally preserved while source code is separated into maintainable files.

- `assets/css/styles.css`: CSS entry point importing `base.css`, `navigation.css`, and `footer.css`.
- `assets/js/tailwind.config.js`: shared Tailwind theme configuration.
- `assets/js/data.js`: package, article, locale, and currency data.
- `assets/js/state.js`: shared UI state.
- `assets/js/navigation.js`: route handling and page metadata.
- `assets/js/views/`: discovery, static pages, home, catalog, detail, articles, cart, and checkout renderers.
- `assets/js/interactions.js`: shared UI handlers.
- `content/bali-master-data.json`: destination/category inventory and readiness.
- `content/PAGE_AND_ARTICLE_AUDIT.md`: destination inventory and audit findings.
- `content/ROUTE_MASTER_MAPPING.md`: reconciliation of 41 discovery route keys plus four individual Nusa Penida article routes against the destination master data.

Static validation does not replace browser QA. Prototype checkout is not a real booking/payment flow.
