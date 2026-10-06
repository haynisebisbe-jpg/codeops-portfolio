import Link from "next/link";

export default function CartPage() {
  return (
    <main className="next-page">
      <p className="next-eyebrow">ADDIS EATS</p>

      <h1>Your Cart</h1>

      <div className="next-empty-card">
        <div className="next-big-icon">🛒</div>

        <h2>Your cart is ready</h2>

        <p>
          Add some delicious Ethiopian dishes from our menu.
        </p>

        <Link href="/menu" className="next-button">
          Browse Menu
        </Link>
      </div>
    </main>
  );
}