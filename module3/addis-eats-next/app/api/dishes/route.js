import { NextResponse } from "next/server";

const API_URL = "https://addis-eats-backend.onrender.com/menu/";

export async function GET(request) {
  try {
    const category = new URL(request.url).searchParams.get("category");

    const url = category
      ? `${API_URL}?category=${encodeURIComponent(category)}`
      : API_URL;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not load the dishes" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/dishes error:", error);

    return NextResponse.json(
      { error: "Could not load the dishes" },
      { status: 500 }
    );
  }
}