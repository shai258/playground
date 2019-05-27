/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/FruitTree.js":
/*!**************************!*\
  !*** ./src/FruitTree.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Plant = __webpack_require__(/*! ./Plant */ "./src/Plant.js");

class FruitTree extends Plant {
	constructor(id, x) {
		super(id, './images/tree.png', x, 0, 400, 2, 1);
		this.bloomed = false;
	}
	
	get imageUrl() {
		return imageUrl;
	}

	get hasBloomed() {
		return this.bloomed;
	}

	set hasBloomed(value) {
		this.bloomed = value;
	}

	water() {
		this.health += 0.1;
		if (parseFloat(this.bloomStatus).toFixed(1) >= 1.6) {
			alert ('Your tree has bloomed!');
			const fruitTrees = ['./images/orangeTree.png', './images/appleTree.png']
			this.changeImg = fruitTrees[Math.floor(Math.random() * 2)];
			this.hasBloomed = true;
		}
	}


	
}
module.exports = FruitTree;

/***/ }),

/***/ "./src/Garden.js":
/*!***********************!*\
  !*** ./src/Garden.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Weed = __webpack_require__(/*! ./Weed */ "./src/Weed.js");

class Garden {
	constructor() {
		this._age = 0;
		this._plants = [];
		this._money = 1200;
	}

	plant(plant){
		this._plants.push(plant);
	}

	get plants() {
		return this._plants;
	}

	set plants(arr) {
		this._plants = arr;
	}

	get age() {
		return this._age;
	}

	set age(value) {
		this._age = value;
	}

	get money() {
		return this._money;
	}

	set money(value){
		this._money += value;
		if (this.money < 0){
			this.gameOver();
		}
	}

	gameOver() {
		this.plants = [];
		this._money = 1200;
		this._age = 0;
		alert('Game Over');
	}

	passDay() {
		this._plants.forEach(function(plant){
			if (plant.hasBloomed === false) {
				plant.passDay();
			}
		});
		++this._age;
	}

	water() {
		let waterTank = 12;
		let weedWatering = 5;
		let tooManyWeeds = false;
		while (weedWatering > 0 && tooManyWeeds === false){
			for(const plant of this.plants){
				if (waterTank === 0) {
					tooManyWeeds = true;
					return (alert('Too many weeds, cant water plants!')); 
				}
				if (plant instanceof Weed) {
					plant.water();
					waterTank--;
				}
			}
			weedWatering--;
		}
		while (waterTank > 0){
			let curTankStatus = waterTank;
			this._plants.forEach(function(plant){
				if (waterTank < 0) return;
				if (!(plant instanceof Weed) && plant.hasBloomed === false) {
					plant.water();
					--waterTank;
				}
			});
			if(curTankStatus === waterTank) {
				return;
			}
		}
	}		

	render(container) {
		container.innerHTML = '';
		const divContainer = document.createElement('div');
		this._plants.forEach(function(plant){
			const newImg = document.createElement('img');
			newImg.id = plant._ID;
			newImg.src = plant._imgUrl;
			newImg.style.left = plant._x + 'px';
			newImg.style.bottom = plant._y + 'px';
			newImg.style.height = plant.height + 'px';
			newImg.style.opacity = plant.health;
			divContainer.appendChild(newImg);
		});
		container.appendChild(divContainer);
	}
}

module.exports = Garden;


/***/ }),

/***/ "./src/Plant.js":
/*!**********************!*\
  !*** ./src/Plant.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Plant {
	constructor(id, imageUrl, x, y, height, growthRate, waterConsumption){
		this._ID = id;
		this._imgUrl = imageUrl;
		this._x = x;
		this._y = y;
		this.height = height;
		this.growthRate = growthRate;
		this.health = waterConsumption;
	}

	get id() {
		return(this._ID);
	}

	get getHeight() {
		return this.height;
	}

	passDay() {
		this.height += this.growthRate;
		this.health -= 0.1;
	}
	
	get bloomStatus() {
		return this.health;
	}

	set changeImg(imgUrl) {
		this._imgUrl = imgUrl;
	}

	set resetHealth(value) {
		this.health = value;
	}
}

module.exports = Plant;

/***/ }),

/***/ "./src/Rose.js":
/*!*********************!*\
  !*** ./src/Rose.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Plant = __webpack_require__(/*! ./Plant */ "./src/Plant.js");

class Rose extends Plant {
	constructor(id, x){
		const rosesArr = ['./images/blue_rose.png', './images/purple_rose.png', './images/red_rose.png', './images/yellow_rose.png', './images/orange_rose.png'];
		const imageUrlIndex = Math.floor(Math.random() * 5);
		const imageUrl = rosesArr[imageUrlIndex];
		super(id, imageUrl, x, 0, 100, 1, 1);
		this.bloomed = false;
	}

