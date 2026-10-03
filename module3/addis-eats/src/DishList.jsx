import { Link } from "react-router-dom";
import Dish from "./Dish";

function DishList({ dishes }) {
  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <Link key={dish.id} to={`/menu/${dish.id}`}>
          <Dish {...dish} />
        </Link>
      ))}
    </div>
  );
}

export default DishList;