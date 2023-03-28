let apiKey = "6abba6e892082f6e99ff3292ea97c423";
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();

  return `${days[day]} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day].substring(0, 3);
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastDays = response.data.daily;
  let forecastElement = document.querySelector(".forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thurs", "Fri"];
  forecastDays.forEach((forecastDay, index) => {
    if (index === 1 || index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <h6 class="day">${formatDay(forecastDay.dt)}</h6>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                width="42"
                alt=""
              />
              <div class="forecast-temperatures">
                <span class="forecast-max">${Math.round(
                  forecastDay.temp.max
                )}˚</span>
                <span class="forecast-min">${Math.round(
                  forecastDay.temp.min
                )}˚</span>
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apikey = "62231151ce343c4d68652e1617efc22f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  console.log(response);
  let city = document.querySelector("#city");
  let description = document.querySelector(".description");
  let dateElement = document.querySelector("#date");
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector(".weather-icon");
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].main;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  celsiusTemperature = response.data.main.temp;
  temperature.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = response.data.main.humidity + "%";
  wind.innerHTML = response.data.wind.speed + " km/h";
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
}

//serach city
function searchCity(city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}

//form submit
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  searchCity(cityInput.value);
}

// unit conversion
function displayFarhrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  farhrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let farhrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farhrenheitTemp);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farhrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
//farhrenheit event
// let farhrenheitLink = document.querySelector("#farhrenheit-link");
// farhrenheitLink.addEventListener("click", displayFarhrenheitTemperature);

//celsius event
// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);

//form event
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//initial value
searchCity("San Francisco");
