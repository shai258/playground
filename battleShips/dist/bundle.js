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

/***/ "./src/Board.js":
/*!**********************!*\
  !*** ./src/Board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {random} = __webpack_require__(/*! ./utils */ "./src/utils.js");
const Ship = __webpack_require__(/*! ./Ship */ "./src/Ship.js");

class Board {
  constructor(size) {
    if (!size) {
      return undefined;
    }
    if (typeof size !== 'number') {
      throw new Error();
    }
    this._board = Array(size).fill().map(() => Array(size).fill(0));
    this.size = size;
    this._shipsSize = [4, 3, 3, 2, 2, 1, 1, 1, 1];
    this._ships = [];
    this._guessings = 0;
    this._shipsAlive = 0;
  }
  
  get board() {
    return this._board;
  }

  set board(value) {
    this._board = value;
  }

  get guessings() {
    return this._guessings;
  }

  set guessings(value) {
    this._guessings += value;
  }

  get shipsAlive() {
    this.shipsStatus();
    return this._shipsAlive;
  }

  startNewBattle() {
    alert('new battle!')
    this._guessings = 0;
    this._board = Array(this.size).fill().map(() => Array(this.size).fill(0));
    this._ships = [];
    for (const size of this._shipsSize) {
      const newShip = new Ship (size);
      this._ships.push(newShip);
      this.placeShip(newShip);
    }
  }

  checkPosition(x, y, size, orientation) {
    const x1 = x - 1;
    const y1 = y - 1;

    let x2, y2;
    if (orientation === 'h') {
      x2 = x + size;
      y2 = y + 1;
    }
    else {
      x2 = x + 1;
      y2 = y + size;
    }

    const {_board} = this;
    
    if (x1 < -1 || y1 < -1 || x2 > _board.length || y2 > _board.length) return false;

    for (let currY = y1; currY <= y2; currY++) {
      for (let currX = x1; currX <= x2; currX++) {
        if (_board[currY] && _board[currY][currX]) {
          return false;   
        }          
      }
    }
    return true;
  }

  placeShip(ship) {
    let x, y, orientation;
    do{
      orientation = Math.random() < 0.5 ? 'h':'v';
      x = random(0, this.board.length);
      y = random(0, this.board.length);
    }while(!this.checkPosition(x, y, ship.size, orientation));

    this._addShipToBoard(ship, x, y, orientation);
  }

  _addShipToBoard(ship, x, y, orientation) {
    if (orientation === 'h'){
      for (let i = 0; i < ship.size; i++) {
        this._board[y][x+i] = ship.hit.bind(ship, i);
      }
    }
    else {
      for (let i = 0; i < ship.size; i++) {
        this._board[y+i][x] = ship.hit.bind(ship, i);
      }
    }
  }

  shipsStatus() {
    this._shipsAlive = 0;
    for (const ship of this._ships) {
      if (ship.isAlive) {
        this._shipsAlive++;
      }
    }
    if (this._shipsAlive === 0 ) {
      this.winBattle();
    }
  }


  winBattle(){
    alert(`You win this battle with ${this._guessings} guessings!`);
  }

  hit(x, y) {
    this._board[y][x]();
  }
}

module.exports = Board;

/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Ship {
    constructor(size) {
        this._size = size;
        this._ship = new Array(size).fill(1);
    }

    get size() {
        return this._ship.length;
    }

    get isAlive() {
        return this._ship.includes(1);
        // return !!this._ship.find(val => val === 1);
    }

    hit(place) {
        if (!this._ship[place]) throw new Error();
    
        this._ship[place] = 0;

        if (!this.isAlive && this.onSink) this.onSink();
    }

    onSink() {
        alert('ship down!');
    }
}

module.exports = Ship;


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(/*! ./Board */ "./src/Board.js");
const board = new Board(10);

const container = document.getElementById('container');
const guessings = document.getElementById('tbGuessings');
const shipsStatus = document.getElementById('tbShipsStatus');
const newBattle = document.getElementById('btnNewBattle');


