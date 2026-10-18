
import { NextResponse } from "next/server";
import { dishes } from "../../../lib/dishes";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = (searchParams.get("search") || "").trim().toLowerCase();
  const requestedPage = Number(searchParams.get("page")) || 1;
  const page = Math.max(1, requestedPage);
  const pageSize = 6;

  const filteredDishes = dishes.filter((dish) =>
    `${dish.name} ${dish.category} ${dish.description}`
      .toLowerCase()
      .includes(search)
  );

  const total = filteredDishes.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return NextResponse.json({
    dishes: filteredDishes.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total,
  });
}
