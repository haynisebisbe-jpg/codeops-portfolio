import { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";

function Menu() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "All";

  function choose(cat) {
    setParams({ category: cat });
  }

  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  const { data: dishes, loading, error } = useFetch(category);

  useEffect(() => {
    if (!loading && searchRef.current) {
      searchRef.current.focus();
    }
  }, [loading]);

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];

    return dishes.filter((dish) =>
      dish.nameEn.toLowerCase().includes(search.toLowerCase())
    );
  }, [dishes, search]);

  if (loading) {
    return (
      <section className="menu-state">
        <div className="menu-state-icon">🍽️</div>
        <h2>Preparing the menu</h2>
        <p>Our kitchen is getting everything ready...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="menu-state menu-error">
        <div className="menu-state-icon">⚠️</div>
        <h2>We couldn't load the menu</h2>
        <p>{error}</p>
      </section>
    );
  }

  if (!dishes || dishes.length === 0) {
    return (
      <section className="menu-state">
        <div className="menu-state-icon">🍛</div>
        <h2>No dishes yet</h2>
        <p>Please check back soon.</p>
      </section>
    );
  }

  return (
    <div className="menu-page">

      {/* Menu introduction */}
      <section className="menu-intro">
        <p className="menu-eyebrow">
          FROM OUR KITCHEN
        </p>

        <h1>Our Menu</h1>

        <p className="menu-intro-text">
          Discover traditional Ethiopian flavors, lovingly prepared
          with authentic spices and ingredients.
        </p>
      </section>

      {/* Search */}
      <div className="menu-search-wrapper">
        <span className="search-icon">⌕</span>

        <input
          className="menu-search"
          ref={searchRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search dishes..."
          aria-label="Search dishes"
        />
      </div>

      {/* Categories */}
      <CategoryBar
        category={category}
        setCategory={choose}
      />

      {/* Results */}
      <div className="menu-results-header">
        <div>
          <p className="menu-results-label">
            {category === "All" ? "ALL DISHES" : category}
          </p>

          <h2>
            {search
              ? `Results for "${search}"`
              : category === "All"
              ? "Taste of Habesha"
              : category}
          </h2>
        </div>

        <span className="dish-count">
          {filteredDishes.length}{" "}
          {filteredDishes.length === 1 ? "dish" : "dishes"}
        </span>
      </div>

      {filteredDishes.length === 0 ? (
        <div className="empty-search">
          <div>🍽️</div>
          <h3>No dishes found</h3>
          <p>Try another dish name or category.</p>
        </div>
      ) : (
        <DishList dishes={filteredDishes} />
      )}
    </div>
  );
}

export default Menu;