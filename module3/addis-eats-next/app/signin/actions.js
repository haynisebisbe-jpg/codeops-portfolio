
"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "../../lib/session";

function safeDestination(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/";
  }

  try {
    const url = new URL(value, "http://addis-eats.local");

    if (url.origin !== "http://addis-eats.local") {
      return "/";
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

export async function signIn(formData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const next = safeDestination(formData.get("next") || "/");

  let user;

  if (
    username === process.env.DEMO_LOGIN &&
    password === process.env.DEMO_PASSWORD
  ) {
    user = { id: "user_addis_101", role: "customer" };
  } else if (
    process.env.DEMO_STAFF_LOGIN &&
    process.env.DEMO_STAFF_PASSWORD &&
    username === process.env.DEMO_STAFF_LOGIN &&
    password === process.env.DEMO_STAFF_PASSWORD
  ) {
    user = { id: "staff_addis_101", role: "staff" };
  } else {
    redirect(
      `/signin?error=invalid&next=${encodeURIComponent(next)}`
    );
  }

  await createSession(user);
  redirect(next);
}

export async function signOut() {
  await destroySession();
  redirect("/signin");
}