	get imageUrl() {
		return imageUrl;
	}

	get hasBloomed() {
		return this.bloomed;
	}

	water() {
		this.health += 0.2;
		if (parseFloat(this.bloomStatus).toFixed(1) >= 1.8) {
			alert ('One rose has bloomed!');
			if(this._imgUrl==='./images/blue_rose.png') {
				this.changeImg = './images/blue_Rose.gif';
			}
			if(this._imgUrl==='./images/purple_rose.png'){
				this.changeImg = './images/purple_Rose.gif';
			} 
			if(this._imgUrl==='./images/yellow_rose.png') {
				this.changeImg = './images/yellow_Rose.gif';
			}
			if(this._imgUrl==='./images/orange_rose.png') {
			this.changeImg = './images/orange_Rose.gif';
			}
			if(this._imgUrl==='./images/red_rose.png') {
				this.changeImg = './images/red_Rose.gif';
			}
			this.bloomed = true;
		}
	}
}

module.exports = Rose;

/***/ }),

/***/ "./src/Weed.js":
/*!*********************!*\
  !*** ./src/Weed.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Plant = __webpack_require__(/*! ./Plant */ "./src/Plant.js");

class Weed extends Plant {
	constructor(id, x) {
		super(id, './images/weed.png', x, 0, 40, 3, 1);
		this.bloomed = false;
	}

	get hasBloomed() {
		return this.bloomed;
	}

	water() {
		this.health += 0.1;
	}

	passDay() {
		this.height += this.growthRate;
		this.health -= 0.05;
	}
}

module.exports = Weed;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Garden = __webpack_require__(/*! ./Garden */ "./src/Garden.js");
const Rose = __webpack_require__(/*! ./Rose */ "./src/Rose.js");
const FruitTree = __webpack_require__(/*! ./FruitTree */ "./src/FruitTree.js");
const Weed = __webpack_require__(/*! ./Weed */ "./src/Weed.js");

const btnAddPlant = document.getElementById('btnAddPlant');
const btnPassDay = document.getElementById('btnPassDay');
const btnlawnMower = document.getElementById('btnlawnMower');
const btnWater = document.getElementById('btnWater');
const container = document.getElementById('container');
const gardenAge = document.getElementById('gardenAge');
const gardenMoney = document.getElementById('gardenMoney');
const btnCollectMoney = document.getElementById('btnCollectMoney');
const rainContainer = document.getElementById('rain');
const nightContainer = document.getElementById('night');

const garden = new Garden();

btnAddPlant.onclick = function () {
	switch(document.getElementById('ddPlants').value) {
		case 'Rose':
			const rose = new Rose("rose" ,getPositionRose());
			garden.plant(rose);
			garden.money = -200;
			break;
		case 'FruitTree':
			const newFruitTree = new FruitTree("FruitTree", getPositionTree());
			garden.plant(newFruitTree);
			garden.money = -300;
			break;
		}
		
	gardenMoney.value = garden.money;
	gardenAge.value = garden.age;
	garden.render(container);
}

btnPassDay.onclick = function(){
	night();
	garden.passDay();
	garden.money = 100;
	gardenMoney.value = garden.money;
	gardenAge.value = garden.age;
	garden.render(container);
}

btnWater.onclick = function(){
	rain();
	garden.water();
	if (Math.floor(Math.random() * 4) === 1){
		const newWeed = new Weed("weed", getPositionRose());
		garden.plant(newWeed);
	}
	garden.money = -50;
	gardenMoney.value = garden.money;
	garden.render(container);
}

btnlawnMower.onclick = function(){
	for(let i=0; i<garden.plants.length; i++) {
		if(garden.plants[i].id === "weed") {
			garden.money = -50;
			gardenMoney.value = garden.money;
			const arr1 = garden._plants.slice(0, i);
			const arr2 = garden._plants.slice((i+1), garden.plants.length);
			garden.plants = arr1.concat(arr2);
			garden.render(container);
			return alert('One weed has removed'); 
		}
	}
}

