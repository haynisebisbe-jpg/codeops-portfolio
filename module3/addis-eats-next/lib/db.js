
/**
 * In-memory mock database and helper utilities for Addis Eats.
 */

import { getSession as getSignedSession } from "./session";

const mockDishes = [
  {
    id: "dish_1",
    name: "Doro Wat",
    description: "Traditional spicy chicken stew served with injera and boiled egg.",
    price: 350,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_2",
    name: "Beyaynetu",
    description: "Assorted vegan fasting dishes served on injera.",
    price: 220,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
  {
    id: "dish_3",
    name: "Kitfo",
    description: "Minced beef seasoned with mitmita and niter kibbeh.",
    price: 400,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_4",
    name: "Shiro Tegabeno",
    description: "Rich chickpea flour stew served bubbling hot in a clay pot.",
    price: 180,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
];

const mockOrders =
  globalThis.mockOrders ?? (globalThis.mockOrders = []);

export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((dish) => dish.id === where.id) || null,
  },
  order: {
    findMany: async () => [...mockOrders],
  },
};

export async function getDish(id) {
  return mockDishes.find((dish) => dish.id === id) || null;
}

export async function getSession() {
  return getSignedSession();
}

export async function createOrder(data) {
  const session = await getSignedSession();

  if (!session || session.role !== "customer") {
    throw new Error("Customer sign-in required");
  }

  const newOrder = {
    id: `ord_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    ...data,
    userId: session.id,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(newOrder);
  return newOrder;
}

export async function getOrder(id) {
  return mockOrders.find((order) => order.id === id) || null;
}
export async function getOrdersFor(userId) {
  return mockOrders.filter((order) => order.userId === userId);
}
export async function markCancelled(id) {
  const session = await getSignedSession();

  if (!session) {
    throw new Error("Not signed in");
  }

  const order = await getOrder(id);

  if (!order) {
    throw new Error("Order not found");
  }

  if (session.role !== "customer" || order.userId !== session.id) {
    throw new Error("You are not allowed to cancel this order");
  }

  if (order.status === "CANCELLED") {
    throw new Error("Order is already cancelled");
  }

  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();

  return order;
}
