//counters & getting html ellements
var pageCounter = 0;
var getD= document.getElementById("getD");
var hottest = document.getElementById("Hottest");
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
    var tem = [];
    var countryName = data.name;

    tem = data.main.temp;
   
    newData.push(tem);
    //console.log(newData);
    htmlString += "<p>" + data.name + "  " + data.sys.country + " ";

    if(data.main.temp > 0){
        htmlString += " + " + data.main.temp + " ";
    } else {
        htmlString += " - " + data.main.temp + " ";
    }
    htmlString += "</p>";
    getD.insertAdjacentHTML('beforeend', htmlString);

    newData.sort(function(a,b){
        return a-b;
        console.log(newData);
    })
  
        return [].slice.call(arguments).sort(function(a,b){ 
          return b - a; 
          hottest.insertAdjacentHTML('beforeend', "<br>" + tem + " " + countryName);
        }); 
 
  
  
};

//charts here 
function charts(data){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    const temperatureData = parseInt(data.main.temp);
    function drawVisualization() {}

    function drawChart() {
      var dataa = google.visualization.arrayToDataTable([

        ['Temperatyre', 'Wind'],
        [  newData[0],      newData[0]],
        [   newData[1],       newData[1]],
        [   newData[2],       newData[2]],
        [  newData[3],      newData[3]],
        [  newData[7],      newData[6]],
        [  newData[8],      newData[8]],
        [  newData[9],      newData[9]],
        [  newData[10],      newData[10]],
        [  newData[11],      newData[11]],
        [  newData[12],      newData[12]],
        [  newData[13],      newData[13]],
        [  newData[14],      newData[14]],
        [  newData[15],      newData[15]],
        [  newData[16],      newData[16]],
        [  newData[17],      newData[17]],
        [  newData[18],      newData[18]]
            
      ]);

      var options = {
        title: 'Temperature',
        hAxis: {title: 'X', minValue: 0, maxValue: 22},
        vAxis: {title: 'Y', minValue: 0, maxValue: 15},        
        legend: 'none'
      };
      
      var chart = new google.visualization.ScatterChart(document.getElementById('chart_div2'));
      chart.draw(dataa, options);

      var Data = google.visualization.arrayToDataTable([
        ['Year', 'Temp'],
        [  newData[0],      newData[0]],
        [   newData[1],       newData[1]],
        [   newData[2],       newData[2]],
        [  newData[3],      newData[3]],
        [  newData[7],      newData[6]],
        [  newData[8],      newData[8]],
        [  newData[9],      newData[9]],
        [  newData[10],      newData[10]],
        [  newData[11],      newData[11]],
        [  newData[12],      newData[12]],
        [  newData[13],      newData[13]],
        [  newData[14],      newData[14]],
        [  newData[15],      newData[15]],
        [  newData[16],      newData[16]],
        [  newData[17],      newData[17]],
        [  newData[18],      newData[18]]
      ]);

      var options = {
        title: 'Line chart',
        curveType: 'function',
        legend: { position: 'bottom' }
      };

      var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
      chart.draw(Data, options);
    }

}


