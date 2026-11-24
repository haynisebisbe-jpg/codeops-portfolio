import type { Event, Session, PaginatedEvents } from "@/types/event";

const API = "/backend/events";

type EventQuery = {
  category?: string;
  location?: string;
  isPublished?: string;
  sortBy?: "eventDate" | "title";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
};

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
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

// Get events with optional backend filters, sorting, and pagination
export async function getEvents(
  filters: EventQuery = {}
): Promise<PaginatedEvents> {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.append(key, String(value));
    }
  });

  return request<PaginatedEvents>(
    `${API}?${params.toString()}`
  );
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

export async function getSession(
  id: string,
  sessionId: string
): Promise<Session> {
  return request<Session>(
    `${API}/${encodeURIComponent(id)}/sessions/${encodeURIComponent(sessionId)}`
  );
}

export async function createEvent(
  data: Omit<Event, "id">
): Promise<Event> {
  return request<Event>(API, {
    method: "POST",
    body: JSON.stringify(data),
  });
}