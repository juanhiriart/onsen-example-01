window.fn = {};

var geo;

window.onload = function()
{
  console.log("on load");
  if((geo = getGeoLocation()))
  {
    console.log('HTML5 Geolocation is supported.')
    ons.notification.alert('HTML5 Geolocation is supported.');
  }
  else
  {
      console.log('HTML5 Geolocation is not supported.')
  }

  geo.watchPosition(show_coords, geo_error, {
    maximumAge: 1000,
    timeout: 300000,
    enableHighAccuracy: true
  });
}

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

const someFunction = () =>
{
  ons.notification.alert('You just pressed a button');
}

function show_coords(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    document.getElementById('lat').innerHTML = lat;
    document.getElementById('long').innerHTML = lon;
}

function getGeoLocation() {
    try {
        if( !! navigator.geolocation ) return navigator.geolocation;
        else return undefined;
    } catch(e) {
        return undefined;
    }
}

function geo_error(error) {
    switch(error.code) {
        case error.TIMEOUT:
            alert('Geolocation Timeout');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Geolocation Position unavailable');
            break;
        case error.PERMISSION_DENIED:
            alert('Geolocation Permission denied');
            break;
        default:
            alert('Geolocation returned an unknown error code: ' + error.code);
    }
}
