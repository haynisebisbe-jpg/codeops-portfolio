import Link from "next/link";
import { notFound } from "next/navigation";

const dishes = {
  "doro-wot": {
    name: "Classic Doro Wat",
    price: 450,
    category: "Meat",
    image: "/images/doro wot.jpeg",
    description:
      "Traditional Ethiopian chicken stew slowly cooked with berbere, onions, garlic, and aromatic spices.",
  },

  "siga-wat": {
    name: "Prime Siga Wat (Beef Stew)",
    price: 500,
    category: "Meat",
    image: "/images/bozena.jpeg",
    description:
      "Rich Ethiopian beef stew prepared with berbere spices and slowly cooked onions.",
  },

  "beg-alicha": {
    name: "Beg Alicha Wat (Mild Lamb Stew)",
    price: 480,
    category: "Meat",
    image: "/images/beg alcha.jpeg",
    description:
      "Tender lamb prepared with mild Ethiopian spices.",
  },

  "shiro-tegamino": {
    name: "Clay-Pot Shiro Tegamino",
    price: 400,
    category: "Vegan",
    image: "/images/tegabino.jpeg",
    description:
      "Smooth chickpea stew served in traditional Ethiopian style.",
  },

  "shiro-bozena": {
    name: "Shiro Bozena (Beef Enriched Shiro)",
    price: 450,
    category: "Meat",
    image: "/images/bozena.jpeg",
    description:
      "Creamy shiro enriched with tender beef.",
  },

  "derek-tibs": {
    name: "Crisp Siga Derek Tibs",
    price: 520,
    category: "Meat",
    image: "/images/derek tibs.jpeg",
    description:
      "Tender beef pieces sautéed with aromatic Ethiopian spices.",
  },

  "awaze-tibs": {
    name: "Awaze Lamb Tibs",
    price: 550,
    category: "Meat",
    image: "/images/awaze tibs.jpg",
    description:
      "Spicy lamb tibs prepared with flavorful awaze sauce.",
  },

  "quanta-firfir": {
    name: "Spicy Quanta Firfir",
    price: 420,
    category: "Meat",
    image: "/images/kuanta frfr.jpeg",
    description:
      "Shredded injera mixed with spicy dried meat.",
  },

  "asa-tibs": {
    name: "Lake Tana Crispy Fish Tibs",
    price: 480,
    category: "Meat",
    image: "/images/asa tbs.jpg",
    description:
      "Crispy fish prepared with Ethiopian spices.",
  },

  kitfo: {
    name: "Prime Beef Kitfo",
    price: 500,
    category: "Meat",
    image: "/images/kitfo.jpeg",
    description:
      "Traditional Ethiopian minced beef seasoned with mitmita.",
  },

  "gored-gored": {
    name: "Highland Gored Gored",
    price: 520,
    category: "Meat",
    image: "/images/gored.webp",
    description:
      "Traditional cubed beef dish with Ethiopian spices.",
  },

  dulet: {
    name: "Addis Style Dulet",
    price: 430,
    category: "Meat",
    image: "/images/dulet.jpeg",
    description:
      "Classic Ethiopian minced meat specialty.",
  },

  beyaynetu: {
    name: "Full Vegan Beyaynetu Platter",
    price: 400,
    category: "Vegan",
    image: "/images/Beyaynetu.jpeg",
    description:
      "A colorful selection of traditional Ethiopian vegan dishes.",
  },

  misir: {
    name: "Highland Red Misir Wat",
    price: 350,
    category: "Vegan",
    image: "/images/misir.jpeg",
    description:
      "Spicy red lentil stew with Ethiopian berbere.",
  },

  kik: {
    name: "Golden Kik Alicha",
    price: 350,
    category: "Vegan",
    image: "/images/kik.jpeg",
    description:
      "Mild yellow split-pea stew.",
  },

  gomen: {
    name: "Braised Ye'abesha Gomen",
    price: 350,
    category: "Vegan",
    image: "/images/gomen.jpeg",
    description:
      "Slow-cooked Ethiopian collard greens.",
  },

  timatim: {
    name: "Fresh Timatim Fitfit",
    price: 320,
    category: "Vegan",
    image: "/images/timatim fitfit.jpeg",
    description:
      "Fresh tomatoes mixed with pieces of injera.",
  },

  tej: {
    name: "House Fermented Tej (500ml Carafe)",
    price: 600,
    category: "Drinks",
    image: "/images/tej.jpg",
    description:
      "Traditional Ethiopian honey wine.",
  },

  buna: {
    name: "Traditional Jebena Coffee",
    price: 180,
    category: "Drinks",
    image: "/images/buna.jpeg",
    description:
      "Freshly roasted Ethiopian coffee prepared in a jebena.",
  },

  tea: {
    name: "Highland Spiced Shai",
    price: 150,
    category: "Drinks",
    image: "/images/tea.jpeg",
    description:
      "Warm Ethiopian spiced tea.",
  },
};

export function generateStaticParams() {
  return Object.keys(dishes).map((id) => ({
    id,
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = dishes[id];

  if (!dish) {
    notFound();
  }

  return (
    <main className="next-page">
      <Link href="/menu" className="next-back-link">
        ← Back to Menu
      </Link>

      <section className="next-detail-card">
        <img
          src={dish.image}
          alt={dish.name}
          className="next-detail-image"
        />

        <div className="next-detail-content">
          <span className="next-category">{dish.category}</span>

          <h1>{dish.name}</h1>

          <p>{dish.description}</p>

          <h2>{dish.price} ETB</h2>

          <Link href="/checkout" className="next-button">
            Continue to Checkout
          </Link>
        </div>
      </section>
    </main>
  );
}