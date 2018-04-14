'use strike'
//Стартовые
var COUNT_OBJECTS = 8;
var PRICE = {max: 1000000, min: 1000};
var GUEST =  {min: 1, max: 10};
var ROOMS = {min: 1, max: 5};
var COORD = {X: {min: 300, max: 900}, Y: {min: 150, max: 500}};

var typeOfRooms = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var feature = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var typeAdress = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//ф-ция набора текста объявления
function getTicket() {
	var tickets = [];
	var avatarForTicket = shufArray(getAvatars());
	var title = shufArray(typeAdress);
	for (var i = 0; i <	COUNT_OBJECTS; i++) {
		var locationX = getRandom(COORD.X.max, COORD.X.min);
		var locationY = getRandom(COORD.Y.max, COORD.Y.min);
	ticets.push({
		'author': {'avatar':avatarForTicket[i]},
		'offer': {
			'title': title[i],
			'adress': {locationX, locationY},
			'price': getRandom(PRICE.max, PRICE.min),
			'type': getRndElement(typeOfRooms),
			'rooms': getRandom(ROOMS.max, ROOMS.min),
			'guests': getRandom(GUEST.max, GUEST.min),
			'checkin': getRndElement(time),
			'checkout': getRndElement(time),
			'feature': getRndElement(feature),
			'description': '',
			'photos': []
		},
		'location': {'X': locationX, 'Y': locationY}
	});
	}
	return ticets;
}

//функция создания массива аватарок
function getAvatars() {
	var imgAvatars = [];
	var avatar;
	for (var i = 0; i <= COUNT_OBJECTS - 1; i++) {
		if (i < 10) {
			avatar = 'img/avatars/users' + '0' + i + '.png';
		} 
		else {
			avatar = 'img/avatars/users' + i + '.png';
		}; 
		imgAvatars.push(avatar);
	}
	return imgAvatars;
}

//функция случайного числа
function getRandom(max, min) {
	var randomNumb = Math.floor(Math.random() * (max - min + 1)) + min;
	return randomNumb;
}

//функция создания ьассива n-длины
function getLengthArray(arrey) {
	var someArr = array.slice();
	clone.length = getRandom(1, array.length);
	return someArr;
}

//функция случайного элемента массива
function getRndElement(array) {
	for (var i = 0;i < array; i++) {
		var indexRND = Math.floor(Math.random() * array.length);
	}
	var elementRND = array[indexRND];
	return elementRND;
}

//ф-ция группировки массива в случ. порядке
function shufArray(array) {
	for (var i = 0; i < array.length - 1; i++) {
		var indexRND = Math.floor(Math.random() * (i + 1));
		var nowValue = array[i];
		arrey[i] = array[indexRND];
		array[indexRND] = nowValue;
	}
	return array;
}
