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

  // Focus search field after loading
  useEffect(() => {
    if (!loading && searchRef.current) {
      searchRef.current.focus();
    }
  }, [loading]);

  // Filter dishes with useMemo
  const filteredDishes = useMemo(() => {
    if (!dishes) return [];

    return dishes.filter((dish) =>
      dish.nameEn.toLowerCase().includes(search.toLowerCase())
    );
  }, [dishes, search]);

  // Loading
  if (loading) return <p>Loading the menu...</p>;

  // Error
  if (error) return <p className="err">{error}</p>;

  // Empty menu
  if (!dishes || dishes.length === 0) {
    return <p>No dishes yet.</p>;
  }

  return (
    <div>
      <input
        className="menu-search"
        ref={searchRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search dishes..."
      />

      <CategoryBar
        category={category}
        setCategory={choose}
      />

      {filteredDishes.length === 0 ? (
        <p>No dishes match your search.</p>
      ) : (
        <DishList dishes={filteredDishes} />
      )}
    </div>
  );
}

export default Menu;