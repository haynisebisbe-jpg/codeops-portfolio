
import { redirect } from "next/navigation";
import { getSession, getAllOrdersForStaff } from "../../lib/db";
import AnalyticsDashboard from "./AnalyticsDashboard";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Fanalytics");
  }

  if (session.role !== "staff") {
    return (
      <main className="next-page">
        <h1>Access denied</h1>
        <p>This dashboard is available to staff only.</p>
      </main>
    );
  }

  const orders = await getAllOrdersForStaff();

  return (
    <main className="next-page">
      <AnalyticsDashboard initialOrders={orders} />
    </main>
  );
}
