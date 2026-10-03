import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DishDetail() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/dishes.json")
      .then((res) => res.json())
      .then((dishes) => {
        const foundDish = dishes.find(
          (dish) => String(dish.id) === id
        );

        setDish(foundDish);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (!dish) {
    return <p>Dish not found.</p>;
  }

  return (
    <div>
      <h2>{dish.name}</h2>
      <p>Price: {dish.price} ETB</p>
      <p>Category: {dish.category}</p>

      {dish.spicy && <p>🌶️ Spicy</p>}
    </div>
  );
}

export default DishDetail;