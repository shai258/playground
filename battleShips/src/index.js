const Board = require('./Board');
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


