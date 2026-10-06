import Link from "next/link";

export default function NotFound() {
  return (
    <main className="next-page">
      <div className="next-error">
        <div className="next-big-icon">🍽️</div>

        <h1>Page Not Found</h1>

        <p>
          Sorry, we couldn't find the page you're looking for.
        </p>

        <Link href="/" className="next-button">
          Go Home
        </Link>
      </div>
    </main>
  );
}