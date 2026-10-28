# Assets — ownership rules

## CSS

- `css/base.css`: reset, tokens and global foundations.
- `css/navigation.css`: SPA navigation only.
- `css/footer.css`: SPA footer only.
- `css/global-shell.css`: standalone shared shell.
- `css/styles.css`: SPA stylesheet entry point and shared SPA styling.
- `css/pages/<page>.css`: standalone page/feature styles. Scope selectors to that page's root class/ID.
- Feature-level files such as `watersport-*.css` should only contain rules shared by that feature family.

## JavaScript

- `js/data.js`: SPA runtime data.
- `js/state.js`: shared SPA state.
- `js/navigation.js`: SPA routing and metadata.
- `js/interactions.js`: shared SPA event handlers. Do not add page-specific behaviour here if it can live in `js/pages/`.
- `js/global-shell.js`: shared standalone header/footer injection.
- `js/views/`: SPA renderers by feature.
- `js/pages/`: standalone page controllers, forms and adapters.
- `js/tailwind.config.js`: Tailwind CDN theme configuration.

## Change safety

Before adding a file, check for an existing equivalent and read `TEMPLATE-REGISTRY.md`. Before moving or deleting a file, search HTML script/style references, JS imports/calls, CSS imports, router route keys, sitemap entries, workflow assumptions, and internal links. Keep asset names stable unless the migration updates every caller in the same change.
