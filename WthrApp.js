const requestBttn = document.querySelector(".submit");
const locationRequested = document.querySelector("input#location");
const resultDisplay = document.querySelector(".results");

async function requestData(location) {
  const WeatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=6366d25bd31143aecc1784f5317109fd`
  );
  return WeatherData.json();
}

async function ProcessData(location) {
  const requestedData = await requestData(location);
  displayWeatherData(requestedData);
}

async function searchGif(searchphrase) {
  const requestGif = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=ETioSUOsXxlouIGNp0BMISKogln3K5ec&s=${searchphrase}`
  );
  const requestJSON = await requestGif.json();
  const returnData = await requestJSON.data.images.original.url;
  //console.log(returnData);
  return returnData;
}

async function displayWeatherData(info) {
  //console.log(info);
  firstParagraph = document.createElement("p");
  firstParagraph.textContent = `location: ${info.name}`;
  resultDisplay.appendChild(firstParagraph);
  secondParagraph = document.createElement("p");
  secondParagraph.textContent = `temprature is ${(
    info.main["temp"] - 273
  ).toFixed(2)} celsius /  ${((9 / 5) * (info.main["temp"] - 273) + 32).toFixed(
    2
  )} fahrenheit`;
  resultDisplay.appendChild(secondParagraph);
  thirdParagraph = document.createElement("p");
  thirdParagraph.textContent = `current weather status is ${info.weather[0]["description"]}`;
  resultDisplay.appendChild(thirdParagraph);
  displayGif = document.createElement("img");
  displayGif.src = await searchGif(info.weather[0]["description"]);
  resultDisplay.appendChild(displayGif);
}

function clearDisplay() {
  while (resultDisplay.firstChild) {
    resultDisplay.removeChild(resultDisplay.lastChild);
  }
}

requestBttn.addEventListener("click", () => {
  clearDisplay();
  ProcessData(locationRequested.value);
});
