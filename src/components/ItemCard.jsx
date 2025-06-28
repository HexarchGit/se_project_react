import { useContext } from "react";
import "./styles/ItemCard.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";

function ItemCard({ card, handleCardClick }) {
  const { handleCardLike } = useContext(AppContext);
  const { isLoggedIn, userData } = useContext(CurrentUserContext);
  const isLiked = card.likes.some((id) => id === userData?._id);
  const handleClick = () => {
    handleCardClick("card", card);
  };

  const handleLike = () => {
    handleCardLike(card._id, isLiked);
  };

  return (
    <li className="card">
      <div className="card__header">
        <p className="card__title">{card?.name}</p>
        {isLoggedIn && (
          <button
            className={`card__like ${
              isLiked ? "card__like_active" : "card__like_inactive"
            }`}
            onClick={handleLike}
          />
        )}
      </div>
      <img
        src={card?.imageUrl || `../../assets/${card?.name}.svg`}
        alt={card?.name}
        className="card__image"
        onClick={handleClick}
      />
    </li>
  );
}

export default ItemCard;
