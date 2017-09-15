$(document).ready(function(){

  function getWeather(position) {
    var currentPos = position.coords;
    document.getElementById("latitude").innerHTML = "<p>" + (`Latitude : ${currentPos.latitude}`) + "</p>";
    document.getElementById("longitude").innerHTML = "<p>" + (`Longitude: ${currentPos.longitude}`) + "</p>";
    document.getElementById("moreOrLess").innerHTML = "<p>" + (`More or less ${currentPos.accuracy} meters.`) + "</p>";

    $.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC9OxmAbzqqnkNGex-Q_fA0uLgFq1KhhW4',function(data) {
    lat = currentPos.latitude;
    lon = currentPos.longitude;
    console.log(data); //returns the object to work with
    })
  };

  //log eventual errors
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(getWeather, error);

  $.get("https://ipinfo.io", function(response) {
      document.getElementById("locality").innerHTML = "<p>" + (response.city) + "</p>";
  }, "jsonp");
});

//making the DS API call --- currently returning an error since the CORS isn't implemented
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.darksky.net/forecast/2ada2a6efa4d7c2713fd4b278f55b8c6/42.3601,-71.0589", false);
xhr.send();

console.log(xhr.status);
console.log(xhr.statusText);
