'use strict';

window.data = (function () {
  // функция случайного числа
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // функция создания массива аватарок
  var getAvatars = function () {
    var imgAvatars = [];
    var avatar;
    for (var i = 0; i <= window.global.TITLES.length - 1; i++) {
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

  var generateAdsObjects = function (adsCount) {
    var avatarForTicket = shuffleArray(getAvatars());
    var newAds = [];
    for (var i = 0; i < adsCount; i++) {
      newAds.push({
        'author': {
          'avatar': avatarForTicket[i]
        },
        'offer': {
          'title': [getRandomInteger(0, window.global.TITLES.length - 1)],
          'address': getRandomInteger(window.global.COORD.X.min, window.global.COORD.X.max) + ', ' + getRandomInteger(window.global.COORD.Y.min, window.global.COORD.Y.max),
          'price': getRandomInteger(window.global.PRICE.min, window.global.PRICE.max),
          'type': window.global.TYPES[getRandomInteger(0, window.global.TYPES.length - 1)],
          'rooms': getRandomInteger(window.global.VAR_ROOMS.min, window.global.VAR_ROOMS.max),
          'guests': getRandomInteger(window.global.GUEST.min, window.global.GUEST.max),
          'checkin': window.global.CHECKOUT_TIMES[getRandomInteger(0, window.global.CHECKOUT_TIMES.length - 1)],
          'checkout': window.global.CHECKOUT_TIMES[getRandomInteger(0, window.global.CHECKOUT_TIMES.length - 1)],
          'features': shuffleArray(window.global.FEATURES).slice(0, getRandomInteger(1, shuffleArray(window.global.FEATURES).length)),
          'description': '',
          'photos': window.global.PHOTOS[getRandomInteger(0, window.global.PHOTOS.length - 1)]
        },
        'location': {
          'x': getRandomInteger(window.global.COORD.X.min, window.global.COORD.X.max),
          'y': getRandomInteger(window.global.COORD.Y.min, window.global.COORD.Y.max)
        }
      });
    }
    return ads = newAds;
	
  };
})();
