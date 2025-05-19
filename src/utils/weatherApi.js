// Endpoint
// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}
// Get latitude and longitude
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

export default function weatherApi(
  { endpoint, apiKey },
  { latitude, longitude }
) {
  const tempCondition = ({ temp = 0 }) => {
    return temp >= 86 ? "hot" : temp >= 66 ? "warm" : "cold";
  };

  return fetch(
    `${endpoint}?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Error: ${response.status}`);
    })
    .then((data) => {
      const weatherData = {
        temp: Math.round(data?.main?.temp) || 0,
        condition: tempCondition(data?.main),
        location: data?.name,
        icon: data?.weather[0]?.icon,
      };
      return weatherData;
    });
}
