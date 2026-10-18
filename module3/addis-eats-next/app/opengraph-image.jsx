
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Addis Eats — Authentic Ethiopian Food Delivery";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#351b12",
          color: "#fff7e8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, color: "#f2b544" }}>
          AUTHENTIC ETHIOPIAN FLAVORS
        </div>
        <div
          style={{
            fontSize: 100,
            fontWeight: 800,
            marginTop: 24,
          }}
        >
          Addis Eats
        </div>
        <div style={{ fontSize: 34, marginTop: 20 }}>
          Your favorite Ethiopian food, delivered.
        </div>
        <div style={{ fontSize: 25, marginTop: 42, color: "#f2b544" }}>
          Doro Wot · Tibs · Kitfo · Shiro
        </div>
      </div>
    ),
    size
  );
}
