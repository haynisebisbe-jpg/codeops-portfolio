"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import { getUpcomingEvents } from "@/services/eventService";
import type { Event } from "@/types/event";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUpcomingEvents()
      .then(setEvents)
      .catch(() => setError("Could not load events. Please check that the backend is running."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR CAMPUS. YOUR COMMUNITY.</span>
          <h1>Discover what&apos;s<br /><span>happening on campus.</span></h1>
          <p>Find workshops, festivals, exhibitions, and opportunities to connect with your campus community.</p>
          <div className="hero-actions">
            <Link href="/events" className="primary-button">Explore Events</Link>
            <Link href="/create-event" className="secondary-button">Create an Event</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-circle">✦</div>
          <div className="art-card"><span>UPCOMING</span><strong>Ideas meet<br />opportunity.</strong><small>Make your campus count.</small></div>
          <div className="art-star">✳</div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div><span className="eyebrow">DON&apos;T MISS OUT</span><h2>Upcoming events</h2><p>See what&apos;s coming up around campus.</p></div>
          <Link href="/events" className="text-link">View all events →</Link>
        </div>

        {loading && <p className="notice">Loading upcoming events...</p>}
        {error && <p className="error notice">{error}</p>}
        {!loading && !error && events.length === 0 && <p className="notice">No upcoming events found. Check back later!</p>}
        <div className="event-grid">
          {events.slice(0, 3).map(event => <EventCard key={event.id} event={event} />)}
        </div>
      </section>

      <section className="bottom-cta">
        <div><span className="eyebrow">HAVE SOMETHING TO SHARE?</span><h2>Bring your campus idea to life.</h2><p>Create an event and invite your community to be part of it.</p></div>
        <Link href="/create-event" className="primary-button">Create an Event +</Link>
      </section>
    </main>
  );
}
