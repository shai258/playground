const Plant = require('./Plant');

class Weed extends Plant {
	constructor(id, x) {
		super(id, './images/weed.png', x, 0, 40, 3, 1);
		this.bloomed = false;
	}

	get hasBloomed() {
		return this.bloomed;
	}

	water() {
		this.health += 0.1;
	}

	passDay() {
		this.height += this.growthRate;
		this.health -= 0.05;
	}
}

module.exports = Weed;