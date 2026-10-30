
"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function DeliveryMap({ address, area }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Approximate Addis Ababa coordinates for the demo.
    // Replace these with real, verified coordinates when available.
    const restaurant = [9.0192, 38.7525];
    const delivery = [9.03, 38.76];

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const courierIcon = L.divIcon({
      className: "courier-marker",
      html: '<span style="font-size:28px" aria-label="Courier">🛵</span>',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    L.marker(restaurant, { icon: courierIcon })
      .addTo(map)
      .bindPopup("Courier / restaurant");

    L.marker(delivery)
      .addTo(map)
      .bindPopup(address || area || "Delivery destination");

    map.fitBounds([restaurant, delivery], { padding: [35, 35] });

    return () => map.remove();
  }, [address, area]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`Delivery map. Destination: ${address || area || "Addis Ababa"}`}
      style={{
        height: 360,
        width: "100%",
        borderRadius: 12,
        zIndex: 0,
      }}
    />
  );
}
