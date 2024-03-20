import {WeatherAPI} from "./weatherAPI.js"
const form = document.getElementById("form");
const input = document.getElementById("search-input");
const weatherContainer = document.querySelector(".weather-container")
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const conditionText = document.querySelector(".condition-text");
const conditionImg = document.querySelector(".condition-img");
const temp = document.querySelector(".temp");
const feelsLike = document.querySelector(".feels-like");
const wind = document.querySelector(".wind");
const backgroundImg = document.querySelector(".background-img");

const weatherAPI = new WeatherAPI();

let units = "_f";

async function setBackgroundImg(search){
    
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let data = await weatherAPI.getCityData(input.value.trim());

    if (data){
        weatherContainer.style.visibility = "visible";

        weatherContainer.display = "flex";

        city.innerHTML = "Test";
        city.textContent = data.location.name;
        country.textContent = data.location.country;
        conditionText.textContent = data.current.condition.text;
        conditionImg.src = data.current.condition.icon;
        temp.textContent = data.current.temp_f;
        feelsLike.textContent = "Feels like " + data.current.feelslike_f + "&degF";
        wind.textContent = "Wind: " + data.current.wind_mph + " mph, Direction: " + data.current.wind_dir;
    
        setBackgroundImg(data.current.condition.text);
    }
    else{
        weatherContainer.style.visibility = "hidden";
    }

    input.value = "";
})