# DATA.md — Addis Eats Data Design

## 1. Current data storage

The current application uses an in-memory mock database in `lib/db.js`.

This supports development and testing but is not persistent. Orders may be lost when the server restarts, and in-memory data is not shared reliably across multiple production instances.

## 2. Main entities

### Dish
- `id`
- `name`
- `price`
- `description`
- `image`
- `category` (where available)

### Order
- `id`
- `userId`
- `name`
- `phone`
- `notes`
- `items`
- `total`
- `status`
- `createdAt`
- `updatedAt` (when a status is updated)

Each order item includes its dish ID, name, price, quantity, and subtotal.

## 3. Order status lifecycle

Supported statuses:

1. `PENDING`
2. `PREPARING`
3. `READY`
4. `DELIVERED`
5. `CANCELLED`

The kitchen dashboard polls for order updates every five seconds.

## 4. Data access rules

- Customers can retrieve only their own orders.
- Staff can retrieve orders for kitchen operations.
- Only authorized staff may update kitchen order statuses.
- Order prices and totals must be calculated from trusted server-side menu data.
- API responses should expose only information needed by the requesting user.

## 5. Recommended production database

Replace the in-memory mock database with a persistent database such as PostgreSQL.

Recommended tables:
- `users`
- `dishes`
- `orders`
- `order_items`

Use foreign keys, server-side validation, database transactions for order creation, and indexes on order ownership and creation time.

## 6. Data integrity

- Store order items separately from the order header.
- Preserve the agreed price for each item at the time of purchase.
- Validate quantities and dish availability.
- Calculate the order total on the server.
- Enforce allowed status transitions.
- Use database transactions to prevent incomplete orders.

## 7. Current limitations

The application is still using mock storage. Persistent database storage, database-level constraints, and production data migration remain future work.
