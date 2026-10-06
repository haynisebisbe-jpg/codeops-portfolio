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
          <article className="dish-card" key={dish.id}>

            {dish.isSpecial && (
              <span className="dish-special">
                Chef's Special
              </span>
            )}

            <Link
              className="dish-name-link"
              to={`/menu/${dish.id}`}
            >
              <h3>{dish.nameEn}</h3>

              {dish.nameAm && (
                <p className="dish-name-am">
                  {dish.nameAm}
                </p>
              )}
            </Link>

            <Dish {...dish} />

          </article>
        ))}
      </div>
    </Profiler>
  );
}

export default DishList;