
var searchedCityArr = [];
var stringifiedCity = JSON.parse(localStorage.getItem("city"));
if (stringifiedCity !== null) {
    searchedCityArr = stringifiedCity;
}
$(".hideInfo").hide();

var myCityStored = localStorage.getItem("cityInfo");
console.log(myCityStored);
var userCity = $(".user-city");
var searchCityBtn = $(".searchCityBtn");
var cityInfo = $("#cityInfo");
var uvIndex = $("#uvIndex");
// var cityButton = $("#cityButton");



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
        // $("#currentWeather").show();
        // displayCityWeather(city);
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
            $("div", "#uvIndex").text("UV Index is: " + response.value);

        })

        if(uvIndex<2){

            $("#uvIndex").css("background-color", "Green")
        }

    });

    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=metric";

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $(".hideInfo").show();

        $("#name1").text("City: " + response.city.name);
        $("#temp1").text("Temperature: " + response.list[0].main.temp + " \u00B0C");
        $("#humidity1").text("Humidity: " + response.list[0].main.humidity);
        $("#windSpeed1").text("Wind Speed: " + response.list[0].wind.speed);
        // $("#uvIndex1").text("UV Index is: " + response.list[0].value);

        $("#name2").text("City: " + response.city.name);
        $("#temp2").text("Temperature: " + response.list[1].main.temp + " \u00B0C");
        $("#humidity2").text("Humidity: " + response.list[1].main.humidity);
        $("#windSpeed2").text("Wind Speed: " + response.list[1].wind.speed);
        

        $("#name3").text("City: " + response.city.name);
        $("#temp3").text("Temperature: " + response.list[2].main.temp + " \u00B0C");
        $("#humidity3").text("Humidity: " + response.list[2].main.humidity);
        $("#windSpeed3").text("Wind Speed: " + response.list[2].wind.speed);


        $("#name4").text("City: " + response.city.name);
        $("#temp4").text("Temperature: " + response.list[3].main.temp + " \u00B0C");
        $("#humidity4").text("Humidity: " + response.list[3].main.humidity);
        $("#windSpeed4").text("Wind Speed: " + response.list[3].wind.speed);


        $("#name5").text("City: " + response.city.name);
        $("#temp5").text("Temperature: " + response.list[4].main.temp + " \u00B0C");
        $("#humidity5").text("Humidity: " + response.list[4].main.humidity);
        $("#windSpeed5").text("Wind Speed: " + response.list[4].wind.speed);
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
// displayCityWeather(city);
$("#currentWeather").hide();
renderCityButtons();
