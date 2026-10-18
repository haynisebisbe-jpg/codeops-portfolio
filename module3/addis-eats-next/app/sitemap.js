
import { dishes } from "../lib/dishes";

const SITE_URL = "https://addiseats.et";

export default function sitemap() {
  const lastModified = new Date();

  const mainPages = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/menu`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const dishPages = dishes.map((dish) => ({
    url: `${SITE_URL}/menu/${dish.id}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...mainPages, ...dishPages];
}
