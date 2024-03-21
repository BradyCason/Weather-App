class Background {
    constructor() {
        this.scroller = document.querySelector(".scroller");
    }

    setURL(url, opacity){
        this.scroller.style.background = "url(" + url + ") repeat-x";
        this.scroller.style.backgroundSize = "contain";
        this.scroller.style.opacity = opacity;
    }

    setAnimationSpeed(speed){
        let time;
        if (speed == 0){
            time = 10000
        }
        else{
            time = 1000 / speed;
        }
        this.scroller.style.animation = "scrollBackground " + time.toString() + "s linear infinite"
    }

    updateBackground(data){
        //clear background
        if (data.current.cloud >= 20){

            // set cloud speed to data.current.wind_mph
            this.setAnimationSpeed(data.current.wind_mph);
            
            if(data.current.is_day){
                document.querySelector("body").style.backgroundColor = "#2081db"
                this.setURL('./images/clouds2.png', 0.7)
            }
            else{
                document.querySelector("body").style.backgroundColor = "#04000e"
                this.setURL('./images/clouds2.png', 0.4)
                document.querySelector(".weather-container").style.color = "white";
            }
        }
        else {
            if (data.current.is_day){
                this.setURL('./images/sunny.jpg', 1)
            }
            else{
                this.setURL('./images/night.avif', 1)
                document.querySelector(".weather-container").style.color = "white";
            }
            this.setAnimationSpeed(0);
        }
        if (data.current.precip_in >= 1){
            // add rain
        }
    }
}

export {Background}