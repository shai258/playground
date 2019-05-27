const Board = require('./Board');

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
