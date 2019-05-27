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

/***/ "./src/Maze.js":
/*!*********************!*\
  !*** ./src/Maze.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Maze {
    constructor(board, startPoint, direction) {
        this._board = board;
        this._curLocation = startPoint;
        this._direction = direction;
    }

    get board() {
        return this._board;
    }

    play() {
        if(this.reachedEnd()){
            this.changeClass();
            this.win(); 
            return true;
        }
        else if (this.thereIsNoLeftWall()) {
            this.turnLeft();
            this.changeClass();
            this.forward();
            return false;
        }
        else if (this.thereIsNoFrontWall()) {
            this.changeClass();
            this.forward();
            return false;
        }
        else{
            this.turnRight();
            return false;
        }
        
    }

    changeClass() {
        if (this._board[this._curLocation.row][this._curLocation.column] === "0") {
            this._board[this._curLocation.row][this._curLocation.column] = "1";
        }
        else if(this._board[this._curLocation.row][this._curLocation.column] === "1") {
            this._board[this._curLocation.row][this._curLocation.column] = "2";
        }
        else {
            this._board[this._curLocation.row][this._curLocation.column] = "3";
        }
    }

    reachedEnd() {
        switch(this._direction) {
            case 'up':
                return !this._board[this._curLocation.row-1] || !this._board[this._curLocation.row-1][this._curLocation.column];
            case 'right':
                return !this._board[this._curLocation.row] || !this._board[this._curLocation.row][this._curLocation.column+1];
            case 'down':
                return !this._board[this._curLocation.row+1] || !this._board[this._curLocation.row+1][this._curLocation.column+1];
            case 'left':
                return !this._board[this._curLocation.row] || !this._board[this._curLocation.row][this._curLocation.column-1];
            default:
                alert('Not find location case');
                break;
        }
    }

    win() {
        alert('You win!!')
    }

    thereIsNoLeftWall() {
        switch(this._direction) {
            case 'up':
                return this._board[this._curLocation.row][this._curLocation.column-1] !== 'x';
            case 'right':
                return this._board[this._curLocation.row-1][this._curLocation.column] !== 'x';
            case 'down':
                return this._board[this._curLocation.row][this._curLocation.column+1] !== 'x';
            case 'left':
                return this._board[this._curLocation.row+1][this._curLocation.column] !== 'x';
            default:
                alert('Not find location case');
                break;
        }
    }

    turnLeft() {
        switch(this._direction) {
            case 'up':
                this._direction = 'left';
                break;
            case 'right':
                this._direction = 'up';
                break;
            case 'down':
                this._direction = 'right';
                break;
            case 'left':
                this._direction = 'down';
                break;
            default:
                alert('Not find location case');
                break;
        }
    }

    thereIsNoFrontWall() {
        switch(this._direction) {
            case 'up':
                return this._board[this._curLocation.row-1][this._curLocation.column] !== 'x';
            case 'right':
                return this._board[this._curLocation.row][this._curLocation.column+1] !== 'x';
            case 'down':
                return this._board[this._curLocation.row+1][this._curLocation.column+1] !== 'x';
            case 'left':
                return this._board[this._curLocation.row][this._curLocation.column-1] !== 'x';
            default:
                alert('Not find location case');
                break;
        }
    }

    forward() {
        switch(this._direction) {
            case 'up':
                this._curLocation.row--;
                break;
            case 'right':
                this._curLocation.column++;
                break;
            case 'down':
                this._curLocation.row++;
                break;
            case 'left':
                this._curLocation.column--;
                break;
            default:
                alert('Not find location case');
                break;
        }
    }

    turnRight() {
        switch(this._direction) {
            case 'up':
                this._direction = 'right';
                break;
            case 'right':
                this._direction = 'down';
                break;
            case 'down':
                this._direction = 'left';
                break;
            case 'left':
                this._direction = 'up';
                break;
            default:
                alert('Not find location case');
                break;
        }
    }

}

module.exports = Maze;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Maze = __webpack_require__(/*! ./Maze */ "./src/Maze.js");

