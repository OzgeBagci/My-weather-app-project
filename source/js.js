function showTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;

  let city = response.data.city;

  let searchCity = document.querySelector("#firstCity");
  searchCity.innerHTML = response.data.city;
}

function showCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-input");
  let city = newCity.value;
  let apiKey = "1494f5f7ob4a4dtd10b403df6ba9a052";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);
showCity("Paris");

let now = new Date();
let information = document.querySelector("#dateInformation");
information.innerHTML = formatDate(now);

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
  let first = document.querySelector("#dateInformation");
  dateInformation.innerHTML = `${day} ${hours}:${minutes}`;

  return `${day} ${hours}:${minutes}`;
}
