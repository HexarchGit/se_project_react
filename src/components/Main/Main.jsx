import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import iconRefresh from "../../assets/icon_refresh.svg";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import { useContext } from "react";

function Main({
  weather: { icon, temp, condition } = {},
  handleOpenModal,
  cardsData,
}) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  const itemsForWeather = cardsData?.filter(
    (item) => item.weather === condition
  );

  return (
    <main className="content">
      <WeatherCard icon={icon} temp={temp?.[currentTempUnit]} />
      <p className="content__message">
        {/* In design there is no C, if toggled C then only ° appear */}
        {/* But I'll add this for now. */}
        Today is {temp?.[currentTempUnit]}°
        {currentTempUnit === "F" ? " F" : " C"} / You may want to wear:
      </p>
      <ul className="content__list">
        {itemsForWeather?.map((card) => (
          <ItemCard
            key={card._id}
            card={card}
            handleCardClick={handleOpenModal}
          />
        ))}
      </ul>
      <button
        type="button"
        className="content__button content__button_type_randomize"
      >
        <img
          src={iconRefresh}
          alt="Refresh"
          className="content__icon_refresh"
        />{" "}
        Randomize
      </button>
    </main>
  );
}

export default Main;
