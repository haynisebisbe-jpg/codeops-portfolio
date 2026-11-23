import Link from "next/link";
import type { Event } from "@/types/event";

export default function EventCard({ event }: { event: Event }) {
  return (
    <article className="event-card">
      <div className="card-top">
        <span className="category">{event.category}</span>
        <span className={event.isPublished ? "status published" : "status draft"}>
          {event.isPublished ? "Published" : "Unpublished"}
        </span>
      </div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <div className="event-meta">
        <span>📍 {event.location}</span>
        <span>📅 {new Date(event.eventDate).toLocaleDateString()}</span>
      </div>
      <Link className="details-link" href={`/events/${event.id}`}>
        View Details →
      </Link>
    </article>
  );
}
