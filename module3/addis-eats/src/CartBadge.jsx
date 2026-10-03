import { useCartStore } from "./Cart/cartStore";

function CartBadge() {
  const itemCount = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  return <span>🛒 Cart: {itemCount}</span>;
}

export default CartBadge;