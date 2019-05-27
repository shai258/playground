const Weed = require('./Weed');

class Garden {
	constructor() {
		this._age = 0;
		this._plants = [];
		this._money = 1200;
	}

	plant(plant){
		this._plants.push(plant);
	}

	get plants() {
		return this._plants;
	}

	set plants(arr) {
		this._plants = arr;
	}

	get age() {
		return this._age;
	}

	set age(value) {
		this._age = value;
	}

	get money() {
		return this._money;
	}

	set money(value){
		this._money += value;
		if (this.money < 0){
			this.gameOver();
		}
	}

	gameOver() {
		this.plants = [];
		this._money = 1200;
		this._age = 0;
		alert('Game Over');
	}

	passDay() {
		this._plants.forEach(function(plant){
			if (plant.hasBloomed === false) {
				plant.passDay();
			}
		});
		++this._age;
	}

	water() {
		let waterTank = 12;
		let weedWatering = 5;
		let tooManyWeeds = false;
		while (weedWatering > 0 && tooManyWeeds === false){
			for(const plant of this.plants){
				if (waterTank === 0) {
					tooManyWeeds = true;
					return (alert('Too many weeds, cant water plants!')); 
				}
				if (plant instanceof Weed) {
					plant.water();
					waterTank--;
				}
			}
			weedWatering--;
		}
		while (waterTank > 0){
			let curTankStatus = waterTank;
			this._plants.forEach(function(plant){
				if (waterTank < 0) return;
				if (!(plant instanceof Weed) && plant.hasBloomed === false) {
					plant.water();
					--waterTank;
				}
			});
			if(curTankStatus === waterTank) {
				return;
			}
		}
	}		

	render(container) {
		container.innerHTML = '';
		const divContainer = document.createElement('div');
		this._plants.forEach(function(plant){
			const newImg = document.createElement('img');
			newImg.id = plant._ID;
			newImg.src = plant._imgUrl;
			newImg.style.left = plant._x + 'px';
			newImg.style.bottom = plant._y + 'px';
			newImg.style.height = plant.height + 'px';
			newImg.style.opacity = plant.health;
			divContainer.appendChild(newImg);
		});
		container.appendChild(divContainer);
	}
}

module.exports = Garden;
