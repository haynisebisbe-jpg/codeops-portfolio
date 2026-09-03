import Dish from "./Dish";

function DishList({ dishes }) {
  return (
    <div className="dish-list">
      {dishes.map(d => (
        <Dish key={d.id} {...d} />
      ))}
    </div>
  );
}

export default DishList;
