# Addis Eats — Server / Client Boundary

## 1. Purpose

This document explains how the Addis Eats Next.js application separates server-rendered work from interactive client-side behavior.

The project uses Server Components by default and Client Components when browser interaction or React client state is required.

## 2. Server Components

The following route and layout files are intended to remain Server Components:

- `app/layout.js`
- `app/page.js`
- `app/menu/page.js`
- `app/menu/[id]/page.js`
- `app/menu/layout.js`
- `app/cart/page.js`
- `app/checkout/page.js`

Server Components handle responsibilities such as:

- Rendering route content on the server.
- Loading or preparing data.
- Defining shared and nested layouts.
- Supporting static generation and dynamic rendering.
- Performing server-side checks where required.

Server Components should not use browser-only hooks such as `useState` or click event handlers directly.

## 3. Client Components

Client Components are used when a component requires browser interaction or client-side React state.

The project's interactive components include:

- `app/providers.jsx` — provides client-side context and cart state.
- `app/menu/error.js` — displays the menu error boundary and its retry button.
- `app/menu/[id]/AddToCartButton.jsx` — handles adding a dish to the cart.
- `app/cart/CartView.jsx` — displays and updates the cart.
- `app/checkout/CheckoutForm.jsx` — handles interactive form submission, pending state, and validation messages.

These components should use the `"use client"` directive when required by their implementation.

Only components that actually exist and are used in the application should be listed here. Additional helper components should be documented when their current implementation requires client-side behavior.

## 4. Important Boundary Rules

**Server Components** are responsible for server rendering, route structure, and server-side work.

**Client Components** are responsible for browser events, interactive state, and browser-dependent behavior.

The checkout page remains a Server Component, while its interactive form is isolated in `CheckoutForm.jsx`.

Server-side validation must remain on the server. Client-side validation can improve the user experience, but it must not replace server-side validation.

## 5. Error Handling

The menu error boundary is implemented in `app/menu/error.js`.

It displays a helpful error message and a retry button when an error within its route segment is caught. The root layout is outside this segment-level boundary, allowing shared site navigation to remain available.

## 6. Verification

The production build was tested with:

```bash
npm run build
```

The build completed successfully, and the menu error boundary was manually tested using a temporary error that was subsequently removed.

The visible loading state still requires a separate successful runtime verification.
