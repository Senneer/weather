'use strict';

var selectors = {
  loader: document.getElementsByClassName('weather__nowLoader')[0],
  form: document.getElementsByClassName('weather__fullCity')[0],
  inp: document.getElementsByClassName("weather__fullCityInp")[0],
  now: {
    block: document.getElementsByClassName('weather__now')[0],
    icon: document.getElementsByClassName('weather__nowType')[0],
    deg: document.getElementsByClassName('weather__nowDeg')[0],
    summary: document.getElementsByClassName('weather__nowName')[0],
    wind: document.getElementsByClassName('weather__nowRestItemInfo _wind')[0],
    dewPoint: document.getElementsByClassName('weather__nowRestItemInfo _dewPoint')[0],
    pressure: document.getElementsByClassName('weather__nowRestItemInfo _pressure')[0]
  },
  hourlyList: document.getElementsByClassName('weather__fullHours')[0]
};

Handlebars.registerHelper('convert', function (options) {
  return Math.round(options.fn(this));
});
Handlebars.registerHelper('convertTime', function (options) {
  var date = new Date(options.fn(this) * 1000);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (hours < 10) {
    hours = '0' + hours.toString();
  }
  if (minutes < 10) {
    minutes = '0' + minutes.toString();
  }
  var time = hours + ':' + minutes;
  return time;
});

var source = document.getElementById('hourCard').innerHTML;
var template = Handlebars.compile(source);

function skycons() {
  var icons = new Skycons({
    "color": "#333333",
    "resizeClear": true
  });
  var list = ["clear-day", "clear-night", "partly-cloudy-day", "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind", "fog"];

  for (var i = list.length; i--;) {
    var weatherType = list[i],
        elements = document.getElementsByClassName(weatherType);
    elements = Array.prototype.slice.call(elements);

    elements.forEach(function (el) {
      var _el$classList;

      (_el$classList = el.classList).remove.apply(_el$classList, list);
      icons.set(el, weatherType);
    });
  }
  icons.play();
}

document.addEventListener('DOMContentLoaded', function () {

  function fillCurrent(response, deg, sum, icon, wind, dewPoint, pressure) {
    deg.innerHTML = Math.round(response.currently.temperature) + '°C';
    sum.innerHTML = response.currently.summary;
    icon.classList.add(response.currently.icon);
    wind.innerHTML = Math.round(response.currently.windSpeed) + 'km/h';
    dewPoint.innerHTML = Math.round(response.currently.dewPoint) + '°C';
    pressure.innerHTML = Math.round(response.currently.pressure) + ' hPa';
  }

  function fillHourly(response) {
    response.data.forEach(function (el) {
      selectors.hourlyList.insertAdjacentHTML('beforeend', template(el));
    });
  }

  var latitude = void 0;
  var longitude = void 0;
  var weather = void 0;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      selectors.loader.classList.remove('_hide');
      if (xhr.status === 200) {
        selectors.loader.classList.add('_hide');
        weather = JSON.parse(xhr.responseText);
        fillCurrent(weather, selectors.now.deg, selectors.now.summary, selectors.now.icon, selectors.now.wind, selectors.now.dewPoint, selectors.now.pressure);
        fillHourly(weather.hourly);
        skycons();
      } else {
        //!!!
      }
    }
  };

  function weatherReport(latitude, longitude) {
    var apiKey = 'e881e391e95d9497880c0fc57e5078f0',
        url = 'https://api.darksky.net/forecast/',
        lati = latitude,
        longi = longitude,
        date = Math.round(new Date().getTime() / 1000),
        api_call = url + apiKey + "/" + lati + "," + longi + "," + date + "?exclude=minutly,daily&units=ca";

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

    selectors.hourlyList.innerHTML = '';

    weatherReport(latitude, longitude);
  });

  selectors.form.addEventListener('submit', function (e) {
    e.preventDefault();
  });
});