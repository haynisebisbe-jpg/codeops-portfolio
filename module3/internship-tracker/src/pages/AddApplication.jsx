import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddApplication({ onAdd }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    applicationDate: "",
    deadline: "",
    status: "Applied",
    notes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAdd(formData);

    navigate("/applications");
  }

  return (
    <div>
      <h1>Add Application</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Company</label>

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Position</label>

          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Application Date</label>

          <input
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Deadline</label>

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label>Notes</label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Application</button>
      </form>
    </div>
  );
}

export default AddApplication;