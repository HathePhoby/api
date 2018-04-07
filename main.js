//counters & getting html ellements
var pageCounter = 0;
var getD= document.getElementById("getD");
var button = document.getElementById("button");
var CountryList = ["Denmark", "London", "Sweeden", "Norway", "Belgium", "Cyprus", "Finland", "France", "Germany", "Greece", "Hungary", "Italy",  "Malta", "Poland", "Romania", "Portugal", "Spain", "Ireland", "Luxembourg"];
var tempNumber = "<p>" + "</p>";
var newData = [];

//on click get data 
button.addEventListener("click", function(){
    var requestAPI = new XMLHttpRequest();
    var weatherr = new XMLHttpRequest();
   
    requestAPI.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+ CountryList[pageCounter] + '&APPID=cf5406fcc43542c2fb548d1fd8713505&units=metric');
    weatherr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=denmark&APPID=cf5406fcc43542c2fb548d1fd8713505&units=metric');
      
    requestAPI.onload = function(){
        var daTa = JSON.parse(requestAPI.responseText);
        renderHTML(daTa);
    };
    requestAPI.send();

    weatherr.onload = function(){
        var DaTa = JSON.parse(weatherr.response);
        charts(DaTa);
    };
    weatherr.send();
    
    pageCounter++;
    if(pageCounter == 18){
        pageCounter = 0;
    }
});

//render and display data
function renderHTML(data){
    var htmlString = "";
    var tem = 0;

    

    tem = data.main.temp;
    newData.push(tem);
    htmlString += "<p>" + data.name + "  " + data.sys.country + " ";
   
   // htmlString += " " + data.main.temp + " ";
    if(data.main.temp > 0){
        htmlString += " + " + data.main.temp + " ";
    } else {
        htmlString += " - " + data.main.temp + " ";
    }
    htmlString += "</p>";
   // console.log(tem);
    console.log(newData);
    getD.insertAdjacentHTML('beforeend', htmlString);
  
};

//charts here 
function charts(data){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    const temperatureData = parseInt(data.main.temp);
    //const windData = parseInt(data.wind.speed);
   // const cloudsData = parseInt(data.clouds.all);

    function drawVisualization() {}

    function drawChart() {
      var dataa = google.visualization.arrayToDataTable([
        ['Temperatyre', 'Wind', 'Clouds'],
        [  newData[0],      newData[0],   newData[0]],
        [   newData[1],       newData[1],    newData[1]],
        [   newData[2],       newData[2],    newData[2]],
        [  newData,      newData,   newData],
        [  newData,      newData,   newData],
        [  newData,      newData,   newData],
        [  newData,      newData,   newData]
       
        
      ]);

      var options = {
        title: 'Temper, wind s',
         hAxis: {title: 'Temperatyre', minValue: 0, maxValue: 22},
          vAxis: {title: 'Wind', minValue: 0, maxValue: 15},
          xAxis: {title: 'Clouds', minValue: 0, maxValue: 15},
  
        legend: 'none'
      };
      
      var chart = new google.visualization.ScatterChart(document.getElementById('chart_div2'));
      chart.draw(dataa, options);
    }

}
