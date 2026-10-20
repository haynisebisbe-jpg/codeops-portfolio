
"use client";

import { useState } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not load orders");
  }

  return data;
};

const STATUSES = [
  "PENDING",
  "PREPARING",
  "READY",
  "DELIVERED",
  "CANCELLED",
];

const statusColors = {
  PENDING: "bg-amber-100 text-amber-800",
  PREPARING: "bg-blue-100 text-blue-800",
  READY: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function KitchenDashboard({ initialOrders }) {
  const [filter, setFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState("");

  const { data, error, isLoading, mutate } = useSWR(
    "/api/kitchen/orders",
    fetcher,
    {
      fallbackData: { orders: initialOrders },
      refreshInterval: 5000,
    }
  );

  const orders = data?.orders ?? [];

  const filteredOrders =
    filter === "ALL"
      ? orders
      : orders.filter((order) => order.status === filter);

  const totalRevenue = orders
    .filter((order) => order.status !== "CANCELLED")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  async function updateStatus(orderId, status) {
    setUpdatingId(orderId);
    setMessage("");

    try {
      const response = await fetch("/api/kitchen/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not update order");
      }

      await mutate();
      setMessage(`Order updated to ${status}.`);
    } catch (err) {
      setMessage(err.message || "Could not update order.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold tracking-widest text-amber-700">
          ADDIS EATS · STAFF
        </p>
        <h1 className="mt-2 text-3xl font-bold">Kitchen Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage incoming orders and update their progress.
          Orders refresh every five seconds.
        </p>
      </header>

      {message && (
        <p role="status" className="rounded-lg bg-gray-100 p-3">
          {message}
        </p>
      )}

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">
          Refresh failed: {error.message}
        </p>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total orders</p>
          <p className="mt-2 text-3xl font-bold">{orders.length}</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Pending preparation</p>
          <p className="mt-2 text-3xl font-bold">
            {orders.filter((order) =>
              ["PENDING", "PREPARING"].includes(order.status)
            ).length}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Order value (excluding cancelled)
          </p>
          <p className="mt-2 text-3xl font-bold">
            {totalRevenue.toLocaleString()} ETB
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Customer orders</h2>

          <label className="flex items-center gap-2 text-sm">
            Filter:
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-lg border bg-white p-2"
            >
              <option value="ALL">All orders</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isLoading && orders.length === 0 ? (
          <p role="status">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center">
            <h3 className="font-semibold">No orders found</h3>
            <p className="mt-2 text-gray-600">
              Orders will appear here when customers place them.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <article
                key={order.id}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="break-all font-bold">
                      Order {order.id}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      statusColors[order.status] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">
                      {order.name || "Not provided"}
                    </p>
                    <p className="text-sm">{order.phone || "No phone"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Order total</p>
                    <p className="text-xl font-bold">
                      {Number(order.total || 0).toLocaleString()} ETB
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-semibold">Items</p>
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    <ul className="mt-2 space-y-1">
                      {order.items.map((item, index) => (
                        <li key={`${item.dishId}-${index}`} className="text-sm">
                          {item.quantity} × {item.name} —{" "}
                          {Number(item.subtotal || 0).toLocaleString()} ETB
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-sm text-gray-500">
                      Item details unavailable.
                    </p>
                  )}
                </div>

                {order.notes && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold">Customer notes</p>
                    <p className="text-sm">{order.notes}</p>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <label className="text-sm font-semibold" htmlFor={`status-${order.id}`}>
                    Update status:
                  </label>

                  <select
                    id={`status-${order.id}`}
                    value={order.status}
                    disabled={updatingId === order.id}
                    onChange={(event) =>
                      updateStatus(order.id, event.target.value)
                    }
                    className="rounded-lg border bg-white p-2 text-sm disabled:opacity-50"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  {updatingId === order.id && (
                    <span role="status" className="text-sm text-gray-500">
                      Saving...
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
