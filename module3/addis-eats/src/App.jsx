import Header from "./Header";
import Dish from "./Dish";
import Footer from "./Footer";

const menuItems = [
  { id: 1, name: "Doro Wat", price: 240 },
  { id: 2, name: "Shiro", price: 120 },
  { id: 3, name: "Tibs", price: 280 },
  { id: 4, name: "Beyaynetu", price: 180 },
];

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="menu-container">
        <h2>Menu</h2>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <Dish 
              key={item.id} 
              name={item.name} 
              price={item.price} 
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;