window.fn = {};

var geo;

window.onload = function()
{
  if((geo = getGeoLocation()))
  {
    console.log('HTML5 Geolocation is supported.')
    //ons.notification.alert('HTML5 Geolocation is supported.');
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
  //window.fn.load('settings.html')
}

function show_coords(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    document.getElementById('lat').innerHTML = lat;
    document.getElementById('long').innerHTML = lon;

    var dist = distance(53.30058397483567, -2.1007242278630938, lat, lon, 'K');
    var roundDist = Math.round(dist*1000)/1000;
    //console.log(Math.round(dist*1000)/1000);
    document.getElementById('dist').innerHTML = roundDist;
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
            ons.notification.alert('Geolocation Timeout');
            break;
        case error.POSITION_UNAVAILABLE:
            ons.notification.alert('Geolocation Position unavailable');
            break;
        case error.PERMISSION_DENIED:
            ons.notification.alert('Geolocation Permission denied');
            break;
        default:
            ons.notification.alert('Geolocation returned an unknown error code: ' + error.code);
    }
}

//https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-in-your-web-apps.html
function distance(lat1, lon1, lat2, lon2, unit)
{
  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var radlon1 = Math.PI * lon1/180;
  var radlon2 = Math.PI * lon2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit=="K") { dist = dist * 1.609344 }
  if (unit=="N") { dist = dist * 0.8684 }
  return dist;
}
