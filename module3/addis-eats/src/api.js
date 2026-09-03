export async function loadDishes(category, signal) {
  const url =
    category === "All"
      ? "/dishes.json"
      : `/dishes.json?category=${category}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Could not load the menu");
  return res.json();
}
