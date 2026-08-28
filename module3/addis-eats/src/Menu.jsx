import Dish from "./Dish";
import Card from "./Card";
import menuItems from ". /data";

function Menu({ category }) {
  const filtered = menuItems.filter(item => item.category === category);

  if (filtered.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  return (
    <div className="menu-grid">
      {filtered.map(item => (
        <Card key={item.id}>
          <Dish {...item} />
        </Card>
      ))}
    </div>
  );
}

export default Menu;
