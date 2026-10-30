
import { notFound, redirect } from "next/navigation";
import { getOrder, getSession } from "../../../lib/db";
import TrackingClient from "./TrackingClient";

export const dynamic = "force-dynamic";

export default async function TrackOrderPage({ params }) {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Forders");
  }

  const { id } = await params;
  const order = await getOrder(id);

  if (!order || (session.role !== "staff" && order.userId !== session.id)) {
    notFound();
  }

  return <TrackingClient order={order} />;
}