btnCollectMoney.onclick =  function(){
	for(let i=0; i<garden.plants.length; i++) { //add the money
		if(garden.plants[i].id === "rose" && garden.plants[i].hasBloomed) {
			garden.money = 300;
			alert('collect rose!'); 
		}		
		if(garden.plants[i].id === "FruitTree" && garden.plants[i].hasBloomed) { //Renew tree
			garden.plants[i].changeImg = './images/tree.png';
			garden.plants[i].hasBloomed = false;
			garden.plants[i].resetHealth = 1;
			garden.money = 400;
			alert('collect fruit tree!'); 
		}
	}
	gardenMoney.value = garden.money;
	
	let endOfArr = false;
	while (true) { //Removed roses
		if (endOfArr || garden.plants.length===0) {
			garden.render(container);
			break;	
		}
		for(let i=0; i<garden.plants.length; i++) {
			if (!(garden.plants[i].hasBloomed) && i === (garden.plants.length - 1) ) {
				endOfArr = true;
			}
			if (garden.plants[i].id === "rose" && garden.plants[i].hasBloomed) {
				const arr1 = garden.plants.slice(0, i);
				const arr2 = garden.plants.slice(i+1, garden.plants.length);
				garden.plants = arr1.concat(arr2);
				break;
			}
		}
	}
}

function rain() {
	rainContainer.style.display = 'block';
	setTimeout(function(){
		rainContainer.style.display = 'none';
	}, 2000)
}

function night() {
	nightContainer.style.display = 'block';
	setTimeout(function(){
		nightContainer.style.display = 'none';
	}, 1500)
}

function getPositionTree(){
	return (Math.floor(Math.random() * (document.body.offsetWidth - 500))) + 30;
}

