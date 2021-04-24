var searchEl = document.querySelector("#search");
var cityName = document.querySelector("#input-field");
var stateName = document.querySelector("#states");

var cityEl = document.querySelector("#cityName");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("wind");
var humidityEl = document.querySelector("humidity");
var uvIndex = document.querySelector("uvi");

var savedCities = [];
var localStorageEl;

var results;




// fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ cityName.value + "&units=imperial"+"&appid=b47242be396209257701a75398843e35&cnt=6")

function mainFunction(){
    searchEl.addEventListener("click", function(event){
        event.preventDefault();
        currentCity();

    if(savedCities.indexOf(cityName.value) === -1){
        savedCities.push(cityName.value);
        localStorage.setItem("cities", JSON.stringify(savedCities))
    }
    else{
        return;
    }
    var listEl = document.createElement("li");
    listEl.textContent = cityName.value 
    stateName.appendChild(listEl);

    listEl.setAttribute("style", "background: red; margin: 10px; border: blue 3px solid; border-radius: 0.5rem; text-align: center")   
    })
}

function currentCity(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+ cityName.value + "&units=imperial"+"&appid=b47242be396209257701a75398843e35")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("this is data ", data);
        cityEl.textContent = data.name + " city name";
    })
   
    
}


function getValues(){
    savedCities = JSON.parse(localStorage.getItem("cities")) || [] ;
    
    for(i = 0; i < savedCities.length; i++){
        var localStorageEl = document.createElement("li");
        localStorageEl.textContent = savedCities[i];
        stateName.appendChild(localStorageEl);
        localStorageEl.setAttribute("style", "background: red; margin: 10px;  border-radius: 0.5rem; text-align: center")
    }
}


function getData(){
    
    stateName.addEventListener("click", function(event){
        var target = event.target.textContent;
        console.log("text target <> ", target)
        for(i = 0; i < savedCities.length; i++){
            if(target === savedCities[i]){
                console.log("check this out <> ", savedCities[i]);
                fetch("https://api.openweathermap.org/data/2.5/weather?q="+ target + "&units=imperial"+"&appid=b47242be396209257701a75398843e35")
                .then(function(response){
                 return response.json();
                })
                .then(function(data){
                 console.log("this is  current data ", data);
                 cityEl.textContent = data.name;
                  })
            }
        }
        
     })
}


getData();
getValues();
mainFunction();

