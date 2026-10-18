
import DishGrid from "./DishGrid";
import SearchBox from "./SearchBox";
import { dishes } from "../../lib/dishes";

export const revalidate = 3600;

export const metadata = {
  title: "Menu",
  description:
    "Explore authentic Ethiopian food at Addis Eats, including Doro Wat, Tibs, Kitfo, and Shiro. Find your favorites and order in Addis Ababa.",
  alternates: {
    canonical: "https://addiseats.et/menu",
  },
  openGraph: {
    title: "Our Menu | Addis Eats",
    description:
      "Discover traditional Ethiopian dishes, prepared with love and delivered across Addis Ababa.",
    url: "https://addiseats.et/menu",
    type: "website",
  },
};

export default function MenuPage() {
  return (
    <main className="next-page">
      <div className="next-page-heading">
        <div>
          <p className="next-eyebrow">OUR MENU</p>
          <h1>Authentic Ethiopian Flavors</h1>
          <p>Explore traditional dishes prepared with love.</p>
        </div>
      </div>

      <SearchBox />

      <DishGrid dishes={dishes} />
    </main>
  );
}
