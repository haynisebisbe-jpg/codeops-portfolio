import Header from "./Header";
import Dish from "./Dish";
import Footer from "./Footer";

const menuItems = [
  { id: 1, name: "Doro Wat", price: 240, spicy: true, category: "main" },
  { id: 2, name: "Shiro", price: 120, spicy: false, category: "main" },
  { id: 3, name: "Tibs", price: 280, spicy: true, category: "main" },
  { id: 4, name: "Beyaynetu", price: 180, spicy: false, category: "vegetarian" },
];

function App() {
  const category = "main"; 
  const filtered = menuItems.filter(item => item.category === category);

  return (
    <div className="app-container">
      <Header />
      <main className="menu-container">
        <h2>Menu</h2>
        <div className="menu-grid">
          {filtered.length === 0 ? (
            <p>No dishes found in this category.</p>
          ) : (
            filtered.map(item => (
              <Dish
                key={item.id}          
                name={item.name}
                price={item.price}
                spicy={item.spicy}
                currency="ETB"
              />
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
