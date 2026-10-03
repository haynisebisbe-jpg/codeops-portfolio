import { useState } from "react";
import { validate } from "./validate";

function OrderForm({ total, onPlaceOrder }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: ""
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((t) => ({
      ...t,
      [name]: true
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    const errors = validate(form);

    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true
    });

    const firstError = Object.keys(errors)[0];

    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }

    setSubmitting(true);
    setServerError("");

    try {
      await onPlaceOrder(form);
    } catch (error) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const errors = validate(form);

  const showNameError = touched.name && errors.name;
  const showPhoneError = touched.phone && errors.phone;
  const showAreaError = touched.area && errors.area;
  const showNotesError = touched.notes && errors.notes;

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>Delivery Form</h3>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={!!showNameError}
        aria-describedby={
          showNameError ? "name-error" : undefined
        }
      />

      {showNameError && (
        <p id="name-error" role="alert">
          {errors.name}
        </p>
      )}

      <label htmlFor="phone">TeleBirr Number</label>
      <input
        id="phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={!!showPhoneError}
        aria-describedby={
          showPhoneError ? "phone-error" : undefined
        }
      />

      {showPhoneError && (
        <p id="phone-error" role="alert">
          {errors.phone}
        </p>
      )}

      <label htmlFor="area">Delivery Area</label>
      <select
        id="area"
        name="area"
        value={form.area}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={!!showAreaError}
        aria-describedby={
          showAreaError ? "area-error" : undefined
        }
      >
        <option value="Bole">Bole</option>
        <option value="Kazanchis">Kazanchis</option>
        <option value="Megenagna">Megenagna</option>
        <option value="Piassa">Piassa</option>
      </select>

      {showAreaError && (
        <p id="area-error" role="alert">
          {errors.area}
        </p>
      )}

      <label htmlFor="notes">Notes (optional)</label>
      <textarea
        id="notes"
        name="notes"
        value={form.notes}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={200}
        aria-invalid={!!showNotesError}
        aria-describedby={
          showNotesError ? "notes-error" : undefined
        }
      />

      {showNotesError && (
        <p id="notes-error" role="alert">
          {errors.notes}
        </p>
      )}

      {serverError && (
        <p role="alert">
          {serverError}
        </p>
      )}

      <button type="submit" disabled={submitting}>
        {submitting
          ? "Sending your order..."
          : `Order — ${total} ETB`}
      </button>
    </form>
  );
}

export default OrderForm;