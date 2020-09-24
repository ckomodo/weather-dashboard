
var searchedCityArr = [];
var stringifiedCity = JSON.parse(localStorage.getItem("city"));
if (stringifiedCity !== null) {
    searchedCityArr = stringifiedCity;
}


var myCityStored = localStorage.getItem("cityInfo");
console.log(myCityStored);
var userCity = $(".user-city");
var searchCityBtn = $(".searchCityBtn");
var cityInfo = $("#cityInfo");
var cityButton = $("#cityButton");


function renderCityButtons() {
    if (searchedCityArr !== null) {
        $(".cityBox").empty();
        for (i = 0; i < searchedCityArr.length; i++) {
            var newButton = $("<button>, <br>")
            newButton.attr("class", "dynamicButton")
            newButton.text(searchedCityArr[i]);
            $(".cityBox").append(newButton);
            

        }
    }

    $(document).on("click", ".dynamicButton", function () {
        console.log($(this).text())
        $("#currentWeather").show();
    })
}
var dynamicButton = $(".dynamicButton")

function displayCityWeather(city) {

    var apiKey = "edd3e012095cf88073c626bc32dbce78"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var myCityInfo = JSON.stringify(response.name);
        console.log(myCityInfo);
        localStorage.setItem("cityInfo", myCityInfo);
        var myCityStored = localStorage.getItem("cityInfo");
        console.log(myCityStored);

        $("#name").text("City: " + response.name);
        $("#temp").text("Temperature: " + response.main.temp + " \u00B0C");
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#windSpeed").text("Wind Speed: " + response.wind.speed);



        var lat = response.coord.lat;
        var lon = response.coord.lon;

        var queryURL1 = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({

            url: queryURL1,
            method: "GET"

        }).then(function (response) {
            console.log(response);
            $("#uvIndex").text("UV Index is: " + response.value);

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

searchCityBtn.on("click", function () {
    // grabbing the search input's value using .val() on a click
    var city = userCity.val().trim();
    if (city !== "") {
        searchedCityArr.push(city);
        console.log(searchedCityArr);
        var stringifiedCity = JSON.stringify(searchedCityArr)
        localStorage.setItem("city", stringifiedCity)

        displayCityWeather(city);
        renderCityButtons();

        // $("#cityButton").clone().attr("id", cityButton + $(this).index()).insertAfter("#cityButton");

        // var newButton = $("<button>")  
        // newButton.attr("#cityButton");
        $("#cityButton").text(city);

        console.log(myCityStored);

        $("#currentWeather").show();
        var myCityStored = JSON.parse(localStorage.getItem("myCityInfo"));
    }

})

dynamicButton.on("click", function(){
    displayCityWeather(city);
})
displayCityWeather(city);
$("#currentWeather").hide();
renderCityButtons();
