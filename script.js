//TODO: set up page layout
//TODO: searched cities should be clickable
//TODO: add event listener to the search button
//TODO: include a 5-day weather forecast
//TODO: a box to display the weather in 
//TODO: another box to display 5-day forecast of the same city
//TODO: save all searched cities in a form and on local storage





//TODO: add 5-day forecast, add css, local storage

//(https://openweathermap.org/api)
// put the input in a variable first
var userCity = $(".user-city");
var searchCityBtn = $(".searchCityBtn");
var cityInfo = $("#cityInfo");
// var myCityInfo = JSON.stringify(cityInfo);


// grabbing the search input's value using .val() on a click

searchCityBtn.on("click", function () {
    var city = userCity.val();
    displayCityWeather(city)
    localStorage.setItem("cityInfo", myCityInfo);
    var myCityInfo = JSON.stringify(cityInfo);
    var myCityStored = JSON.parse(localStorage.getItem("myCityInfo"));
    console.log(myCityStored);

})

    function displayCityWeather(city) {
    
    var apiKey = "edd3e012095cf88073c626bc32dbce78"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        $("#name").text("City: " + response.name);
        $("#temp").text("Temperature: " + response.main.temp + " \u00B0C");
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#windSpeed").text("Wind Speed: " + response.wind.speed);



        var lat = response.coord.lat;
        var lon = response.coord.lon;

        var queryURL1 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        $.ajax({

            url: queryURL1,
            method: "GET"

        }).then(function (response) {
            console.log(response);
            $("#uvIndex").text("UV Index is: " + lat + lon);

        })



    });

    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=metric";

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        $("#name").text("City: " + response.city.name);
        $("#temp").text("Temperature: " + response.list[0].main.temp + " \u00B0C");
        $("#humidity").text("Humidity: " + response.list[0].main.humidity);
        $("#windSpeed").text("Wind Speed: " + response.list[0].wind.speed);


    });



}

//$(document).on("click", ".city-button", displayCityWeather);

{/* <button class="city-button" data-name="Bellevue"></button>
<button class="city-button" data-name="San Diego"></button>
<button class="city-button" data-name="Los Angeles"></button> */}