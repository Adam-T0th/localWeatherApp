$(document).ready(function(){
  
  function getWeather(position) {
    
    var currentPos = position.coords;
    document.getElementById("latitude").innerHTML = "<p>" + (`Latitude : ${currentPos.latitude}`) + "</p>";
    document.getElementById("longitude").innerHTML = "<p>" + (`Longitude: ${currentPos.longitude}`) + "</p>";
    document.getElementById("moreOrLess").innerHTML = "<p>" + (`More or less ${currentPos.accuracy} meters.`) + "</p>";  
    
    $.post('',function(data) { // insert API key as string parameter
    lat = currentPos.latitude;
    lon = currentPos.longitude;
    console.log(data);
    })
  }; 
  
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  
  navigator.geolocation.getCurrentPosition(getWeather, error); 
  
  $.get("https://ipinfo.io", function(response) {
      document.getElementById("locality").innerHTML = "<p>" + (response.city) + "</p>";
  }, "jsonp");
});  


