var searchEl = document.querySelector("#search");
var cityName = document.querySelector("#input-field");
var stateName = document.querySelector("#states");

//these are the current day variables
var containerEl = document.querySelector("#container")
var cityEl = document.querySelector("#cityName");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uvi");
var uviContainer = document.querySelector("#uv-index")

//these are five day forecast variables
var fiveDayForecast = document.querySelector("#five-forecast"); 
var dayOne = document.querySelector("#forecastDay1"); 
var dayTwo = document.querySelector("#forecastDay2"); 
var dayThree = document.querySelector("#forecastDay3"); 
var dayFour = document.querySelector("#forecastDay4"); 
var dayFive = document.querySelector("#forecastDay5"); 


var localStorageEl;

var results;

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const today = date.getDate();

const todaysDate = month + "/" + today + "/" + year




// fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ cityName.value + "&units=imperial"+"&appid=b47242be396209257701a75398843e35&cnt=6")

function mainFunction(){
    searchEl.addEventListener("click", function(event){
        event.preventDefault();
        currentCity();
        fiveDayFunc();

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

    listEl.setAttribute("style", "background: red; margin: 10px;  border: blue 3px solid; border-radius: 0.5rem; text-align: center")   
    })
}

function currentCity(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+ cityName.value + "&units=imperial"+"&appid=b47242be396209257701a75398843e35")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("this is data ", data);

        var latitude = data.coord.lat;
        var longitude = data.coord.lon

        console.log('LAT ', latitude);
        console.log('LOG', longitude);
        
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude+ "&lon="+ longitude+ "&include=time&appid=b47242be396209257701a75398843e35")
        .then(function(res){
            return res.json();
        })
        .then(function(rawData){
            console.log("datas >> ", rawData);

            containerEl.setAttribute("style", "padding-right: 50%; margin: 10px; border: black 3px solid");
            cityEl.textContent = data.name + " " + todaysDate + " " + data.weather[0].icon;
            tempEl.textContent = "Temp: " + data.main.temp + " °F";
            humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
            windEl.textContent = "Wind: " + data.wind.speed + " MPH";
        
            if(rawData.current.uvi <= 2){
                uvIndex.textContent =  rawData.current.uvi;
                uvIndex.setAttribute("style", "background-color: green; color: white; border-radius: 1.5rem;  margin-left: 0.5rem");
            }
            else if(rawData.current.uvi <= 7){
                uvIndex.textContent =  rawData.current.uvi;
                uvIndex.setAttribute("style", "background-color: yellow; margin-left: 30px");
            }
            else if(rawData.current.uvi >= 8){
                uvIndex.textContent =  rawData.current.uvi;
                uvIndex.setAttribute("style", "background-color: red");
            }
            
        }) 
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

function cityObjFunc(){}

function fiveDayFunc(){
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ cityName.value + "&units=imperial"+"&appid=b47242be396209257701a75398843e35&cnt=6")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("five day ", data)
        fiveDayForecast.textContent = "5-Day Forecast";
        var day1Lst1 = document.createElement('li');
        var day1Lst2 = document.createElement('li');
        var day1Lst3 = document.createElement('li');
        var day1Lst4 = document.createElement('li');
        var day1Lst5 = document.createElement('li');

        day1Lst1.textContent = "date: " + month + "/" + today + "/" + year
        dayOne.appendChild(day1Lst1);
        day1Lst2.textContent = "icon: " + data.list[1].weather[0].icon;
        dayOne.appendChild(day1Lst2);

        day1Lst3.textContent = "Temp: " + data.list[1].main.temp + " °F";
        dayOne.appendChild(day1Lst3);

        day1Lst4.textContent = "Wind: " + data.list[1].wind.speed + " MPH";
        dayOne.appendChild(day1Lst4);

        day1Lst5.textContent = "Humidity: " + data.list[1].main.humidity + " %";
        dayOne.appendChild(day1Lst5);
       
