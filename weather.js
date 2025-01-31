// Selecting Elements
var inputval = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');

// API Key
const apik = "3045dd712ffe6e702e3245525ac7fa38";

// Temperature Conversion Function
function convertion(val) {
    return (val - 273.15).toFixed(2);
}

// Fetch Weather Data
btn.addEventListener('click', function () {
    let cityName = inputval.value.trim();
    if (cityName === "") {
        alert("Please enter a city name!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apik}`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found! Please try again.");
                return;
            }

            const nameval = data.name;
            const descrip = data.weather[0].description;
            const tempature = data.main.temp;
            const wndspd = data.wind.speed;
            const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            const date = new Date().toLocaleDateString();
            const time = new Date().toLocaleTimeString();

            // Update UI
            city.innerHTML = `Weather of <span>${nameval}</span>`;
            document.getElementById('date').innerHTML = `📅 Date: <span>${date}</span>`;
            document.getElementById('time').innerHTML = `⏰ Time: <span>${time}</span>`;
            temp.innerHTML = `🌡 Temperature: <span>${convertion(tempature)} °C</span>`;
            description.innerHTML = `☁ Weather Conditions: <span>${descrip}</span>`;
            wind.innerHTML = `💨 Wind Speed: <span>${wndspd} km/h</span>`;
            document.getElementById('sunrise').innerHTML = `🌅 Sunrise: <span>${sunriseTime}</span>`;
            document.getElementById('sunset').innerHTML = `🌇 Sunset: <span>${sunsetTime}</span>`;
        })
        .catch(err => alert("Error fetching data! Please try again."));
});
