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

     arrayEl.push(inputField.value);
    

    for(i = 0; i < arrayEl.length; i++){
        
        var styleDivEl = document.createElement("div");
        styleDivEl.classList = 'list-item flex-row justify-space-between align-center';
        styleDivEl.setAttribute("style", 
        "background-color: rgb(93, 86, 164); margin: 3px; border-radius: 0.5rem; color: white; text-align: center;");


        var inputStateName = document.createElement("span");
        inputStateName.textContent = arrayEl[i];
        styleDivEl.appendChild(inputStateName);
       
    }
    stateName.appendChild(styleDivEl);
    })

}


fetchFunc();
