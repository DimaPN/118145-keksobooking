'use strict'

var PIN_WIDTH = 62;
var PIN_HEIGHT = 62;
var MIN_Y_LOC = 130;
var MAX_Y_LOC = 630;
var MIN_X_LOC = 30;
var MAX_X_LOC = 1160;


var title = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец",
  "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var type = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//var addressX = 1, 900;
//var addressY = 130, 630;

var rand = function (arr) {
  var x = Math.floor(Math.random() * arr.length);
  return arr[x];
};
var randInteger = function (min, max) {
  var randp = min + Math.floor(Math.random() * (max + 1 - min));
  return randp;
};

var similarAdvertisement = function (count) {
  var result = [];
  for (var i = 0; i < count; i++) {
    var temp = {
      author: 'img/avatars/user0' + randInteger(1, 8) + '.png',
      offer: {
        title: rand(title),
        type: rand(type),
        checkin: rand(checkin),
        checkout: rand(checkout),
        features: rand(features),
        photos: rand(photos),
        description: '',
        rooms: randInteger(1, 5),
        price: randInteger(100000, 1000000),
        guests: randInteger(1, 100),
        address: location.x + ', ' + location.y,
      },
      location: {
        y: randInteger(MIN_Y_LOC, MAX_Y_LOC) - PIN_HEIGHT,
        x: randInteger(MIN_X_LOC, MAX_X_LOC) - PIN_WIDTH/2
      }
    };
    result[i] = temp;
  }
  return result;
};
var advertisements = similarAdvertisement(10);

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

var similarListElement = document.querySelector('template');
var similarPinTemplate = similarListElement.content.querySelector('.map__pin');


var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author;
  pinElement.querySelector('img').alt = pin.offer.title;


  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < advertisements.length; i++) {
  fragment.appendChild(renderPin(advertisements[i]));
}
document.querySelector('.map__pins').appendChild(fragment);
