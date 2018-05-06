'use strict';

(function () {
  window.data = {
    ESC_KEYCODE: 27,
    PRICE: {max: 1000000, min: 1000},
    GUEST: {min: 1, max: 10},
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    TYPES: ['palace', 'flat', 'house', 'bungalo'],
    TYPES_RUS: {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'},
    VAR_ROOMS: {min: 1, max: 5},
    CHECKOUT_TIMES: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PIN_HEIGHT: 70,
    PIN_WIDTH: 50,
    COORD: {X: {min: 300, max: 900}, Y: {min: 150, max: 500}},
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    map: document.querySelector('.map'),
    adTemplate: document.querySelector('template').content.querySelector('article.map__card'),
    pinTemplate: document.querySelector('template').content.querySelector('button.map__pin'),
    pinsBlock: document.querySelector('.map__pins'),
    filtersBlock: document.querySelector('.map__filters-container'),
    resetButton: document.querySelector('.ad-form__reset'),
    fields: document.querySelector('fieldset'),
    mapPinMain: document.querySelector('.map__pin--main'),
    setupForm: document.querySelector('.ad-form'),
    focusAddress: document.querySelector('input[name="address"]'),
    cardPopup: document.querySelector('.map__ads'),
    submitForm: document.querySelector('.ad-form__submit'),
    inputs: document.querySelectorAll('input')
  };

})();
