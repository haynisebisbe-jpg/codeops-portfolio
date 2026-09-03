import { useState } from "react";

function Dish({ id, name, price, category, spicy }) {
  const [count, setCount] = useState(0);

  return (
    <div className="dish">
      <h3>
        {name} {spicy && <span className="badge">🌶️</span>}
      </h3>
      <p>{price} ETB</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
      {count > 0 && <p>Added: {count}</p>}
    </div>
  );
}

export default Dish;
