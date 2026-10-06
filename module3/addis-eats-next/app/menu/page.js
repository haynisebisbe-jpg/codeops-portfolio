import Link from "next/link";
import { Suspense } from "react";
import FilterShell from "../FilterShell";

export const revalidate = 3600;

const dishes = [
  {
    id: "doro-wot",
    name: "Doro Wot",
    category: "Meat",
    price: 450,
    image: "/images/doro wot.jpeg",
    description: "Spicy Ethiopian chicken stew with egg.",
  },
  {
    id: "siga-wat",
    name: "Siga Wat",
    category: "Meat",
    price: 500,
    image: "/images/keywet.jpg",
    description: "Rich and spicy beef stew.",
  },
  {
    id: "beg-alicha",
    name: "Beg Alicha",
    category: "Meat",
    price: 480,
    image: "/images/beg alcha.jpeg",
    description: "Mild Ethiopian lamb stew.",
  },
  {
    id: "shiro-tegamino",
    name: "Shiro Tegamino",
    category: "Vegan",
    price: 280,
    image: "/images/tegabino.jpeg",
    description: "Smooth chickpea stew served with injera.",
  },
  {
    id: "shiro-bozena",
    name: "Shiro Bozena",
    category: "Meat",
    price: 350,
    image: "/images/bozena.jpeg",
    description: "Shiro stew prepared with meat.",
  },
  {
    id: "derek-tibs",
    name: "Derek Tibs",
    category: "Meat",
    price: 550,
    image: "/images/derek tibs.jpeg",
    description: "Tender grilled beef with Ethiopian spices.",
  },
  {
    id: "awaze-tibs",
    name: "Awaze Tibs",
    category: "Meat",
    price: 520,
    image: "/images/awaze tibs.jpg",
    description: "Beef tibs prepared with spicy awaze.",
  },
  {
    id: "quanta-firfir",
    name: "Quanta Firfir",
    category: "Meat",
    price: 400,
    image: "/images/kuanta frfr.jpeg",
    description: "Dried beef mixed with torn injera and sauce.",
  },
  {
    id: "asa-tibs",
    name: "Asa Tibs",
    category: "Meat",
    price: 450,
    image: "/images/asa tbs.jpg",
    description: "Crispy fried fish with Ethiopian spices.",
  },
  {
    id: "kitfo",
    name: "Kitfo",
    category: "Meat",
    price: 550,
    image: "/images/kitfo.jpeg",
    description: "Minced beef seasoned with Ethiopian spices.",
  },
  {
    id: "gored-gored",
    name: "Gored Gored",
    category: "Meat",
    price: 550,
    image: "/images/gored.webp",
    description: "Cubed beef seasoned with traditional spices.",
  },
  {
    id: "dulet",
    name: "Dulet",
    category: "Meat",
    price: 350,
    image: "/images/dulet.jpeg",
    description: "Traditional Ethiopian minced meat dish.",
  },
  {
    id: "beyaynetu",
    name: "Beyaynetu",
    category: "Vegan",
    price: 350,
    image: "/images/Beyaynetu.jpeg",
    description: "A colorful combination of Ethiopian vegetarian dishes.",
  },
  {
    id: "misir",
    name: "Misir Wot",
    category: "Vegan",
    price: 250,
    image: "/images/misir.jpeg",
    description: "Spicy red lentil stew.",
  },
  {
    id: "kik",
    name: "Kik Alicha",
    category: "Vegan",
    price: 250,
    image: "/images/kik.jpeg",
    description: "Mild yellow split-pea stew.",
  },
  {
    id: "gomen",
    name: "Gomen",
    category: "Vegan",
    price: 220,
    image: "/images/gomen.jpeg",
    description: "Seasoned Ethiopian collard greens.",
  },
  {
    id: "timatim",
    name: "Timatim Fitfit",
    category: "Vegan",
    price: 250,
    image: "/images/timatim fitfit.jpeg",
    description: "Fresh tomatoes mixed with torn injera.",
  },
  {
    id: "tej",
    name: "Tej",
    category: "Drinks",
    price: 180,
    image: "/images/tej.jpg",
    description: "Traditional Ethiopian honey wine.",
  },
  {
    id: "buna",
    name: "Buna",
    category: "Drinks",
    price: 100,
    image: "/images/buna.jpeg",
    description: "Traditional Ethiopian coffee.",
  },
  {
    id: "tea",
    name: "Ethiopian Tea",
    category: "Drinks",
    price: 80,
    image: "/images/tea.jpeg",
    description: "Freshly brewed Ethiopian tea.",
  },
];

/*
  These functions run on the server because this file
  is a Server Component.
*/
async function getDishes() {
  return dishes;
}

async function getCategories() {
  return ["All", "Meat", "Vegan", "Drinks"];
}

async function MenuList() {
  // Fetch both pieces of server data in parallel.
  const [data, categories] = await Promise.all([
    getDishes(),
    getCategories(),
  ]);

  return (
    <>
      <div className="next-page-heading">
        <div>
          <p className="next-eyebrow">OUR MENU</p>

          <h1>Authentic Ethiopian Flavors</h1>

          <p>Explore traditional dishes prepared with love.</p>
        </div>
      </div>

      <div className="next-menu-grid">
        {data.map((dish) => (
          <article className="next-dish-card" key={dish.id}>
            <img src={dish.image} alt={dish.name} />

            <div className="next-dish-body">
              <span className="next-category">
                {dish.category}
              </span>

              <h2>{dish.name}</h2>

              <p>{dish.description}</p>

              <div className="next-dish-footer">
                <strong>{dish.price} ETB</strong>

                <Link
                  href={`/menu/${dish.id}`}
                  className="next-button"
                >
                  View Dish
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function MenuSkeleton() {
  return (
    <div className="next-empty-card">
      <p>Loading the menu...</p>
    </div>
  );
}

export default async function MenuPage() {
  const categories = await getCategories();

  return (
    <main className="next-page">
      <FilterShell categories={categories}>
        <Suspense fallback={<MenuSkeleton />}>
          <MenuList />
        </Suspense>
      </FilterShell>
    </main>
  );
}