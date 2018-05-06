'use strict';

(function () {

var veryfyFormValidity = function () {
  window.data.inputs.forEach(function (i) {
    if (!window.data.inputs[i].validity.valid) {
      window.data.inputs[i].style.border = '2px solid red';
    } else {
      window.data.inputs[i].style.border = '';
    }
  });
};

// Сравнение кол-ва комнат гостей
var compareRoomsGuests = function (guestValue, roomValue) {
  var guestsSelect = document.querySelector('#capacity');
  if ((guestValue !== 1) && (roomValue === 1)) {
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

window.data = {

veryfyFormValidity();

window.data.submitForm.addEventListener('click', veryfyFormValidity);

compareRoomsGuests();

verifyRoomsGuests();

document.addEventListener('change', verifyRoomsGuests);
};
})();
