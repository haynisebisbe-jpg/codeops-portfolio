import { useState, useEffect, useRef, useMemo } from "react";
import { useFetch } from "./hooks/useFetch";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";

function Menu() {
  const [category, setCategory] = useState("All");
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
      dish.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [dishes, search]);

  // Loading
  if (loading) return <p>Loading the menu...</p>;

  // Error
  if (error) return <p className="err">{error}</p>;

  // Empty menu
  if (dishes.length === 0) {
    return <p>No dishes yet.</p>;
  }

  return (
    <div>
      <input
        ref={searchRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search dishes..."
      />

      <CategoryBar
        category={category}
        setCategory={setCategory}
      />

      <DishList dishes={filteredDishes} />
    </div>
  );
}

export default Menu;