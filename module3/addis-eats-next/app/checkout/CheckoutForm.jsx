"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useContext } from "react";
import { placeOrder } from "../actions";
import { CartContext } from "../cart/CartContext";

const initialState = {
  success: false,
  error: null,
  fieldErrors: {},
};

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(
    placeOrder,
    initialState
  );

  const { items, total } = useContext(CartContext);

  const firstItem = items[0];

  if (state.success) {
    return (
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
    );
  }

  return (
    <form action={formAction} className="checkout-form">
      {state.error && (
        <p role="alert">
          {state.error}
        </p>
      )}

      <input
        type="hidden"
        name="dishId"
        value={firstItem?.id || ""}
      />

      <input
        type="hidden"
        name="quantity"
        value={firstItem?.quantity || 1}
      />

      <div>
        <label htmlFor="name">
          Full Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
        />

        {state.fieldErrors?.name && (
          <p role="alert">
            {state.fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone">
          Phone Number
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="0912345678"
          required
        />

        {state.fieldErrors?.phone && (
          <p role="alert">
            {state.fieldErrors.phone[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="area">
          Delivery Area
        </label>

        <select id="area" name="area">
          <option value="Bole">Bole</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Megenagna">Megenagna</option>
          <option value="Piassa">Piassa</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes">
          Notes
        </label>

        <textarea
          id="notes"
          name="notes"
          rows="4"
        />

        {state.fieldErrors?.notes && (
          <p role="alert">
            {state.fieldErrors.notes[0]}
          </p>
        )}
      </div>

      <div>
        <h3>
          Cart Total: {total} ETB
        </h3>
      </div>

      {state.fieldErrors?.quantity && (
        <p role="alert">
          {state.fieldErrors.quantity[0]}
        </p>
      )}

      <button
        type="submit"
        className="next-button"
        disabled={pending}
      >
        {pending
          ? "Placing Order..."
          : "Place Order"}
      </button>

      <Link
        href="/cart"
        className="next-button"
      >
        Back to Cart
      </Link>
    </form>
  );
}