const mazeContainer = document.getElementById('mazeContainer');
const btnNewGame = document.getElementById('btnNewGame');
const mazeDropdown = document.getElementById('mazeDropdown');
const btnLoadMaze = document.getElementById('btnLoadMaze');
const tbBoard = document.getElementById('tbBoard');
const tbStartPoint = document.getElementById('tbStartPoint');
const tbDirection = document.getElementById('tbDirection');

let maze;
let rowSize;
let columnSize;

const mazeObj = {
    board:     [
        ['x', '0', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', '0', '0', '0', '0', '0', '0', 'x'],
        ['x', '0', 'x', 'x', '0', 'x', '0', 'x'],
        ['x', '0', 'x', 'x', '0', '0', 'x', 'x'],
        ['x', 'x', 'x', '0', 'x', '0', '0', 'x'],
        ['x', '0', '0', '0', '0', '0', 'x', 'x'],
        ['x', 'x', 'x', '0', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']
    ],
    startPoint : {
        row: 6,
        column: 3
    },
    direction : 'up'
} 

createMazesDropdown();
render();

btnLoadMaze.onclick = () => {
    let mazesArr = JSON.parse(localStorage.getItem('mazes'));
    if (mazesArr === null) mazesArr = [];
    let maze = {
        "board" : tbBoard,
        "startPoint" : tbStartPoint.value,
        "direction" : tbDirection.value
    }
    mazesArr.push(maze)
    localStorage.setItem('mazes', JSON.stringify(mazesArr));
    createMazesDropdown();
}

function createMazesDropdown() {
    let mazesArr = JSON.parse(localStorage.getItem('mazes'));
    if (mazesArr === null) mazesArr = [];
    const chooseOption = document.createElement('option');
    chooseOption.innerText = 'choose maze: ';
    mazeDropdown.appendChild(chooseOption);

    for(let i=0; i<mazesArr.length; i++) {
        const curOption = document.createElement('option');
        curOption.value = i;
        curOption.innerText = `maze ${i+1}`;
        mazeDropdown.appendChild(curOption);
    }
}

function createNewGame() {
    maze = new Maze(mazeObj.board, mazeObj.startPoint, mazeObj.direction);
    rowSize = maze.board.length;
    columnSize = maze.board[0].length;
}

btnNewGame.onclick = () => {
    createNewGame();
    const play = setInterval(()=>{
        if (maze.play()) clearInterval(play);
        render();
    },500)
}

function changeStatus() {
    if (!(this.className === 'wall')){
        this.className = 'wall';
        for (i=0; i<rowSize; i++){
            for (j=0; j<columnSize; j++) {
                const curDiv = document.getElementById(((i*10)+j).toString())
                if (curDiv.className==='wall') maze.board[i][j] = 'x';
            }
        }
    }
    else{
        this.className = 'neverWalked';
        for (i=0; i<rowSize; i++){
            for (j=0; j<columnSize; j++) {
                const curDiv = document.getElementById(((i*10)+j).toString())
                if (curDiv.className==='neverWalked') maze.board[i][j] = '0';
            }
        }
    }
}

function render() {
    mazeContainer.innerHTML = '';
    for (i=0; i<rowSize; i++){
        for (j=0; j<columnSize; j++) {
            curDiv = document.createElement('div');
            if (maze.board[i][j] === "0") curDiv.className= 'neverWalked';
            else if(maze.board[i][j] === "1") curDiv.className= 'walkedOnce';
            else if(maze.board[i][j] === "2") curDiv.className= 'walkedTwice';
            else if(maze.board[i][j] === "3") curDiv.className= 'walkedThreeTimes';
            else {curDiv.className= 'wall';};

            curDiv.id = (i*10)+j;
            curDiv.onclick = changeStatus;

            mazeContainer.appendChild(curDiv);
        }
    }
    mazeContainer.style.gridTemplateColumns = `repeat(${columnSize}, 1fr)`;
    mazeContainer.style.gridTemplateRows = `repeat(${rowSize}, 1fr)`;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01hemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxzQjs7Ozs7Ozs7Ozs7QUNqS0EsYUFBYSxtQkFBTyxDQUFDLDZCQUFROztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBLHNDQUFzQyxJQUFJO0FBQzFDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFdBQVc7QUFDNUIscUJBQXFCLGNBQWM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsV0FBVztBQUM1QixxQkFBcUIsY0FBYztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsV0FBVztBQUN4QixpQkFBaUIsY0FBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxXQUFXO0FBQ25FLHFEQUFxRCxRQUFRO0FBQzdEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY2xhc3MgTWF6ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCwgc3RhcnRQb2ludCwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fYm9hcmQgPSBib2FyZDtcclxuICAgICAgICB0aGlzLl9jdXJMb2NhdGlvbiA9IHN0YXJ0UG9pbnQ7XHJcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBib2FyZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYm9hcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICBpZih0aGlzLnJlYWNoZWRFbmQoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQ2xhc3MoKTtcclxuICAgICAgICAgICAgdGhpcy53aW4oKTsgXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnRoZXJlSXNOb0xlZnRXYWxsKCkpIHtcclxuICAgICAgICAgICAgdGhpcy50dXJuTGVmdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUNsYXNzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudGhlcmVJc05vRnJvbnRXYWxsKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VDbGFzcygpO1xyXG4gICAgICAgICAgICB0aGlzLmZvcndhcmQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnR1cm5SaWdodCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUNsYXNzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9ib2FyZFt0aGlzLl9jdXJMb2NhdGlvbi5yb3ddW3RoaXMuX2N1ckxvY2F0aW9uLmNvbHVtbl0gPT09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvYXJkW3RoaXMuX2N1ckxvY2F0aW9uLnJvd11bdGhpcy5fY3VyTG9jYXRpb24uY29sdW1uXSA9IFwiMVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuX2JvYXJkW3RoaXMuX2N1ckxvY2F0aW9uLnJvd11bdGhpcy5fY3VyTG9jYXRpb24uY29sdW1uXSA9PT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYm9hcmRbdGhpcy5fY3VyTG9jYXRpb24ucm93XVt0aGlzLl9jdXJMb2NhdGlvbi5jb2x1bW5dID0gXCIyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9ib2FyZFt0aGlzLl9jdXJMb2NhdGlvbi5yb3ddW3RoaXMuX2N1ckxvY2F0aW9uLmNvbHVtbl0gPSBcIjNcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVhY2hlZEVuZCgpIHtcclxuICAgICAgICBzd2l0Y2godGhpcy5fZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3VwJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5fYm9hcmRbdGhpcy5fY3VyTG9jYXRpb24ucm93LTFdIHx8ICF0aGlzLl9ib2FyZFt0aGlzLl9jdXJMb2NhdGlvbi5yb3ctMV1bdGhpcy5fY3VyTG9jYXRpb24uY29sdW1uXTtcclxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLl9ib2FyZFt0aGlzLl9jdXJMb2NhdGlvbi5yb3ddIHx8ICF0aGlzLl9ib2FyZFt0aGlzLl9jdXJMb2NhdGlvbi5yb3ddW3RoaXMuX2N1ckxvY2F0aW9uLmNvbHVtbisxXTtcclxuICAgICAgICAgICAgY2FzZSAnZG93bic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuX2JvYXJkW3RoaXMuX2N1ckxvY2F0aW9uLnJvdysxXSB8fCAhdGhpcy5fYm9hcmRbdGhpcy5fY3VyTG9jYXRpb24ucm93KzFdW3RoaXMuX2N1ckxvY2F0aW9uLmNvbHVtbisxXTtcclxuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuX2JvYXJkW3RoaXMuX2N1ckxvY2F0aW9uLnJvd10gfHwgIXRoaXMuX2JvYXJkW3RoaXMuX2N1ckxvY2F0aW9uLnJvd11bdGhpcy5fY3VyTG9jYXRpb24uY29sdW1uLTFdO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ05vdCBmaW5kIGxvY2F0aW9uIGNhc2UnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3aW4oKSB7XHJcbiAgICAgICAgYWxlcnQoJ1lvdSB3aW4hIScpXHJcbiAgICB9XHJcblxyXG4gICAgdGhlcmVJc05vTGVmdFdhbGwoKSB7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuX2RpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlICd1cCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYm9hcmRbdGhpcy5fY3VyTG9jYXRpb24ucm93XVt0aGlzLl9jdXJMb2NhdGlvbi5jb2x1bW4tMV0gIT09ICd4JztcclxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JvYXJkW3RoaXMuX2N1ckxvY2F0aW9uLnJvdy0xXVt0aGlzLl9jdXJMb2NhdGlvbi5jb2x1bW5dICE9PSAneCc7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JvYXJkW3RoaXMuX2N1ckxvY2F0aW9uLnJvd11bdGhpcy5fY3VyTG9jYXRpb24uY29sdW1uKzFdICE9PSAneCc7XHJcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JvYXJkW3RoaXMuX2N1ckxvY2F0aW9uLnJvdysxXVt0aGlzLl9jdXJMb2NhdGlvbi5jb2x1bW5dICE9PSAneCc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnTm90IGZpbmQgbG9jYXRpb24gY2FzZScpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHR1cm5MZWZ0KCkge1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLl9kaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSAndXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gJ2xlZnQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9ICd1cCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZG93bic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSAncmlnaHQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gJ2Rvd24nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnTm90IGZpbmQgbG9jYXRpb24gY2FzZScpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoZXJlSXNOb0Zyb250V2FsbCgpIHtcclxuICAgICAgICBzd2l0Y2godGhpcy5fZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3VwJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ib2FyZFt0aGlzLl9jdXJMb2NhdGlvbi5yb3ctMV1bdGhpcy5fY3VyTG9jYXRpb24uY29sdW1uXSAhPT0gJ3gnO1xyXG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYm9hcmRbdGhpcy5fY3VyTG9jYXRpb24ucm93XVt0aGlzLl9jdXJMb2NhdGlvbi5jb2x1bW4rMV0gIT09ICd4JztcclxuICAgICAgICAgICAgY2FzZSAnZG93bic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYm9hcmRbdGhpcy5fY3VyTG9jYXRpb24ucm93KzFdW3RoaXMuX2N1ckxvY2F0aW9uLmNvbHVtbisxXSAhPT0gJ3gnO1xyXG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ib2FyZFt0aGlzLl9jdXJMb2NhdGlvbi5yb3ddW3RoaXMuX2N1ckxvY2F0aW9uLmNvbHVtbi0xXSAhPT0gJ3gnO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ05vdCBmaW5kIGxvY2F0aW9uIGNhc2UnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3J3YXJkKCkge1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLl9kaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSAndXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyTG9jYXRpb24ucm93LS07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyTG9jYXRpb24uY29sdW1uKys7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZG93bic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJMb2NhdGlvbi5yb3crKztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1ckxvY2F0aW9uLmNvbHVtbi0tO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnTm90IGZpbmQgbG9jYXRpb24gY2FzZScpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHR1cm5SaWdodCgpIHtcclxuICAgICAgICBzd2l0Y2godGhpcy5fZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3VwJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9ICdyaWdodCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gJ2Rvd24nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gJ2xlZnQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gJ3VwJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ05vdCBmaW5kIGxvY2F0aW9uIGNhc2UnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWF6ZTsiLCJjb25zdCBNYXplID0gcmVxdWlyZSgnLi9NYXplJyk7XHJcblxyXG5jb25zdCBtYXplQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hemVDb250YWluZXInKTtcclxuY29uc3QgYnRuTmV3R2FtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5OZXdHYW1lJyk7XHJcbmNvbnN0IG1hemVEcm9wZG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXplRHJvcGRvd24nKTtcclxuY29uc3QgYnRuTG9hZE1hemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuTG9hZE1hemUnKTtcclxuY29uc3QgdGJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YkJvYXJkJyk7XHJcbmNvbnN0IHRiU3RhcnRQb2ludCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YlN0YXJ0UG9pbnQnKTtcclxuY29uc3QgdGJEaXJlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJEaXJlY3Rpb24nKTtcclxuXHJcbmxldCBtYXplO1xyXG5sZXQgcm93U2l6ZTtcclxubGV0IGNvbHVtblNpemU7XHJcblxyXG5jb25zdCBtYXplT2JqID0ge1xyXG4gICAgYm9hcmQ6ICAgICBbXHJcbiAgICAgICAgWyd4JywgJzAnLCAneCcsICd4JywgJ3gnLCAneCcsICd4JywgJ3gnXSxcclxuICAgICAgICBbJ3gnLCAnMCcsICcwJywgJzAnLCAnMCcsICcwJywgJzAnLCAneCddLFxyXG4gICAgICAgIFsneCcsICcwJywgJ3gnLCAneCcsICcwJywgJ3gnLCAnMCcsICd4J10sXHJcbiAgICAgICAgWyd4JywgJzAnLCAneCcsICd4JywgJzAnLCAnMCcsICd4JywgJ3gnXSxcclxuICAgICAgICBbJ3gnLCAneCcsICd4JywgJzAnLCAneCcsICcwJywgJzAnLCAneCddLFxyXG4gICAgICAgIFsneCcsICcwJywgJzAnLCAnMCcsICcwJywgJzAnLCAneCcsICd4J10sXHJcbiAgICAgICAgWyd4JywgJ3gnLCAneCcsICcwJywgJ3gnLCAneCcsICd4JywgJ3gnXSxcclxuICAgICAgICBbJ3gnLCAneCcsICd4JywgJ3gnLCAneCcsICd4JywgJ3gnLCAneCddXHJcbiAgICBdLFxyXG4gICAgc3RhcnRQb2ludCA6IHtcclxuICAgICAgICByb3c6IDYsXHJcbiAgICAgICAgY29sdW1uOiAzXHJcbiAgICB9LFxyXG4gICAgZGlyZWN0aW9uIDogJ3VwJ1xyXG59IFxyXG5cclxuY3JlYXRlTWF6ZXNEcm9wZG93bigpO1xyXG5yZW5kZXIoKTtcclxuXHJcbmJ0bkxvYWRNYXplLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICBsZXQgbWF6ZXNBcnIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtYXplcycpKTtcclxuICAgIGlmIChtYXplc0FyciA9PT0gbnVsbCkgbWF6ZXNBcnIgPSBbXTtcclxuICAgIGxldCBtYXplID0ge1xyXG4gICAgICAgIFwiYm9hcmRcIiA6IHRiQm9hcmQsXHJcbiAgICAgICAgXCJzdGFydFBvaW50XCIgOiB0YlN0YXJ0UG9pbnQudmFsdWUsXHJcbiAgICAgICAgXCJkaXJlY3Rpb25cIiA6IHRiRGlyZWN0aW9uLnZhbHVlXHJcbiAgICB9XHJcbiAgICBtYXplc0Fyci5wdXNoKG1hemUpXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbWF6ZXMnLCBKU09OLnN0cmluZ2lmeShtYXplc0FycikpO1xyXG4gICAgY3JlYXRlTWF6ZXNEcm9wZG93bigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVNYXplc0Ryb3Bkb3duKCkge1xyXG4gICAgbGV0IG1hemVzQXJyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbWF6ZXMnKSk7XHJcbiAgICBpZiAobWF6ZXNBcnIgPT09IG51bGwpIG1hemVzQXJyID0gW107XHJcbiAgICBjb25zdCBjaG9vc2VPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgIGNob29zZU9wdGlvbi5pbm5lclRleHQgPSAnY2hvb3NlIG1hemU6ICc7XHJcbiAgICBtYXplRHJvcGRvd24uYXBwZW5kQ2hpbGQoY2hvb3NlT3B0aW9uKTtcclxuXHJcbiAgICBmb3IobGV0IGk9MDsgaTxtYXplc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGN1ck9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgIGN1ck9wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICAgICAgY3VyT3B0aW9uLmlubmVyVGV4dCA9IGBtYXplICR7aSsxfWA7XHJcbiAgICAgICAgbWF6ZURyb3Bkb3duLmFwcGVuZENoaWxkKGN1ck9wdGlvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU5ld0dhbWUoKSB7XHJcbiAgICBtYXplID0gbmV3IE1hemUobWF6ZU9iai5ib2FyZCwgbWF6ZU9iai5zdGFydFBvaW50LCBtYXplT2JqLmRpcmVjdGlvbik7XHJcbiAgICByb3dTaXplID0gbWF6ZS5ib2FyZC5sZW5ndGg7XHJcbiAgICBjb2x1bW5TaXplID0gbWF6ZS5ib2FyZFswXS5sZW5ndGg7XHJcbn1cclxuXHJcbmJ0bk5ld0dhbWUub25jbGljayA9ICgpID0+IHtcclxuICAgIGNyZWF0ZU5ld0dhbWUoKTtcclxuICAgIGNvbnN0IHBsYXkgPSBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICAgIGlmIChtYXplLnBsYXkoKSkgY2xlYXJJbnRlcnZhbChwbGF5KTtcclxuICAgICAgICByZW5kZXIoKTtcclxuICAgIH0sNTAwKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VTdGF0dXMoKSB7XHJcbiAgICBpZiAoISh0aGlzLmNsYXNzTmFtZSA9PT0gJ3dhbGwnKSl7XHJcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSAnd2FsbCc7XHJcbiAgICAgICAgZm9yIChpPTA7IGk8cm93U2l6ZTsgaSsrKXtcclxuICAgICAgICAgICAgZm9yIChqPTA7IGo8Y29sdW1uU2l6ZTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgoKGkqMTApK2opLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICBpZiAoY3VyRGl2LmNsYXNzTmFtZT09PSd3YWxsJykgbWF6ZS5ib2FyZFtpXVtqXSA9ICd4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSAnbmV2ZXJXYWxrZWQnO1xyXG4gICAgICAgIGZvciAoaT0wOyBpPHJvd1NpemU7IGkrKyl7XHJcbiAgICAgICAgICAgIGZvciAoaj0wOyBqPGNvbHVtblNpemU7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoKChpKjEwKStqKS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1ckRpdi5jbGFzc05hbWU9PT0nbmV2ZXJXYWxrZWQnKSBtYXplLmJvYXJkW2ldW2pdID0gJzAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICBtYXplQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgZm9yIChpPTA7IGk8cm93U2l6ZTsgaSsrKXtcclxuICAgICAgICBmb3IgKGo9MDsgajxjb2x1bW5TaXplOyBqKyspIHtcclxuICAgICAgICAgICAgY3VyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGlmIChtYXplLmJvYXJkW2ldW2pdID09PSBcIjBcIikgY3VyRGl2LmNsYXNzTmFtZT0gJ25ldmVyV2Fsa2VkJztcclxuICAgICAgICAgICAgZWxzZSBpZihtYXplLmJvYXJkW2ldW2pdID09PSBcIjFcIikgY3VyRGl2LmNsYXNzTmFtZT0gJ3dhbGtlZE9uY2UnO1xyXG4gICAgICAgICAgICBlbHNlIGlmKG1hemUuYm9hcmRbaV1bal0gPT09IFwiMlwiKSBjdXJEaXYuY2xhc3NOYW1lPSAnd2Fsa2VkVHdpY2UnO1xyXG4gICAgICAgICAgICBlbHNlIGlmKG1hemUuYm9hcmRbaV1bal0gPT09IFwiM1wiKSBjdXJEaXYuY2xhc3NOYW1lPSAnd2Fsa2VkVGhyZWVUaW1lcyc7XHJcbiAgICAgICAgICAgIGVsc2Uge2N1ckRpdi5jbGFzc05hbWU9ICd3YWxsJzt9O1xyXG5cclxuICAgICAgICAgICAgY3VyRGl2LmlkID0gKGkqMTApK2o7XHJcbiAgICAgICAgICAgIGN1ckRpdi5vbmNsaWNrID0gY2hhbmdlU3RhdHVzO1xyXG5cclxuICAgICAgICAgICAgbWF6ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjdXJEaXYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG1hemVDb250YWluZXIuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHtjb2x1bW5TaXplfSwgMWZyKWA7XHJcbiAgICBtYXplQ29udGFpbmVyLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgcmVwZWF0KCR7cm93U2l6ZX0sIDFmcilgO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=