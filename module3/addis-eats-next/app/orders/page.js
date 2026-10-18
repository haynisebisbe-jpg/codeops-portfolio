
import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrdersFor, getSession } from "../../lib/db";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Forders");
  }

  const orders = await getOrdersFor(session.id);

  return (
    <main className="next-page">
      <section className="next-empty-card">
        <p className="next-eyebrow">ADDIS EATS</p>
        <h1>My Orders</h1>
        <p>View and track your orders.</p>

        {orders.length === 0 ? (
          <div>
            <p>You haven't placed any orders yet.</p>
            <Link href="/menu">Browse Menu</Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="rounded border p-4"
              >
                <p className="font-semibold">
                  Order {order.id}
                </p>
                <p>Status: {order.status}</p>
                <p>Total: {order.total} ETB</p>
                <Link
                  href={`/orders/${encodeURIComponent(order.id)}`}
                  className="underline"
                >
                  Track order
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
