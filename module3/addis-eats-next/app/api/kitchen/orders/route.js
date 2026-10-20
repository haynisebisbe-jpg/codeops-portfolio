
import { NextResponse } from "next/server";
import {
  getAllOrdersForStaff,
  updateOrderStatusForStaff,
} from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const orders = await getAllOrdersForStaff();
    return NextResponse.json({ orders });
  } catch (error) {
    if (error.message === "Staff access required") {
      return NextResponse.json(
        { error: "Staff access required" },
        { status: 403 }
      );
    }

    console.error("Kitchen orders GET error:", error);

    return NextResponse.json(
      { error: "Could not load orders" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    if (
      typeof orderId !== "string" ||
      !orderId.trim() ||
      typeof status !== "string"
    ) {
      return NextResponse.json(
        { error: "A valid order ID and status are required" },
        { status: 400 }
      );
    }

    const order = await updateOrderStatusForStaff(orderId, status);

    return NextResponse.json({ order });
  } catch (error) {
    if (error.message === "Staff access required") {
      return NextResponse.json(
        { error: "Staff access required" },
        { status: 403 }
      );
    }

    if (error.message === "Order not found") {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (error.message === "Invalid order status") {
      return NextResponse.json(
        { error: "Invalid order status" },
        { status: 400 }
      );
    }

    console.error("Kitchen orders PATCH error:", error);

    return NextResponse.json(
      { error: "Could not update order" },
      { status: 500 }
    );
  }
}
