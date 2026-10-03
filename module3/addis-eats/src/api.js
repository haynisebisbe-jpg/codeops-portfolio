const API_URL = "https://addis-eats-backend.onrender.com/menu/";

export async function loadDishes(category, signal) {
  const res = await fetch(API_URL, { signal });

  if (!res.ok) {
    throw new Error("Could not load the menu");
  }

  const result = await res.json();

  const dishes = result.data;

  if (category === "All") {
    return dishes;
  }

  return dishes.filter(
    (dish) =>
      dish.category.toLowerCase() === category.toLowerCase()
  );
}