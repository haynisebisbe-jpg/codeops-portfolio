import { Link, useParams } from "react-router-dom";

function ApplicationDetails({ applications }) {
  const { id } = useParams();

  const application = applications.find(
    (item) => item.id === Number(id)
  );

  if (!application) {
    return (
      <div>
        <h1>Application Not Found</h1>

        <p>We couldn't find that internship application.</p>

        <Link to="/applications">Back to Applications</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{application.company}</h1>

      <section className="application-details">
        <div className="detail-item">
          <strong>Position</strong>
          <p>{application.position}</p>
        </div>

        <div className="detail-item">
          <strong>Application Date</strong>
          <p>{application.applicationDate}</p>
        </div>

        <div className="detail-item">
          <strong>Deadline</strong>
          <p>{application.deadline}</p>
        </div>

        <div className="detail-item">
          <strong>Status</strong>
          <p>
            <span
              className={`status-badge status-${application.status.toLowerCase()}`}
            >
              {application.status}
            </span>
          </p>
        </div>

        <div className="detail-item">
          <strong>Notes</strong>
          <p>{application.notes}</p>
        </div>
      </section>

      <Link to="/applications">← Back to Applications</Link>
    </div>
  );
}

export default ApplicationDetails;