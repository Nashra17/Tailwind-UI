const apiKey = "d9723bddf295e6647ca7076d621094e8";
const searchInput = document.querySelector(".search-bar")
const searchBtn = document.querySelector(".btn")
const city = document.querySelector(".city")
const windspeed = document.querySelector(".wind")
const temp = document.querySelector(".temp")
const des = document.querySelector(".description")
const humidity = document.querySelector(".humidity")
const imageIcon = document.querySelector(".icon")
const weather = document.querySelector(".weather")

navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude

    const getmyWeather = async () => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
      const response = await fetch(url);
      const data = await response.json();

    //   const city = document.querySelector(".city")
    //   const windspeed = document.querySelector(".wind")
    //   const temp = document.querySelector(".temp")
    //   const des = document.querySelector(".description")
    //   const humidity = document.querySelector(".humidity")
    //   const imageIcon = document.querySelector(".icon")

      const {icon,description} = data.weather[0]

      city.innerHTML = "Weather in " + data.name
      temp.innerHTML = Math.round(data.main.temp) + "°C"
      windspeed.innerHTML = "Wind Speed : " + data.wind.speed + " km/h"
      humidity.innerHTML = "Humidity : " + data.main.humidity + "%"
      imageIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png"
      des.innerHTML = description

    } catch (error) {
        console.log(error)
        }
    }

getmyWeather()

})

const getWeatherByCity = async () => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=`;
    const response = await fetch(url + searchInput.value + `&appid=${apiKey}&units=metric` );
      const data = await response.json();

    if(response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }else {

      const {icon,description} = data.weather[0]

      city.innerHTML = "Weather in " + data.name
      temp.innerHTML = Math.round(data.main.temp) + "°C"
      windspeed.innerHTML = "Wind Speed : " + data.wind.speed + " km/h"
      humidity.innerHTML = "Humidity : " + data.main.humidity + "%"
      imageIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png"
      des.innerHTML = description

      document.querySelector(".error").style.display = "none"
        document.querySelector(".weather").style.display = "block"
    }
}

searchBtn.addEventListener("click", () =>{
    getWeatherByCity(searchInput.value)
})

document.addEventListener('keydown',(e) => {
    if (e.key==='Enter'){
        getWeatherByCity(searchInput.value)
    }
  });