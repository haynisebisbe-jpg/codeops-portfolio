import Link from "next/link";

const dishes = [
  {
    id: "doro-wot",
    name: "Classic Doro Wat",
    description: "Traditional Ethiopian chicken stew with berbere spices.",
    price: 450,
    image: "/images/doro wot.jpeg",
  },
  {
    id: "siga-wat",
    name: "Prime Siga Wat (Beef Stew)",
    description: "Rich Ethiopian beef stew cooked with traditional spices.",
    price: 500,
    image: "/images/bozena.jpeg",
  },
  {
    id: "beg-alicha",
    name: "Beg Alicha Wat (Mild Lamb Stew)",
    description: "Tender lamb stew prepared with mild Ethiopian spices.",
    price: 480,
    image: "/images/beg alcha.jpeg",
  },
  {
    id: "shiro-tegamino",
    name: "Clay-Pot Shiro Tegamino",
    description: "Traditional shiro prepared in a clay pot.",
    price: 400,
    image: "/images/tegabino.jpeg",
  },
  {
    id: "shiro-bozena",
    name: "Shiro Bozena (Beef Enriched Shiro)",
    description: "Creamy shiro enriched with tender beef.",
    price: 450,
    image: "/images/bozena.jpeg",
  },
  {
    id: "derek-tibs",
    name: "Crisp Siga Derek Tibs",
    description: "Tender beef sautéed with Ethiopian spices.",
    price: 520,
    image: "/images/derek tibs.jpeg",
  },
  {
    id: "awaze-tibs",
    name: "Awaze Lamb Tibs",
    description: "Tender lamb sautéed with onions, peppers and awaze.",
    price: 550,
    image: "/images/awaze tibs.jpg",
  },
  {
    id: "quanta-firfir",
    name: "Spicy Quanta Firfir",
    description: "Traditional shredded injera mixed with spicy dried meat.",
    price: 420,
    image: "/images/kuanta frfr.jpeg",
  },
  {
    id: "asa-tibs",
    name: "Lake Tana Crispy Fish Tibs",
    description: "Crispy fish prepared with Ethiopian herbs and spices.",
    price: 480,
    image: "/images/asa tbs.jpg",
  },
  {
    id: "kitfo",
    name: "Prime Beef Kitfo",
    description: "Seasoned minced beef served with traditional accompaniments.",
    price: 500,
    image: "/images/kitfo.jpeg",
  },
  {
    id: "gored-gored",
    name: "Highland Gored Gored",
    description: "Traditional Ethiopian beef dish seasoned with spices.",
    price: 520,
    image: "/images/gored.webp",
  },
  {
    id: "dulet",
    name: "Addis Style Dulet",
    description: "Classic Ethiopian minced meat dish with spices.",
    price: 430,
    image: "/images/dulet.jpeg",
  },
  {
    id: "beyaynetu",
    name: "Full Vegan Beyaynetu Platter",
    description: "A colorful platter of traditional Ethiopian vegan dishes.",
    price: 400,
    image: "/images/Beyaynetu.jpeg",
  },
  {
    id: "misir",
    name: "Highland Red Misir Wat",
    description: "Spicy red lentil stew cooked with berbere.",
    price: 350,
    image: "/images/misir.jpeg",
  },
  {
    id: "kik",
    name: "Golden Kik Alicha",
    description: "Mild yellow split-pea stew with Ethiopian spices.",
    price: 350,
    image: "/images/kik.jpeg",
  },
  {
    id: "gomen",
    name: "Braised Ye'abesha Gomen",
    description: "Slow-cooked Ethiopian collard greens.",
    price: 350,
    image: "/images/gomen.jpeg",
  },
  {
    id: "timatim",
    name: "Fresh Timatim Fitfit",
    description: "Fresh tomatoes mixed with torn injera and spices.",
    price: 320,
    image: "/images/timatim fitfit.jpeg",
  },
  {
    id: "tej",
    name: "House Fermented Tej (500ml Carafe)",
    description: "Traditional Ethiopian honey wine served chilled.",
    price: 600,
    image: "/images/tej.jpg",
  },
  {
    id: "buna",
    name: "Traditional Jebena Coffee",
    description: "Freshly roasted Ethiopian coffee prepared traditionally.",
    price: 180,
    image: "/images/buna.jpeg",
  },
  {
    id: "tea",
    name: "Highland Spiced Shai",
    description: "Warm Ethiopian spiced tea.",
    price: 150,
    image: "/images/tea.jpeg",
  },
];

export default function MenuPage() {
  return (
    <main className="next-page">
      <p className="next-eyebrow">FROM OUR KITCHEN</p>

      <h1>Our Menu</h1>

      <p className="next-intro">
        Discover traditional Ethiopian flavors, lovingly prepared with
        authentic spices and ingredients.
      </p>

      <div className="next-dish-grid">
        {dishes.map((dish) => (
          <article className="next-dish-card" key={dish.id}>
            <img
              src={dish.image}
              alt={dish.name}
              className="next-dish-image"
            />

            <div className="next-dish-content">
              <h2>{dish.name}</h2>

              <p>{dish.description}</p>

              <strong>{dish.price} ETB</strong>

              <Link
                href={`/menu/${dish.id}`}
                className="next-link"
              >
                View Details →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}