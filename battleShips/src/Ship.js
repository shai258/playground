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
