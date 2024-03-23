const apiKey = "a2342b59159ba8faa5d22457dccde7f5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        const weatherMain = data.weather[0].main.toLowerCase(); // lowercase the weather condition
        if (weatherMain === "clouds") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherMain === "clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherMain === "rain") {
            weatherIcon.src = "rain.png";
        } else if (weatherMain === "drizzle") {
            weatherIcon.src = "drizzle.png";
        } else if (weatherMain === "mist") {
            weatherIcon.src = "mist.png";
        } else {
            // default icon if condition doesn't match
            weatherIcon.src = "default-icon.png";
        }
    } catch (error) {
        console.error(error.message);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});


