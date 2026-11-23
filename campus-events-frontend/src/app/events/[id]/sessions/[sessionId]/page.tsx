"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/services/eventService";
import type { Session } from "@/types/event";

export default function SessionDetailsPage() {
  const params = useParams<{ id: string; sessionId: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession(params.id, params.sessionId)
      .then(setSession)
      .catch(() => setError("Session not found."))
      .finally(() => setLoading(false));
  }, [params.id, params.sessionId]);

  return (
    <main className="page-shell">
      <Link href={`/events/${params.id}`} className="back-link">← Back to event</Link>
      {loading && <p className="notice">Loading session...</p>}
      {error && <p className="error notice">{error}</p>}
      {session && <section className="detail-panel">
        <span className="eyebrow">SESSION DETAILS</span>
        <h1>{session.title}</h1>
        <div className="detail-facts">
          <div><small>STARTS</small><strong>{new Date(session.startsAt).toLocaleString()}</strong></div>
          <div><small>ENDS</small><strong>{new Date(session.endsAt).toLocaleString()}</strong></div>
          <div><small>ROOM</small><strong>{session.room}</strong></div>
          <div><small>EVENT ID</small><strong>{session.eventId}</strong></div>
        </div>
      </section>}
    </main>
  );
}
