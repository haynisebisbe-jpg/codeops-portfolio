# AUTH.md — Addis Eats Authentication and Authorization

## 1. Authentication

Addis Eats uses a signed session cookie to identify signed-in users.

- Session cookie: HTTP-only.
- Session lifetime: 7 days.
- Session signing: HMAC using `SESSION_SECRET`.
- Customer demo account: configured using `DEMO_LOGIN` and `DEMO_PASSWORD`.
- Staff demo account: configured using `DEMO_STAFF_LOGIN` and `DEMO_STAFF_PASSWORD`.

Production requirements:
- Set a strong, randomly generated `SESSION_SECRET` of at least 32 characters.
- Store secrets in environment variables, never in source code.
- Never expose passwords or session secrets in logs or client responses.
- Use HTTPS in production.

## 2. Authorization

| Route | Access policy |
|---|---|
| `/menu` | Public |
| `/orders` | Signed-in customer; own orders only |
| `/orders/[id]` | Customer must own the order; staff may view orders |
| `/checkout` | Signed-in customer |
| `/kitchen` | Staff only |
| `/api/orders` | Customer session required for order creation |
| `/api/orders/[id]` | Session and order ownership checks |
| `/api/kitchen/orders` | Staff-only order listing and status updates |

## 3. Security layers

1. Middleware/proxy provides route-level access control where configured.
2. Server pages verify the user's session and role.
3. Server actions and API routes must independently verify authorization before sensitive operations.

Never trust a role, user ID, price, order total, or order status supplied by the browser.

## 4. Validation

- Validate required customer fields on the server.
- Validate order items against trusted menu data.
- Calculate prices and totals on the server.
- Allow only approved order statuses.
- Check ownership before returning or modifying customer orders.

## 5. Current limitations

The project currently uses demo credentials and an in-memory mock database. This is suitable for development, not production. Replace demo authentication and mock storage with production-ready identity management and persistent storage before launch.

## 6. Testing checklist

- [x] Customer can sign in and place an order.
- [x] Staff can access the kitchen dashboard.
- [x] Customer can view their own order.
- [x] Kitchen status changes are visible to the customer.
- [ ] Verify unauthorized API requests return appropriate errors.
- [ ] Verify one customer cannot view another customer's order.
- [ ] Verify customer accounts cannot update kitchen order statuses.
- [ ] Verify production secrets and secure cookie settings.
