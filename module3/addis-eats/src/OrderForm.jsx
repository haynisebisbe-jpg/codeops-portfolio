import { useState } from "react";
import { validate } from "./validate";

function OrderForm({ total, onPlaceOrder }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((t) => ({
      ...t,
      [name]: true,
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
      notes: true,
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
      setServerError(
        "Something went wrong. Please try again."
      );
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
    <form
      className="order-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="order-form-intro">
        <span className="order-form-icon">🛵</span>

        <div>
          <h3>Delivery Details</h3>
          <p>
            Please enter your information so we can
            prepare your order.
          </p>
        </div>
      </div>

      <div className="order-field">
        <label htmlFor="name">Full Name</label>

        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your full name"
          autoComplete="name"
          aria-invalid={!!showNameError}
          aria-describedby={
            showNameError ? "name-error" : undefined
          }
          className={showNameError ? "input-error" : ""}
        />

        {showNameError && (
          <p
            id="name-error"
            className="order-error"
            role="alert"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div className="order-field">
        <label htmlFor="phone">
          TeleBirr Number
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. 0912345678"
          autoComplete="tel"
          aria-invalid={!!showPhoneError}
          aria-describedby={
            showPhoneError ? "phone-error" : undefined
          }
          className={showPhoneError ? "input-error" : ""}
        />

        {showPhoneError && (
          <p
            id="phone-error"
            className="order-error"
            role="alert"
          >
            {errors.phone}
          </p>
        )}
      </div>

      <div className="order-field">
        <label htmlFor="area">
          Delivery Area
        </label>

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
          className={showAreaError ? "input-error" : ""}
        >
          <option value="Bole">Bole</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Megenagna">Megenagna</option>
          <option value="Piassa">Piassa</option>
        </select>

        {showAreaError && (
          <p
            id="area-error"
            className="order-error"
            role="alert"
          >
            {errors.area}
          </p>
        )}
      </div>

      <div className="order-field">
        <div className="order-label-row">
          <label htmlFor="notes">Notes</label>
          <span>Optional</span>
        </div>

        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={200}
          placeholder="Any special instructions for your order?"
          aria-invalid={!!showNotesError}
          aria-describedby={
            showNotesError ? "notes-error" : undefined
          }
          className={showNotesError ? "input-error" : ""}
        />

        <div className="order-character-count">
          {form.notes.length}/200
        </div>

        {showNotesError && (
          <p
            id="notes-error"
            className="order-error"
            role="alert"
          >
            {errors.notes}
          </p>
        )}
      </div>

      {serverError && (
        <div
          className="order-server-error"
          role="alert"
        >
          ⚠️ {serverError}
        </div>
      )}

      <button
        type="submit"
        className="order-submit-button"
        disabled={submitting}
      >
        {submitting
          ? "Sending your order..."
          : `Place Order — ${total} ETB`}
      </button>

      <p className="order-secure-note">
        🔒 Your order information is handled securely.
      </p>
    </form>
  );
}

export default OrderForm;