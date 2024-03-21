import {WeatherAPI} from "./weatherAPI.js"
import {Background} from "./background.js"
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
const errorMessageDiv = document.querySelector(".error-message-div");
const errorMessage = document.querySelector(".error-message");

const weatherAPI = new WeatherAPI();
const background = new Background();

let units = "_f";

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let data = await weatherAPI.getCityData(input.value.trim());

    if (data){
        weatherContainer.style.visibility = "visible";
        errorMessageDiv.style.visibility = "hidden";

        weatherContainer.display = "flex";

        city.innerHTML = "Test";
        city.textContent = data.location.name;
        country.textContent = data.location.country;
        conditionText.textContent = data.current.condition.text;
        conditionImg.src = data.current.condition.icon;
        temp.textContent = data.current.temp_f + " °F";
        feelsLike.innerHTML = "Feels like <b>" + data.current.feelslike_f + " °F</b>";
        wind.innerHTML = "Wind: <b>" + data.current.wind_mph + " mph</b>, Direction: <b>" + data.current.wind_dir + "</b>";
    
        background.updateBackground(data);
    }
    else{
        weatherContainer.style.visibility = "hidden";
        errorMessageDiv.style.visibility = "visible";
        errorMessage.textContent = "Could not find any data for " + input.value + ". Please search for a city or an area code."

        let regData = {current : {cloud : 25, is_day : 1, wind_mph: 10}}
        background.updateBackground(regData);
    }

    input.value = "";
})