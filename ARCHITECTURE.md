# Bali Trans — Architecture Rules

This repository is a static GitHub Pages website with two page delivery patterns:
1. The SPA at `index.html`, whose views are selected by query-string routes.
2. Standalone HTML pages at the repository root, retained at their existing URLs for compatibility.

## Non-negotiable boundaries

- **Do not redesign or alter the homepage** while working on another page unless explicitly requested.
- Every standalone page owns its page-specific stylesheet and behaviour under `assets/css/pages/` and `assets/js/pages/`.
- Shared navigation/footer belong to `assets/js/global-shell.js` and `assets/css/global-shell.css`; navigation-specific rules belong in `assets/js/navigation.js` and `assets/css/navigation.css`.
- Checkout pages that intentionally omit the shared shell must continue to do so.
- Shared SPA renderers belong in `assets/js/views/`; page-specific tour template code must remain isolated from generic detail rendering.
- Reuse an existing template before creating another. Record new templates and shared components in `TEMPLATE-REGISTRY.md`.
- Do not duplicate global styles in page stylesheets. Page CSS must be scoped under a page-specific root class or ID.
- Keep business data separate from rendering. Before changing data, determine whether its source of truth is `assets/js/data.js` or `content/bali-master-data.json`; these currently serve different consumers and must not be merged blindly.
- Preserve public URL paths and query routes unless URL migration and redirects are explicitly tested.
- Do not delete or rename a file until all imports, script tags, CSS links, links/forms, router references, workflow checks and sitemap references have been searched and updated.

## Page-change workflow

1. Read `HANDOFF.md`, `ROADMAP.md`, this file, and `TEMPLATE-REGISTRY.md`.
2. Identify the exact page route and its dependencies. Use `docs/architecture/REPOSITORY_MAP.md` as the starting index.
3. Make the smallest scoped change. Avoid touching shared files unless the requirement truly affects all pages.
4. Run the existing source and browser validation workflows.
5. Check GitHub Pages deployment status and verify the target URL. If browser verification fails, report that limitation clearly.
6. Update the handoff/roadmap only with outcomes that actually occurred.

## Intended long-term organization

The current public URL structure is deliberately preserved during this first architecture pass. Root-level standalone HTML files are compatibility entry points; do not move them just to make the tree look tidy. A later migration can move their implementation into `pages/` only when URL compatibility, relative asset paths, form actions, canonical links, and automated tests are migrated together.

```text
/
├── index.html                     # SPA entry point; preserve approved homepage
├── *.html                         # Existing public standalone URL entry points
├── assets/
│   ├── css/
│   │   ├── base.css               # Design tokens and base styles
│   │   ├── navigation.css         # SPA navigation
│   │   ├── footer.css             # SPA footer
│   │   ├── global-shell.css       # Standalone shared shell
│   │   ├── styles.css             # SPA stylesheet entry/imports
│   │   └── pages/                 # Styles owned by a page/feature
│   └── js/
│       ├── data.js                # SPA package/article/locale data
│       ├── state.js               # Shared SPA state
│       ├── navigation.js          # SPA route and metadata handling
│       ├── interactions.js        # Shared SPA interactions
│       ├── global-shell.js        # Shared header/footer injection
│       ├── views/                 # SPA view renderers by feature
│       ├── pages/                 # Standalone page controllers/forms
│       ├── legacy/                # Archived inactive predecessor code
│       └── tailwind.config.js      # Tailwind CDN configuration
├── content/                       # Editorial/master destination data and audits
├── scripts/                       # Automated validation/smoke tests
├── .github/workflows/             # Validation and Pages deployment
└── docs/architecture/             # Maps, conventions, dependency notes
```

## Architecture decisions

- No framework/build-system migration in this pass: GitHub Pages currently serves the static prototype directly.
- No bulk file moves in this pass: a careless move can silently break public URLs and relative asset references.
- The next safe refactor target is to reduce coupling inside the large SPA files, after dependency and browser-test coverage is mapped.
