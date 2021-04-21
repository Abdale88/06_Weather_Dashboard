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
     console.log(arrayEl);

    for(i = 0; i < arrayEl.length; i++){
        
        var Mydiv = document.createElement("div");
        Mydiv.classList = 'list-item flex-row justify-space-between align-center';

        var mySpan = document.createElement("span");
        mySpan.textContent = arrayEl[i];
        Mydiv.appendChild(mySpan);
       
    }
    stateName.appendChild(Mydiv);
    })

}


fetchFunc();
