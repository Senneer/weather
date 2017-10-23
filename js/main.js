const selectors = {
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

Handlebars.registerHelper('round', function(options) {
  return Math.round(options.fn(this));
});
Handlebars.registerHelper('convertTime', function(options) {
  let date = new Date(options.fn(this) * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = '0' + hours.toString();
  }
  if (minutes < 10) {
    minutes = '0' + minutes.toString();
  }
  let time = hours + ':' + minutes;
  return time;
});

const source = document.getElementById('hourCard').innerHTML;
const template = Handlebars.compile(source);

function skycons() {
  let icons = new Skycons({
    "color" : "#333333",
    "resizeClear": true
  });
  let list = [
  "clear-day",
  "clear-night",
  "partly-cloudy-day",
  "partly-cloudy-night",
  "cloudy",
  "rain",
  "sleet",
  "snow",
  "wind",
  "fog"
  ];

  list.map((weatherType) => {
    let elements = document.getElementsByClassName(weatherType);
    elements = Array.prototype.slice.call(elements);

    elements.forEach((el) => {
      el.classList.remove(...list);
      icons.set(el, weatherType);
    });
  });
  icons.play();
}


document.addEventListener('DOMContentLoaded', () => {

  function fillCurrent(response, deg, sum, icon, wind, dewPoint, pressure) {
    deg.innerHTML = Math.round(response.currently.temperature) + '°C';
    sum.innerHTML = response.currently.summary;
    icon.classList.add(response.currently.icon);
    wind.innerHTML = Math.round(response.currently.windSpeed) + 'km/h';
    dewPoint.innerHTML = Math.round(response.currently.dewPoint) + '°C';
    pressure.innerHTML = Math.round(response.currently.pressure) + ' hPa';
  }

  function fillHourly(response) {
    response.data.forEach((el) => {
      selectors.hourlyList.insertAdjacentHTML('beforeend', template(el));
    });
  }

  let latitude;
  let longitude;
  let weather;

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    selectors.loader.classList.remove('_hide');
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        selectors.loader.classList.add('_hide');
        weather = JSON.parse(xhr.responseText);
        fillCurrent(weather, selectors.now.deg, selectors.now.summary, selectors.now.icon,
         selectors.now.wind, selectors.now.dewPoint, selectors.now.pressure);
        fillHourly(weather.hourly);
        skycons();
      } else {
        console.log('error: ' + (this.status ? this.statusText : 'Bad request'));
      }
    }
  };

  function weatherReport(latitude, longitude) {
    let apiKey = 'e881e391e95d9497880c0fc57e5078f0',
    url = 'https://api.darksky.net/forecast/',
    date = Math.round(new Date().getTime()/1000),
    api_call = `${url + apiKey}/${latitude},${longitude},${date}?exclude=minutly,daily&units=ca`;

    xhr.open('GET', api_call, true);
    xhr.send();
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((location) => {
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;

      weatherReport(latitude, longitude);
    }, () => {
      selectors.inp.focus();
    });
  }

  var searchBox = new google.maps.places.SearchBox( selectors.inp );

  searchBox.addListener('places_changed', function() {
    var locale = searchBox.getPlaces()[0];

    latitude = locale.geometry.location.lat();
    longitude = locale.geometry.location.lng();

    selectors.hourlyList.innerHTML = '';

    weatherReport(latitude, longitude);
  });

  selectors.form.addEventListener('submit', e => {
    e.preventDefault();
  });
});