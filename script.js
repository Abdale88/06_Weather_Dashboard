var searchEl = document.querySelector("#search");
var inputField = document.querySelector("#input-field");
var stateName = document.querySelector("#states");

var arrayEl = [];
var savedCities;

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
    
     myFunc();

    })
   
}


function myFunc(){
     localStorage.setItem("cities", JSON.stringify(arrayEl))

    savedCities = JSON.parse(localStorage.getItem("cities")) ;
    console.log("saves>> ", savedCities)
    document.getElementById("states").textContent = savedCities; 
    console.log("savedd>> ", savedCities[0]);
}
   










// for(i = 0; i < arrayEl.length; i++){
        
    //     var styleDivEl = document.createElement("div");
    //     styleDivEl.classList = 'list-item flex-row justify-space-between align-center';
    //     styleDivEl.setAttribute("style", 
    //            "background-color: rgb(93, 86, 164); margin: 3px; border-radius: 0.5rem; color: white; text-align: center;");


    //     var inputStateName = document.createElement("span");
    //     inputStateName.textContent = arrayEl[i];
    // styleDivEl.appendChild(inputStateName);
       
    // }
    // stateName.appendChild(styleDivEl);




   

  // var forms = stateName.textContent
    // localStorage.getItem("states", stateName.textContent);
    //  console.log('this is forms>> ', forms);


// // 

// localStorage.setItem("state", stateName.textContent);
//     document.getElementById("states").value = localStorage.getItem(stateName).value;


// event.preventDefault();
//     var button = event.target;
//     var parent = button.closest("div.row");
//     var id = parent.id;
//     var textEl = parent.querySelector("textarea").value;
  
//     storage4hr =  textEl;
    
//     localStorage.setItem("storage4hr", storage4hr); 
   
  
//   });
  
//   document.getElementById("4hr-Textarea").value = localStorage.getItem("storage4hr");
// // 

fetchFunc();
