import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        <h1>Internship Tracker</h1>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/applications">Applications</Link>
          <Link to="/applications/new">Add Application</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 Internship Tracker</p>
      </footer>
    </div>
  );
}

export default Layout;