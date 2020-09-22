
var myCityStored = localStorage.getItem("cityInfo");
console.log(myCityStored);
$(".cityBox").hide();



var userCity = $(".user-city");
var searchCityBtn = $(".searchCityBtn");
var cityInfo = $("#cityInfo");
var cityButton = $("#cityButton");

$("h1").css({"color": "green"}) // change html text style 
$(".card-body").css({"background-color": "snow"})
// grabbing the search input's value using .val() on a click

searchCityBtn.on("click", function () {
    var city = userCity.val().trim();
    displayCityWeather(city)

    $("#cityButton").clone().attr("id", cityButton + $(this).index()).insertAfter("#cityButton");

    // var newButton = $("<button>")  
    // newButton.attr("#cityButton");
    $("#cityButton").text(city);

    console.log(myCityStored);
    
    $(".cityBox").show();
    var myCityStored = JSON.parse(localStorage.getItem("myCityInfo"));

})

    function displayCityWeather(city) {
    
    var apiKey = "edd3e012095cf88073c626bc32dbce78"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var myCityInfo = JSON.stringify(response.name);
        localStorage.setItem("cityInfo", myCityInfo);
        var myCityStored = localStorage.getItem("cityInfo");
        console.log(myCityStored);

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
