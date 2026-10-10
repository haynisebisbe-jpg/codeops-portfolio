"use client";

import { useContext } from "react";
import { CartContext } from "../../cart/CartContext";

export default function AddToCartButton({ dish }) {
  const { dispatch } = useContext(CartContext);

  function handleAdd() {
    dispatch({
      type: "add",
      dish,
    });
  }

  return (
    <button
      type="button"
      className="next-button"
      onClick={handleAdd}
    >
      Add to Order
    </button>
  );
}