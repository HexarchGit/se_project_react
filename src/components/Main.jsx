import "./styles/Main.css";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import iconRefresh from "../assets/icon_refresh.svg";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function Main({ weather: { icon, temp, condition } = {}, cardsData }) {
  const { handleOpenModal } = useContext(AppContext);
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  const itemsForWeather = Array.isArray(cardsData)
    ? cardsData.filter((item) => item.weather === condition)
    : [];

  return (
    <main className="content">
      <WeatherCard icon={icon} temp={temp?.[currentTempUnit]} />
      <p className="content__message">
        Today is {temp?.[currentTempUnit]}°
        {currentTempUnit === "F" ? " F" : " C"} / You may want to wear:
      </p>
      <ul className="content__list">
        {itemsForWeather.map((card) => (
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
