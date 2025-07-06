//weather names is codes according to table https://openweathermap.org/weather-conditions
export const weatherList = [
  {
    name: "01d",
    image: "/assets/day_sunny.svg",
  },
  {
    name: "02d",
    image: "/assets/day_cloudy.svg",
    alias: ["03d", "04d"],
  },
  {
    name: "10d",
    image: "/assets/day_rain.svg",
    alias: ["9d"],
  },
  {
    name: "11d",
    image: "/assets/day_storm.svg",
  },
  {
    name: "13d",
    image: "/assets/day_snow.svg",
  },
  {
    name: "50d",
    image: "/assets/day_fog.svg",
  },
  {
    name: "01n",
    image: "/assets/night_sunny.svg",
  },
  {
    name: "02n",
    image: "/assets/night_cloudy.svg",
    alias: ["03n", "04n"],
  },
  {
    name: "10n",
    image: "/assets/night_rain.svg",
    alias: ["9n"],
  },
  {
    name: "11n",
    image: "/assets/night_storm.svg",
  },
  {
    name: "13n",
    image: "/assets/night_snow.svg",
  },
  {
    name: "50n",
    image: "/assets/night_fog.svg",
  },
];
