"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PAGE_SIZE = 5;

const money = (value) => `${Number(value || 0).toLocaleString()} ETB`;

export default function AnalyticsDashboard({ initialOrders = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [orders, setOrders] = useState(initialOrders);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const sort = searchParams.get("sort") || "date";
  const direction = searchParams.get("direction") || "desc";
  const requestedPage = Number(searchParams.get("page") || 1);

  useEffect(() => {
    let active = true;

    async function loadOrders() {
      setLoading(true);
      setLoadError(false);

      try {
        const response = await fetch("/api/kitchen/orders", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load orders");
        }

        const result = await response.json();

        if (active) {
          setOrders(result.orders || []);
        }
      } catch {
        if (active) setLoadError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadOrders();

    return () => {
      active = false;
    };
  }, []);

  const validOrders = useMemo(
    () => orders.filter((order) => order.status !== "CANCELLED"),
    [orders]
  );

  const revenueByArea = useMemo(() => {
    const totals = {};

    for (const order of validOrders) {
      const area = order.area || "Unknown area";
      totals[area] =
        (totals[area] || 0) + Number(order.total || 0);
    }

    return Object.entries(totals).map(([area, revenue]) => ({
      area,
      revenue,
    }));
  }, [validOrders]);

  const ordersOverTime = useMemo(() => {
    const totals = {};

    for (const order of orders) {
      if (!order.createdAt) continue;

      const date = new Date(order.createdAt);
      if (Number.isNaN(date.getTime())) continue;

      const day = date.toLocaleDateString("en-CA");
      totals[day] = (totals[day] || 0) + 1;
    }

    return Object.entries(totals)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));
  }, [orders]);

  const sortedOrders = useMemo(() => {
    const copy = [...orders];

    copy.sort((a, b) => {
      let comparison = 0;

      if (sort === "total") {
        comparison = Number(a.total || 0) - Number(b.total || 0);
      } else if (sort === "status") {
        comparison = String(a.status || "").localeCompare(
          String(b.status || "")
        );
      } else {
        comparison =
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime();
      }

      return direction === "asc" ? comparison : -comparison;
    });

    return copy;
  }, [orders, sort, direction]);

  const pageCount = Math.max(
    1,
    Math.ceil(sortedOrders.length / PAGE_SIZE)
  );

  const page = Math.min(
    Math.max(1, Number.isInteger(requestedPage) ? requestedPage : 1),
    pageCount
  );

  const pageOrders = sortedOrders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function updateUrl(changes) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(changes)) {
      params.set(key, String(value));
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function changeSort(value) {
    updateUrl({
      sort: value,
      direction:
        sort === value && direction === "asc" ? "desc" : "asc",
      page: 1,
    });
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold tracking-widest text-amber-700">
          ADDIS EATS · REPORTS
        </p>
        <h1 className="mt-2 text-3xl font-bold">
          Analytics Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Order activity and revenue by delivery area.
        </p>
      </header>

      {loading && (
        <p role="status" className="rounded-lg bg-gray-100 p-4">
          Loading analytics…
        </p>
      )}

      {loadError && (
        <div role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">
          <p>Could not refresh the order data.</p>
          <button
            type="button"
            className="mt-2 underline"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !loadError && orders.length === 0 && (
        <section className="rounded-xl border bg-white p-8">
          <h2 className="text-xl font-bold">No orders yet</h2>
          <p className="mt-2 text-gray-600">
            Charts and the table will appear after customers place orders.
          </p>
        </section>
      )}

      {orders.length > 0 && (
        <>
          <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <article className="min-w-0 rounded-xl border bg-white p-5">
              <h2 className="mb-4 text-lg font-bold">
                Revenue by neighbourhood
              </h2>

              <div
                className="w-full"
                style={{ height: 300, minWidth: 0 }}
                role="img"
                aria-label="Bar chart showing revenue by delivery area"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueByArea}
                    margin={{ top: 10, right: 15, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="area" />
                    <YAxis />
                    <Tooltip formatter={(value) => money(value)} />
                    <Bar
                      dataKey="revenue"
                      name="Revenue"
                      fill="#b45309"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Cancelled orders are excluded from revenue.
              </p>
            </article>

            <article className="min-w-0 rounded-xl border bg-white p-5">
              <h2 className="mb-4 text-lg font-bold">
                Orders over time
              </h2>

              <div
                className="w-full"
                style={{ height: 300, minWidth: 0 }}
                role="img"
                aria-label="Line chart showing orders per day"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={ordersOverTime}
                    margin={{ top: 10, right: 15, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name="Orders"
                      stroke="#047857"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>
          </section>

          <section className="rounded-xl border bg-white p-5">
            <h2 className="mb-4 text-xl font-bold">All orders</h2>

            <div className="mb-4 flex flex-wrap items-center gap-3">
              <label htmlFor="sort-orders" className="font-medium">
                Sort by:
              </label>

              <select
                id="sort-orders"
                className="rounded-lg border p-2"
                value={sort}
                onChange={(event) => changeSort(event.target.value)}
              >
                <option value="date">Date</option>
                <option value="total">Total</option>
                <option value="status">Status</option>
              </select>

              <button
                type="button"
                className="rounded-lg border px-3 py-2"
                onClick={() =>
                  updateUrl({
                    direction: direction === "asc" ? "desc" : "asc",
                    page: 1,
                  })
                }
                aria-label={`Change sort direction; current direction ${direction}`}
              >
                {direction === "asc"
                  ? "Ascending ↑"
                  : "Descending ↓"}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <caption className="mb-3 text-left text-sm text-gray-600">
                  Orders sorted by {sort},{" "}
                  {direction === "asc" ? "ascending" : "descending"}.
                </caption>

                <thead>
                  <tr className="border-b bg-gray-50">
                    <th scope="col" className="p-3">Order ID</th>
                    <th scope="col" className="p-3">Date</th>
                    <th scope="col" className="p-3">Area</th>
                    <th scope="col" className="p-3">Total</th>
                    <th scope="col" className="p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {pageOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="break-all p-3">{order.id}</td>
                      <td className="p-3">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : "Unknown"}
                      </td>
                      <td className="p-3">
                        {order.area || "Unknown area"}
                      </td>
                      <td className="p-3">{money(order.total)}</td>
                      <td className="p-3">
                        {order.status || "Unknown"}
                      </td>
                    </tr>
                  ))}

                  {pageOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">
                        No orders on this page.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <nav
              className="mt-5 flex items-center justify-between gap-3"
              aria-label="Order table pagination"
            >
              <button
                type="button"
                className="rounded-lg border px-4 py-2 disabled:opacity-40"
                disabled={page <= 1}
                onClick={() => updateUrl({ page: page - 1 })}
              >
                Previous
              </button>

              <p aria-live="polite" className="text-sm">
                Page {page} of {pageCount} · {orders.length} orders
              </p>

              <button
                type="button"
                className="rounded-lg border px-4 py-2 disabled:opacity-40"
                disabled={page >= pageCount}
                onClick={() => updateUrl({ page: page + 1 })}
              >
                Next
              </button>
            </nav>
          </section>
        </>
      )}
    </div>
  );
}