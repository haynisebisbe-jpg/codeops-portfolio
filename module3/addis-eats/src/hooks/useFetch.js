import { useState, useEffect } from "react";
import { loadDishes } from "../api";

export function useFetch(category) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    loadDishes(category, controller.signal)
      .then(setData)
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [category]);

  return { data, error, loading };
}