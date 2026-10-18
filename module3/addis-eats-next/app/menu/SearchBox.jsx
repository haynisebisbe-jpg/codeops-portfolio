
"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { fetcher } from "../../lib/fetcher";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [term, setTerm] = useState(initialSearch);
  const [debouncedTerm, setDebouncedTerm] = useState(initialSearch);
  const [page, setPage] = useState(
    Math.max(1, Number(searchParams.get("page")) || 1)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [term]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedTerm) {
      params.set("search", debouncedTerm);
    } else {
      params.delete("search");
    }

    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }

    const query = params.toString();
    const nextUrl = query ? `/menu?${query}` : "/menu";

    if (window.location.pathname + window.location.search !== nextUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [debouncedTerm, page]);

  const key = debouncedTerm
    ? `/api/menu?search=${encodeURIComponent(debouncedTerm)}&page=${page}`
    : null;

  const { data, error, isLoading, isValidating } = useSWR(
    key,
    fetcher,
    { keepPreviousData: true }
  );

  function clearSearch() {
    setTerm("");
    setDebouncedTerm("");
    setPage(1);
  }

  return (
    <section className="next-empty-card">
      <label htmlFor="menu-search">Search Addis Eats menu</label>

      <input
        id="menu-search"
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Try Doro Wot, Kitfo, or Meat..."
      />

      <button type="button" onClick={clearSearch}>
        Clear search
      </button>

      {isLoading && <p role="status">Searching...</p>}

      {error && (
        <p role="alert">
          Could not load search results. Please try again.
        </p>
      )}

      {data && debouncedTerm && (
        <>
          {isValidating && <p role="status">Updating results...</p>}

          <p>
            Found {data.total} dish{data.total === 1 ? "" : "es"}.
          </p>
        </>
      )}
    </section>
  );
}
