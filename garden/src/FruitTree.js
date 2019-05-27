const Plant = require('./Plant');

class FruitTree extends Plant {
	constructor(id, x) {
		super(id, './images/tree.png', x, 0, 400, 2, 1);
		this.bloomed = false;
	}
	
	get imageUrl() {
		return imageUrl;
	}

	get hasBloomed() {
		return this.bloomed;
	}

	set hasBloomed(value) {
		this.bloomed = value;
	}

	water() {
		this.health += 0.1;
		if (parseFloat(this.bloomStatus).toFixed(1) >= 1.6) {
			alert ('Your tree has bloomed!');
			const fruitTrees = ['./images/orangeTree.png', './images/appleTree.png']
			this.changeImg = fruitTrees[Math.floor(Math.random() * 2)];
			this.hasBloomed = true;
		}
	}


	
}
module.exports = FruitTree;