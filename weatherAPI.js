class WeatherAPI{
    constructor(){
        this.apiKey = "60db3947778f4f079dc23044241803";
    }

    async getCityData(city){
        try{
            let response = await fetch("https://api.weatherapi.com/v1/current.json?key=" + this.apiKey + "&q=" + city, {mode: 'cors'});
            let data = await response.json();
            if(response.ok){
                return (data);
            }
        }catch (error){
            console.log("in error")
            console.log(error)
        }
    }
}

export {WeatherAPI}