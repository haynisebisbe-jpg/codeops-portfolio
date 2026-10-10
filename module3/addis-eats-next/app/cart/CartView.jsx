"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function CartView() {
  const { items, total, dispatch } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <div className="next-empty-card">
        <div className="next-big-icon">🛒</div>

        <h2>Your cart is empty</h2>

        <p>
          Add some delicious Ethiopian dishes from our menu.
        </p>

        <Link href="/menu" className="next-button">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="next-empty-card">
          <h2>{item.name}</h2>

          <p>
            Price: {item.price} ETB
          </p>

          <p>
            Quantity: {item.quantity}
          </p>

          <p>
            Subtotal: {item.price * item.quantity} ETB
          </p>

          <button
            type="button"
            className="next-button"
            onClick={() =>
              dispatch({
                type: "remove",
                id: item.id,
              })
            }
          >
            Remove
          </button>
        </div>
      ))}

      <div className="next-empty-card">
        <h2>Total: {total} ETB</h2>

        <div>
          <button
            type="button"
            className="next-button"
            onClick={() => dispatch({ type: "clear" })}
          >
            Clear Cart
          </button>

          {" "}

          <Link href="/checkout" className="next-button">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}