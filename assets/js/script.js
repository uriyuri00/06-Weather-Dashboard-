var inputEl = document.getElementById('input-city');
var searchEl = document.getElementById('search-button');
var cityName = document.getElementById('city-name');
var currentTemp = document.getElementById('current-temp');
var currentWind = document.getElementById('current-wind');
var currenthumid = document.getElementById('current-humid');
var historyEl = document.querySelector('.history')

var histories = JSON.parse(localStorage.getItem('cities')) || [];




searchEl.addEventListener("click", function () {
    var city = inputEl.value.trim();
    getApiData(city);
    histories.push(city)
    localStorage.setItem('cities',JSON.stringify(histories));
    console.log(city);
    inputEl.value = "";
    getApiForecast(city);
    renderHistory();

});
function renderHistory(){
    historyEl.innerHTML = "";

        for (var i = 0; i < histories.length; i++) {
            var city = histories[i];
                
            var historyArray = document.createElement('li');
            historyArray.textContent = city;
            
            historyArray.setAttribute('value', city)

            historyArray.onclick = openCityagain
            historyEl.appendChild(historyArray);
        
        }
};
        
function openCityagain(event) {
    console.log(event.target.value);
    getApiData(event.target.value);
}
/*li.addEventListener("click", function () {
    var historiesList = historyEl
    historiesList.setAttribute('cities',historyEl[i])
    historiesList.onclick = getApiData(city);


});*/


function getApiData(city) {
    fetch ('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0849b899254dd1cda16c59bb88b16cbd&units=imperial' )
        .then((res) => res.json())
        .then((res) => {
            console.log(res);

            var todayDate = new Date(res.dt * 1000);
            var day = todayDate.getDate();
            var month = todayDate.getMonth() + 1;
            var year = todayDate.getFullYear();
            var iconcode = res.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";


            cityName.innerHTML =  (city) + "      (" + month + "/" + day + "/" + year +")";
            $('#icon').attr('src', iconurl);
            currentTemp.innerHTML = "Temp: " + Math.floor(res.main.temp) + " &#176F";
            currentWind.innerHTML = "Wind Speed: " + Math.floor(res.wind.speed) + " mph";
            currenthumid.innerHTML = "Humidity: " + Math.floor(res.main.humidity) + "%";
                
            })

}



function getApiForecast(city) {
    
    fetch ('http://api.openweathermap.org/data/2.5/forecast/?q=' + city + '&appid=0849b899254dd1cda16c59bb88b16cbd&units=imperial' )
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            var forecast = document.querySelectorAll(".forecast")


            for (var i = 0; i < forecast.length; i++) {
                forecast[i].innerHTML= '' ;

                var forecastIndex = i * 8 + 4
                var forecastDate = new Date(res.list[forecastIndex].dt * 1000);
                var forecastday = forecastDate.getDate();
                var forecastmonth = forecastDate.getMonth() + 1;
                var forecastyear = forecastDate.getFullYear();
                var Ficoncode = res.list[forecastIndex].weather[0].icon;
                var Ficonurl = "http://openweathermap.org/img/wn/" + Ficoncode + "@2x.png";
    

                var forecastDate = document.createElement('h5')
                forecastDate.innerHTML = "(" + forecastmonth + "/" + forecastday + "/" + forecastyear +")";
                forecast[i].append(forecastDate);

                var futureicon = document.createElement('img')
                futureicon.setAttribute('src', Ficonurl)
                forecast[i].append(futureicon)


                var futureTemp = document.createElement('p')
                futureTemp.innerHTML = "Temp: " + Math.floor(res.list[forecastIndex].main.temp) + " &#176F";
                forecast[i].append(futureTemp)

                var futureWind = document.createElement('p')
                futureWind.innerHTML = "Wind Speed: " + Math.floor(res.list[forecastIndex].wind.speed) + " mph";
                forecast[i].append(futureWind)

                var futurehumid = document.createElement('p')
                futurehumid.innerHTML = "Humidity: " + Math.floor(res.list[forecastIndex].main.humidity) + "%";
                forecast[i].append(futurehumid)

            }



        });

}

