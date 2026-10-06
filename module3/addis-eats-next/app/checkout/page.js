import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="next-page">
      <p className="next-eyebrow">ADDIS EATS</p>

      <h1>Checkout</h1>

      <div className="next-empty-card">
        <div className="next-big-icon">🧾</div>

        <h2>Complete Your Order</h2>

        <p>
          Your checkout information will appear here.
        </p>

        <Link href="/cart" className="next-link">
          ← Back to Cart
        </Link>
      </div>
    </main>
  );
}