import { NextResponse } from "next/server";
import { orderSchema } from "../../../lib/schema";
import { createOrder } from "../../../lib/db";

export async function POST(request) {
  try {
    const body = await request.json();

    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          fieldErrors: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const order = await createOrder(result.data);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);

    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}