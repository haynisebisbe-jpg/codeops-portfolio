function Dashboard({ applications }) {
  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (application) => application.status === "Applied"
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const offerCount = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  return (
    <div>
      <h1>Internship Tracker</h1>

      <p>Welcome to your internship dashboard.</p>

      <section className="dashboard">
        <h2>Application Summary</h2>

        <div className="summary-grid">
          <div className="summary-card">
            <h3>Total Applications</h3>
            <p>{totalApplications}</p>
          </div>

          <div className="summary-card">
            <h3>Applied</h3>
            <p>{appliedCount}</p>
          </div>

          <div className="summary-card">
            <h3>Interviews</h3>
            <p>{interviewCount}</p>
          </div>

          <div className="summary-card">
            <h3>Offers</h3>
            <p>{offerCount}</p>
          </div>

          <div className="summary-card">
            <h3>Rejected</h3>
            <p>{rejectedCount}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;