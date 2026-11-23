import type { Event, Session, PaginatedEvents } from "@/types/event";

const API = "/backend/events";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getEvents(): Promise<PaginatedEvents> {
  return request<PaginatedEvents>(`${API}?page=1&limit=100`);
}

export async function getUpcomingEvents(): Promise<Event[]> {
  return request<Event[]>(`${API}/upcoming`);
}

export async function getEvent(id: string): Promise<Event> {
  return request<Event>(`${API}/${encodeURIComponent(id)}`);
}

export async function getSessions(id: string): Promise<Session[]> {
  return request<Session[]>(`${API}/${encodeURIComponent(id)}/sessions`);
}

export async function getSession(id: string, sessionId: string): Promise<Session> {
  return request<Session>(
    `${API}/${encodeURIComponent(id)}/sessions/${encodeURIComponent(sessionId)}`
  );
}

export async function createEvent(data: Omit<Event, "id">): Promise<Event> {
  return request<Event>(API, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
