import Header from "./Header";
import Menu from "./Menu";
import Cart from "./Cart/Cart";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />

      <Menu />

      <Cart />
    </div>
  );
}

export default App;