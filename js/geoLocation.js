$(document).ready(function(){
  
  function getWeather(position) {
    
    var currentPos = position.coords;
    document.getElementById("latitude").innerHTML = "<p>" + (`Latitude : ${currentPos.latitude}`) + "</p>";
    document.getElementById("longitude").innerHTML = "<p>" + (`Longitude: ${currentPos.longitude}`) + "</p>";
    document.getElementById("moreOrLess").innerHTML = "<p>" + (`More or less ${currentPos.accuracy} meters.`) + "</p>";  
    
    $.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC9OxmAbzqqnkNGex-Q_fA0uLgFq1KhhW4',function(data) {
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
  
  /*
    testing the API with static parameters
    
    API Key : 2ada2a6efa4d7c2713fd4b278f55b8c6
    Latitude : 51.5437594
    Longitude: -0.19708330000000002
  
    https://api.darksky.net/forecast/2ada2a6efa4d7c2713fd4b278f55b8c6/51.5437594,-0.19708330000000002
  */

//obtain the DS API JSON 
$.getJSON("https://api.darksky.net/forecast/2ada2a6efa4d7c2713fd4b278f55b8c6/51.5437594,-0.19708330000000002", function getDSAPI(DS_API_JSON) {
  return DS_API_JSON;
});


/************** CORS request (cross-origin resource sharing) ****************/
// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

// source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS

