import { useCartStore } from "./Cart/cartStore";

function Checkout() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleOrder() {
    alert("Order placed successfully!");
    clear();
  }

  return (
    <div>
      <h2>Checkout</h2>

      <p>Total: {total} ETB</p>

      <button onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;