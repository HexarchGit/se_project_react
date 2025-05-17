//weather names is codes according to table https://openweathermap.org/weather-conditions
export const weatherList = [
  {
    name: "01d",
    image: new URL("../assets/day_sunny.svg", import.meta.url).href,
  },
  {
    name: "02d",
    image: new URL("../assets/day_cloudy.svg", import.meta.url).href,
    alias: ["03d", "04d"],
  },
  {
    name: "10d",
    image: new URL("../assets/day_rain.svg", import.meta.url).href,
    alias: ["9d"],
  },
  {
    name: "11d",
    image: new URL("../assets/day_storm.svg", import.meta.url).href,
  },
  {
    name: "13d",
    image: new URL("../assets/day_snow.svg", import.meta.url).href,
  },
  {
    name: "50d",
    image: new URL("../assets/day_fog.svg", import.meta.url).href,
  },
  {
    name: "01n",
    image: new URL("../assets/night_sunny.svg", import.meta.url).href,
  },
  {
    name: "02n",
    image: new URL("../assets/night_cloudy.svg", import.meta.url).href,
    alias: ["03n", "04n"],
  },
  {
    name: "10n",
    image: new URL("../assets/night_rain.svg", import.meta.url).href,
    alias: ["9n"],
  },
  {
    name: "11n",
    image: new URL("../assets/night_storm.svg", import.meta.url).href,
  },
  {
    name: "13n",
    image: new URL("../assets/night_snow.svg", import.meta.url).href,
  },
  {
    name: "50n",
    image: new URL("../assets/night_fog.svg", import.meta.url).href,
  },
];
