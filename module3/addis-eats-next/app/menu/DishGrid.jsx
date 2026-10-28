"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DishGrid({ dishes }) {
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "All";
  const searchTerm = (searchParams.get("search") || "")
    .trim()
    .toLowerCase();
  const requestedPage = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const pageSize = 6;

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory =
      selectedCategory === "All" ||
      dish.category.toLowerCase() === selectedCategory.toLowerCase();

    const searchableText =
      `${dish.name} ${dish.category} ${dish.description}`.toLowerCase();

    const matchesSearch =
      searchTerm === "" || searchableText.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDishes.length / pageSize)
  );

  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const visibleDishes = filteredDishes.slice(
    startIndex,
    startIndex + pageSize
  );

  function goToPage(nextPage) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextPage > 1) {
      params.set("page", String(nextPage));
    } else {
      params.delete("page");
    }

    const query = params.toString();

    window.history.pushState(
      null,
      "",
      query ? `/menu?${query}` : "/menu"
    );
  }

  return (
    <>
      <div className="next-menu-grid">
        {visibleDishes.length === 0 ? (
          <div className="next-empty-card">
            <p>No dishes found. Try another search or category.</p>
          </div>
        ) : (
          visibleDishes.map((dish) => (
            <article className="next-dish-card" key={dish.id}>
              <Image
                className="next-dish-image"
                src={dish.image}
                alt={dish.name}
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />

              <div className="next-dish-body">
                <span className="next-category">
                  {dish.category}
                </span>

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
          ))
        )}
      </div>

      {filteredDishes.length > pageSize && (
        <div className="next-pagination">
          <button
            type="button"
            onClick={() =>
              goToPage(Math.max(1, currentPage - 1))
            }
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() =>
              goToPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}