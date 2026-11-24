
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getSession, getEvent } from "@/services/eventService";
import type { Session, Event } from "@/types/event";

export default function SessionDetailsPage() {
  const params = useParams<{ id: string; sessionId: string }>();

  const [session, setSession] = useState<Session | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getSession(params.id, params.sessionId),
      getEvent(params.id),
    ])
      .then(([sessionData, eventData]) => {
        setSession(sessionData);
        setEvent(eventData);
      })
      .catch(() => {
        setError("Session or related event not found.");
      })
      .finally(() => setLoading(false));
  }, [params.id, params.sessionId]);

  return (
    <main className="page-shell">
      <Link href={`/events/${params.id}`} className="back-link">
        ← Back to event
      </Link>

      {loading && (
        <p className="notice">Loading session...</p>
      )}

      {error && (
        <p className="error notice">{error}</p>
      )}

      {session && event && (
        <section className="detail-panel">
          <span className="eyebrow">SESSION DETAILS</span>

          <h1>{session.title}</h1>

          <div className="detail-facts">
            <div>
              <small>STARTS</small>
              <strong>
                {new Date(session.startsAt).toLocaleString()}
              </strong>
            </div>

            <div>
              <small>ENDS</small>
              <strong>
                {new Date(session.endsAt).toLocaleString()}
              </strong>
            </div>

            <div>
              <small>ROOM</small>
              <strong>{session.room}</strong>
            </div>
          </div>

          <div className="event-related">
            <span className="eyebrow">RELATED EVENT</span>

            <h2>{event.title}</h2>

            <p>{event.description}</p>

            <div className="detail-facts">
              <div>
                <small>LOCATION</small>
                <strong>{event.location}</strong>
              </div>

              <div>
                <small>EVENT DATE</small>
                <strong>
                  {new Date(event.eventDate).toLocaleString()}
                </strong>
              </div>

              <div>
                <small>CATEGORY</small>
                <strong>{event.category}</strong>
              </div>
            </div>

            <Link
              href={`/events/${event.id}`}
              className="primary-button"
            >
              View Event Details →
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
