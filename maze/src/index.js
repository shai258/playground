const Maze = require('./Maze');

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
