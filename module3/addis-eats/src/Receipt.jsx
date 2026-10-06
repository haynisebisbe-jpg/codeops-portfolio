import { useLocation, Link } from "react-router-dom";

function Receipt() {
  const location = useLocation();

  const order = location.state;

  if (!order) {
    return (
      <div className="receipt-page">
        <section className="receipt-not-found">
          <div className="receipt-not-found-icon">
            🧾
          </div>

          <p className="receipt-eyebrow">
            ORDER RECEIPT
          </p>

          <h1>No Receipt Found</h1>

          <p>
            Please place an order first to view your
            receipt.
          </p>

          <Link
            to="/menu"
            className="receipt-primary-button"
          >
            Back to Menu
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="receipt-page">

      {/* Success Header */}
      <section className="receipt-header">
        <div className="receipt-success-icon">
          ✓
        </div>

        <p className="receipt-eyebrow">
          ORDER CONFIRMED
        </p>

        <h1>Thank You!</h1>

        <p>
          Your order has been received and our kitchen
          is getting ready to prepare your meal.
        </p>
      </section>

      <div className="receipt-layout">

        {/* Main receipt */}
        <section className="receipt-card">

          <div className="receipt-card-header">
            <div>
              <p className="receipt-section-label">
                ADDIS EATS
              </p>

              <h2>Order Receipt</h2>
            </div>

            <div className="receipt-status">
              Confirmed
            </div>
          </div>

          <div className="receipt-divider" />

          {/* Delivery information */}
          <div className="receipt-section">
            <p className="receipt-section-label">
              DELIVERY INFORMATION
            </p>

            <div className="receipt-info-grid">

              <div className="receipt-info-item">
                <span>Name</span>
                <strong>
                  {order.form.name}
                </strong>
              </div>

              <div className="receipt-info-item">
                <span>TeleBirr Number</span>
                <strong>
                  {order.form.phone}
                </strong>
              </div>

              <div className="receipt-info-item">
                <span>Delivery Area</span>
                <strong>
                  {order.form.area}
                </strong>
              </div>

              {order.form.notes && (
                <div className="receipt-info-item receipt-notes">
                  <span>Notes</span>
                  <strong>
                    {order.form.notes}
                  </strong>
                </div>
              )}

            </div>
          </div>

          <div className="receipt-divider" />

          {/* Order items */}
          <div className="receipt-section">

            <p className="receipt-section-label">
              YOUR ORDER
            </p>

            <div className="receipt-items">

              {order.items.map((item) => (
                <div
                  className="receipt-item"
                  key={item.id}
                >
                  <div className="receipt-item-mark">
                    🍛
                  </div>

                  <div className="receipt-item-info">
                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {item.quantity} ×{" "}
                      {item.price} ETB
                    </span>
                  </div>

                  <strong className="receipt-item-total">
                    {item.price * item.quantity} ETB
                  </strong>
                </div>
              ))}

            </div>
          </div>

          <div className="receipt-divider" />

          {/* Total */}
          <div className="receipt-grand-total">
            <span>Total</span>

            <strong>
              {order.total} ETB
            </strong>
          </div>

        </section>

        {/* Side message */}
        <aside className="receipt-side-card">

          <div className="receipt-side-icon">
            🍽️
          </div>

          <p className="receipt-side-label">
            FROM OUR KITCHEN
          </p>

          <h2>
            Your table is waiting.
          </h2>

          <p>
            Thank you for choosing Addis Eats.
            We hope every bite brings you closer
            to the flavors of home.
          </p>

          <div className="receipt-side-line" />

          <p className="receipt-side-small">
            Your order will be prepared with care
            using authentic Habesha flavors.
          </p>

        </aside>

      </div>

      {/* Bottom actions */}
      <div className="receipt-actions">

        <Link
          to="/menu"
          className="receipt-primary-button"
        >
          Order More Food
        </Link>

        <Link
          to="/"
          className="receipt-secondary-button"
        >
          Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Receipt;