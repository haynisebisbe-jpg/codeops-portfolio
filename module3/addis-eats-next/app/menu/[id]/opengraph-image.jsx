
import { ImageResponse } from "next/og";
import { dishes } from "../../../lib/dishes";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }) {
  const { id } = await params;
  const dish = dishes.find((item) => item.id === id);

  const name = dish?.name ?? "Authentic Ethiopian Food";
  const description =
    dish?.description ?? "Discover Ethiopian flavors at Addis Eats.";
  const price = dish ? `${dish.price} ETB` : "Addis Eats";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px",
          background: "#351b12",
          color: "#fff7e8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#f2b544" }}>
          ADDIS EATS · AUTHENTIC ETHIOPIAN FLAVORS
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 800,
            marginTop: 40,
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: 32, marginTop: 24 }}>
          {description}
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#f2b544",
            marginTop: 35,
          }}
        >
          {price}
        </div>
      </div>
    ),
    size
  );
}
