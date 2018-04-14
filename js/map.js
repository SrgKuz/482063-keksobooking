'use strike'
//Стартовые
var COUNT_OBJECTS = 8;
var PRICE = {max: 1000000, min: 1000};
var GUEST =  {min: 1, min: 10};
var ROOMS = {min: 1, max: 5};
var COORD = {X: {min: 300, max: 900}, Y: {min: 150, max: 500};

var typeOfRooms = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var feature = ['wifi', 'dishwasher', 'parking', 'elevator', 'conditioner'];
var typeAdress = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var 


//функция создания массива аватарок
function getAuthorObjects() {
	var imgAvatar = [];
	var avatar;
	for (var i = 0; i <= COUNT_OBJECTS - 1; i++) {
		if (i < 10) {
			avatar = 'img/avatars/users' + '0' + i + '.png';
		} 
		else {
			avatar: 'img/avatars/users' + i + '.png';
		}; 
		imgAvatar.push (avatar);
	}
	return imgAvatar;
}
//функция случайного числа
function getRandom(max, min) {
var randomNumb = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNumb;
}


-----------------------------------------
	
	object[i]:{
		author:{
			
		},
		
		offer:{
			title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
			address: {location.x, location.y},
			price: Math.floor(Math.random() * 1000000) + 1000,
			type: ['palace', 'flat', 'house', 'bungalo'],
			rooms: Math.floor(Math.random() * 5) + 1,
			guests: Math.floor(Math.random() * 10),
			checkin: ['12:00', '13:00', '14:00'],
			checkout: ['12:00', '13:00', '14:00'],
			features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
			description: '',
			photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
		},
		
		location: {
			x: Math.floor(Math.random() * 900) + 300,
			y: Math.floor(Math.random() * 500) + 150
		}
	});
}

*/