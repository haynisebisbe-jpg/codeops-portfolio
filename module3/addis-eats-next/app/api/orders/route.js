
import { NextResponse } from "next/server";
import { orderSchema } from "../../../lib/schema";
import { createOrder, getSession } from "../../../lib/db";

const trustedMenu = {
  "doro-wot": { name: "Doro Wot", price: 450 },
  "siga-wat": { name: "Siga Wat", price: 500 },
  "beg-alicha": { name: "Beg Alicha", price: 480 },
  "shiro-tegamino": { name: "Shiro Tegamino", price: 280 },
  "shiro-bozena": { name: "Shiro Bozena", price: 350 },
  "derek-tibs": { name: "Derek Tibs", price: 550 },
  "awaze-tibs": { name: "Awaze Tibs", price: 520 },
  "quanta-firfir": { name: "Quanta Firfir", price: 400 },
  "asa-tibs": { name: "Asa Tibs", price: 450 },
  kitfo: { name: "Kitfo", price: 550 },
  "gored-gored": { name: "Gored Gored", price: 550 },
  dulet: { name: "Dulet", price: 350 },
  beyaynetu: { name: "Beyaynetu", price: 350 },
  misir: { name: "Misir Wot", price: 250 },
  kik: { name: "Kik Alicha", price: 250 },
  gomen: { name: "Gomen", price: 220 },
  timatim: { name: "Timatim Fitfit", price: 250 },
  tej: { name: "Tej", price: 180 },
  buna: { name: "Buna", price: 100 },
  tea: { name: "Ethiopian Tea", price: 80 },
};

export async function POST(request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  if (session.role !== "customer") {
    return NextResponse.json(
      { error: "Customer access required" },
      { status: 403 }
    );
  }

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

    if (result.data.items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty" },
        { status: 422 }
      );
    }

    const orderItems = result.data.items.map((item) => {
      const dish = trustedMenu[item.dishId];

      if (!dish) {
        return null;
      }

      return {
        dishId: item.dishId,
        name: dish.name,
        price: dish.price,
        quantity: item.quantity,
        subtotal: dish.price * item.quantity,
      };
    });

    if (orderItems.some((item) => item === null)) {
      return NextResponse.json(
        { error: "Your cart contains an invalid dish" },
        { status: 422 }
      );
    }

    const total = orderItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    const order = await createOrder({
      name: result.data.name,
      phone: result.data.phone,
      notes: result.data.notes,
      items: orderItems,
      total,
      dishId: orderItems[0].dishId,
      quantity: orderItems[0].quantity,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);

    return NextResponse.json(
      { error: "Could not create order" },
      { status: 400 }
    );
  }
}
