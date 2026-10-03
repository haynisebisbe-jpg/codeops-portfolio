import { useCartStore } from "./Cart/cartStore";

function Dish({
  id,
  nameEn,
  priceETB,
  category,
  spiceLevel,
}) {
  const addItem = useCartStore((state) => state.addItem);

  function handleAdd() {
    addItem({
      id,
      name: nameEn,
      price: priceETB,
      category,
      spiceLevel,
    });
  }

  return (
    <div className="dish">
      <h3>{nameEn}</h3>

      <p>{priceETB} ETB</p>

      <p>{category}</p>

      <p>{spiceLevel}</p>

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Dish;