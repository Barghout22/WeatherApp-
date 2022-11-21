async function requestData(location) {
  const WeatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=6366d25bd31143aecc1784f5317109fd`
  );
  console.log(WeatherData.json());
}

requestData('Cairo');