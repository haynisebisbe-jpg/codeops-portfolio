# Addis Eats — Day 42 Authentication

## Authentication approach

This coursework demo uses a signed session cookie. The session payload contains a user ID, role, and expiration time.

The session cookie is configured with:

- `httpOnly: true`
- `secure: true` in production
- `sameSite: "lax"`
- `path: "/"`
- A seven-day expiration

## Demo accounts

- Customer username: `student`
- Staff username: `kitchen`

Passwords are configured locally in `.env.local`. Never commit this environment file or expose its contents.

## Protected routes and layers

| Route or operation | Protection |
|---|---|
| `/checkout` | Proxy redirect and server-side checks |
| `/orders` | Proxy redirect and signed-session check |
| `/orders/[id]` | Signed-session check and order-ownership check |
| `/kitchen` | Signed-session check and staff-role check |
| `POST /api/orders` | Authentication, customer-role check, and input validation |
| `GET /api/orders/[id]` | Authentication and order-ownership check; staff may view orders |
| Order cancellation action | Authentication and order-ownership check |
| Sign-in redirect destination | Validated to reject external redirect URLs |

### 1. Next.js Proxy

The Proxy checks for a session cookie and redirects requests without one away from checkout and order routes. Cookie presence alone does not prove that a session is valid; server-side code must verify the signed session.

### 2. Server-rendered pages

Protected pages verify the signed session and check the user's identity or role before displaying protected content. Customers can only view their own orders. The kitchen page requires the `staff` role.

### 3. Server actions and API handlers

Protected operations verify authentication and authorization on the server. Order IDs supplied by the browser are not proof of permission. Order creation uses trusted server-side dish prices rather than trusting client-submitted prices.

## Verification performed

- `npm run build` completed successfully.
- Signed-out access to `/orders` redirected to sign-in.
- The staff demo account accessed `/kitchen`.
- The customer demo account received an access-denied response from `/kitchen`.
- An external sign-in redirect destination was rejected, and sign-in returned to the local home page.
- Unauthenticated order API requests returned `401 Authentication required`.

## Limitations

This is an educational mock implementation. Orders are held in memory and disappear when the server process restarts. Demo accounts use environment-configured credentials rather than a user database and password hashing.

The order-ownership check is implemented in the order page and API. A full cross-customer ownership test still needs a second customer account and an order belonging to that account.

For a real application, use a maintained authentication solution such as Auth.js, persistent storage, hashed passwords, rate limiting, and appropriate production session management.
