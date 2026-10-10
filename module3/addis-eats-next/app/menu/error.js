
"use client";

export default function Error({
  error,
  reset,
}) {
  return (
    <main className="next-page">
      <div className="next-empty-card">
        <h2>Something went wrong.</h2>

        <p>
          We could not load the menu.
        </p>

        <button
          type="button"
          className="next-button"
          onClick={() => reset()}
        >
          Try Again
        </button>
      </div>
    </main>
  );
}