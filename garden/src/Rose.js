const Plant = require('./Plant');

class Rose extends Plant {
	constructor(id, x){
		const rosesArr = ['./images/blue_rose.png', './images/purple_rose.png', './images/red_rose.png', './images/yellow_rose.png', './images/orange_rose.png'];
		const imageUrlIndex = Math.floor(Math.random() * 5);
		const imageUrl = rosesArr[imageUrlIndex];
		super(id, imageUrl, x, 0, 100, 1, 1);
		this.bloomed = false;
	}

	get imageUrl() {
		return imageUrl;
	}

	get hasBloomed() {
		return this.bloomed;
	}

	water() {
		this.health += 0.2;
		if (parseFloat(this.bloomStatus).toFixed(1) >= 1.8) {
			alert ('One rose has bloomed!');
			if(this._imgUrl==='./images/blue_rose.png') {
				this.changeImg = './images/blue_Rose.gif';
			}
			if(this._imgUrl==='./images/purple_rose.png'){
				this.changeImg = './images/purple_Rose.gif';
			} 
			if(this._imgUrl==='./images/yellow_rose.png') {
				this.changeImg = './images/yellow_Rose.gif';
			}
			if(this._imgUrl==='./images/orange_rose.png') {
			this.changeImg = './images/orange_Rose.gif';
			}
			if(this._imgUrl==='./images/red_rose.png') {
				this.changeImg = './images/red_Rose.gif';
			}
			this.bloomed = true;
		}
	}
}

module.exports = Rose;