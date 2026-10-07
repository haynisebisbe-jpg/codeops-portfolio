"use client";

import Link from "next/link";
import { useActionState } from "react";
import { placeOrder } from "../actions";

const initialState = {
  success: false,
  error: null,
  fieldErrors: {},
};

export default function CheckoutPage() {
  const [state, formAction, pending] = useActionState(
    placeOrder,
    initialState
  );

  return (
    <main className="next-page">
      <section className="next-empty-card">
        <p className="next-eyebrow">SECURE CHECKOUT</p>

        <h1>Checkout</h1>

        <p>
          Complete your order with your delivery information.
        </p>

        {state.success ? (
          <div className="checkout-placeholder">
            <h2>Order placed successfully! 🎉</h2>

            <p>
              Your order ID is:
              <strong> {state.orderId}</strong>
            </p>

            <p>Your order is currently pending.</p>

            <Link href="/menu" className="next-button">
              Back to Menu
            </Link>
          </div>
        ) : (
          <form action={formAction} className="checkout-form">
            <div>
              <label htmlFor="name">Name</label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
              />

              {state.fieldErrors?.name && (
                <p className="form-error">
                  {state.fieldErrors.name[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone">Phone</label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="0912345678"
                required
              />

              {state.fieldErrors?.phone && (
                <p className="form-error">
                  {state.fieldErrors.phone[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="area">Delivery Area</label>

              <select
                id="area"
                name="area"
                defaultValue="Bole"
                required
              >
                <option value="Bole">Bole</option>
                <option value="Kazanchis">Kazanchis</option>
                <option value="Megenagna">Megenagna</option>
                <option value="Piassa">Piassa</option>
              </select>
            </div>

            <div>
              <label htmlFor="notes">Notes</label>

              <textarea
                id="notes"
                name="notes"
                placeholder="Any delivery instructions?"
                rows="4"
              />

              {state.fieldErrors?.notes && (
                <p className="form-error">
                  {state.fieldErrors.notes[0]}
                </p>
              )}
            </div>

            {state.error && (
              <p className="form-error">{state.error}</p>
            )}

            <button
              type="submit"
              className="next-button"
              disabled={pending}
            >
              {pending ? "Placing Order..." : "Place Order"}
            </button>

            <Link href="/cart" className="next-button">
              Back to Cart
            </Link>
          </form>
        )}
      </section>
    </main>
  );
}