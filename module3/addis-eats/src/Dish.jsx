import { memo, useState } from "react";
import { dishImages } from "./dishImages";
import { useCartStore } from "./Cart/cartStore";
import Modal from "./ui/Modal";

function Dish({
  id,
  nameEn,
  nameAm,
  priceETB,
  category,
  spiceLevel,
  description,
  ingredients,
  servings,
  tagline,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  function handleAdd() {
    addItem({
      id,
      name: nameEn,
      price: priceETB,
      category,
      spiceLevel,
    });
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const image = dishImages[nameEn];

  return (
    <>
      <div className="dish">

        {image && (
          <img
            className="dish-image"
            src={image}
            alt={nameEn}
          />
        )}

        <div className="dish-price">
          {priceETB} ETB
        </div>

        <div className="dish-category">
          {category}
        </div>

        {tagline && (
          <p className="dish-tagline">
            {tagline}
          </p>
        )}

        {description && (
          <p className="dish-description">
            {description}
          </p>
        )}

        <div className="dish-spice">
          <span>Spice</span>
          <strong>{spiceLevel}</strong>
        </div>

        {servings && (
          <div className="dish-serving">
            {servings}
          </div>
        )}

        <div className="dish-actions">
          <button
            className="dish-add-button"
            onClick={handleAdd}
          >
            Add to Cart
          </button>

          <button
            type="button"
            className="dish-details-button"
            onClick={openModal}
          >
            View Details
          </button>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={nameEn}
      >
        {nameAm && (
          <p className="modal-amharic">
            {nameAm}
          </p>
        )}

        {description && (
          <p className="modal-description">
            {description}
          </p>
        )}

        <div className="modal-info">
          <p>
            <strong>Price:</strong> {priceETB} ETB
          </p>

          <p>
            <strong>Category:</strong> {category}
          </p>

          <p>
            <strong>Spice level:</strong> {spiceLevel}
          </p>

          {servings && (
            <p>
              <strong>Serving:</strong> {servings}
            </p>
          )}
        </div>

        {ingredients && ingredients.length > 0 && (
          <div className="modal-ingredients">
            <h3>Ingredients</h3>

            <div className="ingredient-list">
              {ingredients.map((ingredient) => (
                <span key={ingredient}>
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          className="modal-add-button"
          onClick={handleAdd}
        >
          Add to Cart
        </button>
      </Modal>
    </>
  );
}

export default memo(Dish);