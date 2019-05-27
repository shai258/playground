class Plant {
	constructor(id, imageUrl, x, y, height, growthRate, waterConsumption){
		this._ID = id;
		this._imgUrl = imageUrl;
		this._x = x;
		this._y = y;
		this.height = height;
		this.growthRate = growthRate;
		this.health = waterConsumption;
	}

	get id() {
		return(this._ID);
	}

	get getHeight() {
		return this.height;
	}

	passDay() {
		this.height += this.growthRate;
		this.health -= 0.1;
	}
	
	get bloomStatus() {
		return this.health;
	}

	set changeImg(imgUrl) {
		this._imgUrl = imgUrl;
	}

	set resetHealth(value) {
		this.health = value;
	}
}

module.exports = Plant;