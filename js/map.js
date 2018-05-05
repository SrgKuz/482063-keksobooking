'use strict';

var ESC_KEYCODE = 27;

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

var TYPES_RUS = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

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

// ****************************************************
// сервисные функции
// ****************************************************

// функция случайного числа
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// функция создания массива аватарок
var getAvatars = function () {
  var imgAvatars = [];
  var avatar;
  for (var i = 0; i <= TITLES.length - 1; i++) {
    avatar = (i < 10) ? 'img/avatars/user0' + (i + 1) + '.png' : 'img/avatars/users' + i + '.png';
    imgAvatars.push(avatar);
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

// ****************************************************
// генерация данных
// ****************************************************

var randomFeatures = shuffleArray(FEATURES);
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
  node.textContent = '';
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
        'features': randomFeatures.slice(0, getRandomInteger(1, randomFeatures.length)),
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
  ad.querySelector('h4').textContent = TYPES_RUS[arrayElement.offer.type];
  ad.querySelector('h4 + p').textContent = arrayElement.offer.rooms + ' для ' + arrayElement.offer.guests + ' гостей';
  ad.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + arrayElement.offer.checkin + ', выезд до ' + arrayElement.offer.checkout;
  clearNode(ad.querySelector('.popup__features'));
  var feature = arrayElement.offer.features;
  for (var i = 0; i < arrayElement.offer.features.length; i++) {
    var featureElem = createElement('li', 'popup__feature');
    featureElem.classList.add('popup__feature--' + feature[i]);
    ad.querySelector('.popup__features').appendChild(featureElem);
  }
  ad.querySelector('.popup__features + p').textContent = arrayElement.offer.description;
  ad.querySelector('.popup__avatar').setAttribute('src', arrayElement.author.avatar);
  ad.querySelector('.popup__photo').setAttribute('src', arrayElement.offer.photos);

  return ad;
};

// ****************************************************
// обработчики событий
// ****************************************************

var resetButton = document.querySelector('.ad-form__reset');
var fields = document.querySelector('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var setupForm = document.querySelector('.ad-form');
var focusAddress = document.querySelector('input[name="address"]');
var cardPopup = document.querySelector('.map__ads');

var onCardCloseClick = function () {
  var mapCardPopup = document.querySelector('.map__ads>.map__card');
  mapCardPopup.classList.add('hidden');
  mapCardPopup.remove();
  mapPins.addEventListener('click', adShowPinData);
};

var onCardClouseEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onCardCloseClick();
  }
};

// функции для обработчиков
var adShowPinData = function (evt) {
  // если значение клика на не нашем pine
  if (evt.target.parentNode.classList.contains('map__pin--main', 'map')) {
    focusAddress.setAttribute('value', evt.clientX + ',' + evt.clientY);
  // если значение элемента массива map__pin равно true по индексу картинки
  } else if (evt.target.parentNode.classList.contains('map__pin')) {
  // найти элемент массива по пину которого кликнули, передаем массив в метод поиска по элементу
    var currentAd = ads.find(function (item) {
      return evt.path[0].src.indexOf(item.author.avatar) >= 0;
    });
    // показать объявление на карточке
    showCurrentAd(currentAd);
    mapPins.removeEventListener('click', adShowPinData);
    mapPins.addEventListener('keydown', onCardClouseEscPress);
  }
};

var renderAdCard = function (currentPinData) {
  if (!map.parentNode.classList.contains('.map__card')) {
    var adFragment = document.createDocumentFragment();
    adFragment.appendChild(createAd(currentPinData));
    adsBlock.appendChild(adFragment);
  } else {
    adFragment.replaceChild(createAd(currentPinData));
    adsBlock.replaceChild(adFragment);
  }
};

var showCurrentAd = function (currentPinData) {
  if (currentPinData !== null) {
    renderAdCard(currentPinData);
    var cardClose = cardPopup.querySelector('.popup__close');
    cardClose.addEventListener('click', onCardCloseClick);
  }
};

var onResetButtonClick = function () {
  for (var i = 0; i < fields.length; i++) {
    fields[i].disabled = true;
  }
  map.classList.add('map--faded');
  setupForm.classList.add('ad-form--disabled');
  setupForm.reset();

  // var mapPins = document.querySelectorAll('.map__pin');
  for (i = 0; i < mapPins.length; i++) {
    mapPins[i].style.display = 'none';
    if (mapPins[i].classList.contains('map__pin--main')) {
      mapPins[i].style.display = 'block';
    }
  }
};

var onMapPinMainMouseUp = function () {
  generateAdsObjects();
  renderPins();
  for (var i = 0; i < fields.length; i++) {
    fields[i].disabled = false;
  }
  map.classList.remove('map--faded');
  setupForm.classList.remove('ad-form--disabled');
  mapPins.addEventListener('click', adShowPinData);
};

mapPinMain.addEventListener('mouseup', onMapPinMainMouseUp);

// после отправки вернуть в начальное состояние
resetButton.addEventListener('click', onResetButtonClick);

// **********************************************
// валидация формы объявления пользователя
// **********************************************

var submitForm = document.querySelector('.ad-form__submit');
var inputs = document.querySelectorAll('input');

var veryfyFormValidity = function () {
  inputs.forEach( function (i) {
    if (!inputs[i].validity.valid) {
      inputs[i].style.border = '2px solid red';
    } else {
      inputs[i].style.border = '';
    }
  });
};

submitForm.addEventListener('click', veryfyFormValidity);
/*
Нетривиальный сценарий валидации: установка соответствия количества гостей количеству комнат. Для решения задачи, при желании, вы можете доработать разметку проекта. При решении этой задачи можно пойти несколькими путями. В любом случае, нужно будет подписаться на изменения значения поля количества комнат.
- Первый подход заключается в том, чтобы физически ограничить возможность выбора неправильных вариантов. Для этого вы можете или удалять соответствующие элементы option из разметки или добавлять им атрибут disabled. Помните, что при таком подходе возникает проблема в сценарии, когда у пользователя уже выбран вариант, который вы хотите исключить, так как произойдет неявное изменение значения, которое пользователь не заметит.
Второй подход заключается в использовании встроенного API для валидации и вызова метода setCustomValidity когда выбранное значение количества гостей не подходит под количество комнат.
*/
// Сравнение кол-ва комнат гостей


var compareRoomsGuests = function (guestValue, roomValue) {
  var guestsSelect = document.querySelector('#capacity');
  if ((guestValue !== 1) && (roomValue !== 1)) {
    guestsSelect.setCustomValidity('Для 1 гостя');
  } else if (((guestValue === 3) || (guestValue === 1)) && (roomValue === 2)) {
    guestsSelect.setCustomValidity('Для 2 гостей или 1 гостя');
  } else if ((guestValue === 0) && (roomValue === 3)) {
    guestsSelect.setCustomValidity('Для 3 или 2 гостей или для 1 гостя');
  } else if ((guestValue !== 0) && (roomValue === 100)) {
    guestsSelect.setCustomValidity('не для гостей');
  } else {
    guestsSelect.setCustomValidity('');
  }
};

var verifyRoomsGuests = function (evt) {
  var guests = document.querySelector('#capacity');
  var rooms = document.querySelector('#room_number');
  switch (evt.target) {
    case guests:
      compareRoomsGuests(Number(evt.target.value), Number(rooms.value));
      break;
    case rooms:
      compareRoomsGuests(Number(guests.value), Number(evt.target.value));
      break;
  }
};
document.addEventListener('change', verifyRoomsGuests);
