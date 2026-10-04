import { Link } from "react-router-dom";

function Applications({ applications }) {
  return (
    <div>
      <h1>Applications</h1>

      {applications.map((application) => (
        <article key={application.id}>
          <h2>{application.company}</h2>

          <p>
            <strong>Position:</strong> {application.position}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`status-badge status-${application.status.toLowerCase()}`}
            >
              {application.status}
            </span>
          </p>

          <p>
            <strong>Deadline:</strong> {application.deadline}
          </p>

          <Link to={`/applications/${application.id}`}>
            View Details
          </Link>
        </article>
      ))}
    </div>
  );
}

export default Applications;