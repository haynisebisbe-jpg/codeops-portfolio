"use client";

import { useReducer, useMemo } from "react";
import { CartContext } from "./Cart/CartContext";
import { cartReducer } from "./Cart/cartReducer";

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  });

  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
