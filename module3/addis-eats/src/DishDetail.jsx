import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadDishes } from "./api";
import { useCartStore } from "./Cart/cartStore";

function DishDetail() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchDish() {
      try {
        const dishes = await loadDishes("All");

        const foundDish = dishes.find(
          (dish) => String(dish.id) === id
        );

        setDish(foundDish);
      } catch (err) {
        setError("Could not load dish.");
      } finally {
        setLoading(false);
      }
    }

    fetchDish();
  }, [id]);

  function handleAdd() {
    addItem({
      id: dish.id,
      name: dish.nameEn,
      price: dish.priceETB,
      category: dish.category,
      spiceLevel: dish.spiceLevel,
    });
  }

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!dish) {
    return <p>Dish not found.</p>;
  }

  return (
    <div>
      <h2>{dish.nameEn}</h2>

      <p>Price: {dish.priceETB} ETB</p>

      <p>Category: {dish.category}</p>

      <p>Spice Level: {dish.spiceLevel}</p>

      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}

export default DishDetail;