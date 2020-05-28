const api = 
{
    key: "748b580883b3a3723d6faa54d9b524c7",
    base: "https://api.openweathermap.org/data/2.5/"
}

var checkbox = document.querySelector(".checkbox");

function locationLoad()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(autoResults);
    }else
    {
        alert("GeoLocation is not supported by this browser. Please search for a location");
    }
}

function autoResults(position)
{
    var unit;
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    if(checkbox.checked)
    {
        unit = "metric";
    }else
    {
        unit = "imperial";
    }
    fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=${unit}&APPID=${api.key}`)
        .then(weather => weather.json())
        .then(function(data)
        {
            displayResults(data, unit);
        })
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt)
{
    var unit;
    if(checkbox.checked)
    {
        unit = "metric";
    }else
    {
        unit = "imperial";
    }

    if(evt.keyCode == 13)
    {
        getResults(searchbox.value, unit);
        searchbox.value = "";
    }
}

function getResults(query, unit)
{
    fetch(`${api.base}weather?q=${query}&units=${unit}&APPID=${api.key}`)
        .then(weather => weather.json())
        .then(function(data)
        {
            displayResults(data, unit);
        })
}



function displayResults(weather, unit)
{
    var units;
    if(unit == "metric")
    {
        units = "°C";
    }else if(unit == "imperial")
    {
        units = "°F";
    }

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>${units}</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    bgChooser(weather.weather[0].main);

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)} ${units} / ${Math.round(weather.main.temp_max)} ${units}`;
}

function dateBuilder(d)
{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}

function bgChooser(weather)
{
    var bg;
    switch(weather)
    {
        case "Ash":
            bg = "Ash.jpg";
            break;
        case "Clear":
            bg = "Clear.jpg";
            break;
        case "Clouds":
            bg = "Clouds.jpg";
            break;
        case "Drizzle":
            bg = "Drizzle.jpg";
            break;
        case "Dust":
            bg = "Dust.jpg";
            break;
        case "Fog":
            bg = "Fog.jpg";
            break;
        case "Haze":
            bg = "Haze.jpg";
            break;
        case "Mist":
            bg = "Mist.jpg";
            break;
        case "Rain":
            bg = "Rain.jpg";
            break;
        case "Sand":
            bg = "Sand.jpg";
            break;
        case "Smoke":
            bg = "Smoke.jpg";
            break;
        case "Snow":
            bg = "Snow.jpg";
            break;
        case "Squall":
            bg = "Squall.jpg";
            break;
        case "Thunderstorm":
            bg = "Thunderstorm.jpg";
            break;
        case "Tornado":
            bg = "Tornado.jpg";
            break;
        default:
            bg = "bg.jpg";
            break;
    }

    document.body.style.backgroundImage = `url('assets/MEDIA/IMG/${bg}')`;
}

checkbox.addEventListener('change', function()
{
    if(this.checked)
    {
        tempChange("metric");
    }else
    {
        tempChange("imperial");
    }
});

function tempChange(unit)
{
    var location = document.querySelector('.location .city').innerText;
    if(unit == "metric")
    {
        getResults(location, "metric");
    }else if(unit == "imperial")
    {
        getResults(location, "imperial");
    }
}