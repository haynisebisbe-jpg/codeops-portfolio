
import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";

export const dynamic = "force-dynamic";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Fkitchen");
  }

  if (session.role !== "staff") {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Access denied</h1>
        <p>This page is only available to kitchen staff.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Kitchen Dashboard</h1>
      <p>Welcome, kitchen staff!</p>
      <p>You are signed in with staff access.</p>
    </main>
  );
}
