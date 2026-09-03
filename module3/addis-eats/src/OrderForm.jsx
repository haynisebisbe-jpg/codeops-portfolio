import { useState } from "react";

function OrderForm() {
  const [form, setForm] = useState({ name: "", phone: "", area: "" });

  const isValidPhone = /^09\d{8}$/.test(form.phone); // TeleBirr format

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="order-form">
      <h3>Delivery Form</h3>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="TeleBirr Number"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        name="area"
        placeholder="Delivery Area"
        value={form.area}
        onChange={handleChange}
      />
      <button type="submit" disabled={!isValidPhone}>
        Place Order
      </button>
    </form>
  );
}

export default OrderForm;
