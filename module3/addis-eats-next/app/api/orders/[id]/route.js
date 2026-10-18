
import { NextResponse } from "next/server";
import { getOrder, getSession } from "../../../../lib/db";

export async function GET(request, { params }) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  if (session.role !== "staff" && order.userId !== session.id) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(order);
}
