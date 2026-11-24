# CampusEvents — Campus Event Management Platform

CampusEvents is a responsive web application that helps students explore campus events, view event details and sessions, and create new events.

The application uses a **Next.js frontend** connected to a **NestJS REST API backend**.

## Features

- **Home Page:** Displays upcoming campus events.
- **All Events:** Displays available events with filtering and sorting.
- **Search:** Search events by title.
- **Filtering:** Filter events by category, location, and publication status.
- **Sorting:** Sort events by date or title in ascending or descending order.
- **Pagination:** Navigate through event listings.
- **Event Details:** View event descriptions, dates, locations, categories, and sessions.
- **Session Details:** View session titles, start and end times, rooms, and related event information.
- **Create Event:** Submit new events through a validated form.
- **Error Handling:** Displays useful messages for missing events, invalid sessions, and backend connection problems.
- **Responsive Design:** Supports desktop, tablet, and mobile screens.

## Technologies Used

### Frontend
- Next.js 16
- React 19
- TypeScript
- CSS
- Fetch API
- Next.js App Router

### Backend
- NestJS
- Node.js
- REST API
- Class Validator
- Class Transformer

## Project Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Displays upcoming events |
| All Events | `/events` | Lists, searches, filters, and sorts events |
| Event Details | `/events/[id]` | Displays event information and sessions |
| Session Details | `/events/[id]/sessions/[sessionId]` | Displays session and related event information |
| Create Event | `/create-event` | Allows users to create an event |

## Backend API Endpoints

The frontend communicates with the NestJS backend using the Fetch API.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/events` | Get events with filtering, sorting, and pagination |
| GET | `/api/events/upcoming` | Get upcoming events |
| GET | `/api/events/:id` | Get a specific event |
| GET | `/api/events/:id/sessions` | Get sessions belonging to an event |
| GET | `/api/events/:id/sessions/:sessionId` | Get a specific session |
| POST | `/api/events` | Create a new event |

## Installation and Setup

### Prerequisites

Install the following:
- Node.js
- npm
- Git

### 1. Set Up the Backend

Clone or open the CampusEvents backend project.

Open a terminal and run:

```bash
cd campus-events-api
npm install
npm run start:dev
```

The NestJS backend runs at:

`http://localhost:3000`

### 2. Set Up the Frontend

Open a second terminal and navigate to the frontend project:

```bash
cd campus-events-frontend
npm install
```

Start the Next.js development server:

```bash
npm run dev -- -p 3001
```

Open the application in your browser:

`http://localhost:3001`

**Important:** Keep both the backend and frontend terminals running while using the application.

## API Connection

The frontend uses a Next.js rewrite to connect requests to the NestJS backend.

The frontend requests use:

`/backend/events`

Next.js forwards these requests to:

`http://localhost:3000/api/events`

This allows the frontend to communicate with the backend without directly exposing the backend URL in browser requests.

## Testing

The following functionality has been tested:

- Home page loads upcoming events.
- All Events page displays event listings.
- Category filtering works.
- Location filtering works.
- Publication status filtering works.
- Title search works.
- Sorting by title and date works.
- Pagination works.
- Event details display correctly.
- Session details display correctly, including related event information.
- Invalid event IDs display an error message.
- Invalid session IDs display an error message.
- Empty event forms are blocked by required-field validation.
- Creating an event successfully sends data to the backend.
- Newly created events appear in the event listing.
- Production build completes successfully with TypeScript checks passing.

## Production Build

To create an optimized production build, run:

```bash
npm run build
```

To start the production server on port 3001:

```bash
npm run start -- -p 3001
```

Make sure the backend is also running.

## Important Note

The current backend stores event data in memory. Newly created events are available while the backend process is running, but the data may reset when the backend restarts.

## Author

Developed as part of the IBT College Canada CodeOps Full Stack Software Development program.