var cityNames = ["Paris", "New York", "Bangkok"];
var i = 0;

/* actualise every minute */
function displayLoop()
{
    setTimeout(displayCityWeather(cityNames), 6000);
}
displayLoop();


/* add a new widget */
function checkCity(cityToAdd)
{
    let x = 0;
    while (cityNames[x]) {
        if (cityNames[x].toUpperCase() === cityToAdd.toUpperCase()) {
            return 0;
        }
        x = x + 1;
    }
    return 1;
}

function addCityToTab(val) {
    let cityToAdd = document.getElementById("cityName").value;
    if (checkCity(cityToAdd) === 1)
        cityNames.push(cityToAdd);
    i = 0;
    displayCityWeather(cityNames);
    return cityNames;
}


/* delete widget */
function removeCityTab(id)
{
    let i = 0;
    while (cityNames[i]) {
        if (cityNames[i].toUpperCase() === id.toUpperCase())
            cityNames.splice(i, 1);
        i = i + 1;
    }
}

function deleteDiv(object) {
    let id = object.parentNode.id;
    let div = document.getElementById(id);
    removeCityTab(id);
    object.parentNode.parentNode.removeChild(div);
}


/* change header button */
var settings = 0;
function changeSettings() {
    if (document.getElementById("button").innerHTML === "Go to Settings") {
        settings = 1;
        i = 0;        
        document.getElementById("button").innerHTML = "Go to Home";
        document.body.innerHTML += '<div class="textbox" id="txt"><input id="cityName" placeholder="Add a new city"></input><button id="getCityWeather" onclick="addCityToTab();"><b>Add</b></button></div>'
        displayCityWeather(cityNames);
    }
    else if (document.getElementById("button").innerHTML === "Go to Home"){
        i = 0;
        settings = 0;
        document.getElementById("button").innerHTML = "Go to Settings"        
        displayCityWeather(cityNames);
        document.body.removeChild(document.getElementById("txt"));        
    }
}


/* Call to openWeather API */
function displayCityWeather(cityNames) {
    var close = "";
    if (settings === 1) {
        close = '<a href="#" class="close" onclick="deleteDiv(this)"></a>'
    }
    document.getElementById("displayWeather").innerHTML = "";
    while (cityNames[i]) {
        window.fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityNames[i]}&units=metric&appid=21b10dd0ee5f3d6bd052c6f63604129a`)
        .then(function(res) {
            var getJson = res.json();
            return getJson;
        })
        .then(function(resJson) {
            var iconcode = resJson.weather[0].icon;
            document.getElementById("displayWeather").innerHTML += `<div id="${resJson.name}" class="widget">${close}<div class ="name">${resJson.name}, ${resJson.sys.country}</div><div class="temp">temperature: ${resJson.main.temp}°C</div><img id="wicon" src="http://openweathermap.org/img/w/${iconcode}.png" alt="Weather icon"></div>`;
            return resJson;
        })
        i = i + 1;
    }   
}