function processForm(){
		
	var smallPizza = {
		id: "small",
		isAvailable: document.mainForm.small.checked,
		size: pizzaArea(10),
		quantity: 0,
		cost: document.mainForm.smallPrice.value,
		subtotalCost: function(){return this.cost * this.quantity;}
	}
	
	var mediumPizza = {
		id: "medium",
		isAvailable: document.mainForm.medium.checked,
		size: pizzaArea(12),
		quantity: 0,
		cost: document.mainForm.mediumPrice.value,
		subtotalCost: function(){return this.cost * this.quantity;}
	}
	
	var largePizza = {
		id: "large",
		isAvailable: document.mainForm.large.checked,
		size: pizzaArea(16),
		quantity: 0,
		cost: document.mainForm.largePrice.value,
		subtotalCost: function(){return this.cost * this.quantity;}
	}
	
	var patrons = {
		id: "patrons",
		liteEaters: (parseInt(document.mainForm.numberOfLiteEaters.value) * 1 * (largePizza.size/8)),
	    regularEaters: (parseInt(document.mainForm.numberOfRegularEaters.value) * 2 * (largePizza.size/8)),
		heavyEaters: (parseInt(document.mainForm.numberOfHeavyEaters.value) * 3 * (largePizza.size/8)),
		appetite: function(){return this.liteEaters + this.regularEaters + this.heavyEaters;},
		leftovers: 0
	}
	
	minimizeLeftovers(smallPizza, mediumPizza, largePizza, patrons);
	//minimizeCost(smallPizza, mediumPizza, largePizza, patrons);
	
	totalCost = (smallPizza.subtotalCost() + mediumPizza.subtotalCost() + largePizza.subtotalCost()).toFixed(2);
	remainingSmallSlices = (patrons.leftovers/(smallPizza.size/4)).toFixed(2);
	remainingMediumSlices = (patrons.leftovers/(mediumPizza.size/8)).toFixed(2);
	remainingLargeSlices = (patrons.leftovers/(largePizza.size/8)).toFixed(2);
	
	var remainingSlices = "Number of Remaining Slices: ";
	
	if (largePizza.quantity > 0 && largePizza.isAvailable){
		remainingSlices = remainingSlices + remainingLargeSlices + " large slices";
	} else if (mediumPizza.quantity > 0 && mediumPizza.isAvailable){
		remainingSlices = remainingSlices + remainingMediumSlices + " medium slices";
	} else if (smallPizza.quantity > 0 && smallPizza.isAvailable){
		remainingSlices = remainingSlices + remainingSmallSlices + " small slices";
	}else{
		remainingSlices = "Error: select some available pizza options!";
	}
		
	document.getElementById("numSmall").innerHTML = "Number of Small Pizzas: " + smallPizza.quantity;
	document.getElementById("numMedium").innerHTML = "Number of Medium Pizzas: " + mediumPizza.quantity;
	document.getElementById("numLarge").innerHTML = "Number of Large Pizzas: " + largePizza.quantity;
	document.getElementById("remainder").innerHTML = "Number of Remaining Sq. Inches: " + patrons.leftovers.toFixed(2);
	
	document.getElementById("slices").innerHTML = remainingSlices;
		
	document.getElementById("totalCost").innerHTML = "Total Cost: $" + totalCost;
}


function pizzaArea(diameter){
	radius = diameter / 2;
	return Math.PI * radius * radius;
}

