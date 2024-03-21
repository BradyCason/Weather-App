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
const unitsButton = document.querySelector(".button-57");
const unitsButtonText = document.querySelector(".units-button-text")
const unitsButtonAltText = document.querySelector(".units-button-alt-text")

const weatherAPI = new WeatherAPI();
const background = new Background();

let units = " °F";
let data;

function updateUI(){
    if (data){

        weatherContainer.display = "flex";

        city.innerHTML = "Test";
        city.textContent = data.location.name;
        country.textContent = data.location.country;
        conditionText.textContent = data.current.condition.text;
        conditionImg.src = data.current.condition.icon;

        if(units == " °F"){
            temp.textContent = data.current.temp_f + units;
            feelsLike.innerHTML = "Feels like <b>" + data.current.feelslike_f + units + "</b>";
        }
        else{
            temp.textContent = data.current.temp_c + units;
            feelsLike.innerHTML = "Feels like <b>" + data.current.feelslike_c + units + "</b>";
        }
        wind.innerHTML = "Wind: <b>" + data.current.wind_mph + " mph</b>, Direction: <b>" + data.current.wind_dir + "</b>";
    
        background.updateBackground(data);
    }
    else{
        errorMessage.textContent = "Could not find any data for " + input.value + ". Please search for a city or an area code."

        let regData = {current : {cloud : 25, is_day : 1, wind_mph: 10}}
        background.updateBackground(regData);
    }

    input.value = "";
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    data = await weatherAPI.getCityData(input.value.trim());

    if(data){
        weatherContainer.style.visibility = "visible";
        errorMessageDiv.style.visibility = "hidden";
    }
    else{
        weatherContainer.style.visibility = "hidden";
        errorMessageDiv.style.visibility = "visible";
    }

    updateUI();
})

unitsButton.addEventListener("click", async (event) => {
    event.preventDefault();
    
    if(units == " °F"){
        units = " °C";
        unitsButtonText.innerHTML = "<b>°C</b>";
        unitsButtonAltText.innerHTML = "<b>°F</b>";
    }
    else{
        units = " °F";
        unitsButtonText.innerHTML = "<b>°F</b>";
        unitsButtonAltText.innerHTML = "<b>°C</b>";
    }

    updateUI();
})