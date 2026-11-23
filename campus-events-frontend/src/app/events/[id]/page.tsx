"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getEvent, getSessions } from "@/services/eventService";
import type { Event, Session } from "@/types/event";

export default function EventDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [event, setEvent] = useState<Event | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getEvent(id), getSessions(id)])
      .then(([eventData, sessionData]) => {
        setEvent(eventData);
        setSessions(sessionData);
      })
      .catch(() => setError("Event not found, or the server could not be reached."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main className="page-shell"><p className="notice">Loading event details...</p></main>;
  if (error || !event) return <main className="page-shell"><p className="error notice">{error || "Event not found."}</p><Link href="/events" className="text-link">← Back to events</Link></main>;

  return (
    <main className="page-shell detail-page">
      <Link href="/events" className="back-link">← Back to all events</Link>
      <div className="detail-panel">
        <div className="card-top"><span className="category">{event.category}</span><span className={event.isPublished ? "status published" : "status draft"}>{event.isPublished ? "Published" : "Unpublished"}</span></div>
        <h1>{event.title}</h1>
        <p className="detail-description">{event.description}</p>
        <div className="detail-facts">
          <div><small>DATE & TIME</small><strong>{new Date(event.eventDate).toLocaleString()}</strong></div>
          <div><small>LOCATION</small><strong>{event.location}</strong></div>
          <div><small>CATEGORY</small><strong>{event.category}</strong></div>
          <div><small>PUBLICATION</small><strong>{event.isPublished ? "Published" : "Unpublished"}</strong></div>
        </div>
      </div>
      <section className="section sessions-section">
        <div className="section-heading"><div><span className="eyebrow">PLAN YOUR VISIT</span><h2>Event sessions</h2></div></div>
        {sessions.length === 0 && <p className="notice">No sessions have been added to this event yet.</p>}
        <div className="session-list">
          {sessions.map(session => (
            <article className="session-card" key={session.id}>
              <div><h3>{session.title}</h3><p>{new Date(session.startsAt).toLocaleString()} – {new Date(session.endsAt).toLocaleString()}</p><p>Room: {session.room}</p></div>
              <Link href={`/events/${id}/sessions/${session.id}`} className="details-link">Session details →</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
