
import "server-only";

import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "addis-eats-session";
const SESSION_DURATION = 7 * 24 * 60 * 60;

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET must be at least 32 characters long."
    );
  }

  return secret;
}

function sign(value) {
  return createHmac("sha256", getSecret())
    .update(value)
    .digest("base64url");
}

function createToken(user) {
  const payload = {
    id: user.id,
    role: user.role,
    expiresAt: Date.now() + SESSION_DURATION * 1000,
  };

  const encoded = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );

  return `${encoded}.${sign(encoded)}`;
}

function verifyToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encoded, signature] = parts;
    const expected = sign(encoded);

    const actualBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);

    if (
      actualBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(actualBuffer, expectedBuffer)
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    );

    if (
      !payload.id ||
      !["customer", "staff"].includes(payload.role) ||
      !payload.expiresAt ||
      payload.expiresAt < Date.now()
    ) {
      return null;
    }

    return {
      id: payload.id,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function createSession(user) {
  const cookieStore = await cookies();
  const token = createToken(user);

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  return verifyToken(token);
}

export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}
