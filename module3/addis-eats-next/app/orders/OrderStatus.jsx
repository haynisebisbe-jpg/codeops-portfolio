
"use client";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";

export default function OrderStatus({ id, initial }) {
  const { data, error, isLoading } = useSWR(
    `/api/orders/${id}`,
    fetcher,
    {
      fallbackData: initial,
      refreshInterval: 5000,
    }
  );

  if (isLoading && !data) {
    return <p role="status">Loading order status...</p>;
  }

  if (error && !data) {
    return <p role="alert">Could not load the order.</p>;
  }

  return (
    <section className="next-empty-card">
      <h2>Order Status</h2>
      <p>Order ID: <strong>{data.id}</strong></p>
      <p>Status: <strong>{data.status}</strong></p>

      {error && (
        <p role="status">
          Refresh failed. Showing the last available status.
        </p>
      )}
    </section>
  );
}
