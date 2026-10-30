
"use client";

import { useEffect, useState } from "react";

export default function MapPanel({ address, area }) {
  const [DeliveryMap, setDeliveryMap] = useState(null);

  useEffect(() => {
    import("./[id]/DeliveryMap").then((module) => {
      setDeliveryMap(() => module.default);
    });
  }, []);

  if (!DeliveryMap) {
    return (
      <div
        role="status"
        style={{
          height: 360,
          width: "100%",
          display: "grid",
          placeItems: "center",
          background: "#f3f4f6",
          borderRadius: 12,
        }}
      >
        Loading delivery map...
      </div>
    );
  }

  return <DeliveryMap address={address} area={area} />;
}
