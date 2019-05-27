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
/***/ (function(module, exports) {

class Board {
    constructor(size, cardsArr) {
        this._size = +size;
        this._cardsArr = cardsArr;
        this._board = [];
        this._guesses = 0;
        this._score = 0;
        this._openCard = null;
    }

    get board() {
        return this._board;
    }
    
    get guesses() {
        return this._guesses;
    }

    get score() {
        this.calculateScore();
        return this._score;
    }

    fillBoard() {
        while (this._board.length < this._size) {
            for (let card of this._cardsArr) {
                this._board.push(Object.assign({}, card));
                this._board.push(Object.assign({}, card));
                if (this._board.length === this._size) {
                    break;
                }
            }
        }
        this._shuffle();
        for (let i=0; i < this._board.length; i++) {
            this._board[i].index = i;
            this._board[i].matched = false;
        }
    }

    _shuffle() {
        this._board.sort(() => 0.5 - Math.random());
    }

    calculateScore() {
        let matches = 0;
        for (let card of this._board) {
            if (card.matched) matches++;
        }
        this._score = (this._size*10) * (matches/2) - this._guesses;
    }

    isGameWin() {
        for (let card of this._board) {
            if (!card.matched) return;
        }
        this.onWin();
    }

    isMatch(cardDataSet) {
        if (!this._openCard) {
            this._openCard = cardDataSet;
        }
        else {
            this._guesses++;
            if (cardDataSet.id !== this._openCard.id) {
                if (this.onNotMatch) this.onNotMatch();
                this._openCard = 0;
            }
            else {
                this._board[this._openCard.index].matched = true;
                this._board[cardDataSet.index].matched = true;
                if (this.onMatch) this.onMatch();
                this._openCard = null;
            }
        }
    }
}

module.exports = Board;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(/*! ./Board */ "./src/Board.js");

const btnNewGame = document.getElementById('btnNewGame');
const levelDropDown = document.getElementById('levelDropDown');
const boardContainer = document.getElementById('boardContainer');
const highScoreContainer = document.getElementById('highScoreContainer');
const btnScore = document.getElementById('btnScore');
const timeWrapper = document.getElementById('timeWrapper');
const tbGuesses = document.getElementById('tbGuesses');
const tbScore = document.getElementById('tbScore');
const tbName = document.getElementById('tbName');
const tbWinScore = document.getElementById('tbWinScore');

let timerHandle;
let board

getHighScore();

levelDropDown.onchange = function() {
    this.className = '';
    btnNewGame.className = 'pulse';
}

btnNewGame.onclick =  function() {
    this.className = '';
    getHighScore();
    startTimer();
    getCardsArr();
}


function getCardsArr() {
    fetch("http://localhost:3000/cards")
        .then(response => response.json())
        .then(json => createNewBoard(json))
}

function createNewBoard(cardsArr) {
    const newArr = cardsArr.slice(0, ~~(Math.random()*13)+2);
    board = new Board (levelDropDown.value, newArr);

    if (levelDropDown.value === '20') boardContainer.style.gridTemplateColumns = 'repeat(5, 1fr)';
    else if(levelDropDown.value === '12') boardContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    else {boardContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';}

    tbGuesses.value = board.guesses;
    tbScore.value = board.score;

    board.onMatch = () => {
        tbGuesses.value = board.guesses;
        tbScore.value = board.score;
        let matchedArr = board.board.filter(cardObj => cardObj.matched);
        matchedArr.forEach(card => {
            document.querySelector(`[data-index="${card.index}"]`).firstChild.nextSibling.style.opacity = 0.5;
            document.querySelector(`[data-index="${card.index}"]`).removeEventListener("click", flipCard);
        });
        board.isGameWin();
    }

    board.onNotMatch = () => {
        setTimeout(function(){
        tbGuesses.value = board.guesses;
        let matchedArr = board.board.filter(cardObj => !cardObj.matched);
        matchedArr.forEach(card => {
            document.querySelector(`[data-index="${card.index}"]`).className = 'cardInner';
            board._openCard = null;
        })}, 1000);
    }

    board.onWin = () => { 
        clearInterval(timerHandle);
        tbWinScore.value = board.score + parseInt(timeWrapper.innerText.slice(6,8));
        setTimeout(() => {
            document.getElementById('gameWinModal').style.display = 'block';
        }, 800)
    }

    board.fillBoard();
    render();
}

function flipCard() {
    if (board._openCard && this.dataset.index === board._openCard.index) return;
    if (board._openCard===0) return;
    this.classList.toggle('cardFlipped');
    board.isMatch(this.dataset);
}

function startTimer() {
    if (timerHandle) clearInterval(timerHandle);
    timeWrapper.style.color = 'black';
    timeWrapper.style.fontWeight = '400';
    var timerCounter = 60;

    timerHandle = setInterval(function() {
        timerCounter--;
        var minutes = Math.floor(timerCounter / 60);
        var seconds = timerCounter % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        if(timerCounter === 10) {
            timeWrapper.style.color = 'red';
            timeWrapper.style.fontWeight = 'bold';
        }
        if(timerCounter === 0) {
          gameOver();
          clearInterval(timerHandle);
        }
        timeWrapper.innerHTML = `${minutes}m : ${seconds}s`;
    }, 1000);
}

function gameOver() {
    document.getElementById('gameOverModal').style.display = 'block';
    setTimeout(function() {
        document.getElementById('gameOverModal').style.display = 'none';
        boardContainer.innerHTML = '';
    }, 2000)
}

btnScore.onclick = function() { //setHighScore
    document.getElementById('gameWinModal').style.display = 'none';

    let winnersArr = JSON.parse(localStorage.getItem('winners'));
    if (winnersArr === null) winnersArr = [];
    const curScore = {score: board.score + parseInt(timeWrapper.innerText.slice(6,8)),
        name: tbName.value
        }
    if(winnersArr.length < 3) {
        let pushed = false;
        for (let i=0; i<winnersArr.length; i++){
            if (winnersArr[i].score < curScore.score) {
                winnersArr.splice(i, 0, curScore);
                pushed = true;
                break;
            }
        }
        if (!pushed){
            winnersArr.push(curScore);
        }
    }
    else {
        for (let i=0; i<winnersArr.length; i++){
            if (winnersArr[i].score < curScore.score) {
                winnersArr[i] = curScore;
                break;
            }
        }  
    }
    localStorage.setItem('winners', JSON.stringify(winnersArr));
}

function getHighScore() {
    let winnersArr = JSON.parse(localStorage.getItem('winners'));
    if (winnersArr === null) return;
    highScoreContainer.innerHTML = '';
    let scoresDiv = document.createElement('div');
    for (let i=0; i<winnersArr.length; i++) {
        let scorePara = document.createElement('p');
        scorePara.innerText = `${i+1}. ${winnersArr[i].name} - ${winnersArr[i].score} points`;
        scoresDiv.appendChild(scorePara);
    }
    let highScoreTitle = document.createElement('h1');
    highScoreTitle.innerText = 'High-Scores';
    highScoreContainer.appendChild(highScoreTitle);
    highScoreContainer.appendChild(scoresDiv);
}

function render() {
    boardContainer.innerHTML = '';
    for (let card of board.board) {
        const cardInnerDiv = document.createElement('div');
        const cardBackDiv = document.createElement('div');
        const cardFrontDiv = document.createElement('div');
        
        cardInnerDiv.className = 'cardInner cardFlipped';
        cardInnerDiv.dataset.id = card.id;
        cardInnerDiv.dataset.index = card.index;
        
        cardBackDiv.className = 'cardBack';
        cardFrontDiv.className = 'cardFront';
        
        cardFrontDiv.style.backgroundImage = `url(${card.url})`;
        
        cardInnerDiv.appendChild(cardBackDiv);
        cardInnerDiv.appendChild(cardFrontDiv);
        boardContainer.appendChild(cardInnerDiv);
        setTimeout(() => {
            cardInnerDiv.className = 'cardInner';
            cardInnerDiv.addEventListener('click', flipCard);
        }, 2000)
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pELGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsd0JBQXdCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7Ozs7Ozs7O0FDL0VBLGNBQWMsbUJBQU8sQ0FBQywrQkFBUzs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxXQUFXO0FBQzlELG1EQUFtRCxXQUFXO0FBQzlELFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsV0FBVztBQUM5RDtBQUNBLFNBQVMsRUFBRTtBQUNYOztBQUVBLHlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsUUFBUSxNQUFNLFFBQVE7QUFDekQsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsK0JBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHFCQUFxQjtBQUN0QztBQUNBLGlDQUFpQyxJQUFJLElBQUksbUJBQW1CLEtBQUssb0JBQW9CO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvREFBb0QsU0FBUzs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjbGFzcyBCb2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaXplLCBjYXJkc0Fycikge1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSArc2l6ZTtcclxuICAgICAgICB0aGlzLl9jYXJkc0FyciA9IGNhcmRzQXJyO1xyXG4gICAgICAgIHRoaXMuX2JvYXJkID0gW107XHJcbiAgICAgICAgdGhpcy5fZ3Vlc3NlcyA9IDA7XHJcbiAgICAgICAgdGhpcy5fc2NvcmUgPSAwO1xyXG4gICAgICAgIHRoaXMuX29wZW5DYXJkID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYm9hcmQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvYXJkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZ3Vlc3NlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ3Vlc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NvcmUoKSB7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVTY29yZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY29yZTtcclxuICAgIH1cclxuXHJcbiAgICBmaWxsQm9hcmQoKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2JvYXJkLmxlbmd0aCA8IHRoaXMuX3NpemUpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY2FyZCBvZiB0aGlzLl9jYXJkc0Fycikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYm9hcmQucHVzaChPYmplY3QuYXNzaWduKHt9LCBjYXJkKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ib2FyZC5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGNhcmQpKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ib2FyZC5sZW5ndGggPT09IHRoaXMuX3NpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zaHVmZmxlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgdGhpcy5fYm9hcmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fYm9hcmRbaV0uaW5kZXggPSBpO1xyXG4gICAgICAgICAgICB0aGlzLl9ib2FyZFtpXS5tYXRjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zaHVmZmxlKCkge1xyXG4gICAgICAgIHRoaXMuX2JvYXJkLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlU2NvcmUoKSB7XHJcbiAgICAgICAgbGV0IG1hdGNoZXMgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGNhcmQgb2YgdGhpcy5fYm9hcmQpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmQubWF0Y2hlZCkgbWF0Y2hlcysrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zY29yZSA9ICh0aGlzLl9zaXplKjEwKSAqIChtYXRjaGVzLzIpIC0gdGhpcy5fZ3Vlc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBpc0dhbWVXaW4oKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY2FyZCBvZiB0aGlzLl9ib2FyZCkge1xyXG4gICAgICAgICAgICBpZiAoIWNhcmQubWF0Y2hlZCkgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uV2luKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNNYXRjaChjYXJkRGF0YVNldCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fb3BlbkNhcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3BlbkNhcmQgPSBjYXJkRGF0YVNldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2d1ZXNzZXMrKztcclxuICAgICAgICAgICAgaWYgKGNhcmREYXRhU2V0LmlkICE9PSB0aGlzLl9vcGVuQ2FyZC5pZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25Ob3RNYXRjaCkgdGhpcy5vbk5vdE1hdGNoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcGVuQ2FyZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ib2FyZFt0aGlzLl9vcGVuQ2FyZC5pbmRleF0ubWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ib2FyZFtjYXJkRGF0YVNldC5pbmRleF0ubWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbk1hdGNoKSB0aGlzLm9uTWF0Y2goKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wZW5DYXJkID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCb2FyZDsiLCJjb25zdCBCb2FyZCA9IHJlcXVpcmUoJy4vQm9hcmQnKTtcclxuXHJcbmNvbnN0IGJ0bk5ld0dhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuTmV3R2FtZScpO1xyXG5jb25zdCBsZXZlbERyb3BEb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xldmVsRHJvcERvd24nKTtcclxuY29uc3QgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmRDb250YWluZXInKTtcclxuY29uc3QgaGlnaFNjb3JlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZ2hTY29yZUNvbnRhaW5lcicpO1xyXG5jb25zdCBidG5TY29yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5TY29yZScpO1xyXG5jb25zdCB0aW1lV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lV3JhcHBlcicpO1xyXG5jb25zdCB0Ykd1ZXNzZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJHdWVzc2VzJyk7XHJcbmNvbnN0IHRiU2NvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJTY29yZScpO1xyXG5jb25zdCB0Yk5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJOYW1lJyk7XHJcbmNvbnN0IHRiV2luU2NvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJXaW5TY29yZScpO1xyXG5cclxubGV0IHRpbWVySGFuZGxlO1xyXG5sZXQgYm9hcmRcclxuXHJcbmdldEhpZ2hTY29yZSgpO1xyXG5cclxubGV2ZWxEcm9wRG93bi5vbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5jbGFzc05hbWUgPSAnJztcclxuICAgIGJ0bk5ld0dhbWUuY2xhc3NOYW1lID0gJ3B1bHNlJztcclxufVxyXG5cclxuYnRuTmV3R2FtZS5vbmNsaWNrID0gIGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5jbGFzc05hbWUgPSAnJztcclxuICAgIGdldEhpZ2hTY29yZSgpO1xyXG4gICAgc3RhcnRUaW1lcigpO1xyXG4gICAgZ2V0Q2FyZHNBcnIoKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldENhcmRzQXJyKCkge1xyXG4gICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvY2FyZHNcIilcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oanNvbiA9PiBjcmVhdGVOZXdCb2FyZChqc29uKSlcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTmV3Qm9hcmQoY2FyZHNBcnIpIHtcclxuICAgIGNvbnN0IG5ld0FyciA9IGNhcmRzQXJyLnNsaWNlKDAsIH5+KE1hdGgucmFuZG9tKCkqMTMpKzIpO1xyXG4gICAgYm9hcmQgPSBuZXcgQm9hcmQgKGxldmVsRHJvcERvd24udmFsdWUsIG5ld0Fycik7XHJcblxyXG4gICAgaWYgKGxldmVsRHJvcERvd24udmFsdWUgPT09ICcyMCcpIGJvYXJkQ29udGFpbmVyLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSAncmVwZWF0KDUsIDFmciknO1xyXG4gICAgZWxzZSBpZihsZXZlbERyb3BEb3duLnZhbHVlID09PSAnMTInKSBib2FyZENvbnRhaW5lci5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gJ3JlcGVhdCgzLCAxZnIpJztcclxuICAgIGVsc2Uge2JvYXJkQ29udGFpbmVyLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSAncmVwZWF0KDQsIDFmciknO31cclxuXHJcbiAgICB0Ykd1ZXNzZXMudmFsdWUgPSBib2FyZC5ndWVzc2VzO1xyXG4gICAgdGJTY29yZS52YWx1ZSA9IGJvYXJkLnNjb3JlO1xyXG5cclxuICAgIGJvYXJkLm9uTWF0Y2ggPSAoKSA9PiB7XHJcbiAgICAgICAgdGJHdWVzc2VzLnZhbHVlID0gYm9hcmQuZ3Vlc3NlcztcclxuICAgICAgICB0YlNjb3JlLnZhbHVlID0gYm9hcmQuc2NvcmU7XHJcbiAgICAgICAgbGV0IG1hdGNoZWRBcnIgPSBib2FyZC5ib2FyZC5maWx0ZXIoY2FyZE9iaiA9PiBjYXJkT2JqLm1hdGNoZWQpO1xyXG4gICAgICAgIG1hdGNoZWRBcnIuZm9yRWFjaChjYXJkID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaW5kZXg9XCIke2NhcmQuaW5kZXh9XCJdYCkuZmlyc3RDaGlsZC5uZXh0U2libGluZy5zdHlsZS5vcGFjaXR5ID0gMC41O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pbmRleD1cIiR7Y2FyZC5pbmRleH1cIl1gKS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZmxpcENhcmQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJvYXJkLmlzR2FtZVdpbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGJvYXJkLm9uTm90TWF0Y2ggPSAoKSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHRiR3Vlc3Nlcy52YWx1ZSA9IGJvYXJkLmd1ZXNzZXM7XHJcbiAgICAgICAgbGV0IG1hdGNoZWRBcnIgPSBib2FyZC5ib2FyZC5maWx0ZXIoY2FyZE9iaiA9PiAhY2FyZE9iai5tYXRjaGVkKTtcclxuICAgICAgICBtYXRjaGVkQXJyLmZvckVhY2goY2FyZCA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWluZGV4PVwiJHtjYXJkLmluZGV4fVwiXWApLmNsYXNzTmFtZSA9ICdjYXJkSW5uZXInO1xyXG4gICAgICAgICAgICBib2FyZC5fb3BlbkNhcmQgPSBudWxsO1xyXG4gICAgICAgIH0pfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgYm9hcmQub25XaW4gPSAoKSA9PiB7IFxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJIYW5kbGUpO1xyXG4gICAgICAgIHRiV2luU2NvcmUudmFsdWUgPSBib2FyZC5zY29yZSArIHBhcnNlSW50KHRpbWVXcmFwcGVyLmlubmVyVGV4dC5zbGljZSg2LDgpKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVXaW5Nb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0sIDgwMClcclxuICAgIH1cclxuXHJcbiAgICBib2FyZC5maWxsQm9hcmQoKTtcclxuICAgIHJlbmRlcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmbGlwQ2FyZCgpIHtcclxuICAgIGlmIChib2FyZC5fb3BlbkNhcmQgJiYgdGhpcy5kYXRhc2V0LmluZGV4ID09PSBib2FyZC5fb3BlbkNhcmQuaW5kZXgpIHJldHVybjtcclxuICAgIGlmIChib2FyZC5fb3BlbkNhcmQ9PT0wKSByZXR1cm47XHJcbiAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2NhcmRGbGlwcGVkJyk7XHJcbiAgICBib2FyZC5pc01hdGNoKHRoaXMuZGF0YXNldCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XHJcbiAgICBpZiAodGltZXJIYW5kbGUpIGNsZWFySW50ZXJ2YWwodGltZXJIYW5kbGUpO1xyXG4gICAgdGltZVdyYXBwZXIuc3R5bGUuY29sb3IgPSAnYmxhY2snO1xyXG4gICAgdGltZVdyYXBwZXIuc3R5bGUuZm9udFdlaWdodCA9ICc0MDAnO1xyXG4gICAgdmFyIHRpbWVyQ291bnRlciA9IDYwO1xyXG5cclxuICAgIHRpbWVySGFuZGxlID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGltZXJDb3VudGVyLS07XHJcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRpbWVyQ291bnRlciAvIDYwKTtcclxuICAgICAgICB2YXIgc2Vjb25kcyA9IHRpbWVyQ291bnRlciAlIDYwO1xyXG4gICAgICAgIHNlY29uZHMgPSBzZWNvbmRzIDwgMTAgPyAnMCcgKyBzZWNvbmRzIDogc2Vjb25kcztcclxuICAgICAgICBtaW51dGVzID0gbWludXRlcyA8IDEwID8gJzAnICsgbWludXRlcyA6IG1pbnV0ZXM7XHJcbiAgICAgICAgaWYodGltZXJDb3VudGVyID09PSAxMCkge1xyXG4gICAgICAgICAgICB0aW1lV3JhcHBlci5zdHlsZS5jb2xvciA9ICdyZWQnO1xyXG4gICAgICAgICAgICB0aW1lV3JhcHBlci5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aW1lckNvdW50ZXIgPT09IDApIHtcclxuICAgICAgICAgIGdhbWVPdmVyKCk7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySGFuZGxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGltZVdyYXBwZXIuaW5uZXJIVE1MID0gYCR7bWludXRlc31tIDogJHtzZWNvbmRzfXNgO1xyXG4gICAgfSwgMTAwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdhbWVPdmVyKCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVPdmVyTW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVPdmVyTW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGJvYXJkQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgfSwgMjAwMClcclxufVxyXG5cclxuYnRuU2NvcmUub25jbGljayA9IGZ1bmN0aW9uKCkgeyAvL3NldEhpZ2hTY29yZVxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVXaW5Nb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgbGV0IHdpbm5lcnNBcnIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3aW5uZXJzJykpO1xyXG4gICAgaWYgKHdpbm5lcnNBcnIgPT09IG51bGwpIHdpbm5lcnNBcnIgPSBbXTtcclxuICAgIGNvbnN0IGN1clNjb3JlID0ge3Njb3JlOiBib2FyZC5zY29yZSArIHBhcnNlSW50KHRpbWVXcmFwcGVyLmlubmVyVGV4dC5zbGljZSg2LDgpKSxcclxuICAgICAgICBuYW1lOiB0Yk5hbWUudmFsdWVcclxuICAgICAgICB9XHJcbiAgICBpZih3aW5uZXJzQXJyLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICBsZXQgcHVzaGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHdpbm5lcnNBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAod2lubmVyc0FycltpXS5zY29yZSA8IGN1clNjb3JlLnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5uZXJzQXJyLnNwbGljZShpLCAwLCBjdXJTY29yZSk7XHJcbiAgICAgICAgICAgICAgICBwdXNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFwdXNoZWQpe1xyXG4gICAgICAgICAgICB3aW5uZXJzQXJyLnB1c2goY3VyU2NvcmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx3aW5uZXJzQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKHdpbm5lcnNBcnJbaV0uc2NvcmUgPCBjdXJTY29yZS5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgd2lubmVyc0FycltpXSA9IGN1clNjb3JlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICBcclxuICAgIH1cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3aW5uZXJzJywgSlNPTi5zdHJpbmdpZnkod2lubmVyc0FycikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRIaWdoU2NvcmUoKSB7XHJcbiAgICBsZXQgd2lubmVyc0FyciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dpbm5lcnMnKSk7XHJcbiAgICBpZiAod2lubmVyc0FyciA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgaGlnaFNjb3JlQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgbGV0IHNjb3Jlc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpPHdpbm5lcnNBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc2NvcmVQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIHNjb3JlUGFyYS5pbm5lclRleHQgPSBgJHtpKzF9LiAke3dpbm5lcnNBcnJbaV0ubmFtZX0gLSAke3dpbm5lcnNBcnJbaV0uc2NvcmV9IHBvaW50c2A7XHJcbiAgICAgICAgc2NvcmVzRGl2LmFwcGVuZENoaWxkKHNjb3JlUGFyYSk7XHJcbiAgICB9XHJcbiAgICBsZXQgaGlnaFNjb3JlVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG4gICAgaGlnaFNjb3JlVGl0bGUuaW5uZXJUZXh0ID0gJ0hpZ2gtU2NvcmVzJztcclxuICAgIGhpZ2hTY29yZUNvbnRhaW5lci5hcHBlbmRDaGlsZChoaWdoU2NvcmVUaXRsZSk7XHJcbiAgICBoaWdoU2NvcmVDb250YWluZXIuYXBwZW5kQ2hpbGQoc2NvcmVzRGl2KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgYm9hcmRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBmb3IgKGxldCBjYXJkIG9mIGJvYXJkLmJvYXJkKSB7XHJcbiAgICAgICAgY29uc3QgY2FyZElubmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29uc3QgY2FyZEJhY2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCBjYXJkRnJvbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBcclxuICAgICAgICBjYXJkSW5uZXJEaXYuY2xhc3NOYW1lID0gJ2NhcmRJbm5lciBjYXJkRmxpcHBlZCc7XHJcbiAgICAgICAgY2FyZElubmVyRGl2LmRhdGFzZXQuaWQgPSBjYXJkLmlkO1xyXG4gICAgICAgIGNhcmRJbm5lckRpdi5kYXRhc2V0LmluZGV4ID0gY2FyZC5pbmRleDtcclxuICAgICAgICBcclxuICAgICAgICBjYXJkQmFja0Rpdi5jbGFzc05hbWUgPSAnY2FyZEJhY2snO1xyXG4gICAgICAgIGNhcmRGcm9udERpdi5jbGFzc05hbWUgPSAnY2FyZEZyb250JztcclxuICAgICAgICBcclxuICAgICAgICBjYXJkRnJvbnREaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2NhcmQudXJsfSlgO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNhcmRJbm5lckRpdi5hcHBlbmRDaGlsZChjYXJkQmFja0Rpdik7XHJcbiAgICAgICAgY2FyZElubmVyRGl2LmFwcGVuZENoaWxkKGNhcmRGcm9udERpdik7XHJcbiAgICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FyZElubmVyRGl2KTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY2FyZElubmVyRGl2LmNsYXNzTmFtZSA9ICdjYXJkSW5uZXInO1xyXG4gICAgICAgICAgICBjYXJkSW5uZXJEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmbGlwQ2FyZCk7XHJcbiAgICAgICAgfSwgMjAwMClcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9