//============================day 1
        var day2Lst1 = document.createElement('li');
        var day2Lst2 = document.createElement('li');
        var day2Lst3 = document.createElement('li');
        var day2Lst4 = document.createElement('li');
        var day2Lst5 = document.createElement('li');
        
        day2Lst1.textContent = "date: " + month + "/" + (today + 1) + "/" + year
        dayTwo.appendChild(day2Lst1);
        day2Lst2.textContent = "icon: " + data.list[2].weather[0].icon;
        dayTwo.appendChild(day2Lst2);

        day2Lst3.textContent = "Temp: " + data.list[2].main.temp + " °F";
        dayTwo.appendChild(day2Lst3);

        day2Lst4.textContent = "Wind: " + data.list[2].wind.speed + " MPH";
        dayTwo.appendChild(day2Lst4);

        day2Lst5.textContent = "Humidity: " + data.list[2].main.humidity + " %";
        dayTwo.appendChild(day2Lst5);

        //================day 2
        var day3Lst1 = document.createElement('li');
        var day3Lst2 = document.createElement('li');
        var day3Lst3 = document.createElement('li');
        var day3Lst4 = document.createElement('li');
        var day3Lst5 = document.createElement('li');
        

        day3Lst1.textContent = "date: " + month + "/" + (today + 2) + "/" + year
        dayThree.appendChild(day3Lst1);
        day3Lst2.textContent = "icon: "  + data.list[3].weather[0].icon;
        dayThree.appendChild(day3Lst2);

        day3Lst3.textContent = "Temp: " + data.list[3].main.temp + " °F";
        dayThree.appendChild(day3Lst3);

        day3Lst4.textContent = "Wind: " + data.list[3].wind.speed + " MPH";
        dayThree.appendChild(day3Lst4);

        day3Lst5.textContent = "Humidity: " + data.list[3].main.humidity + " %";
        dayThree.appendChild(day3Lst5);

        // ========== day 

        var day4Lst1 = document.createElement('li');
        var day4Lst2 = document.createElement('li');
        var day4Lst3 = document.createElement('li');
        var day4Lst4 = document.createElement('li');
        var day4Lst5 = document.createElement('li');
        

        day4Lst1.textContent = "date: " + month + "/" + (today + 3) + "/" + year
        dayFour.appendChild(day4Lst1);
        day4Lst2.textContent = "icon: " + data.list[4].weather[0].icon;
        dayFour.appendChild(day4Lst2);

        day4Lst3.textContent = "Temp: " + data.list[4].main.temp + " °F";
        dayFour.appendChild(day4Lst3);

        day4Lst4.textContent = "Wind: " + data.list[4].wind.speed + " MPH";
        dayFour.appendChild(day4Lst4);

        day4Lst5.textContent = "Humidity: " + data.list[4].main.humidity + " %";
        dayFour.appendChild(day4Lst5);
        // ==== day 4

        var day5Lst1 = document.createElement('li');
        var day5Lst2 = document.createElement('li');
        var day5Lst3 = document.createElement('li');
        var day5Lst4 = document.createElement('li');
        var day5Lst5 = document.createElement('li');
        

        day5Lst1.textContent = "date: " + month + "/" + (today + 4) + "/" + year
        dayFive.appendChild(day5Lst1);
        day5Lst2.textContent = "icon: " + data.list[5].weather[0].icon;
        dayFive.appendChild(day5Lst2);

        day5Lst3.textContent = "Temp: " + data.list[5].main.temp + " °F";
        dayFive.appendChild(day5Lst3);

        day5Lst4.textContent = "Wind: " + data.list[5].wind.speed + " MPH";
        dayFive.appendChild(day5Lst4);

        day5Lst5.textContent = "Humidity: " + data.list[5].main.humidity + " %";
        dayFive.appendChild(day5Lst5);
    })
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

                 var latitude = data.coord.lat;
                 var longitude = data.coord.lon
         
                 console.log('LAT ', latitude);
                 console.log('LOG', longitude);
                 
                 fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude+ "&lon="+ longitude+ "&include=time&appid=b47242be396209257701a75398843e35")
                 .then(function(res){
                     return res.json();
                 })
                 .then(function(rawData){
                     console.log("datas >> ", rawData);
         
                     containerEl.setAttribute("style", "padding-right: 50%; margin: 10px; border: black 3px solid");
                     cityEl.textContent = data.name + " " + todaysDate + " " + data.weather[0].icon;
                     tempEl.textContent = "Temp: " + data.main.temp + " °F";
                     humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
                     windEl.textContent = "Wind: " + data.wind.speed + " MPH";
                    
                     if(rawData.current.uvi <= 2){
                        uvIndex.textContent =  rawData.current.uvi;
                        uvIndex.setAttribute("style", "background-color: green; color: white; border-radius: 1.5rem;  margin-left: 0.5rem");
                    }
                    else if(rawData.current.uvi <= 7){
                        uvIndex.textContent =  rawData.current.uvi;
                        uvIndex.setAttribute("style", "background-color: yellow; margin-left: 30px");
                    }
                    else if(rawData.current.uvi >= 8){
                        uvIndex.textContent =  rawData.current.uvi;
                        uvIndex.setAttribute("style", "background-color: red");
                    }


                     
                    })
                  })

                  
                  fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ target + "&units=imperial"+"&appid=b47242be396209257701a75398843e35&cnt=6")
                  .then(function(response){
                      return response.json();
                  })
                  .then(function(data){
                      console.log("five day ", data)
                      fiveDayForecast.textContent = "5-Day Forecast";
                      var day1Lst1 = document.createElement('li');
                      var day1Lst2 = document.createElement('li');
                      var day1Lst3 = document.createElement('li');
                      var day1Lst4 = document.createElement('li');
                      var day1Lst5 = document.createElement('li');
              
                      day1Lst1.textContent = "date: " + month + "/" + today + "/" + year
                      dayOne.appendChild(day1Lst1);
                      day1Lst2.textContent = "icon: " + data.list[1].weather[0].icon;
                      dayOne.appendChild(day1Lst2);
              
                      day1Lst3.textContent = "Temp: " + data.list[1].main.temp + " °F";
                      dayOne.appendChild(day1Lst3);
              
                      day1Lst4.textContent = "Wind: " + data.list[1].wind.speed + " MPH";
                      dayOne.appendChild(day1Lst4);
              
                      day1Lst5.textContent = "Humidity: " + data.list[1].main.humidity + " %";
                      dayOne.appendChild(day1Lst5);
                     
              //============================day 1
                      var day2Lst1 = document.createElement('li');
                      var day2Lst2 = document.createElement('li');
                      var day2Lst3 = document.createElement('li');
                      var day2Lst4 = document.createElement('li');
                      var day2Lst5 = document.createElement('li');
                      
                      day2Lst1.textContent = "date: " + month + "/" + (today + 1) + "/" + year
                      dayTwo.appendChild(day2Lst1);
                      day2Lst2.textContent = "icon: " + data.list[2].weather[0].icon;
                      dayTwo.appendChild(day2Lst2);
              
                      day2Lst3.textContent = "Temp: " + data.list[2].main.temp + " °F";
                      dayTwo.appendChild(day2Lst3);
              
                      day2Lst4.textContent = "Wind: " + data.list[2].wind.speed + " MPH";
                      dayTwo.appendChild(day2Lst4);
              
                      day2Lst5.textContent = "Humidity: " + data.list[2].main.humidity + " %";
                      dayTwo.appendChild(day2Lst5);
              
                      //================day 2
                      var day3Lst1 = document.createElement('li');
                      var day3Lst2 = document.createElement('li');
                      var day3Lst3 = document.createElement('li');
                      var day3Lst4 = document.createElement('li');
                      var day3Lst5 = document.createElement('li');
                      
              
                      day3Lst1.textContent = "date: " + month + "/" + (today + 2) + "/" + year
                      dayThree.appendChild(day3Lst1);
                      day3Lst2.textContent = "icon: "  + data.list[3].weather[0].icon;
                      dayThree.appendChild(day3Lst2);
              
                      day3Lst3.textContent = "Temp: " + data.list[3].main.temp + " °F";
                      dayThree.appendChild(day3Lst3);
              
                      day3Lst4.textContent = "Wind: " + data.list[3].wind.speed + " MPH";
                      dayThree.appendChild(day3Lst4);
              
                      day3Lst5.textContent = "Humidity: " + data.list[3].main.humidity + " %";
                      dayThree.appendChild(day3Lst5);
              
                      // ========== day 
              
                      var day4Lst1 = document.createElement('li');
                      var day4Lst2 = document.createElement('li');
                      var day4Lst3 = document.createElement('li');
                      var day4Lst4 = document.createElement('li');
                      var day4Lst5 = document.createElement('li');
                      
              
                      day4Lst1.textContent = "date: " + month + "/" + (today + 3) + "/" + year
                      dayFour.appendChild(day4Lst1);
                      day4Lst2.textContent = "icon: " + data.list[4].weather[0].icon;
                      dayFour.appendChild(day4Lst2);
              
                      day4Lst3.textContent = "Temp: " + data.list[4].main.temp + " °F";
                      dayFour.appendChild(day4Lst3);
              
                      day4Lst4.textContent = "Wind: " + data.list[4].wind.speed + " MPH";
                      dayFour.appendChild(day4Lst4);
              
                      day4Lst5.textContent = "Humidity: " + data.list[4].main.humidity + " %";
                      dayFour.appendChild(day4Lst5);
                      // ==== day 4
              
                      var day5Lst1 = document.createElement('li');
                      var day5Lst2 = document.createElement('li');
                      var day5Lst3 = document.createElement('li');
                      var day5Lst4 = document.createElement('li');
                      var day5Lst5 = document.createElement('li');
                      
              
                      day5Lst1.textContent = "date: " + month + "/" + (today + 4) + "/" + year
                      dayFive.appendChild(day5Lst1);
                      day5Lst2.textContent = "icon: " + data.list[5].weather[0].icon;
                      dayFive.appendChild(day5Lst2);
              
                      day5Lst3.textContent = "Temp: " + data.list[5].main.temp + " °F";
                      dayFive.appendChild(day5Lst3);
              
                      day5Lst4.textContent = "Wind: " + data.list[5].wind.speed + " MPH";
                      dayFive.appendChild(day5Lst4);
              
                      day5Lst5.textContent = "Humidity: " + data.list[5].main.humidity + " %";
                      dayFive.appendChild(day5Lst5);
                  })
                
            }
        }  
     })
}

getData();
getValues();
mainFunction();



