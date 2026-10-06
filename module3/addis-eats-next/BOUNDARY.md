# Addis Eats — Server / Client Boundary

## Day 38: Server & Client Components

### Server Components

The following components remain Server Components:

- `app/layout.js`
- `app/page.js`
- `app/menu/page.js`
- `app/menu/[id]/page.js`
- `app/menu/layout.js`
- `app/cart/page.js`

The menu page is an async Server Component. It awaits the menu data on the server instead of using the client-side `useFetch` hook.

### Client Components

Only these files use `"use client"`:

- `app/CategoryBar.jsx` — uses `useState` and button click events.
- `app/FilterShell.jsx` — provides the client boundary and receives server content through `children`.
- `app/providers.jsx` — contains the Cart Provider using React context and `useReducer`.
- `app/menu/error.js` — required by the Next.js error boundary.

### Server Component Passed Through Client Component

`FilterShell` receives the server-rendered menu content through `children`.

```jsx
<FilterShell>
  <Suspense fallback={<MenuSkeleton />}>
    <MenuList />
  </Suspense>
</FilterShell>