import "./WeatherCard.css";
import { weatherList } from "../../utils/weatherList";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import { useContext } from "react";

function WeatherCard({ icon, temp }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  const currentWeather = weatherList.find((weather) => {
    return weather.alias?.includes(icon) || weather.name === icon;
  });

  const style = {
    backgroundImage: currentWeather && `url(${currentWeather?.image})`,
  };
  return (
    <div className="weather" style={style}>
      <div className="weather__degree">
        {currentWeather && `${temp}°${currentTempUnit === "F" ? " F" : ""}`}
      </div>
    </div>
  );
}

export default WeatherCard;
