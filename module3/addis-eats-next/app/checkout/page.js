import { redirect } from "next/navigation";
import { getSession } from "../../lib/db";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="next-page">
      <section className="next-empty-card">
        <p className="next-eyebrow">
          SECURE CHECKOUT
        </p>

        <h1>Checkout</h1>

        <p>
          Complete your order with your delivery information.
        </p>

        <CheckoutForm />
      </section>
    </main>
  );
}