import Link from "next/link";
import { notFound } from "next/navigation";

const dishes = {
  "doro-wot": {
    name: "Classic Doro Wat",
    description: "Traditional Ethiopian chicken stew with berbere spices.",
    price: 450,
    image: "/images/doro wot.jpeg",
  },

  "siga-wat": {
    name: "Prime Siga Wat (Beef Stew)",
    description: "Rich Ethiopian beef stew cooked with traditional spices.",
    price: 500,
    image: "/images/bozena.jpeg",
  },

  "beg-alicha": {
    name: "Beg Alicha Wat (Mild Lamb Stew)",
    description: "Tender lamb stew prepared with mild Ethiopian spices.",
    price: 480,
    image: "/images/beg alcha.jpeg",
  },

  "shiro-tegamino": {
    name: "Clay-Pot Shiro Tegamino",
    description: "Traditional shiro prepared in a clay pot.",
    price: 400,
    image: "/images/tegabino.jpeg",
  },

  "shiro-bozena": {
    name: "Shiro Bozena (Beef Enriched Shiro)",
    description: "Creamy shiro enriched with tender beef.",
    price: 450,
    image: "/images/bozena.jpeg",
  },

  "derek-tibs": {
    name: "Crisp Siga Derek Tibs",
    description: "Tender beef sautéed with Ethiopian spices.",
    price: 520,
    image: "/images/derek tibs.jpeg",
  },

  "awaze-tibs": {
    name: "Awaze Lamb Tibs",
    description: "Tender lamb sautéed with onions, peppers and awaze.",
    price: 550,
    image: "/images/awaze tibs.jpg",
  },

  "quanta-firfir": {
    name: "Spicy Quanta Firfir",
    description: "Traditional shredded injera mixed with spicy dried meat.",
    price: 420,
    image: "/images/kuanta frfr.jpeg",
  },

  "asa-tibs": {
    name: "Lake Tana Crispy Fish Tibs",
    description: "Crispy fish prepared with Ethiopian herbs and spices.",
    price: 480,
    image: "/images/asa tbs.jpg",
  },

  kitfo: {
    name: "Prime Beef Kitfo",
    description: "Seasoned minced beef served with traditional accompaniments.",
    price: 500,
    image: "/images/kitfo.jpeg",
  },

  "gored-gored": {
    name: "Highland Gored Gored",
    description: "Traditional Ethiopian beef dish seasoned with spices.",
    price: 520,
    image: "/images/gored.webp",
  },

  dulet: {
    name: "Addis Style Dulet",
    description: "Classic Ethiopian minced meat dish with spices.",
    price: 430,
    image: "/images/dulet.jpeg",
  },

  beyaynetu: {
    name: "Full Vegan Beyaynetu Platter",
    description: "A colorful platter of traditional Ethiopian vegan dishes.",
    price: 400,
    image: "/images/Beyaynetu.jpeg",
  },

  misir: {
    name: "Highland Red Misir Wat",
    description: "Spicy red lentil stew cooked with berbere.",
    price: 350,
    image: "/images/misir.jpeg",
  },

  kik: {
    name: "Golden Kik Alicha",
    description: "Mild yellow split-pea stew with Ethiopian spices.",
    price: 350,
    image: "/images/kik.jpeg",
  },

  gomen: {
    name: "Braised Ye'abesha Gomen",
    description: "Slow-cooked Ethiopian collard greens.",
    price: 350,
    image: "/images/gomen.jpeg",
  },

  timatim: {
    name: "Fresh Timatim Fitfit",
    description: "Fresh tomatoes mixed with torn injera and spices.",
    price: 320,
    image: "/images/timatim fitfit.jpeg",
  },

  tej: {
    name: "House Fermented Tej (500ml Carafe)",
    description: "Traditional Ethiopian honey wine served chilled.",
    price: 600,
    image: "/images/tej.jpg",
  },

  buna: {
    name: "Traditional Jebena Coffee",
    description: "Freshly roasted Ethiopian coffee prepared traditionally.",
    price: 180,
    image: "/images/buna.jpeg",
  },

  tea: {
    name: "Highland Spiced Shai",
    description: "Warm Ethiopian spiced tea.",
    price: 150,
    image: "/images/tea.jpeg",
  },
};

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = dishes[id];

  if (!dish) {
    notFound();
  }

  return (
    <main className="next-page">
      <p className="next-eyebrow">ADDIS EATS</p>

      <div className="next-detail-card">
        <img
          src={dish.image}
          alt={dish.name}
          className="next-detail-image"
        />

        <div className="next-detail-content">
          <h1>{dish.name}</h1>

          <p>{dish.description}</p>

          <strong className="next-price">
            {dish.price} ETB
          </strong>

          <div className="next-actions">
            <Link href="/menu" className="next-button">
              ← Back to Menu
            </Link>

            <Link href="/cart" className="next-link">
              Go to Cart →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}