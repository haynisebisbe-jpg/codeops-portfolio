# Day 41 — Data Fetching

## Menu Search and Pagination
- Menu search uses SWR to fetch matching dishes from `/api/menu`.
- Search input is debounced by 400 milliseconds.
- The menu displays 6 dishes per page.
- Pagination updates the page query parameter.
- Previous results remain visible while new results load.

## Order Status Polling
- Order tracking page: `/orders/[id]`.
- API endpoint: `/api/orders/[id]`.
- The initial order is loaded on the server.
- SWR refreshes the order status every 5 seconds.
- The last available status remains visible if a refresh fails.

## Mock Database
- `lib/db.js` stores orders in memory.
- Orders may be lost when the server restarts.
- This mock database is for learning and development, not production persistence.

## Day 41 Test Results
- [x] Menu search and pagination tested.
- [x] Order creation tested.
- [x] Order API returns the created order.
- [x] Order tracking displays the pending status.
- [x] Five-second polling configured.
