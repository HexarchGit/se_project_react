import "./styles/WeatherCard.css";
import { weatherList } from "../utils/weatherList";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
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
        {/* In design there is no C, if toggled C then only ° appear */}
        {/* But I'll add this for now. */}
        {currentWeather && `${temp}°${currentTempUnit === "F" ? " F" : " C"}`}
      </div>
    </div>
  );
}

export default WeatherCard;
