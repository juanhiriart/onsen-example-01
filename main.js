window.fn = {};

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
  document.getElementById('lat').innerHTML = "000000";
  document.getElementById('long').innerHTML = "000000";
}
