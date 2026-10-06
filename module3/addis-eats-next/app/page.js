import Link from "next/link";

export default function HomePage() {
  return (
    <main className="next-home">
      <section className="next-hero">
        <p className="next-eyebrow">
          WELCOME TO ADDIS EATS
        </p>

        <h1>Authentic Ethiopian Flavors</h1>

        <p>
          Discover traditional Ethiopian dishes made with
          authentic spices, fresh ingredients, and plenty of love.
        </p>

        <Link href="/menu" className="next-button">
          Explore Our Menu
        </Link>
      </section>
    </main>
  );
}