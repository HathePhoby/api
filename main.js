var pageCounter = 1;
var getAnimals = document.getElementById("animalInfo");
var button = document.getElementById("button");

button.addEventListener("click", function(){
    var requestAPI = new XMLHttpRequest();
    requestAPI.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
    requestAPI.onload = function(){
        var daTa = JSON.parse(requestAPI.responseText);
        renderHTML(daTa);
    };
    requestAPI.send();
    pageCounter++;
    if(pageCounter > 3){
        button.classList.add("hide-me");
    }
});

function renderHTML(data){
    var htmlString = "";
    for(i = 0; i < data.length; i++){
        htmlString += "<p>" + data[i].name + " is a " + data[i].species + " ";

        for(ii = 0; ii < data[i].foods.likes.length; ii++){
            if (ii == 0){
                htmlString += " likes " + data[i].foods.likes[ii];
            } else {
                htmlString += " and  " + data[i].foods.likes[ii];
            }
        }


        for(ii = 0; ii < data[i].foods.dislikes.length; ii++){
            if (ii == 0){
                htmlString += " dislikes " + data[i].foods.dislikes[ii];
            } else {
                htmlString += " and  " + data[i].foods.dislikes[ii];
            }
        }

        htmlString += "</p>";
    }
    getAnimals.insertAdjacentHTML('beforeend', htmlString);
};