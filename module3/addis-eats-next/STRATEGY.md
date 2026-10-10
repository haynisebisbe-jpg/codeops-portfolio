# Addis Eats Rendering Strategy

## Route Strategy

| Route | Strategy | Reason |
|---|---|---|
| `/` | Static | Homepage content does not depend on the visitor. |
| `/menu` | ISR - 1 hour | Menu information can change occasionally while remaining fast. |
| `/menu/[id]` | Static via generateStaticParams | Known dish pages can be generated at build time. |
| `/cart` | Client | Cart information belongs to the individual customer and uses client state. |
| `/checkout` | Dynamic | Checkout is user-specific and checks the current session on the server. |

## Root Layout

`app/layout.js` is the root layout.

It contains:

- global HTML structure
- navigation
- footer
- global CSS
- Providers

## Menu Layout

`app/menu/layout.js` provides the nested menu layout and keeps
the menu navigation available while navigating between menu pages.

## Incremental Static Regeneration

The menu uses:

```js
export const revalidate = 3600;