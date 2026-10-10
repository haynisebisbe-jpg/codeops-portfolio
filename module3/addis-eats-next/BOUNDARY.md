# Addis Eats — Server / Client Boundary

## Day 40 Server / Client Boundary

### Server Components

The following remain Server Components:

- `app/layout.js`
- `app/page.js`
- `app/menu/page.js`
- `app/menu/[id]/page.js`
- `app/menu/layout.js`
- `app/cart/page.js`
- `app/checkout/page.js`

Server Components are used for routing, data fetching, layouts,
static pages, and server-side authentication checks.

### Client Components

These components use `"use client"` because they need browser
interactivity or React client state:

- `app/providers.jsx`
  - Cart context
  - useReducer
  - client state

- `app/CategoryBar.jsx`
  - category selection
  - click events

- `app/FilterShell.jsx`
  - client-side filtering boundary

- `app/menu/error.js`
  - Next.js client error boundary

- `app/menu/[id]/AddToCartButton.jsx`
  - button click
  - dispatches cart action

- `app/cart/CartView.jsx`
  - reads cart context
  - removes items
  - clears cart

- `app/checkout/CheckoutForm.jsx`
  - useActionState
  - form submission
  - pending state
  - validation messages

### Important Boundary Rule

Interactive state stays in client components.

Server Components handle:

- routing
- data fetching
- authentication checks
- server rendering

Client Components handle:

- clicks
- cart state
- forms
- browser interaction

The checkout page itself remains a Server Component while the
interactive checkout form is isolated in `CheckoutForm.jsx`.