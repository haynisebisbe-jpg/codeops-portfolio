import Link from "next/link";

export default function NotFound() {
  return (
    <main className="next-page">
      <div className="next-empty-card">
        <h1>Dish Not Found</h1>

        <p>
          Sorry, we could not find that dish.
        </p>

        <Link
          href="/menu"
          className="next-button"
        >
          Back to Menu
        </Link>
      </div>
    </main>
  );
}