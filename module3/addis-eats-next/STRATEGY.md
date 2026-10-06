# Addis Eats Rendering Strategy

## Route Strategy

| Route        | Strategy                        | Reason                                                                  |
| ------------ | ------------------------------- | ----------------------------------------------------------------------- |
| `/`          | Static                          | Homepage content does not depend on the visitor.                        |
| `/menu`      | ISR - 1 hour                    | Menu data can change occasionally while keeping the page fast.          |
| `/menu/[id]` | Static via generateStaticParams | Known dish pages can be generated at build time.                        |
| `/cart`      | Client                          | Cart information belongs to the individual customer.                    |
| `/checkout`  | Dynamic                         | Checkout information should be rendered fresh for the current customer. |

## Root Layout

`app/layout.js` is the root layout.

It contains the global HTML structure, header, navigation,
footer, and global CSS.

## Nested Menu Layout

`app/menu/layout.js` provides the menu sidebar.

Because it is a nested layout, the sidebar remains visible
while navigating between the menu page and individual dishes.

## Incremental Static Regeneration

The menu uses:

```js
export const revalidate = 3600;
```
