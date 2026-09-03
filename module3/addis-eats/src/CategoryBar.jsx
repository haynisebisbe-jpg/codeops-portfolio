const categories = ["All", "Vegan", "Grill"];

function CategoryBar({ category, setCategory }) {
  return (
    <div className="category-bar">
      {categories.map(c => (
        <button
          key={c}
          className={c === category ? "active" : ""}
          onClick={() => setCategory(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
