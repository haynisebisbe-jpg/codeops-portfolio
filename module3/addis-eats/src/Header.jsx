import { useContext } from "react";
import { CartContext } from "./Cart/CartContext";

function Header() {
  const { items } = useContext(CartContext);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="header">
      <h1>Addis Eats</h1>

      <p>Order great food across Addis</p>

      <p>🛒 Cart: {cartCount}</p>
    </header>
  );
}

export default Header;