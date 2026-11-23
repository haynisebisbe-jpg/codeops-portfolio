import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link href="/" className="brand">Campus<span>Events</span></Link>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/events">All Events</Link>
        <Link href="/create-event" className="nav-button">Create Event +</Link>
      </nav>
    </header>
  );
}
