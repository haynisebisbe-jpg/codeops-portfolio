
export default function Loading() {
  return (
    <main className="next-page" role="status" aria-live="polite">
      <div className="next-loading">
        <div className="next-spinner" aria-hidden="true">
          🍽️
        </div>

        <h2>Preparing the menu...</h2>

        <p>Our kitchen is getting everything ready.</p>
      </div>
    </main>
  );
}