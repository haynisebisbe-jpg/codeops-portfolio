
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DishGrid({ dishes }) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter(
          (dish) =>
            dish.category.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  if (filteredDishes.length === 0) {
    return (
      <div className="next-empty-card">
        <p>No dishes found in this category.</p>
      </div>
    );
  }

  return (
    <div className="next-menu-grid">
      {filteredDishes.map((dish) => (
        <article className="next-dish-card" key={dish.id}>
          <img src={dish.image} alt={dish.name} />

          <div className="next-dish-body">
            <span className="next-category">{dish.category}</span>
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>

            <div className="next-dish-footer">
              <strong>{dish.price} ETB</strong>

              <Link
                href={`/menu/${dish.id}`}
                className="next-button"
              >
                View Dish
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
