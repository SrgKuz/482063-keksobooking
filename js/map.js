'use strict';

window.data = (function () {
  var onCardCloseClick = function () {
    var mapCardPopup = document.querySelector('.map__ads>.map__card');
    mapCardPopup.classList.add('hidden');
    mapCardPopup.remove();
    window.global.pinsBlock.addEventListener('click', adShowPinData);
  };

  var onCardClouseEscPress = function (evt) {
    if (evt.keyCode === window.global.ESC_KEYCODE) {
      onCardCloseClick();
    }
  };

  var renderAdCard = function (currentPinData) {
    var adsBlock = createElement('div', 'map__ads');
	window.global.map.insertBefore(adsBlock, window.global.filtersBlock);
    if (!window.global.map.parentNode.classList.contains('.map__card')) {
      var adFragment = document.createDocumentFragment();
      adFragment.appendChild(window.card.createAd(currentPinData));
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
    for (var i = 0; i < window.global.fields.length; i++) {
      window.global.fields[i].disabled = true;
    }
    window.global.map.classList.add('map--faded');
    window.global.setupForm.classList.add('ad-form--disabled');
    window.global.setupForm.reset();
    // var window.global.pinsBlock = document.querySelector('.map__pin');
    for (i = 0; i < window.global.pinsBlock.length; i++) {
      window.global.pinsBlock[i].style.display = 'none';
      if (window.global.pinsBlock[i].classList.contains('map__pin--main')) {
        window.global.pinsBlock[i].style.display = 'block';
      }
    }
  };

  var onMapPinMainMouseUp = function () {
    window.data.generateAdsObjects(window.global.TITLES.length);
    window.card.renderPins();
    for (var i = 0; i < window.global.fields.length; i++) {
      window.global.fields[i].disabled = false;
    }
    window.global.map.classList.remove('map--faded');
    window.global.setupForm.classList.remove('ad-form--disabled');
    window.global.pinsBlock.addEventListener('click', window.pin.adShowPinData);
  };

  window.global.mapPinMain.addEventListener('mouseup', onMapPinMainMouseUp);

  window.global.resetButton.addEventListener('click', onResetButtonClick);
})();
