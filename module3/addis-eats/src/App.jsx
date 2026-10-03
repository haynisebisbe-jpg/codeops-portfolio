import { lazy, Suspense, Profiler } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Menu from "./Menu";
import Cart from "./Cart/Cart";
import DishDetail from "./DishDetail";
import Login from "./Login";
import RequireAuth from "./auth/RequireAuth";
import ErrorBoundary from "./ErrorBoundary";

const Checkout = lazy(() => import("./Checkout"));
const Receipt = lazy(() => import("./Receipt"));

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

function LoadingSkeleton() {
  return (
    <div
      className="loading-skeleton"
      role="status"
      aria-live="polite"
    >
      <p>Loading...</p>
    </div>
  );
}

function handleProfile(
  id,
  phase,
  actualDuration,
  baseDuration
) {
  console.log("React Profiler:", {
    id,
    phase,
    actualDuration,
    baseDuration,
  });
}

function App() {
  return (
    <Profiler id="Addis Eats App" onRender={handleProfile}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="menu"
              element={
                <ErrorBoundary
                  fallback={
                    <div>
                      <h2>Menu unavailable</h2>
                      <p>We couldn't load the menu.</p>
                    </div>
                  }
                >
                  <Menu />
                </ErrorBoundary>
              }
            />

            <Route
              path="menu/:id"
              element={<DishDetail />}
            />

            <Route
              path="cart"
              element={
                <ErrorBoundary
                  fallback={
                    <div>
                      <h2>Cart unavailable</h2>
                      <p>We couldn't display your cart.</p>
                    </div>
                  }
                >
                  <Cart />
                </ErrorBoundary>
              }
            />

            <Route path="login" element={<Login />} />

            <Route
              path="checkout"
              element={
                <ErrorBoundary
                  fallback={
                    <div>
                      <h2>Checkout unavailable</h2>
                      <p>We couldn't load checkout.</p>
                    </div>
                  }
                >
                  <Suspense fallback={<LoadingSkeleton />}>
                    <RequireAuth>
                      <Checkout />
                    </RequireAuth>
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route
              path="receipt"
              element={
                <ErrorBoundary
                  fallback={
                    <div>
                      <h2>Receipt unavailable</h2>
                      <p>We couldn't load your receipt.</p>
                    </div>
                  }
                >
                  <Suspense fallback={<LoadingSkeleton />}>
                    <Receipt />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Profiler>
  );
}

export default App;