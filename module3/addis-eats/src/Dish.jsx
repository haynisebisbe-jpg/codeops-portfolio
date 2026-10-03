import { useContext } from "react";
import { CartContext } from "./Cart/CartContext";

function Dish({ id, name, price, category, spicy }) {
  const { dispatch } = useContext(CartContext);

  const handleAdd = () => {
    dispatch({
      type: "add",
      dish: {
        id,
        name,
        price,
        category,
        spicy,
      },
    });
  };

  return (
    <div className="dish">
      <h3>
        {name} {spicy && <span className="badge">🌶️</span>}
      </h3>

      <p>{price} ETB</p>

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Dish;