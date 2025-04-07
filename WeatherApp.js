
const apiKey = "31588f223f6d7d69c50f060e829394f3";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found. Please enter a valid city.");
            return;
        }

        // Update UI with Weather Data
        document.getElementById("city-name").innerText = data.name;
        document.getElementById("temperature").innerText = `${data.main.temp}°C`;
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity;
        document.getElementById("wind-speed").innerText = data.wind.speed;
        document.getElementById("pressure").innerText = data.main.pressure;

        // Weather Icon
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById("weather-icon").src = iconUrl;
        document.getElementById("weather-icon").alt = data.weather[0].description; // Add alternative text

        // Change background color based on temperature
        updateBackground(data.main.temp);
    } catch (error) {
        alert("Error fetching weather data. Try again later.");
    }
}

// Function to change background gradient based on temperature
function updateBackground(temp) {
    let bg;
    if (temp <= 10) {
        bg = "linear-gradient(to right, #4facfe, #00f2fe)"; // Cold - Blue
    } else if (temp > 10 && temp <= 25) {
        bg = "linear-gradient(to right, #ffafbd, #ffc3a0)"; // Mild - Warm Orange
    } else {
        bg = "linear-gradient(to right, #ff758c, #ff7eb3)"; // Hot - Reddish
    }
    document.body.style.background = bg;
}
