import { Link } from "react-router-dom";
import Dish from "./Dish";

function DishList({ dishes }) {
  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <div key={dish.id}>
          <Link to={`/menu/${dish.id}`}>
            <h3>{dish.name}</h3>
          </Link>

          <Dish {...dish} />
        </div>
      ))}
    </div>
  );
}

export default DishList;