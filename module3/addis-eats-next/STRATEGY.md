# Addis Eats Rendering Strategy

## 1. Route Rendering Strategy

| Route | Rendering strategy | Reason |
|---|---|---|
| `/` | Static | The homepage contains general content that does not depend on the visitor. |
| `/menu` | Incremental Static Regeneration (ISR) | Menu content is suitable for caching and can be regenerated periodically. |
| `/menu/[id]` | Static Site Generation (SSG) | Known dish pages can be generated at build time using `generateStaticParams`. |
| `/cart` | Client-side state | Cart items and quantities change interactively for each visitor. |
| `/checkout` | Dynamic server rendering | Checkout can depend on the current session and must validate submitted order data on the server. |

## 2. Root Layout

`app/layout.js` is the root layout for the application.

It provides:

- The global HTML document structure.
- Shared navigation links.
- The site footer.
- Global CSS.
- Application providers.

Keeping these elements in the root layout provides a consistent structure across routes.

## 3. Nested Menu Layout

`app/menu/layout.js` provides the layout shared by the menu route and its nested routes.

It keeps the menu sidebar and menu content structure consistent while visitors navigate the menu section.

## 4. Incremental Static Regeneration

The menu page uses the following setting:

```js
export const revalidate = 3600;
```

The value `3600` represents 3,600 seconds, or one hour. Next.js can revalidate the menu page after that interval when the route is requested.

This approach provides fast page delivery while allowing the generated content to be refreshed periodically.

## 5. Client and Server Responsibilities

Server Components are used by default where possible to render content on the server.

Client Components are used where browser interaction or client-side state is needed, such as interactive cart controls and form interactions.

Order validation is performed on the server so that submitted data is not trusted merely because it came from a browser form.

## 6. Production Verification

The production build was tested using:

```bash
npm run build
```

The build completed successfully and reported the expected static, statically generated, and dynamic routes.

The build output also showed `/menu` with a revalidation interval of one hour.

The project uses different rendering strategies based on each route's data requirements and interactive behavior.
