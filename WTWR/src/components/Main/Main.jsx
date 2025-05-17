import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import iconRefresh from "../../assets/icon_refresh.svg";

function Main({
  weather: { icon, temp, condition } = {},
  handleCardClick,
  cardsData,
  isMobileMenuOpened,
}) {
  const itemsForWeather = cardsData.filter(
    (item) => item.weather === condition
  );
  // const itemsForWeather = cardsData; //TODO
  return (
    <main className="content">
      {!isMobileMenuOpened && <WeatherCard icon={icon} temp={temp} />}
      <p className="content__message">
        Today is {temp}° F / You may want to wear:
      </p>
      <ul className="content__list">
        {itemsForWeather.map((card) => (
          <ItemCard
            key={card._id}
            card={card}
            handleCardClick={handleCardClick}
          />
        ))}
      </ul>
      <button
        type="button"
        className="content__button content__button_type_randomize"
      >
        <img src={iconRefresh} alt="↻" className="content__icon_refresh" />{" "}
        Randomize
      </button>
    </main>
  );
}

export default Main;
