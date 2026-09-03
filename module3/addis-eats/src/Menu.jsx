import { useState, useEffect, useRef } from "react";
import { loadDishes } from "./api";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";

function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  // Focus search field on mount (safe check)
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  // Fetch dishes whenever category changes
  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    loadDishes(category, ctrl.signal)
      .then(setDishes)
      .catch(e => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort(); // cleanup
  }, [category]);

  // Early returns for loading/error/empty
  if (loading) return <p>Loading the menu...</p>;
  if (error) return <p className="err">{error}</p>;
  if (dishes.length === 0) return <p>No dishes yet.</p>;

  return (
    <div>
      <input ref={searchRef} placeholder="Search dishes..." />
      <CategoryBar category={category} setCategory={setCategory} />
      <DishList dishes={dishes} />
    </div>
  );
}

export default Menu;
