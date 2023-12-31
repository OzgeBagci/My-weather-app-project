function showTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature-number");
  temperatureElement.innerHTML = temperature;

  let searchCity = document.querySelector("#firstCity");
  searchCity.innerHTML = response.data.city;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
 src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  let date = new Date(response.data.time * 1000);
  dateInformationElement = document.querySelector("#dateInformation");
  dateInformationElement.innerHTML = formatDate(date);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function showCity(city) {
  let apiKey = "1494f5f7ob4a4dtd10b403df6ba9a052";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  showCity(cityInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

showCity("Paris");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "1494f5f7ob4a4dtd10b403df6ba9a052";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="row">
    <div class="col-2"></div>
      <div class="weather-forecast-day">
    <div class="weather-forecast-icon">
  <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <img src="${day.condition.icon_url}"/>
    </div>
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-max"> <strong> ${Math.round(
        day.temperature.maximum
      )}° </strong> </span>
      <span class="weather-forecast-min"> ${Math.round(
        day.temperature.minimum
      )}°</span>
    </div>
  </div>
  </div>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
