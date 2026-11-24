
"use client";

import { useEffect, useMemo, useState } from "react";
import EventCard from "@/components/EventCard";
import { getEvents } from "@/services/eventService";
import type { Event } from "@/types/event";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [publication, setPublication] = useState("all");
  const [sort, setSort] = useState("date-asc");
  const [page, setPage] = useState(1);

  const [backendTotal, setBackendTotal] = useState(0);
  const [backendTotalPages, setBackendTotalPages] = useState(1);

  const perPage = 6;
  const searching = search.trim().length > 0;

  // Load all events once to populate the filter dropdowns.
  useEffect(() => {
    getEvents({ page: 1, limit: 1000 })
      .then((data) => setAllEvents(data.items))
      .catch(() => {
        // The main event request below handles the visible error.
      });
  }, []);

  // Let the backend handle filtering, sorting, and pagination.
  useEffect(() => {
    setLoading(true);
    setError("");

    const filters = {
      category: category === "all" ? undefined : category,
      location: location === "all" ? undefined : location,
      isPublished: publication === "all" ? undefined : publication,
      sortBy: sort.startsWith("title")
        ? ("title" as const)
        : ("eventDate" as const),
      order: sort.endsWith("desc")
        ? ("desc" as const)
        : ("asc" as const),
      page: searching ? 1 : page,
      limit: searching ? 1000 : perPage,
    };

    getEvents(filters)
      .then((data) => {
        setEvents(data.items);
        setBackendTotal(data.total);
        setBackendTotalPages(data.totalPages);
      })
      .catch(() => {
        setEvents([]);
        setBackendTotal(0);
        setBackendTotalPages(1);
        setError(
          "Could not load events. Make sure the backend is running."
        );
      })
      .finally(() => setLoading(false));
  }, [category, location, publication, sort, page, searching]);

  const categories = [
    ...new Set(allEvents.map((event) => event.category)),
  ];

  const locations = [
    ...new Set(allEvents.map((event) => event.location)),
  ];

  // Search event titles on the frontend.
  const filtered = useMemo(() => {
    return events.filter((event) =>
      event.title
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );
  }, [events, search]);

  // Backend pagination when not searching.
  // Frontend pagination when searching.
  const totalPages = searching
    ? Math.max(1, Math.ceil(filtered.length / perPage))
    : Math.max(1, backendTotalPages);

  const visible = searching
    ? filtered.slice((page - 1) * perPage, page * perPage)
    : events;

  const displayedTotal = searching
    ? filtered.length
    : backendTotal;

  function resetPage(action: () => void) {
    action();
    setPage(1);
  }

  return (
    <main className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">FIND YOUR NEXT EXPERIENCE</span>
        <h1>All Events</h1>
        <p>
          Explore activities, meet people, and make the most of campus life.
        </p>
      </section>

      <section className="filters">
        <input
          aria-label="Search events by title"
          placeholder="Search events by title..."
          value={search}
          onChange={(e) =>
            resetPage(() => setSearch(e.target.value))
          }
        />

        <select
          aria-label="Filter by category"
          value={category}
          onChange={(e) =>
            resetPage(() => setCategory(e.target.value))
          }
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          aria-label="Filter by location"
          value={location}
          onChange={(e) =>
            resetPage(() => setLocation(e.target.value))
          }
        >
          <option value="all">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select
          aria-label="Filter by publication status"
          value={publication}
          onChange={(e) =>
            resetPage(() => setPublication(e.target.value))
          }
        >
          <option value="all">All statuses</option>
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>

        <select
          aria-label="Sort events"
          value={sort}
          onChange={(e) =>
            resetPage(() => setSort(e.target.value))
          }
        >
          <option value="date-asc">Date: earliest first</option>
          <option value="date-desc">Date: latest first</option>
          <option value="title-asc">Title: A to Z</option>
          <option value="title-desc">Title: Z to A</option>
        </select>
      </section>

      <div className="results-line">
        {loading
          ? "Loading events..."
          : `${displayedTotal} event(s) found`}
      </div>

      {error && <p className="error notice">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="notice">
          No events found. Try changing your search or filters.
        </p>
      )}

      <div className="event-grid">
        {!loading &&
          visible.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
      </div>

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </main>
  );
}
