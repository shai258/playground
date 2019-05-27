const {random} = require('./utils');
const Ship = require('./Ship');

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