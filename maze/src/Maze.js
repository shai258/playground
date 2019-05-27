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