import "./styles/ClothesSection.css";
import ItemCard from "./ItemCard.jsx";
import { addGarmentPopupConfig } from "../utils/constants.js";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { AppContext } from "../contexts/AppContext.js";

export default function ClothesSection({ clothesData }) {
  const { userData } = useContext(CurrentUserContext);
  const { handleOpenModal } = useContext(AppContext);
  const usersClothesData = Array.isArray(clothesData)
    ? clothesData.filter((card) => card.owner === userData._id)
    : [];

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
        {usersClothesData.map((card) => {
          return (
            card.owner === userData._id && (
              <ItemCard
                key={card._id}
                card={card}
                handleCardClick={handleOpenModal}
              />
            )
          );
        })}
      </ul>
    </div>
  );
}