newBattle.onclick = function() {
    board.startNewBattle();
    guessings.value = board.guessings;
    container.innerHTML = '';
    for(let i=0; i<100; i++){
        const curDiv = document.createElement('div');
        curDiv.id = i;
        curDiv.className = 'sea';
        container.appendChild(curDiv);
    }
    shipsStatus.value = board.shipsAlive;
    render();
}

function render() {
    for (let i=0; i<10; i++){
        for (let j=0; j<10; j++) {
            const curDiv = document.getElementById((i*10+j).toString());
            curDiv.oncontextmenu = function() {
                if (curDiv.className === 'ship') return
                curDiv.className = 'fail';
            }
            if (typeof board.board[i][j] === 'function') {
                curDiv.onclick = function() {
                    if (curDiv.className === 'ship') return
                    board.hit(j, i);
                    board.guessings = 1;
                    guessings.value = board.guessings;
                    shipsStatus.value = board.shipsAlive;
                    curDiv.className = 'ship';
                }
            }
            else {
                curDiv.onclick = function() {
                    if (curDiv.className === 'fail') return
                    board.guessings = 1;
                    guessings.value = board.guessings;
                    curDiv.className = 'fail';
                }
            }
        }
    }
}




/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function random(min, max) {
    return Math.floor(Math.random() * max) + min;
}

