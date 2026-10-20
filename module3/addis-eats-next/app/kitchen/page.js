
import { redirect } from "next/navigation";
import { getSession, getAllOrdersForStaff } from "../../lib/db";
import KitchenDashboard from "./KitchenDashboard";

export const dynamic = "force-dynamic";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Fkitchen");
  }

  if (session.role !== "staff") {
    return (
      <main className="next-page">
        <section className="next-empty-card">
          <h1>Access denied</h1>
          <p>This page is only available to kitchen staff.</p>
        </section>
      </main>
    );
  }

  const orders = await getAllOrdersForStaff();

  return (
    <main className="next-page">
      <section className="next-empty-card">
        <KitchenDashboard initialOrders={orders} />
      </section>
    </main>
  );
}
