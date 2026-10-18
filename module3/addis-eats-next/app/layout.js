
import { Inter } from "next/font/google";
import Link from "next/link";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://addiseats.et"),
  title: {
    template: "%s | Addis Eats",
    default: "Addis Eats — Ethiopian Food Delivery in Addis Ababa",
  },
  description:
    "Order Doro Wat, Tibs, Kitfo, and Shiro from Addis Eats. Enjoy authentic Ethiopian food delivered across Addis Ababa.",
  openGraph: {
    title: "Addis Eats — Ethiopian Food Delivery in Addis Ababa",
    description:
      "Discover authentic Ethiopian dishes, from Doro Wat to Kitfo, delivered across Addis Ababa.",
    url: "https://addiseats.et",
    siteName: "Addis Eats",
    locale: "en_ET",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
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

        <Providers>{children}</Providers>

        <footer className="next-footer">
          <p>© 2026 Addis Eats. Authentic Ethiopian Flavors.</p>
        </footer>
      </body>
    </html>
  );
}
