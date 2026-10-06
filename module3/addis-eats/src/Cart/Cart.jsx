import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      {/* Cart header */}
      <section className="cart-header">
        <p className="cart-eyebrow">YOUR SELECTION</p>

        <h1>Your Cart</h1>

        <p>
          Review your dishes before continuing to checkout.
        </p>
      </section>

      {items.length === 0 ? (
        /* Empty cart */
        <section className="cart-empty">
          <div className="cart-empty-icon">🧺</div>

          <h2>Your cart is empty</h2>

          <p>
            Your table is waiting. Explore our menu and
            discover something delicious.
          </p>

          <Link
            to="/menu"
            className="cart-primary-button"
          >
            Explore the Menu
          </Link>
        </section>
      ) : (
        <div className="cart-layout">

          {/* Cart items */}
          <section className="cart-items-section">

            <div className="cart-section-heading">
              <div>
                <p className="cart-section-label">
                  YOUR ORDER
                </p>

                <h2>
                  {items.length}{" "}
                  {items.length === 1 ? "item" : "items"}
                </h2>
              </div>
            </div>

            <div className="cart-items">
              {items.map((dish) => (
                <article
                  className="cart-item"
                  key={dish.id}
                >
                  <div className="cart-item-mark">
                    🍛
                  </div>

                  <div className="cart-item-info">
                    <h3>{dish.name}</h3>

                    <p className="cart-item-category">
                      {dish.category}
                    </p>

                    <p className="cart-item-price">
                      {dish.price} ETB
                    </p>
                  </div>

                  <div className="cart-item-right">
                    <div className="cart-quantity">
                      × {dish.quantity}
                    </div>

                    <p className="cart-item-subtotal">
                      {dish.price * dish.quantity} ETB
                    </p>

                    <button
                      type="button"
                      className="cart-remove-button"
                      onClick={() => remove(dish.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="cart-clear-button"
              onClick={clear}
            >
              Clear Cart
            </button>
          </section>

          {/* Order summary */}
          <aside className="cart-summary">

            <p className="cart-summary-label">
              ORDER SUMMARY
            </p>

            <h2>Ready to order?</h2>

            <div className="cart-summary-line">
              <span>Items</span>
              <span>{items.length}</span>
            </div>

            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span>{total} ETB</span>
            </div>

            <div className="cart-summary-divider" />

            <div className="cart-total">
              <span>Total</span>
              <strong>{total} ETB</strong>
            </div>

            <Link
              to="/checkout"
              className="cart-checkout-button"
            >
              Continue to Checkout
            </Link>

            <Link
              to="/menu"
              className="cart-continue-button"
            >
              ← Continue Shopping
            </Link>

          </aside>
        </div>
      )}
    </div>
  );
}

export default Cart;