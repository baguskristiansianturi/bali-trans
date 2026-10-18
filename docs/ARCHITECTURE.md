# Bali Trans repository architecture

## Current migration rule

`index.html` remains the GitHub Pages entry point. Shared CSS lives in `assets/css/site.css`; application JavaScript lives in `assets/js/app.js`. This is the first extraction step from the former monolithic HTML file. Article records and page templates are not yet fully split out; migrate them in small commits with URL and rendering checks rather than copying or rewriting the entire application at once.

## Target structure

- `index.html` — minimal HTML shell and asset loading; keep this path for GitHub Pages.
- `assets/css/site.css` — global styles, design tokens, responsive rules, and shared component styles.
- `assets/js/app.js` — application bootstrap and routing only during the first stage; progressively delegate to modules.
- `assets/js/components/` — shared navigation, footer, cards, dialogs, and common UI behavior.
- `pages/` — homepage, article index, article detail, package detail, contact, and checkout templates.
- `data/articles/` — canonical article content and metadata, one record per article.
- `data/packages/` — package data, options, inclusions, exclusions, and itinerary details.
- `assets/images/` — local image assets, grouped by content type or slug.
- `docs/` — architecture, content standards, QA checklist, and migration notes.

## Rules for every change

1. Reuse existing design tokens, components, and routing; do not introduce a second competing stylesheet or duplicate page template.
2. Keep content/data separate from rendering logic and shared layout.
3. Preserve the public URL patterns and GitHub Pages entry point unless a migration is explicitly planned.
4. Change one bounded area per commit. Avoid broad replacements across the whole file.
5. Before commit, validate JavaScript syntax, required selectors/functions, internal links, and page entry points. After commit, check homepage, article list, article detail, package detail, and mobile navigation on the deployed preview.
6. Do not call a page verified until the deployed page has actually been opened and checked.

## Migration status

- [x] Extract existing stylesheet blocks to `assets/css/site.css`.
- [x] Extract the main application script to `assets/js/app.js`.
- [ ] Update `index.html` to load the extracted assets and validate all entry points.
- [ ] Move article records to `data/articles/` with a single canonical source of truth.
- [ ] Separate page templates from the app entry point without changing routes.
- [ ] Add image inventory and replace unverified/generic destination images where appropriate.
- [ ] Add repeatable smoke checks for homepage, articles, package details, and mobile navigation.
