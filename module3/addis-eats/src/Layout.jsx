import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <>
      <Header />

      <nav>
        <Link to="/">Home</Link>{" "}
        <NavLink to="/menu">Menu</NavLink>{" "}
        <NavLink to="/cart">Cart</NavLink>{" "}
        <NavLink to="/checkout">Checkout</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 Addis Eats</p>
      </footer>
    </>
  );
}

export default Layout;