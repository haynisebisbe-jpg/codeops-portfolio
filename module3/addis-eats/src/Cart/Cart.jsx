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

              <button onClick={() => remove(dish.id)}>
                Remove
              </button>
            </div>
          ))}

          <p>Total: {total} ETB</p>

          <button onClick={clear}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;