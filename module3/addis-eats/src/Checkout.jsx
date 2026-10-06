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
    <div className="checkout-page">

      {/* Header */}
      <section className="checkout-header">
        <p className="checkout-eyebrow">
          ALMOST THERE
        </p>

        <h1>Complete Your Order</h1>

        <p>
          Tell us where to deliver your favorite Habesha dishes.
        </p>
      </section>

      <div className="checkout-layout">

        {/* Order form */}
        <section className="checkout-form-card">
          <div className="checkout-section-heading">
            <p>DELIVERY DETAILS</p>
            <h2>Where should we deliver?</h2>
          </div>

          <OrderForm
            total={total}
            onPlaceOrder={handleOrder}
          />
        </section>

        {/* Order summary */}
        <aside className="checkout-summary">

          <p className="checkout-summary-label">
            YOUR ORDER
          </p>

          <h2>Order Summary</h2>

          <div className="checkout-items">
            {items.length === 0 ? (
              <p className="checkout-empty">
                No items in your cart.
              </p>
            ) : (
              items.map((item) => (
                <div
                  className="checkout-item"
                  key={item.id}
                >
                  <div>
                    <strong>{item.name}</strong>

                    <span>
                      {item.quantity} × {item.price} ETB
                    </span>
                  </div>

                  <strong>
                    {item.price * item.quantity} ETB
                  </strong>
                </div>
              ))
            )}
          </div>

          <div className="checkout-divider" />

          <div className="checkout-total">
            <span>Total</span>
            <strong>{total} ETB</strong>
          </div>

          <p className="checkout-note">
            Your order will be prepared with care using
            authentic Habesha flavors.
          </p>

        </aside>
      </div>
    </div>
  );
}

export default Checkout;