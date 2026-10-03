import { useLocation, Link } from "react-router-dom";

function Receipt() {
  const location = useLocation();

  const order = location.state;

  if (!order) {
    return (
      <div>
        <h2>No Receipt Found</h2>

        <p>
          Please place an order first.
        </p>

        <Link to="/menu">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Order Receipt</h2>

      <h3>Delivery Information</h3>

      <p>
        <strong>Name:</strong> {order.form.name}
      </p>

      <p>
        <strong>TeleBirr Number:</strong> {order.form.phone}
      </p>

      <p>
        <strong>Delivery Area:</strong> {order.form.area}
      </p>

      {order.form.notes && (
        <p>
          <strong>Notes:</strong> {order.form.notes}
        </p>
      )}

      <h3>Order</h3>

      {order.items.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} × {item.quantity} —{" "}
            {item.price * item.quantity} ETB
          </p>
        </div>
      ))}

      <h3>Total: {order.total} ETB</h3>

      <Link to="/menu">
        Back to Menu
      </Link>
    </div>
  );
}

export default Receipt;