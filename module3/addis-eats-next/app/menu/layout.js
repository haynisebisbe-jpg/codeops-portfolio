import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <h2>Explore Menu</h2>

        <p>Choose a category</p>

        <nav>
          <Link href="/menu">
            All Dishes
          </Link>

          <Link href="/menu?category=Meat">
            Meat Dishes
          </Link>

          <Link href="/menu?category=Vegan">
            Vegan Dishes
          </Link>

          <Link href="/menu?category=Drinks">
            Drinks
          </Link>
        </nav>
      </aside>

      <section className="menu-content">
        {children}
      </section>
    </div>
  );
}