function getPositionRose(){
	return (Math.floor(Math.random() * (document.body.offsetWidth -100))) + 30;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZydWl0VHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FyZGVuLmpzIiwid2VicGFjazovLy8uL3NyYy9QbGFudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUm9zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvV2VlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGNBQWMsbUJBQU8sQ0FBQywrQkFBUzs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBLDJCOzs7Ozs7Ozs7OztBQ2pDQSxhQUFhLG1CQUFPLENBQUMsNkJBQVE7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Qjs7Ozs7Ozs7Ozs7QUNyQ0EsY0FBYyxtQkFBTyxDQUFDLCtCQUFTOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCOzs7Ozs7Ozs7OztBQzNDQSxjQUFjLG1CQUFPLENBQUMsK0JBQVM7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCOzs7Ozs7Ozs7OztBQ3RCQSxlQUFlLG1CQUFPLENBQUMsaUNBQVU7QUFDakMsYUFBYSxtQkFBTyxDQUFDLDZCQUFRO0FBQzdCLGtCQUFrQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3ZDLGFBQWEsbUJBQU8sQ0FBQyw2QkFBUTs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSx3QkFBd0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsd0JBQXdCLE9BQU87QUFDNUM7QUFDQTtBQUNBLDBCO0FBQ0EsRztBQUNBLDBFQUEwRTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxTO0FBQ0E7QUFDQSxjQUFjLHdCQUF3QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImNvbnN0IFBsYW50ID0gcmVxdWlyZSgnLi9QbGFudCcpO1xuXG5jbGFzcyBGcnVpdFRyZWUgZXh0ZW5kcyBQbGFudCB7XG5cdGNvbnN0cnVjdG9yKGlkLCB4KSB7XG5cdFx0c3VwZXIoaWQsICcuL2ltYWdlcy90cmVlLnBuZycsIHgsIDAsIDQwMCwgMiwgMSk7XG5cdFx0dGhpcy5ibG9vbWVkID0gZmFsc2U7XG5cdH1cblx0XG5cdGdldCBpbWFnZVVybCgpIHtcblx0XHRyZXR1cm4gaW1hZ2VVcmw7XG5cdH1cblxuXHRnZXQgaGFzQmxvb21lZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5ibG9vbWVkO1xuXHR9XG5cblx0c2V0IGhhc0Jsb29tZWQodmFsdWUpIHtcblx0XHR0aGlzLmJsb29tZWQgPSB2YWx1ZTtcblx0fVxuXG5cdHdhdGVyKCkge1xuXHRcdHRoaXMuaGVhbHRoICs9IDAuMTtcblx0XHRpZiAocGFyc2VGbG9hdCh0aGlzLmJsb29tU3RhdHVzKS50b0ZpeGVkKDEpID49IDEuNikge1xuXHRcdFx0YWxlcnQgKCdZb3VyIHRyZWUgaGFzIGJsb29tZWQhJyk7XG5cdFx0XHRjb25zdCBmcnVpdFRyZWVzID0gWycuL2ltYWdlcy9vcmFuZ2VUcmVlLnBuZycsICcuL2ltYWdlcy9hcHBsZVRyZWUucG5nJ11cblx0XHRcdHRoaXMuY2hhbmdlSW1nID0gZnJ1aXRUcmVlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG5cdFx0XHR0aGlzLmhhc0Jsb29tZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cblx0XG59XG5tb2R1bGUuZXhwb3J0cyA9IEZydWl0VHJlZTsiLCJjb25zdCBXZWVkID0gcmVxdWlyZSgnLi9XZWVkJyk7XG5cbmNsYXNzIEdhcmRlbiB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX2FnZSA9IDA7XG5cdFx0dGhpcy5fcGxhbnRzID0gW107XG5cdFx0dGhpcy5fbW9uZXkgPSAxMjAwO1xuXHR9XG5cblx0cGxhbnQocGxhbnQpe1xuXHRcdHRoaXMuX3BsYW50cy5wdXNoKHBsYW50KTtcblx0fVxuXG5cdGdldCBwbGFudHMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3BsYW50cztcblx0fVxuXG5cdHNldCBwbGFudHMoYXJyKSB7XG5cdFx0dGhpcy5fcGxhbnRzID0gYXJyO1xuXHR9XG5cblx0Z2V0IGFnZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5fYWdlO1xuXHR9XG5cblx0c2V0IGFnZSh2YWx1ZSkge1xuXHRcdHRoaXMuX2FnZSA9IHZhbHVlO1xuXHR9XG5cblx0Z2V0IG1vbmV5KCkge1xuXHRcdHJldHVybiB0aGlzLl9tb25leTtcblx0fVxuXG5cdHNldCBtb25leSh2YWx1ZSl7XG5cdFx0dGhpcy5fbW9uZXkgKz0gdmFsdWU7XG5cdFx0aWYgKHRoaXMubW9uZXkgPCAwKXtcblx0XHRcdHRoaXMuZ2FtZU92ZXIoKTtcblx0XHR9XG5cdH1cblxuXHRnYW1lT3ZlcigpIHtcblx0XHR0aGlzLnBsYW50cyA9IFtdO1xuXHRcdHRoaXMuX21vbmV5ID0gMTIwMDtcblx0XHR0aGlzLl9hZ2UgPSAwO1xuXHRcdGFsZXJ0KCdHYW1lIE92ZXInKTtcblx0fVxuXG5cdHBhc3NEYXkoKSB7XG5cdFx0dGhpcy5fcGxhbnRzLmZvckVhY2goZnVuY3Rpb24ocGxhbnQpe1xuXHRcdFx0aWYgKHBsYW50Lmhhc0Jsb29tZWQgPT09IGZhbHNlKSB7XG5cdFx0XHRcdHBsYW50LnBhc3NEYXkoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHQrK3RoaXMuX2FnZTtcblx0fVxuXG5cdHdhdGVyKCkge1xuXHRcdGxldCB3YXRlclRhbmsgPSAxMjtcblx0XHRsZXQgd2VlZFdhdGVyaW5nID0gNTtcblx0XHRsZXQgdG9vTWFueVdlZWRzID0gZmFsc2U7XG5cdFx0d2hpbGUgKHdlZWRXYXRlcmluZyA+IDAgJiYgdG9vTWFueVdlZWRzID09PSBmYWxzZSl7XG5cdFx0XHRmb3IoY29uc3QgcGxhbnQgb2YgdGhpcy5wbGFudHMpe1xuXHRcdFx0XHRpZiAod2F0ZXJUYW5rID09PSAwKSB7XG5cdFx0XHRcdFx0dG9vTWFueVdlZWRzID0gdHJ1ZTtcblx0XHRcdFx0XHRyZXR1cm4gKGFsZXJ0KCdUb28gbWFueSB3ZWVkcywgY2FudCB3YXRlciBwbGFudHMhJykpOyBcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAocGxhbnQgaW5zdGFuY2VvZiBXZWVkKSB7XG5cdFx0XHRcdFx0cGxhbnQud2F0ZXIoKTtcblx0XHRcdFx0XHR3YXRlclRhbmstLTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0d2VlZFdhdGVyaW5nLS07XG5cdFx0fVxuXHRcdHdoaWxlICh3YXRlclRhbmsgPiAwKXtcblx0XHRcdGxldCBjdXJUYW5rU3RhdHVzID0gd2F0ZXJUYW5rO1xuXHRcdFx0dGhpcy5fcGxhbnRzLmZvckVhY2goZnVuY3Rpb24ocGxhbnQpe1xuXHRcdFx0XHRpZiAod2F0ZXJUYW5rIDwgMCkgcmV0dXJuO1xuXHRcdFx0XHRpZiAoIShwbGFudCBpbnN0YW5jZW9mIFdlZWQpICYmIHBsYW50Lmhhc0Jsb29tZWQgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0cGxhbnQud2F0ZXIoKTtcblx0XHRcdFx0XHQtLXdhdGVyVGFuaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZihjdXJUYW5rU3RhdHVzID09PSB3YXRlclRhbmspIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblx0fVx0XHRcblxuXHRyZW5kZXIoY29udGFpbmVyKSB7XG5cdFx0Y29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXHRcdGNvbnN0IGRpdkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHRoaXMuX3BsYW50cy5mb3JFYWNoKGZ1bmN0aW9uKHBsYW50KXtcblx0XHRcdGNvbnN0IG5ld0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRcdFx0bmV3SW1nLmlkID0gcGxhbnQuX0lEO1xuXHRcdFx0bmV3SW1nLnNyYyA9IHBsYW50Ll9pbWdVcmw7XG5cdFx0XHRuZXdJbWcuc3R5bGUubGVmdCA9IHBsYW50Ll94ICsgJ3B4Jztcblx0XHRcdG5ld0ltZy5zdHlsZS5ib3R0b20gPSBwbGFudC5feSArICdweCc7XG5cdFx0XHRuZXdJbWcuc3R5bGUuaGVpZ2h0ID0gcGxhbnQuaGVpZ2h0ICsgJ3B4Jztcblx0XHRcdG5ld0ltZy5zdHlsZS5vcGFjaXR5ID0gcGxhbnQuaGVhbHRoO1xuXHRcdFx0ZGl2Q29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0ltZyk7XG5cdFx0fSk7XG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGRpdkNvbnRhaW5lcik7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYXJkZW47XG4iLCJjbGFzcyBQbGFudCB7XG5cdGNvbnN0cnVjdG9yKGlkLCBpbWFnZVVybCwgeCwgeSwgaGVpZ2h0LCBncm93dGhSYXRlLCB3YXRlckNvbnN1bXB0aW9uKXtcblx0XHR0aGlzLl9JRCA9IGlkO1xuXHRcdHRoaXMuX2ltZ1VybCA9IGltYWdlVXJsO1xuXHRcdHRoaXMuX3ggPSB4O1xuXHRcdHRoaXMuX3kgPSB5O1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMuZ3Jvd3RoUmF0ZSA9IGdyb3d0aFJhdGU7XG5cdFx0dGhpcy5oZWFsdGggPSB3YXRlckNvbnN1bXB0aW9uO1xuXHR9XG5cblx0Z2V0IGlkKCkge1xuXHRcdHJldHVybih0aGlzLl9JRCk7XG5cdH1cblxuXHRnZXQgZ2V0SGVpZ2h0KCkge1xuXHRcdHJldHVybiB0aGlzLmhlaWdodDtcblx0fVxuXG5cdHBhc3NEYXkoKSB7XG5cdFx0dGhpcy5oZWlnaHQgKz0gdGhpcy5ncm93dGhSYXRlO1xuXHRcdHRoaXMuaGVhbHRoIC09IDAuMTtcblx0fVxuXHRcblx0Z2V0IGJsb29tU3RhdHVzKCkge1xuXHRcdHJldHVybiB0aGlzLmhlYWx0aDtcblx0fVxuXG5cdHNldCBjaGFuZ2VJbWcoaW1nVXJsKSB7XG5cdFx0dGhpcy5faW1nVXJsID0gaW1nVXJsO1xuXHR9XG5cblx0c2V0IHJlc2V0SGVhbHRoKHZhbHVlKSB7XG5cdFx0dGhpcy5oZWFsdGggPSB2YWx1ZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYW50OyIsImNvbnN0IFBsYW50ID0gcmVxdWlyZSgnLi9QbGFudCcpO1xuXG5jbGFzcyBSb3NlIGV4dGVuZHMgUGxhbnQge1xuXHRjb25zdHJ1Y3RvcihpZCwgeCl7XG5cdFx0Y29uc3Qgcm9zZXNBcnIgPSBbJy4vaW1hZ2VzL2JsdWVfcm9zZS5wbmcnLCAnLi9pbWFnZXMvcHVycGxlX3Jvc2UucG5nJywgJy4vaW1hZ2VzL3JlZF9yb3NlLnBuZycsICcuL2ltYWdlcy95ZWxsb3dfcm9zZS5wbmcnLCAnLi9pbWFnZXMvb3JhbmdlX3Jvc2UucG5nJ107XG5cdFx0Y29uc3QgaW1hZ2VVcmxJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpO1xuXHRcdGNvbnN0IGltYWdlVXJsID0gcm9zZXNBcnJbaW1hZ2VVcmxJbmRleF07XG5cdFx0c3VwZXIoaWQsIGltYWdlVXJsLCB4LCAwLCAxMDAsIDEsIDEpO1xuXHRcdHRoaXMuYmxvb21lZCA9IGZhbHNlO1xuXHR9XG5cblx0Z2V0IGltYWdlVXJsKCkge1xuXHRcdHJldHVybiBpbWFnZVVybDtcblx0fVxuXG5cdGdldCBoYXNCbG9vbWVkKCkge1xuXHRcdHJldHVybiB0aGlzLmJsb29tZWQ7XG5cdH1cblxuXHR3YXRlcigpIHtcblx0XHR0aGlzLmhlYWx0aCArPSAwLjI7XG5cdFx0aWYgKHBhcnNlRmxvYXQodGhpcy5ibG9vbVN0YXR1cykudG9GaXhlZCgxKSA+PSAxLjgpIHtcblx0XHRcdGFsZXJ0ICgnT25lIHJvc2UgaGFzIGJsb29tZWQhJyk7XG5cdFx0XHRpZih0aGlzLl9pbWdVcmw9PT0nLi9pbWFnZXMvYmx1ZV9yb3NlLnBuZycpIHtcblx0XHRcdFx0dGhpcy5jaGFuZ2VJbWcgPSAnLi9pbWFnZXMvYmx1ZV9Sb3NlLmdpZic7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLl9pbWdVcmw9PT0nLi9pbWFnZXMvcHVycGxlX3Jvc2UucG5nJyl7XG5cdFx0XHRcdHRoaXMuY2hhbmdlSW1nID0gJy4vaW1hZ2VzL3B1cnBsZV9Sb3NlLmdpZic7XG5cdFx0XHR9IFxuXHRcdFx0aWYodGhpcy5faW1nVXJsPT09Jy4vaW1hZ2VzL3llbGxvd19yb3NlLnBuZycpIHtcblx0XHRcdFx0dGhpcy5jaGFuZ2VJbWcgPSAnLi9pbWFnZXMveWVsbG93X1Jvc2UuZ2lmJztcblx0XHRcdH1cblx0XHRcdGlmKHRoaXMuX2ltZ1VybD09PScuL2ltYWdlcy9vcmFuZ2Vfcm9zZS5wbmcnKSB7XG5cdFx0XHR0aGlzLmNoYW5nZUltZyA9ICcuL2ltYWdlcy9vcmFuZ2VfUm9zZS5naWYnO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5faW1nVXJsPT09Jy4vaW1hZ2VzL3JlZF9yb3NlLnBuZycpIHtcblx0XHRcdFx0dGhpcy5jaGFuZ2VJbWcgPSAnLi9pbWFnZXMvcmVkX1Jvc2UuZ2lmJztcblx0XHRcdH1cblx0XHRcdHRoaXMuYmxvb21lZCA9IHRydWU7XG5cdFx0fVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9zZTsiLCJjb25zdCBQbGFudCA9IHJlcXVpcmUoJy4vUGxhbnQnKTtcblxuY2xhc3MgV2VlZCBleHRlbmRzIFBsYW50IHtcblx0Y29uc3RydWN0b3IoaWQsIHgpIHtcblx0XHRzdXBlcihpZCwgJy4vaW1hZ2VzL3dlZWQucG5nJywgeCwgMCwgNDAsIDMsIDEpO1xuXHRcdHRoaXMuYmxvb21lZCA9IGZhbHNlO1xuXHR9XG5cblx0Z2V0IGhhc0Jsb29tZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYmxvb21lZDtcblx0fVxuXG5cdHdhdGVyKCkge1xuXHRcdHRoaXMuaGVhbHRoICs9IDAuMTtcblx0fVxuXG5cdHBhc3NEYXkoKSB7XG5cdFx0dGhpcy5oZWlnaHQgKz0gdGhpcy5ncm93dGhSYXRlO1xuXHRcdHRoaXMuaGVhbHRoIC09IDAuMDU7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXZWVkOyIsImNvbnN0IEdhcmRlbiA9IHJlcXVpcmUoJy4vR2FyZGVuJyk7XG5jb25zdCBSb3NlID0gcmVxdWlyZSgnLi9Sb3NlJyk7XG5jb25zdCBGcnVpdFRyZWUgPSByZXF1aXJlKCcuL0ZydWl0VHJlZScpO1xuY29uc3QgV2VlZCA9IHJlcXVpcmUoJy4vV2VlZCcpO1xuXG5jb25zdCBidG5BZGRQbGFudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5BZGRQbGFudCcpO1xuY29uc3QgYnRuUGFzc0RheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5QYXNzRGF5Jyk7XG5jb25zdCBidG5sYXduTW93ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRubGF3bk1vd2VyJyk7XG5jb25zdCBidG5XYXRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5XYXRlcicpO1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuY29uc3QgZ2FyZGVuQWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhcmRlbkFnZScpO1xuY29uc3QgZ2FyZGVuTW9uZXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FyZGVuTW9uZXknKTtcbmNvbnN0IGJ0bkNvbGxlY3RNb25leSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5Db2xsZWN0TW9uZXknKTtcbmNvbnN0IHJhaW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFpbicpO1xuY29uc3QgbmlnaHRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmlnaHQnKTtcblxuY29uc3QgZ2FyZGVuID0gbmV3IEdhcmRlbigpO1xuXG5idG5BZGRQbGFudC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuXHRzd2l0Y2goZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RkUGxhbnRzJykudmFsdWUpIHtcblx0XHRjYXNlICdSb3NlJzpcblx0XHRcdGNvbnN0IHJvc2UgPSBuZXcgUm9zZShcInJvc2VcIiAsZ2V0UG9zaXRpb25Sb3NlKCkpO1xuXHRcdFx0Z2FyZGVuLnBsYW50KHJvc2UpO1xuXHRcdFx0Z2FyZGVuLm1vbmV5ID0gLTIwMDtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ0ZydWl0VHJlZSc6XG5cdFx0XHRjb25zdCBuZXdGcnVpdFRyZWUgPSBuZXcgRnJ1aXRUcmVlKFwiRnJ1aXRUcmVlXCIsIGdldFBvc2l0aW9uVHJlZSgpKTtcblx0XHRcdGdhcmRlbi5wbGFudChuZXdGcnVpdFRyZWUpO1xuXHRcdFx0Z2FyZGVuLm1vbmV5ID0gLTMwMDtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRcblx0Z2FyZGVuTW9uZXkudmFsdWUgPSBnYXJkZW4ubW9uZXk7XG5cdGdhcmRlbkFnZS52YWx1ZSA9IGdhcmRlbi5hZ2U7XG5cdGdhcmRlbi5yZW5kZXIoY29udGFpbmVyKTtcbn1cblxuYnRuUGFzc0RheS5vbmNsaWNrID0gZnVuY3Rpb24oKXtcblx0bmlnaHQoKTtcblx0Z2FyZGVuLnBhc3NEYXkoKTtcblx0Z2FyZGVuLm1vbmV5ID0gMTAwO1xuXHRnYXJkZW5Nb25leS52YWx1ZSA9IGdhcmRlbi5tb25leTtcblx0Z2FyZGVuQWdlLnZhbHVlID0gZ2FyZGVuLmFnZTtcblx0Z2FyZGVuLnJlbmRlcihjb250YWluZXIpO1xufVxuXG5idG5XYXRlci5vbmNsaWNrID0gZnVuY3Rpb24oKXtcblx0cmFpbigpO1xuXHRnYXJkZW4ud2F0ZXIoKTtcblx0aWYgKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpID09PSAxKXtcblx0XHRjb25zdCBuZXdXZWVkID0gbmV3IFdlZWQoXCJ3ZWVkXCIsIGdldFBvc2l0aW9uUm9zZSgpKTtcblx0XHRnYXJkZW4ucGxhbnQobmV3V2VlZCk7XG5cdH1cblx0Z2FyZGVuLm1vbmV5ID0gLTUwO1xuXHRnYXJkZW5Nb25leS52YWx1ZSA9IGdhcmRlbi5tb25leTtcblx0Z2FyZGVuLnJlbmRlcihjb250YWluZXIpO1xufVxuXG5idG5sYXduTW93ZXIub25jbGljayA9IGZ1bmN0aW9uKCl7XG5cdGZvcihsZXQgaT0wOyBpPGdhcmRlbi5wbGFudHMubGVuZ3RoOyBpKyspIHtcblx0XHRpZihnYXJkZW4ucGxhbnRzW2ldLmlkID09PSBcIndlZWRcIikge1xuXHRcdFx0Z2FyZGVuLm1vbmV5ID0gLTUwO1xuXHRcdFx0Z2FyZGVuTW9uZXkudmFsdWUgPSBnYXJkZW4ubW9uZXk7XG5cdFx0XHRjb25zdCBhcnIxID0gZ2FyZGVuLl9wbGFudHMuc2xpY2UoMCwgaSk7XG5cdFx0XHRjb25zdCBhcnIyID0gZ2FyZGVuLl9wbGFudHMuc2xpY2UoKGkrMSksIGdhcmRlbi5wbGFudHMubGVuZ3RoKTtcblx0XHRcdGdhcmRlbi5wbGFudHMgPSBhcnIxLmNvbmNhdChhcnIyKTtcblx0XHRcdGdhcmRlbi5yZW5kZXIoY29udGFpbmVyKTtcblx0XHRcdHJldHVybiBhbGVydCgnT25lIHdlZWQgaGFzIHJlbW92ZWQnKTsgXG5cdFx0fVxuXHR9XG59XG5cbmJ0bkNvbGxlY3RNb25leS5vbmNsaWNrID0gIGZ1bmN0aW9uKCl7XG5cdGZvcihsZXQgaT0wOyBpPGdhcmRlbi5wbGFudHMubGVuZ3RoOyBpKyspIHsgLy9hZGQgdGhlIG1vbmV5XG5cdFx0aWYoZ2FyZGVuLnBsYW50c1tpXS5pZCA9PT0gXCJyb3NlXCIgJiYgZ2FyZGVuLnBsYW50c1tpXS5oYXNCbG9vbWVkKSB7XG5cdFx0XHRnYXJkZW4ubW9uZXkgPSAzMDA7XG5cdFx0XHRhbGVydCgnY29sbGVjdCByb3NlIScpOyBcblx0XHR9XHRcdFxuXHRcdGlmKGdhcmRlbi5wbGFudHNbaV0uaWQgPT09IFwiRnJ1aXRUcmVlXCIgJiYgZ2FyZGVuLnBsYW50c1tpXS5oYXNCbG9vbWVkKSB7IC8vUmVuZXcgdHJlZVxuXHRcdFx0Z2FyZGVuLnBsYW50c1tpXS5jaGFuZ2VJbWcgPSAnLi9pbWFnZXMvdHJlZS5wbmcnO1xuXHRcdFx0Z2FyZGVuLnBsYW50c1tpXS5oYXNCbG9vbWVkID0gZmFsc2U7XG5cdFx0XHRnYXJkZW4ucGxhbnRzW2ldLnJlc2V0SGVhbHRoID0gMTtcblx0XHRcdGdhcmRlbi5tb25leSA9IDQwMDtcblx0XHRcdGFsZXJ0KCdjb2xsZWN0IGZydWl0IHRyZWUhJyk7IFxuXHRcdH1cblx0fVxuXHRnYXJkZW5Nb25leS52YWx1ZSA9IGdhcmRlbi5tb25leTtcblx0XG5cdGxldCBlbmRPZkFyciA9IGZhbHNlO1xuXHR3aGlsZSAodHJ1ZSkgeyAvL1JlbW92ZWQgcm9zZXNcblx0XHRpZiAoZW5kT2ZBcnIgfHwgZ2FyZGVuLnBsYW50cy5sZW5ndGg9PT0wKSB7XG5cdFx0XHRnYXJkZW4ucmVuZGVyKGNvbnRhaW5lcik7XG5cdFx0XHRicmVhaztcdFxuXHRcdH1cblx0XHRmb3IobGV0IGk9MDsgaTxnYXJkZW4ucGxhbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoIShnYXJkZW4ucGxhbnRzW2ldLmhhc0Jsb29tZWQpICYmIGkgPT09IChnYXJkZW4ucGxhbnRzLmxlbmd0aCAtIDEpICkge1xuXHRcdFx0XHRlbmRPZkFyciA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZ2FyZGVuLnBsYW50c1tpXS5pZCA9PT0gXCJyb3NlXCIgJiYgZ2FyZGVuLnBsYW50c1tpXS5oYXNCbG9vbWVkKSB7XG5cdFx0XHRcdGNvbnN0IGFycjEgPSBnYXJkZW4ucGxhbnRzLnNsaWNlKDAsIGkpO1xuXHRcdFx0XHRjb25zdCBhcnIyID0gZ2FyZGVuLnBsYW50cy5zbGljZShpKzEsIGdhcmRlbi5wbGFudHMubGVuZ3RoKTtcblx0XHRcdFx0Z2FyZGVuLnBsYW50cyA9IGFycjEuY29uY2F0KGFycjIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gcmFpbigpIHtcblx0cmFpbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdHJhaW5Db250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0fSwgMjAwMClcbn1cblxuZnVuY3Rpb24gbmlnaHQoKSB7XG5cdG5pZ2h0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0bmlnaHRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0fSwgMTUwMClcbn1cblxuZnVuY3Rpb24gZ2V0UG9zaXRpb25UcmVlKCl7XG5cdHJldHVybiAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLSA1MDApKSkgKyAzMDtcbn1cblxuZnVuY3Rpb24gZ2V0UG9zaXRpb25Sb3NlKCl7XG5cdHJldHVybiAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLTEwMCkpKSArIDMwO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==