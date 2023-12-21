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

let cityNameForm = document.querySelector("form");

cityNameForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let cityNameInput = cityNameForm.querySelector("input");
  const data = await getData(cityNameInput.value);
  console.log(data);
  displayWeather(data);
});

function displayWeather(data) {
  let weatherDetails = document.querySelector(".weatherDetails");
  weatherDetails.innerHTML = `
  <h3>${data.location}</h3>
  <div>
    <img src="https:${data.icon}"/>
    <div>${data.description}</div>
    <div>${data.tempC}℃</div>
  </div>
  <div>
    <div>Feels like ${data.feelsLikeC}</div>
    <div>Humidity: ${data.humidity}</div>
    <div>Wind: ${data.windKph}</div>
  </div>
  `;
}

getData("auto:ip").then((data) => {
  displayWeather(data);
});
