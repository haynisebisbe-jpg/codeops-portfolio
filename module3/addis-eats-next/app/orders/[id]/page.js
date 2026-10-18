
import { notFound, redirect } from "next/navigation";
import { getOrder, getSession } from "../../../lib/db";
import OrderStatus from "../OrderStatus";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }) {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Forders");
  }

  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  if (session.role !== "staff" && order.userId !== session.id) {
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
