# GLB-004 / GLB-005 — Header Search and Locale Controls

Implementation status: UI and shared handlers exist  
Approval status: NOT RECORDED IN THIS MASTER  
Sources:
- `assets/js/global-shell.js`
- `assets/js/interactions.js`
- `assets/js/locale.js`
- `assets/js/data.js`
- `assets/css/global-shell.css`

## A. Header search

Current elements:
- Search trigger: `#headerSearchButton`
- Search panel: `#headerSearchPanel`
- Search form: `#btSearchForm`
- Search input: `#headerSearchInput`
- Results container: `#searchResultsDropdown`

The header search is a shared-shell control. The homepage also has a separate hero search field; do not treat the two controls as the same component without checking their handlers and result behaviour.

Before changing search, trace the event handlers and data source in `assets/js/interactions.js` and `assets/js/data.js`.

## B. Language and currency

Current global-shell locale options:
- Bahasa Indonesia — IDR
- English — USD ($)

The control is generated from the `localeOptions` array in `global-shell.js`. Locale and formatting logic also exists in `assets/js/locale.js` and shared data.

Do not assume additional languages, currencies, automatic exchange rates or live FX conversion are implemented. The repository audit records that exchange rates are hard-coded and must not be represented as live rates.

## Change impact

Search can affect route discovery and result selection. Locale can affect text, formatting and prices across views. Changes require testing both header and homepage search where relevant, plus locale display and representative pages in both languages.
