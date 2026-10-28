# Legacy JavaScript archive

`app.js` is the former monolithic application script. The active `index.html` does not load it; the current SPA is assembled from `data.js`, `state.js`, `navigation.js`, `views/`, `interactions.js`, and `global-shell.js` in explicit script order.

This file is retained for reference while legacy callers are checked. Do not add features here and do not delete it without repository-wide reference checks and browser regression tests.
