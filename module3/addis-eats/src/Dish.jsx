import { memo, useState } from "react";
import { useCartStore } from "./Cart/cartStore";
import Modal from "./ui/Modal";

function Dish({
  id,
  nameEn,
  priceETB,
  category,
  spiceLevel,
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

  return (
    <>
      <div className="dish">
        <p>{priceETB} ETB</p>

        <p>{category}</p>

        <p>{spiceLevel}</p>

        <button onClick={handleAdd}>
          Add
        </button>

        <button
          type="button"
          onClick={openModal}
        >
          View Details
        </button>
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={nameEn}
      >
        <p>
          <strong>Price:</strong> {priceETB} ETB
        </p>

        <p>
          <strong>Category:</strong> {category}
        </p>

        <p>
          <strong>Spice Level:</strong> {spiceLevel}
        </p>

        <button onClick={handleAdd}>
          Add to Cart
        </button>
      </Modal>
    </>
  );
}

export default memo(Dish);