module.exports = {random};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLE9BQU8sT0FBTyxHQUFHLG1CQUFPLENBQUMsK0JBQVM7QUFDbEMsYUFBYSxtQkFBTyxDQUFDLDZCQUFROztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLE9BQU87O0FBRWxCOztBQUVBLHdCQUF3QixhQUFhO0FBQ3JDLDBCQUEwQixhQUFhO0FBQ3ZDO0FBQ0EsdUI7QUFDQSxTO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0Esc0NBQXNDLGdCQUFnQjtBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Qjs7Ozs7Ozs7Ozs7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM1QkEsY0FBYyxtQkFBTyxDQUFDLCtCQUFTO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QixxQkFBcUIsTUFBTTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25EQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjb25zdCB7cmFuZG9tfSA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcclxuY29uc3QgU2hpcCA9IHJlcXVpcmUoJy4vU2hpcCcpO1xyXG5cclxuY2xhc3MgQm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKHNpemUpIHtcclxuICAgIGlmICghc2l6ZSkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2JvYXJkID0gQXJyYXkoc2l6ZSkuZmlsbCgpLm1hcCgoKSA9PiBBcnJheShzaXplKS5maWxsKDApKTtcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICB0aGlzLl9zaGlwc1NpemUgPSBbNCwgMywgMywgMiwgMiwgMSwgMSwgMSwgMV07XHJcbiAgICB0aGlzLl9zaGlwcyA9IFtdO1xyXG4gICAgdGhpcy5fZ3Vlc3NpbmdzID0gMDtcclxuICAgIHRoaXMuX3NoaXBzQWxpdmUgPSAwO1xyXG4gIH1cclxuICBcclxuICBnZXQgYm9hcmQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBzZXQgYm9hcmQodmFsdWUpIHtcclxuICAgIHRoaXMuX2JvYXJkID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgZ3Vlc3NpbmdzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2d1ZXNzaW5ncztcclxuICB9XHJcblxyXG4gIHNldCBndWVzc2luZ3ModmFsdWUpIHtcclxuICAgIHRoaXMuX2d1ZXNzaW5ncyArPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBzaGlwc0FsaXZlKCkge1xyXG4gICAgdGhpcy5zaGlwc1N0YXR1cygpO1xyXG4gICAgcmV0dXJuIHRoaXMuX3NoaXBzQWxpdmU7XHJcbiAgfVxyXG5cclxuICBzdGFydE5ld0JhdHRsZSgpIHtcclxuICAgIGFsZXJ0KCduZXcgYmF0dGxlIScpXHJcbiAgICB0aGlzLl9ndWVzc2luZ3MgPSAwO1xyXG4gICAgdGhpcy5fYm9hcmQgPSBBcnJheSh0aGlzLnNpemUpLmZpbGwoKS5tYXAoKCkgPT4gQXJyYXkodGhpcy5zaXplKS5maWxsKDApKTtcclxuICAgIHRoaXMuX3NoaXBzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHNpemUgb2YgdGhpcy5fc2hpcHNTaXplKSB7XHJcbiAgICAgIGNvbnN0IG5ld1NoaXAgPSBuZXcgU2hpcCAoc2l6ZSk7XHJcbiAgICAgIHRoaXMuX3NoaXBzLnB1c2gobmV3U2hpcCk7XHJcbiAgICAgIHRoaXMucGxhY2VTaGlwKG5ld1NoaXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tQb3NpdGlvbih4LCB5LCBzaXplLCBvcmllbnRhdGlvbikge1xyXG4gICAgY29uc3QgeDEgPSB4IC0gMTtcclxuICAgIGNvbnN0IHkxID0geSAtIDE7XHJcblxyXG4gICAgbGV0IHgyLCB5MjtcclxuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2gnKSB7XHJcbiAgICAgIHgyID0geCArIHNpemU7XHJcbiAgICAgIHkyID0geSArIDE7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgeDIgPSB4ICsgMTtcclxuICAgICAgeTIgPSB5ICsgc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7X2JvYXJkfSA9IHRoaXM7XHJcbiAgICBcclxuICAgIGlmICh4MSA8IC0xIHx8IHkxIDwgLTEgfHwgeDIgPiBfYm9hcmQubGVuZ3RoIHx8IHkyID4gX2JvYXJkLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGZvciAobGV0IGN1cnJZID0geTE7IGN1cnJZIDw9IHkyOyBjdXJyWSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGN1cnJYID0geDE7IGN1cnJYIDw9IHgyOyBjdXJyWCsrKSB7XHJcbiAgICAgICAgaWYgKF9ib2FyZFtjdXJyWV0gJiYgX2JvYXJkW2N1cnJZXVtjdXJyWF0pIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTsgICBcclxuICAgICAgICB9ICAgICAgICAgIFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHBsYWNlU2hpcChzaGlwKSB7XHJcbiAgICBsZXQgeCwgeSwgb3JpZW50YXRpb247XHJcbiAgICBkb3tcclxuICAgICAgb3JpZW50YXRpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gJ2gnOid2JztcclxuICAgICAgeCA9IHJhbmRvbSgwLCB0aGlzLmJvYXJkLmxlbmd0aCk7XHJcbiAgICAgIHkgPSByYW5kb20oMCwgdGhpcy5ib2FyZC5sZW5ndGgpO1xyXG4gICAgfXdoaWxlKCF0aGlzLmNoZWNrUG9zaXRpb24oeCwgeSwgc2hpcC5zaXplLCBvcmllbnRhdGlvbikpO1xyXG5cclxuICAgIHRoaXMuX2FkZFNoaXBUb0JvYXJkKHNoaXAsIHgsIHksIG9yaWVudGF0aW9uKTtcclxuICB9XHJcblxyXG4gIF9hZGRTaGlwVG9Cb2FyZChzaGlwLCB4LCB5LCBvcmllbnRhdGlvbikge1xyXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaCcpe1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fYm9hcmRbeV1beCtpXSA9IHNoaXAuaGl0LmJpbmQoc2hpcCwgaSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fYm9hcmRbeStpXVt4XSA9IHNoaXAuaGl0LmJpbmQoc2hpcCwgaSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNoaXBzU3RhdHVzKCkge1xyXG4gICAgdGhpcy5fc2hpcHNBbGl2ZSA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IHNoaXAgb2YgdGhpcy5fc2hpcHMpIHtcclxuICAgICAgaWYgKHNoaXAuaXNBbGl2ZSkge1xyXG4gICAgICAgIHRoaXMuX3NoaXBzQWxpdmUrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3NoaXBzQWxpdmUgPT09IDAgKSB7XHJcbiAgICAgIHRoaXMud2luQmF0dGxlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgd2luQmF0dGxlKCl7XHJcbiAgICBhbGVydChgWW91IHdpbiB0aGlzIGJhdHRsZSB3aXRoICR7dGhpcy5fZ3Vlc3NpbmdzfSBndWVzc2luZ3MhYCk7XHJcbiAgfVxyXG5cclxuICBoaXQoeCwgeSkge1xyXG4gICAgdGhpcy5fYm9hcmRbeV1beF0oKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQm9hcmQ7IiwiY2xhc3MgU2hpcCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5fc2hpcCA9IG5ldyBBcnJheShzaXplKS5maWxsKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzaXplKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaGlwLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNBbGl2ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hpcC5pbmNsdWRlcygxKTtcclxuICAgICAgICAvLyByZXR1cm4gISF0aGlzLl9zaGlwLmZpbmQodmFsID0+IHZhbCA9PT0gMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGl0KHBsYWNlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zaGlwW3BsYWNlXSkgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICBcclxuICAgICAgICB0aGlzLl9zaGlwW3BsYWNlXSA9IDA7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc0FsaXZlICYmIHRoaXMub25TaW5rKSB0aGlzLm9uU2luaygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2luaygpIHtcclxuICAgICAgICBhbGVydCgnc2hpcCBkb3duIScpO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXA7XHJcbiIsImNvbnN0IEJvYXJkID0gcmVxdWlyZSgnLi9Cb2FyZCcpO1xyXG5jb25zdCBib2FyZCA9IG5ldyBCb2FyZCgxMCk7XHJcblxyXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcbmNvbnN0IGd1ZXNzaW5ncyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ykd1ZXNzaW5ncycpO1xyXG5jb25zdCBzaGlwc1N0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YlNoaXBzU3RhdHVzJyk7XHJcbmNvbnN0IG5ld0JhdHRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5OZXdCYXR0bGUnKTtcclxuXHJcblxyXG5uZXdCYXR0bGUub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgYm9hcmQuc3RhcnROZXdCYXR0bGUoKTtcclxuICAgIGd1ZXNzaW5ncy52YWx1ZSA9IGJvYXJkLmd1ZXNzaW5ncztcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgIGZvcihsZXQgaT0wOyBpPDEwMDsgaSsrKXtcclxuICAgICAgICBjb25zdCBjdXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjdXJEaXYuaWQgPSBpO1xyXG4gICAgICAgIGN1ckRpdi5jbGFzc05hbWUgPSAnc2VhJztcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3VyRGl2KTtcclxuICAgIH1cclxuICAgIHNoaXBzU3RhdHVzLnZhbHVlID0gYm9hcmQuc2hpcHNBbGl2ZTtcclxuICAgIHJlbmRlcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICBmb3IgKGxldCBpPTA7IGk8MTA7IGkrKyl7XHJcbiAgICAgICAgZm9yIChsZXQgaj0wOyBqPDEwOyBqKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY3VyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoKGkqMTAraikudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGN1ckRpdi5vbmNvbnRleHRtZW51ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VyRGl2LmNsYXNzTmFtZSA9PT0gJ3NoaXAnKSByZXR1cm5cclxuICAgICAgICAgICAgICAgIGN1ckRpdi5jbGFzc05hbWUgPSAnZmFpbCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBib2FyZC5ib2FyZFtpXVtqXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgY3VyRGl2Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRGl2LmNsYXNzTmFtZSA9PT0gJ3NoaXAnKSByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICBib2FyZC5oaXQoaiwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQuZ3Vlc3NpbmdzID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBndWVzc2luZ3MudmFsdWUgPSBib2FyZC5ndWVzc2luZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNTdGF0dXMudmFsdWUgPSBib2FyZC5zaGlwc0FsaXZlO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ckRpdi5jbGFzc05hbWUgPSAnc2hpcCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJEaXYub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJEaXYuY2xhc3NOYW1lID09PSAnZmFpbCcpIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLmd1ZXNzaW5ncyA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3Vlc3NpbmdzLnZhbHVlID0gYm9hcmQuZ3Vlc3NpbmdzO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ckRpdi5jbGFzc05hbWUgPSAnZmFpbCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJmdW5jdGlvbiByYW5kb20obWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtyYW5kb219OyJdLCJzb3VyY2VSb290IjoiIn0=