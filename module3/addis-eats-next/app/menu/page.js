import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 3600;

const dishes = [
  {
    id: "doro-wot",
    name: "Classic Doro Wat",
    price: 450,
    category: "Meat",
    image: "/images/doro wot.jpeg",
    description: "Traditional Ethiopian chicken stew with berbere and spices.",
  },
  {
    id: "siga-wat",
    name: "Prime Siga Wat (Beef Stew)",
    price: 500,
    category: "Meat",
    image: "/images/bozena.jpeg",
    description: "Rich Ethiopian beef stew cooked with berbere spices.",
  },
  {
    id: "beg-alicha",
    name: "Beg Alicha Wat (Mild Lamb Stew)",
    price: 480,
    category: "Meat",
    image: "/images/beg alcha.jpeg",
    description: "Tender lamb prepared with mild Ethiopian spices.",
  },
  {
    id: "shiro-tegamino",
    name: "Clay-Pot Shiro Tegamino",
    price: 400,
    category: "Vegan",
    image: "/images/tegabino.jpeg",
    description: "Smooth chickpea stew served in traditional Ethiopian style.",
  },
  {
    id: "shiro-bozena",
    name: "Shiro Bozena (Beef Enriched Shiro)",
    price: 450,
    category: "Meat",
    image: "/images/bozena.jpeg",
    description: "Creamy shiro enriched with tender beef.",
  },
  {
    id: "derek-tibs",
    name: "Crisp Siga Derek Tibs",
    price: 520,
    category: "Meat",
    image: "/images/derek tibs.jpeg",
    description: "Tender beef pieces sautéed with aromatic spices.",
  },
  {
    id: "awaze-tibs",
    name: "Awaze Lamb Tibs",
    price: 550,
    category: "Meat",
    image: "/images/awaze tibs.jpg",
    description: "Spicy lamb tibs prepared with flavorful awaze sauce.",
  },
  {
    id: "quanta-firfir",
    name: "Spicy Quanta Firfir",
    price: 420,
    category: "Meat",
    image: "/images/kuanta frfr.jpeg",
    description: "Shredded injera mixed with spicy dried meat.",
  },
  {
    id: "asa-tibs",
    name: "Lake Tana Crispy Fish Tibs",
    price: 480,
    category: "Meat",
    image: "/images/asa tbs.jpg",
    description: "Crispy fish prepared with Ethiopian spices.",
  },
  {
    id: "kitfo",
    name: "Prime Beef Kitfo",
    price: 500,
    category: "Meat",
    image: "/images/kitfo.jpeg",
    description: "Traditional Ethiopian minced beef seasoned with mitmita.",
  },
  {
    id: "gored-gored",
    name: "Highland Gored Gored",
    price: 520,
    category: "Meat",
    image: "/images/gored.webp",
    description: "Traditional cubed beef dish with Ethiopian spices.",
  },
  {
    id: "dulet",
    name: "Addis Style Dulet",
    price: 430,
    category: "Meat",
    image: "/images/dulet.jpeg",
    description: "Classic Ethiopian minced meat specialty.",
  },
  {
    id: "beyaynetu",
    name: "Full Vegan Beyaynetu Platter",
    price: 400,
    category: "Vegan",
    image: "/images/Beyaynetu.jpeg",
    description: "A colorful selection of traditional Ethiopian vegan dishes.",
  },
  {
    id: "misir",
    name: "Highland Red Misir Wat",
    price: 350,
    category: "Vegan",
    image: "/images/misir.jpeg",
    description: "Spicy red lentil stew with Ethiopian berbere.",
  },
  {
    id: "kik",
    name: "Golden Kik Alicha",
    price: 350,
    category: "Vegan",
    image: "/images/kik.jpeg",
    description: "Mild yellow split-pea stew.",
  },
  {
    id: "gomen",
    name: "Braised Ye'abesha Gomen",
    price: 350,
    category: "Vegan",
    image: "/images/gomen.jpeg",
    description: "Slow-cooked Ethiopian collard greens.",
  },
  {
    id: "timatim",
    name: "Fresh Timatim Fitfit",
    price: 320,
    category: "Vegan",
    image: "/images/timatim fitfit.jpeg",
    description: "Fresh tomatoes mixed with pieces of injera.",
  },
  {
    id: "tej",
    name: "House Fermented Tej (500ml Carafe)",
    price: 600,
    category: "Drinks",
    image: "/images/tej.jpg",
    description: "Traditional Ethiopian honey wine.",
  },
  {
    id: "buna",
    name: "Traditional Jebena Coffee",
    price: 180,
    category: "Drinks",
    image: "/images/buna.jpeg",
    description: "Freshly roasted Ethiopian coffee prepared in a jebena.",
  },
  {
    id: "tea",
    name: "Highland Spiced Shai",
    price: 150,
    category: "Drinks",
    image: "/images/tea.jpeg",
    description: "Warm Ethiopian spiced tea.",
  },
];

function MenuList() {
  return (
    <div className="next-dish-grid">
      {dishes.map((dish) => (
        <article className="next-dish-card" key={dish.id}>
          <img
            src={dish.image}
            alt={dish.name}
            className="next-dish-image"
          />

          <div className="next-dish-content">
            <span className="next-category">{dish.category}</span>

            <h2>{dish.name}</h2>

            <p>{dish.description}</p>

            <strong>{dish.price} ETB</strong>

            <Link href={`/menu/${dish.id}`} className="next-button">
              View Dish
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function MenuSkeleton() {
  return (
    <div className="next-loading">
      <div className="next-spinner">🍽️</div>
      <h2>Preparing the dishes...</h2>
      <p>Our kitchen is getting everything ready.</p>
    </div>
  );
}

export default function MenuPage() {
  return (
    <main className="next-page">
      <section className="next-hero">
        <p className="next-eyebrow">AUTHENTIC ETHIOPIAN FOOD</p>

        <h1>Our Menu</h1>

        <p>
          Discover traditional Ethiopian flavors prepared with love
          and served fresh.
        </p>
      </section>

      <Suspense fallback={<MenuSkeleton />}>
        <MenuList />
      </Suspense>
    </main>
  );
}