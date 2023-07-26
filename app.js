

document.addEventListener('DOMContentLoaded', function () {
    
    const success = (position) => {
        console.log(position);
        const lat = position.coords.latitude;
        const long = position.coords.lonitude;

        const geroAPIURL = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en'
        
        fetch(geroAPIURL)
            .then(res => res.json())
            .then(data => { console.log(data.city); getWeatherData(data.city)});
    }
        
    const error = () => {
        alert('Unable to retrieve your location');
    }

    navigator.geolocation.getCurrentPosition(success, error);
});

function getWeatherData(location) {
    console.log(location);
  const apiKey = "9ed2191923d3aedfe5f28b2baa27c194";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherData = {
        temperature: data.main.temp,
        condition: data.weather[0].main,
        location: data.name,
      };
      updateUI(weatherData);
    });
}
function updateUI(weatherData) {
  const temperature = document.querySelector("#temperature");
  const condition = document.querySelector("#condition");
  const location = document.querySelector("#location");

  temperature.textContent = `${weatherData.temperature}°C`;
  condition.textContent = weatherData.condition;
  location.textContent = weatherData.location;
}

const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

