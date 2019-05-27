(function () { 
	const Fish = require('./Fish');
	const btnAddFish = document.getElementById("btnAddFish");
	const container = document.getElementById("container");

	btnAddFish.onclick = function () {
	  const fish = new Fish(document.getElementById("fishUrl").value, document.getElementById("fishSpeed").value);
	  fish.render(container);
	}
})();