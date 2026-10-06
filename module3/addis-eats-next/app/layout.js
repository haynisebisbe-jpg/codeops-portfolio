import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Authentic Ethiopian food, delivered with love.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="next-header">
          <Link href="/" className="next-logo">
            Addis Eats
          </Link>

          <nav className="next-nav">
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>

        {children}

        <footer className="next-footer">
          <p>© 2026 Addis Eats. Authentic Ethiopian Flavors.</p>
        </footer>
      </body>
    </html>
  );
}