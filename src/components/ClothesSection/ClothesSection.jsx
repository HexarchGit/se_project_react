import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { addGarmentPopupConfig } from "../../utils/constants.js";

export default function ClothesSection({ clothesData, handleOpenModal }) {
  const handleAddButton = () => {
    handleOpenModal("form", addGarmentPopupConfig);
  };
  return (
    <div className="clothes">
      <div className="clothes__header">
        <p className="clothes__text">Your items</p>
        <button
          className="clothes__button clothes__button_type_add"
          type="button"
          onClick={handleAddButton}
        >
          + Add new
        </button>
      </div>

      <ul className="clothes__list">
        {clothesData?.map((card) => (
          <ItemCard
            key={card._id}
            card={card}
            handleCardClick={handleOpenModal}
          />
        ))}
      </ul>
    </div>
  );
}
