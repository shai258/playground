const Garden = require('./Garden');
const Rose = require('./Rose');
const FruitTree = require('./FruitTree');
const Weed = require('./Weed');

const btnAddPlant = document.getElementById('btnAddPlant');
const btnPassDay = document.getElementById('btnPassDay');
const btnlawnMower = document.getElementById('btnlawnMower');
const btnWater = document.getElementById('btnWater');
const container = document.getElementById('container');
const gardenAge = document.getElementById('gardenAge');
const gardenMoney = document.getElementById('gardenMoney');
const btnCollectMoney = document.getElementById('btnCollectMoney');
const rainContainer = document.getElementById('rain');
const nightContainer = document.getElementById('night');

const garden = new Garden();

btnAddPlant.onclick = function () {
	switch(document.getElementById('ddPlants').value) {
		case 'Rose':
			const rose = new Rose("rose" ,getPositionRose());
			garden.plant(rose);
			garden.money = -200;
			break;
		case 'FruitTree':
			const newFruitTree = new FruitTree("FruitTree", getPositionTree());
			garden.plant(newFruitTree);
			garden.money = -300;
			break;
		}
		
	gardenMoney.value = garden.money;
	gardenAge.value = garden.age;
	garden.render(container);
}

btnPassDay.onclick = function(){
	night();
	garden.passDay();
	garden.money = 100;
	gardenMoney.value = garden.money;
	gardenAge.value = garden.age;
	garden.render(container);
}

btnWater.onclick = function(){
	rain();
	garden.water();
	if (Math.floor(Math.random() * 4) === 1){
		const newWeed = new Weed("weed", getPositionRose());
		garden.plant(newWeed);
	}
	garden.money = -50;
	gardenMoney.value = garden.money;
	garden.render(container);
}

btnlawnMower.onclick = function(){
	for(let i=0; i<garden.plants.length; i++) {
		if(garden.plants[i].id === "weed") {
			garden.money = -50;
			gardenMoney.value = garden.money;
			const arr1 = garden._plants.slice(0, i);
			const arr2 = garden._plants.slice((i+1), garden.plants.length);
			garden.plants = arr1.concat(arr2);
			garden.render(container);
			return alert('One weed has removed'); 
		}
	}
}

btnCollectMoney.onclick =  function(){
	for(let i=0; i<garden.plants.length; i++) { //add the money
		if(garden.plants[i].id === "rose" && garden.plants[i].hasBloomed) {
			garden.money = 300;
			alert('collect rose!'); 
		}		
		if(garden.plants[i].id === "FruitTree" && garden.plants[i].hasBloomed) { //Renew tree
			garden.plants[i].changeImg = './images/tree.png';
			garden.plants[i].hasBloomed = false;
			garden.plants[i].resetHealth = 1;
			garden.money = 400;
			alert('collect fruit tree!'); 
		}
	}
	gardenMoney.value = garden.money;
	
	let endOfArr = false;
	while (true) { //Removed roses
		if (endOfArr || garden.plants.length===0) {
			garden.render(container);
			break;	
		}
		for(let i=0; i<garden.plants.length; i++) {
			if (!(garden.plants[i].hasBloomed) && i === (garden.plants.length - 1) ) {
				endOfArr = true;
			}
			if (garden.plants[i].id === "rose" && garden.plants[i].hasBloomed) {
				const arr1 = garden.plants.slice(0, i);
				const arr2 = garden.plants.slice(i+1, garden.plants.length);
				garden.plants = arr1.concat(arr2);
				break;
			}
		}
	}
}

function rain() {
	rainContainer.style.display = 'block';
	setTimeout(function(){
		rainContainer.style.display = 'none';
	}, 2000)
}

function night() {
	nightContainer.style.display = 'block';
	setTimeout(function(){
		nightContainer.style.display = 'none';
	}, 1500)
}

function getPositionTree(){
	return (Math.floor(Math.random() * (document.body.offsetWidth - 500))) + 30;
}

function getPositionRose(){
	return (Math.floor(Math.random() * (document.body.offsetWidth -100))) + 30;
}
