import { useReducer, useMemo } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "./cartReducer";

export function CartProvider({ children }) {
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