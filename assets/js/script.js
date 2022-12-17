var APIkey = '0849b899254dd1cda16c59bb88b16cbd'

var input = document.getElementById('search-city')
var serchBtn = document.getElementById('search-button')
searchBtn.addEventListner('click', SearchCity)

var city = input.value;
var city = [];

function SearchCity(city) {
    fetch ('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=0849b899254dd1cda16c59bb88b16cbd' )
        .then((response) => response.json())
        .then(function (data) {
            console.log(data);
          });
  }
    






