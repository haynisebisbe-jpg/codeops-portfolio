"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "../lib/schema";
import {
  createOrder,
  getOrder,
  markCancelled,
  getSession,
} from "../lib/db";

export async function placeOrder(prevState, formData) {
  const result = orderSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    dishId: formData.get("dishId") || undefined,
    quantity: formData.get("quantity")
      ? Number(formData.get("quantity"))
      : undefined,
    notes: formData.get("notes") || undefined,
  });

  if (!result.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const order = await createOrder(result.data);

    revalidatePath("/checkout");

    return {
      success: true,
      orderId: order.id,
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