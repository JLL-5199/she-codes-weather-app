// Date and time
let currentTime = new Date();

function showedDate(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    let hour = date.getHours();
    if (hour < 10) { hour = `0${hour}`; }

    let minutes = date.getMinutes();
    if (minutes < 10) { minutes = `0${minutes}`; }

    return `${day} ${hour}:${minutes}`;
}

let todayDate = document.querySelector("#today");
todayDate.innerHTML= showedDate(currentTime);

// Search engine
function searchCity(event) {
    event.preventDefault();
    let city = document.querySelector("#searched-city");
    let cityInput = document.querySelector("#search-city");
    city.innerHTML = cityInput.value;
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", searchCity);

//Search engine functionality
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let messageDegrees = `${temperature}°C`;
  let h5 = document.querySelector("h5");
    h5.innerHTML = messageDegrees;
    let messageCity = `${city}`;
    let h1 = document.querySelector("h1");
    h1.innerHTML = messageCity;   
}


// Current location
function showCurrentLocation(response) {
    let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let messageDegrees = `${temperature}°C`;
  let h5 = document.querySelector("h5");
    h5.innerHTML = messageDegrees;
    let messageCity = `${city}`;
    let h1 = document.querySelector("h1");
    h1.innerHTML = messageCity; 
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentLocation);
}

function currentLocation(){
    navigator.geolocation.getCurrentPosition(retrievePosition);
}
let searchHere = document.querySelector("#current-location");
searchCityForm.addEventListener("click", currentLocation);