# GLB-003 — Mobile Bottom Navigation Master

Implementation status: IMPLEMENTED for SPA entry page  
Approval status: NOT RECORDED IN THIS MASTER  
Markup source: `index.html`  
Behaviour: SPA navigation functions referenced by the buttons  
Snapshot: `a8d4282293d98923ecf160f52d95fe6168dd905d`

## Current items

The bottom bar contains four actions:
1. Explore — `navigateTo('home')`
2. Activities — `navigateTo('packages')`
3. Guides — `navigateTo('blog')`
4. Cart — `navigateTo('cart')`

The cart item includes a count badge.

## Current responsive behaviour

- The bar uses the `md:hidden` utility and is intended for narrow/mobile SPA layouts.
- The body reserves bottom padding on mobile and removes that padding from the medium breakpoint upward.
- The global shell has an explicit preservation rule so it does not remove the approved four-item bottom navigation when it injects the header/footer.

## Scope and exceptions

- This bar belongs to the SPA shell in `index.html`.
- It is not documented as a universal bottom navigation for every standalone HTML page.
- Checkout mode intentionally hides mobile bottom navigation.

## Change impact

Changes can affect SPA navigation and mobile viewport space. Test all four routes, badge count, overlays/modals, checkout mode and narrow-screen layout.
