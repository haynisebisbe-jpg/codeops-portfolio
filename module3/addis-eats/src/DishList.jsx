import { Profiler } from "react";
import { Link } from "react-router-dom";
import Dish from "./Dish";

function handleProfile(
  id,
  phase,
  actualDuration,
  baseDuration
) {
  console.log("DISH LIST PROFILER:", {
    component: id,
    phase,
    actualDuration,
    baseDuration,
  });
}

function DishList({ dishes }) {
  return (
    <Profiler id="DishList" onRender={handleProfile}>
      <div className="dish-list">
        {dishes.map((dish) => (
          <div key={dish.id}>
            <Link to={`/menu/${dish.id}`}>
              <h3>{dish.nameEn}</h3>
            </Link>

            <Dish {...dish} />
          </div>
        ))}
      </div>
    </Profiler>
  );
}

export default DishList;