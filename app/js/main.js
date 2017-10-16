'use strict';

var selectors = {
  loader: document.getElementsByClassName('loader')[0],
  form: document.getElementsByClassName('weather__fullCity')[0],
  inp: document.getElementsByClassName("weather__fullCityInp")[0],
  now: {
    block: document.getElementsByClassName('weather__now')[0],
    deg: document.getElementsByClassName('weather__nowDeg')[0],
    summary: document.getElementsByClassName('weather__nowName')[0]
  }
};

document.addEventListener('DOMContentLoaded', function () {

  var latitude = void 0;
  var longitude = void 0;
  var weather = void 0;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        selectors.now.block.classList.remove('_hide');
        selectors.loader.classList.add('_hide');
        weather = JSON.parse(xhr.responseText);
        selectors.now.deg.innerHTML = Math.round(fToC(weather.currently.temperature)) + '°C';
        selectors.now.summary.innerHTML = weather.currently.summary;
      } else {}
    }
  };

  function fToC(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }

  function weatherReport(latitude, longitude) {
    var apiKey = 'e881e391e95d9497880c0fc57e5078f0',
        url = 'https://api.darksky.net/forecast/',
        lati = latitude,
        longi = longitude,
        api_call = url + apiKey + "/" + lati + "," + longi + "?exclude=minutly,daily";

    xhr.open('GET', api_call, true);
    xhr.send();
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (location) {
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;

      weatherReport(latitude, longitude);
    });
  }

  var searchBox = new google.maps.places.SearchBox(selectors.inp);

  searchBox.addListener('places_changed', function () {
    var locale = searchBox.getPlaces()[0];

    latitude = locale.geometry.location.lat();
    longitude = locale.geometry.location.lng();
  });

  selectors.form.addEventListener('submit', function (e) {
    e.preventDefault();
    weatherReport(latitude, longitude);
    console.log(latitude, longitude);
  });
});