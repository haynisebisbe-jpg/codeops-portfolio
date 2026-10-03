import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Menu from "./Menu";
import Cart from "./Cart/Cart";
import DishDetail from "./DishDetail";
import Login from "./Login";
import Checkout from "./Checkout";
import RequireAuth from "./auth/RequireAuth";

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menu/:id" element={<DishDetail />} />
          <Route path="cart" element={<Cart />} />

          <Route path="login" element={<Login />} />

          <Route
            path="checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
          }
        />

<Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;