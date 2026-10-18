
import DishGrid from "./DishGrid";
import SearchBox from "./SearchBox";
import { dishes } from "../../lib/dishes";

export const revalidate = 3600;

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
