import "./ItemCard.css";

function ItemCard({ card, handleCardClick }) {
  const handleClick = () => {
    handleCardClick("card", card);
  };

  return (
    <li className="card">
      <p className="card__title">{card?.name}</p>
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
