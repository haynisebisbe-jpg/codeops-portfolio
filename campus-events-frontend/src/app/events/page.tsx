"use client";

import { useEffect, useMemo, useState } from "react";
import EventCard from "@/components/EventCard";
import { getEvents } from "@/services/eventService";
import type { Event } from "@/types/event";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [publication, setPublication] = useState("all");
  const [sort, setSort] = useState("date-asc");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    getEvents()
      .then(data => setEvents(data.items))
      .catch(() => setError("Could not load events. Make sure the backend is running."))
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(events.map(e => e.category))];
  const locations = [...new Set(events.map(e => e.location))];

  const filtered = useMemo(() => {
    const result = events.filter(event =>
      event.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || event.category === category) &&
      (location === "all" || event.location === location) &&
      (publication === "all" || String(event.isPublished) === publication)
    );

    result.sort((a, b) => {
      if (sort === "date-asc") return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
      if (sort === "date-desc") return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });
    return result;
  }, [events, search, category, location, publication, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  function resetPage(action: () => void) {
    action();
    setPage(1);
  }

  return (
    <main className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">FIND YOUR NEXT EXPERIENCE</span>
        <h1>All Events</h1>
        <p>Explore activities, meet people, and make the most of campus life.</p>
      </section>

      <section className="filters">
        <input aria-label="Search events by title" placeholder="Search events by title..." value={search} onChange={e => resetPage(() => setSearch(e.target.value))} />
        <select aria-label="Filter by category" value={category} onChange={e => resetPage(() => setCategory(e.target.value))}>
          <option value="all">All categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select aria-label="Filter by location" value={location} onChange={e => resetPage(() => setLocation(e.target.value))}>
          <option value="all">All locations</option>
          {locations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select aria-label="Filter by publication status" value={publication} onChange={e => resetPage(() => setPublication(e.target.value))}>
          <option value="all">All statuses</option>
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>
        <select aria-label="Sort events" value={sort} onChange={e => resetPage(() => setSort(e.target.value))}>
          <option value="date-asc">Date: earliest first</option>
          <option value="date-desc">Date: latest first</option>
          <option value="title-asc">Title: A to Z</option>
          <option value="title-desc">Title: Z to A</option>
        </select>
      </section>

      <div className="results-line">{loading ? "Loading events..." : `${filtered.length} event(s) found`}</div>
      {error && <p className="error notice">{error}</p>}
      {!loading && !error && filtered.length === 0 && <p className="notice">No events found. Try changing your search or filters.</p>}
      <div className="event-grid">
        {visible.map(event => <EventCard key={event.id} event={event} />)}
      </div>

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}
    </main>
  );
}
