import { useNavigate } from "react-router-dom";
import { useCartStore } from "./Cart/cartStore";
import OrderForm from "./OrderForm";

function Checkout() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function handleOrder(form) {
    console.log("Order information:", form);

    navigate("/receipt", {
      state: {
        form,
        items,
        total,
      },
    });

    clear();
  }

  return (
    <div>
      <h2>Checkout</h2>

      <p>Total: {total} ETB</p>

      <OrderForm
        total={total}
        onPlaceOrder={handleOrder}
      />
    </div>
  );
}

export default Checkout;