"use client";

export default function Error({ reset }) {
  return (
    <main className="next-page">
      <div className="next-error">
        <div className="next-big-icon">⚠️</div>

        <h1>We couldn't load the menu</h1>

        <p>
          Something went wrong while loading the menu.
        </p>

        <button
          onClick={() => reset()}
          className="next-button"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}