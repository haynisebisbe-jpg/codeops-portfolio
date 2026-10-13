
"use client";

import Link from "next/link";
import { useActionState, useContext } from "react";
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

  if (state.success) {
    return (
      <div className="checkout-placeholder">
        <h2>Order placed successfully! 🎉</h2>

        <p>
          Your order ID: <strong>{state.orderId}</strong>
        </p>

        <p>Your order is currently pending.</p>

        <p>
          Order total: <strong>{state.total ?? total} ETB</strong>
        </p>

        <Link href="/menu" className="next-button">
          Back to Menu
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="next-empty-card">
        <h2>Your cart is empty</h2>
        <p>Add dishes to your cart before checkout.</p>

        <Link href="/menu" className="next-button">
          Browse Menu
        </Link>
      </div>
    );
  }

  const submittedItems = items.map((item) => ({
    dishId: item.id,
    quantity: item.quantity,
  }));

  return (
    <form action={formAction} className="checkout-form">
      {state.error && (
        <p role="alert">{state.error}</p>
      )}

      <input
        type="hidden"
        name="items"
        value={JSON.stringify(submittedItems)}
      />

      <h2>Your Order</h2>

      {items.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} × {item.quantity}
          </p>
          <p>
            Subtotal: {item.price * item.quantity} ETB
          </p>
        </div>
      ))}

      <div>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          minLength={2}
          required
        />

        {state.fieldErrors?.name && (
          <p role="alert">
            {state.fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone">Phone Number</label>
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
        <label htmlFor="area">Delivery Area</label>
        <select id="area" name="area">
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
          rows={4}
          maxLength={200}
        />

        {state.fieldErrors?.notes && (
          <p role="alert">
            {state.fieldErrors.notes[0]}
          </p>
        )}
      </div>

      {state.fieldErrors?.items && (
        <p role="alert">
          {state.fieldErrors.items[0]}
        </p>
      )}

      <h3>Cart Total: {total} ETB</h3>

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
  );
}