function minimizeLeftovers(smallPizza, mediumPizza, largePizza, patrons){
	var tempAppetite = 0;
	var appetite = 0;
	
	if(largePizza.isAvailable == true){
		
		largePizza.quantity = Math.floor(patrons.appetite()/largePizza.size);
		appetite = patrons.appetite() - (largePizza.quantity*largePizza.size);
				
		if(appetite > 0) {
			if((mediumPizza.isAvailable && smallPizza.isAvailable) == true){
				tempAppetite = appetite - largePizza.size;
			
				if((appetite - smallPizza.size) <= 0 && (appetite - smallPizza.size > tempAppetite)){
					smallPizza.quantity++;
					appetite -= smallPizza.size;
				}
				else if((appetite - mediumPizza.size) <= 0 && (appetite - mediumPizza.size > tempAppetite)){
					mediumPizza.quantity++;
					appetite -= mediumPizza.size;
				}
				else if((appetite - (mediumPizza.size + smallPizza.size)) <= 0 && (appetite - (mediumPizza.size + smallPizza.size) > tempAppetite)){
					smallPizza.quantity++;
					mediumPizza.quantity++;
					appetite -= mediumPizza.size + smallPizza.size;
				}else{
					largePizza.quantity++;
					appetite = tempAppetite;
				}
			}
			else if(mediumPizza.isAvailable == true){
				tempAppetite = appetite - largePizza.size;
			
				if((appetite - mediumPizza.size) <= 0 && (appetite - mediumPizza.size > tempAppetite)){
					mediumPizza.quantity++;
					appetite -= mediumPizza.size;
				}
				else{
					largePizza.quantity++;
					appetite = tempAppetite;
				}
			}
			else if(smallPizza.isAvailable == true){
				tempAppetite = appetite - largePizza.size;

				if((appetite - smallPizza.size) <= 0 && (appetite - smallPizza.size > tempAppetite)){
					smallPizza.quantity++;
					appetite -= smallPizza.size;
				}
				else{
					largePizza.quantity++;
					appetite = tempAppetite;
				}
			}
			else{
				largePizza.quantity++;
				appetite -= largePizza.size;
			}
		}
	}
	else if(mediumPizza.isAvailable == true){
		
		mediumPizza.quantity = Math.floor(patrons.appetite()/mediumPizza.size);
		appetite = patrons.appetite() - (mediumPizza.quantity*mediumPizza.size);
				
		if(appetite > 0){
			if(smallPizza.isAvailable == true){
				tempAppetite = appetite - mediumPizza.size;
				
				if((appetite - smallPizza.size) <= 0 && (appetite - smallPizza.size > tempAppetite)){
					smallPizza.quantity++;
					appetite -= smallPizza.size;
				}
				else{
					mediumPizza.quantity++;
					appetite = tempAppetite;
				}
			}
			else{
				mediumPizza.quantity++;
				appetite -= mediumPizza.size;
			}
		}
	}
	else if(smallPizza.isAvailable == true){
		
		smallPizza.quantity = Math.floor(patrons.appetite()/smallPizza.size);
		appetite = patrons.appetite() - (smallPizza.quantity*smallPizza.size);
				
		if(appetite > 0){
			smallPizza.quantity++;
			appetite -= smallPizza.size;
		}
	}	
	else{
		//do nothing
	}
			
	patrons.leftovers = -appetite;
}

/* function minimizeCost(smallPizza, mediumPizza, largePizza, patrons){
	
	var appetite = patrons.appetite();
	var pizzas = [];
	if(smallPizza.isAvailable == true){pizzas.push(smallPizza)};
	if(mediumPizza.isAvailable == true){pizzas.push(mediumPizza)};
	if(largePizza.isAvailable == true){pizzas.push(largePizza)};
	
	sortPizzaCosts(pizzas); //sorts pizza cost with [0] = smallest
	
	var tempPizzas = pizzas[];
	
	//find boundary conditions
	var maximum = [];
	for(i = 0 ; i < pizzas.length() ; i++){
		maximum[i] = Math.floor(appetite/pizzas[i].size) + 1;
	} 
	
	var sumTotal = 0;
	for(i = 0 ; i < pizzas.length() ; i++){
		if(i == 0){
			sumTotal = maximum[i]*pizzas[i].cost;
			tempPizza[i].quantity = maximum[i];
		}
		else{
			if(maximum[i]*pizzas[i].cost < sumTotal){
				sumTotal = maximum[i]*pizzas[i].cost;
				tempPizzas[] = pizzas[];
				tempPizza[i].quantity = maximum[i];
			}
		}
	}
	
	pizzas = tempPizzas[];
	
	//find minimum cost
	for(i = 0; i < pizzas.length() ; i++){
		
	}		
} */

function sortPizzaCosts(pizzas){
	pizzas.sort(function(a, b){return a.cost - b.cost});
}

function calculateSumTotal(pizzas){
	
	var sumTotal = 0;
	
	for(i = 0; i < pizzas.length() ; i++){
		sumTotal = sumTotal + (pizzas[i].quantity * pizzas[i].cost);
	}
	
	return sumTotal;
}

function totalPeople(){
	var lite = parseInt(document.mainForm.numberOfLiteEaters.value);
	var regular = parseInt(document.mainForm.numberOfRegularEaters.value);
	var heavy = parseInt(document.mainForm.numberOfHeavyEaters.value);
	var total = lite + regular + heavy;
	
	if(lite < 0 || regular < 0 || heavy < 0 ){
		document.getElementById("totalNumberOfPeople").innerHTML = "Invalid entry, must enter a non-negative number";
	} else{
		document.getElementById("totalNumberOfPeople").innerHTML = total;
	}
	return total;
}