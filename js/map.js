'use strict';

// Стартовые
var PRICE = {
  max: 1000000,
  min: 1000
};

var GUEST = {
  min: 1,
  max: 10
};

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var VAR_ROOMS = {
  min: 1,
  max: 5
};

var CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PIN_HEIGHT = 40;
var PIN_WIDTH = 44;

var COORD = {
  X: {
    min: 300,
    max: 900
  },
  Y: {
    min: 150,
    max: 500
  }
};

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// карту и блок объявления из неактивного состояния в активное
var userUp = document.querySelector('.map');
userUp.classList.remove('map--faded');
var userSup = document.querySelector('.ad-form');
userSup.classList.remove('ad-form--disabled');

// функция случайного числа
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// функция создания массива аватарок
var getAvatars = function () {
  var imgAvatars = [];
  var avatar;
  for (var i = 0; i <= TITLES.length - 1; i++) {
    if (i < 10) {
      avatar = 'img/avatars/user0' + (i + 1) + '.png';
    } else {
      avatar = 'img/avatars/users' + i + '.png';
    }
    imgAvatars[i] = avatar;
  }
  return imgAvatars;
};

// ф-ция группировки массива в случ. порядке
var shuffleArray = function (array) {
  for (var i = 0; i < array.length - 1; i++) {
    var indexRND = Math.floor(Math.random() * (i + 1));
    var nowValue = array[i];
    array[i] = array[indexRND];
    array[indexRND] = nowValue;
  }
  return array;
};

var randomFeatures = shuffleArray(FEATURES);
var adFeatures = randomFeatures.slice(0, getRandomInteger(1, randomFeatures.length));

var map = document.querySelector('.map');
var adTemplate = document.querySelector('template').content.querySelector('article.map__card');
var pinTemplate = document.querySelector('template').content.querySelector('button.map__pin');
var pinsBlock = document.querySelector('.map__pins');
var filtersBlock = document.querySelector('.map__filters-container');

// создание элемента с классом
var createElement = function (elementNode, elementClass) {
  var elementName = document.createElement(elementNode);
  elementName.className = elementClass;
  return elementName;
};

var adsBlock = createElement('div', 'map__ads');
map.insertBefore(adsBlock, filtersBlock);

var clearNode = function (node) {
  node.innerHTML = '';
};

var generateAdsObjects = function (adsCount) {
  var avatarForTicket = shuffleArray(getAvatars());
  var newAds = [];
  for (var i = 0; i < adsCount; i++) {
    newAds.push({
      'author': {
        'avatar': avatarForTicket[i]
      },
      'offer': {
        'title': TITLES[getRandomInteger(0, TITLES.length - 1)],
        'address': getRandomInteger(COORD.X.min, COORD.X.max) + ', ' + getRandomInteger(COORD.Y.min, COORD.Y.max),
        'price': getRandomInteger(PRICE.min, PRICE.max),
        'type': TYPES[getRandomInteger(0, TYPES.length - 1)],
        'rooms': getRandomInteger(VAR_ROOMS.min, VAR_ROOMS.max),
        'guests': getRandomInteger(GUEST.min, GUEST.max),
        'checkin': CHECKOUT_TIMES[getRandomInteger(0, CHECKOUT_TIMES.length - 1)],
        'checkout': CHECKOUT_TIMES[getRandomInteger(0, CHECKOUT_TIMES.length - 1)],
        'features': adFeatures,
        'description': '',
        'photos': PHOTOS[getRandomInteger(0, PHOTOS.length - 1)]
      },
      'location': {
        'x': getRandomInteger(COORD.X.min, COORD.X.max),
        'y': getRandomInteger(COORD.Y.min, COORD.Y.max)
      }
    });
  }
  return newAds;
};

var ads = generateAdsObjects(TITLES.length);

// расположение на карте
var generateAPin = function (arrayElement) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = arrayElement.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = arrayElement.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = arrayElement.author.avatar;
  return pin;
};

var renderPins = function () {
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    pinFragment.appendChild(generateAPin(ads[i]));
  }
  pinsBlock.appendChild(pinFragment);
};

// ф-ция набора объявления
var createAd = function (arrayElement) {
  var ad = adTemplate.cloneNode(true);
  ad.querySelector('h3').textContent = arrayElement.offer.title;
  ad.querySelector('.popup__text').textContent = arrayElement.offer.address;
  ad.querySelector('.popup__text--price').textContent = arrayElement.offer.price + ' \u20bd/ночь';
  switch (arrayElement.offer.type) {
    case 'flat':
      ad.querySelector('h4').textContent = 'Квартира';
      break;
    case 'bungalo':
      ad.querySelector('h4').textContent = 'Бунгало';
      break;
    case 'house':
      ad.querySelector('h4').textContent = 'Дом';
      break;
    case 'palace':
      ad.querySelector('h4').textContent = 'Дворец';
      break;
  }
  ad.querySelector('h4 + p').textContent = arrayElement.offer.rooms + ' для ' + arrayElement.offer.guests + ' гостей';
  ad.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + arrayElement.offer.checkin + ', выезд до ' + arrayElement.offer.checkout;
  clearNode(ad.querySelector('.popup__features'));
  for (var i = 0; i < arrayElement.offer.features.length; i++) {
    var feature = arrayElement.offer.features[i];
    var featureElem = createElement('li', 'feature');
    featureElem.classList.add('feature--' + feature);
    ad.querySelector('.popup__features').appendChild(featureElem);
  }
  ad.querySelector('.popup__features + p').textContent = arrayElement.offer.description;
  ad.querySelector('.popup__avatar').setAttribute('src', arrayElement.author.avatar);
  ad.querySelector('.popup__photo').setAttribute('src', arrayElement.offer.photos);
  return ad;
};

var renderAds = function () {
  var adFragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    adFragment.appendChild(createAd(ads[i]));
  }
  adsBlock.appendChild(adFragment);
};

clearNode(pinsBlock);
renderPins();
renderAds();
