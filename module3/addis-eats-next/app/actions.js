"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "../lib/schema";
import {
  createOrder,
  getOrder,
  markCancelled,
  getSession,
} from "../lib/db";

// Trusted server-side menu prices.
// Never trust prices submitted by the browser.
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

export async function placeOrder(prevState, formData) {
  let submittedItems;

  try {
    submittedItems = JSON.parse(
      formData.get("items") || "[]"
    );
  } catch {
    submittedItems = [];
  }

  const result = orderSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    items: submittedItems,
    notes: formData.get("notes") || undefined,
  });

  if (!result.success) {
    return {
      success: false,
      error: "Please correct the errors below.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  // Verify every dish against the trusted server-side menu.
  const unknownDish = result.data.items.find(
    (item) => !trustedMenu[item.dishId]
  );

  if (unknownDish) {
    return {
      success: false,
      error: "Your cart contains an invalid dish. Please review your cart.",
      fieldErrors: {},
    };
  }

  const orderItems = result.data.items.map((item) => {
    const dish = trustedMenu[item.dishId];

    return {
      dishId: item.dishId,
      name: dish.name,
      price: dish.price,
      quantity: item.quantity,
      subtotal: dish.price * item.quantity,
    };
  });

  const total = orderItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  try {
    const order = await createOrder({
      name: result.data.name,
      phone: result.data.phone,
      notes: result.data.notes,
      items: orderItems,
      total,

      // Keep the original fields for compatibility with
      // code that expects a single dish.
      dishId: orderItems[0].dishId,
      quantity: orderItems[0].quantity,
    });

    revalidatePath("/checkout");
    revalidatePath("/cart");
    revalidatePath("/orders");

    return {
      success: true,
      orderId: order.id,
      total,
      fieldErrors: {},
    };
  } catch (error) {
    console.error("placeOrder error:", error);

    return {
      success: false,
      error: "Could not place the order. Please try again.",
      fieldErrors: {},
    };
  }
}

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    throw new Error("Not signed in");
  }

  const order = await getOrder(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== session.id) {
    throw new Error("You are not allowed to cancel this order");
  }

  const cancelledOrder = await markCancelled(orderId);

  revalidatePath("/orders");

  return {
    success: true,
    order: cancelledOrder,
  };
}