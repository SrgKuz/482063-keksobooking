'use strict';

window.pin = (function () {
  // функции для обработчиков
  var adShowPinData = function (evt) {
    // если значение клика на не нашем pine
    if (evt.target.parentNode.classList.contains('map__pin--main', 'map')) {
      window.global.focusAddress.setAttribute('value', evt.clientX + ',' + evt.clientY);
    // если значение элемента массива map__pin равно true по индексу картинки
    } else if (evt.target.parentNode.classList.contains('map__pin')) {
    // найти элемент массива по пину которого кликнули, передаем массив в метод поиска по элементу
      var currentAd = window.global.ads.find(function (item) {
        return evt.path[0].src.indexOf(item.author.avatar) >= 0;
      });
      // показать объявление на карточке
      showCurrentAd(currentAd);
	  window.global.pinsBlock.removeEventListener('click', adShowPinData);
	  window.global.pinsBlock.addEventListener('keydown', onCardClouseEscPress);
    } 
  };
})();