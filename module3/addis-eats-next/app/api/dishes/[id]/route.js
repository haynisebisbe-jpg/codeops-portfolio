import { NextResponse } from "next/server";

const API_URL = "https://addis-eats-backend.onrender.com/menu/";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const response = await fetch(API_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not load the dishes" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const dishes = Array.isArray(data) ? data : data.data || [];

    const dish = dishes.find(
      (item) => String(item.id) === String(id)
    );

    if (!dish) {
      return NextResponse.json(
        { error: "No such dish" },
        { status: 404 }
      );
    }

    return NextResponse.json(dish);
  } catch (error) {
    console.error("GET /api/dishes/[id] error:", error);

    return NextResponse.json(
      { error: "Could not load the dish" },
      { status: 500 }
    );
  }
}