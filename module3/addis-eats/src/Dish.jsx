import PropTypes from "prop-types";

function Dish({ name, price, spicy = false, currency = "ETB" }) {
  return (
    <div className="dish-card">
      <h3>{name}</h3>
      <p>{price} {currency}</p>
      {spicy && <span className="badge">🌶️ Spicy</span>}
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

export default Dish;
