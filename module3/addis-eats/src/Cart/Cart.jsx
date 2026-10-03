import { useContext } from "react";
import { CartContext } from "./CartContext";

function Cart() {
const { items, dispatch, total } = useContext(CartContext);

  return (
    <div className="cart">
      <h2>Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((dish) => (
            <div key={dish.id}>
              <p>
                {dish.name} - {dish.price} ETB
              </p>

              <p>Quantity: {dish.quantity}</p>

              <button
                onClick={() =>
                  dispatch({
                    type: "remove",
                    id: dish.id,
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}
          <p>Total: {total} ETB</p>

          <button onClick={() => dispatch({ type: "clear" })}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;