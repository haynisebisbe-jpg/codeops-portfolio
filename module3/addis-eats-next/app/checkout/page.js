import Link from "next/link";

export const dynamic = "force-dynamic";

// Checkout is dynamic because checkout information
// should be rendered fresh for the current customer.

export default function CheckoutPage() {
  return (
    <main className="next-page">
      <section className="next-empty-card">
        <p className="next-eyebrow">SECURE CHECKOUT</p>

        <h1>Checkout</h1>

        <p>
          Complete your order with your delivery information.
        </p>

        <div className="checkout-placeholder">
          <p>Checkout is ready for fresh customer data.</p>

          <Link href="/cart" className="next-button">
            Back to Cart
          </Link>
        </div>
      </section>
    </main>
  );
}