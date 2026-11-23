"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createEvent } from "@/services/eventService";

export default function CreateEventPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    category: "",
    isPublished: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function update(field: string, value: string | boolean) {
    setForm(current => ({ ...current, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (new Date(form.eventDate).getTime() <= Date.now()) {
      setError("Please choose a future date and time.");
      return;
    }

    setLoading(true);
    try {
      await createEvent({
        ...form,
        eventDate: new Date(form.eventDate).toISOString(),
      });
      setSuccess("Your event was created successfully!");
      setTimeout(() => router.push("/events"), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create the event.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell form-page">
      <Link href="/events" className="back-link">← Back to events</Link>
      <section className="form-heading">
        <span className="eyebrow">SHARE SOMETHING WITH YOUR COMMUNITY</span>
        <h1>Create an Event</h1>
        <p>Fill in the details below to add a new campus event.</p>
      </section>

      <form className="event-form" onSubmit={handleSubmit}>
        <label>Event title<input required minLength={3} maxLength={100} value={form.title} onChange={e => update("title", e.target.value)} placeholder="e.g. Student Innovation Day" /></label>
        <label>Description<textarea required minLength={10} value={form.description} onChange={e => update("description", e.target.value)} placeholder="Tell people what this event is about..." rows={4} /></label>
        <div className="form-row">
          <label>Location<input required value={form.location} onChange={e => update("location", e.target.value)} placeholder="e.g. Main Campus" /></label>
          <label>Category<input required value={form.category} onChange={e => update("category", e.target.value)} placeholder="e.g. technology" /></label>
        </div>
        <label>Event date and time<input required type="datetime-local" value={form.eventDate} onChange={e => update("eventDate", e.target.value)} /></label>
        <label className="checkbox-label"><input type="checkbox" checked={form.isPublished} onChange={e => update("isPublished", e.target.checked)} /> Publish this event immediately</label>
        {error && <p className="error form-message">{error}</p>}
        {success && <p className="success form-message">{success}</p>}
        <button className="primary-button submit-button" type="submit" disabled={loading}>{loading ? "Creating..." : "Create Event"}</button>
      </form>
    </main>
  );
}
