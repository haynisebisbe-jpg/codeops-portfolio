"use client";

import { useEffect, useState } from "react";
import MapPanel from "../MapPanel";
import { etb, when } from "../../../lib/format";

export default function TrackingClient({ order }) {
  const [status, setStatus] = useState(order.status);
  const [connection, setConnection] = useState("connecting");
  const [updatedAt, setUpdatedAt] = useState(
    order.updatedAt || order.createdAt
  );

  useEffect(() => {
    const source = new EventSource(
      `/api/orders/${encodeURIComponent(order.id)}/stream`
    );

    source.onopen = () => setConnection("live");

    source.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);

        if (update.error) {
          setConnection("reconnecting");
          return;
        }

        setStatus(update.status);
        setUpdatedAt(update.updatedAt || new Date().toISOString());
        setConnection("live");

        if (["DELIVERED", "CANCELLED"].includes(update.status)) {
          source.close();
          setConnection("finished");
        }
      } catch {
        setConnection("reconnecting");
      }
    };

    source.onerror = () => setConnection("reconnecting");

    return () => source.close();
  }, [order.id]);

  const address =
    order.deliveryAddress ||
    order.address ||
    order.area ||
    "Address not provided";

  const area = order.area || "Addis Ababa";

  return (
    <main className="next-page">
      <section className="next-empty-card space-y-5">
        <p className="next-eyebrow">ADDIS EATS · DELIVERY</p>

        <h1 className="text-3xl font-bold">Track your order</h1>

        <p>
          Order ID: <strong>{order.id}</strong>
        </p>

        <p>
          Current status: <strong aria-live="polite">{status}</strong>
        </p>

        <p role="status">
          Connection:{" "}
          {connection === "live"
            ? "Live updates connected"
            : connection === "finished"
              ? "Tracking finished"
              : "Connecting or reconnecting to live updates…"}
        </p>

        {updatedAt && (
          <p>
            Last updated:{" "}
            {Number.isNaN(new Date(updatedAt).getTime())
              ? "Unavailable"
              : when.format(new Date(updatedAt))}
          </p>
        )}

        <div>
          <h2 className="mb-2 text-xl font-semibold">
            Delivery destination
          </h2>
          <p>{address}</p>
          <p>Area: {area}</p>
          <p>ETA: Not available yet</p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold">Delivery map</h2>
          <MapPanel address={address} area={area} />
          <p className="mt-2 text-sm text-gray-600">
            Map markers are illustrative. They do not show the courier's
            live GPS position.
          </p>
        </div>

        <p>
          Order total:{" "}
          <strong>{etb.format(Number(order.total || 0))}</strong>
        </p>
      </section>
    </main>
  );
}
