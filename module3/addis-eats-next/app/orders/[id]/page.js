
import { notFound } from "next/navigation";
import { getOrder } from "../../../lib/db";
import OrderStatus from "../OrderStatus";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <main className="next-page">
      <section className="next-empty-card">
        <p className="next-eyebrow">ADDIS EATS</p>
        <h1>Track Your Order</h1>
        <p>Your order is loaded on the server first.</p>

        <OrderStatus id={id} initial={order} />
      </section>
    </main>
  );
}
