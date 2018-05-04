'use strict';

window.card = (function () {
  
  var clearNode = function (node) {
    node.textContent = '';
  };
  
  // создание элемента с классом
  var createElement = function (elementNode, elementClass) {
    var elementName = document.createElement(elementNode);
    elementName.className = elementClass;
    return elementName;
  };

  // расположение на карте
  var generateAPin = function (arrayElement) {
    var pin = window.global.pinTemplate.cloneNode(true);
    pin.style.left = arrayElement.location.x - window.global.PIN_WIDTH / 2 + 'px';
    pin.style.top = arrayElement.location.y - window.global.PIN_HEIGHT + 'px';
    pin.querySelector('img').src = arrayElement.author.avatar;
    return pin;
  };

  var renderPins = function () {
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.ads.length; i++) {
      pinFragment.appendChild(generateAPin(window.data.ads[i]));
    }
    window.global.pinsBlock.appendChild(pinFragment);
  };

  // ф-ция набора объявления
  var createAd = function (arrayElement) {
    var ad = window.global.adTemplate.cloneNode(true);
    ad.querySelector('h3').textContent = arrayElement.offer.title;
    ad.querySelector('.popup__text').textContent = arrayElement.offer.address;
    ad.querySelector('.popup__text--price').textContent = arrayElement.offer.price + ' \u20bd/ночь';
    ad.querySelector('h4').textContent = window.global.TYPES_RUS[arrayElement.offer.type];
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
})();
