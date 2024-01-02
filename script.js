let unit = "metric";

async function getData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=ec9d15cb0b4547a5b83232753232012&q=${city}`,
    { mode: "cors" }
  );
  const currentData = await response.json();
  console.log(currentData);

  return {
    location: currentData.location.name,
    tempC: currentData.current.temp_c,
    tempF: currentData.current.temp_f,
    icon: currentData.current.condition.icon,
    description: currentData.current.condition.text,
    feelsLikeC: currentData.current.feelslike_c,
    feelsLikeF: currentData.current.feelslike_f,
    windKph: currentData.current.wind_kph,
    windMph: currentData.current.wind_mph,
    humidity: currentData.current.humidity,
  };
}

const cityNameForm = document.querySelector("form");
cityNameForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let cityNameInput = cityNameForm.querySelector("input");
  const data = await getData(cityNameInput.value);
  console.log(data);
  displayWeather(data);
});

function displayWeather(data) {
  let weatherDetails = document.querySelector(".weatherDetails");
  let temp;
  let windSpeed;
  let feelsLike;
  let tempUnit;
  if (unit === "imperial") {
    temp = data.tempF;
    windSpeed = data.windMph;
    feelsLike = data.feelsLikeF;
    tempUnit = "℉";
    speedUnit = "Mph";
  } else if (unit === "metric") {
    temp = data.tempC;
    windSpeed = data.windKph;
    feelsLike = data.feelsLikeC;
    tempUnit = "℃";
    speedUnit = "Kph";
  }
  weatherDetails.innerHTML = `
  <h1>${data.location}</h1>
  <div id="description">
    <div>${data.description}</div>
    <img src="https:${data.icon}"/>
  </div>
  <div id="values">
    <div>
      <div id="temperature">${Math.round(temp)}<span>${tempUnit}</span></div>
    </div>
    <div id="others">
      <div>Feels like ${Math.round(feelsLike)}${tempUnit}</div>
      <div>Humidity: ${Math.round(data.humidity)}%</div>
      <div>Wind: ${Math.round(windSpeed)}${speedUnit}</div>
    </div>
  </div>
  <button>Unit</button>
  `;
  const unitBtn = weatherDetails.querySelector("button");
  unitBtn.addEventListener("click", () => {
    if (unit === "metric") {
      unit = "imperial";
    } else {
      unit = "metric";
    }
    displayWeather(data);
  });
}

getData("auto:ip").then((data) => {
  displayWeather(data);
});
