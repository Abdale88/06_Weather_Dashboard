var searchEl = document.querySelector("#search");
var inputField = document.querySelector("#input-field");
var stateName = document.querySelector("#states");

arrayEl = [];

function fetchFunc(){
    searchEl.addEventListener("click", function(event){
        event.preventDefault();
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ inputField.value + "&appid=b47242be396209257701a75398843e35&cnt=6")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("this is data >> ", data);
    })

    })

}


fetchFunc();
