import { Profiler } from "react";
import { useCartStore } from "./Cart/cartStore";

function handleProfile(
  id,
  phase,
  actualDuration,
  baseDuration
) {
  console.log("CART BADGE PROFILER:", {
    component: id,
    phase,
    actualDuration,
    baseDuration,
  });
}

function CartBadge() {
  const itemCount = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  return (
    <Profiler id="CartBadge" onRender={handleProfile}>
      <span>🛒 Cart: {itemCount}</span>
    </Profiler>
  );
}

export default CartBadge;