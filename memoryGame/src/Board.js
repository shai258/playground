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