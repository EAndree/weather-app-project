// define current date and time
let dateTime = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDay = days[dateTime.getDay()];

let dayNumber = dateTime.getDate();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[dateTime.getMonth()];

let currentYear = dateTime.getFullYear();
let hour = dateTime.getHours();
let minutes = ("0" + dateTime.getMinutes()).slice(-2);

let currentDateTime = document.querySelector("#current-date-time");
currentDateTime.innerHTML = `${currentDay}, ${dayNumber}. ${currentMonth} ${currentYear} H${hour}.${minutes}`;

// submit form - display entered city and temperature

function displayWeatherCondition(response) {
  document.querySelector("#selectedCity").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#maxTemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minTemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].main;
}

// add data for default city when opening the page
function search(city) {
  let apiKey = "1bd976940e9c1ce8e8d39b2e3efb2dc1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#query-city").value;
  //call function for city
  search(city);
}

let searchSubmitCity = document.querySelector("#search-submit-city-form");
searchSubmitCity.addEventListener("submit", submitCity);

//get current location button
function searchCurrentLocation(position) {
  let apiKey = "1bd976940e9c1ce8e8d39b2e3efb2dc1";
  let apiUrlCurrentLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
  console.log(apiUrlCurrentLoc);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

//choose default city
search("Berlin");
