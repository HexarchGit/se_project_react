import "./WeatherCard.css";
import { weatherList } from "../../utils/weatherList";

function WeatherCard({ icon, temp }) {
  const currentWeather = weatherList.find((weather) => {
    return weather.alias?.includes(icon) || weather.name === icon;
  });

  const style = {
    backgroundImage: currentWeather && `url(${currentWeather?.image})`,
  };
  return (
    <div className="weather" style={style}>
      <div className="weather__degree">
        {currentWeather ? `${temp}° F` : "--° F"}
      </div>
    </div>
  );
}

export default WeatherCard;
