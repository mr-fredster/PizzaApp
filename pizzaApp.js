function processForm(){
	
	//pizza size areas
	const smallSize = pizzaArea(10);
	const mediumSize = pizzaArea(12);
	const largeSize = pizzaArea(16);
		
	var numberOfPeople = Number(document.mainForm.numberOfPeople.value);
	var portion = (largeSize/4); //each person receives 2 average slices
	var appetite = numberOfPeople * portion; 
	var small = false;
	var medium = false;
	var large = false;
	var numSmall = 0;
	var numMedium = 0;
	var numLarge = 0;
	var remaining = 0;
	var optimize = false;
	
	var tempAppetite = 0;
	
	if(document.mainForm.small.checked){small = true};
	if(document.mainForm.medium.checked){medium = true};
	if(document.mainForm.large.checked){large = true};
			
	if(large == true){
		numLarge = Math.floor(appetite/largeSize);
		console.log(numLarge);
		appetite = appetite - (numLarge*largeSize);
		if(appetite > 0) {
			if((medium && small) == true){
				tempAppetite = appetite - largeSize;
			
				if((appetite - smallSize) <= 0 && (appetite - smallSize > tempAppetite)){
					numSmall++;
					appetite -= smallSize;
				}
				else if((appetite - mediumSize) <= 0 && (appetite - mediumSize > tempAppetite)){
					numMedium++;
					appetite -= mediumSize;
				}
				else if((appetite - (mediumSize + smallSize)) <= 0 && (appetite - (mediumSize + smallSize) > tempAppetite)){
					numSmall++;
					numMedium++;
					appetite -= mediumSize + smallSize;
				}else{
					numLarge++;
					appetite = tempAppetite;
				}
			}
			else if(medium == true){
				tempAppetite = appetite - largeSize;
			
				if((appetite - mediumSize) <= 0 && (appetite - mediumSize > tempAppetite)){
					numMedium++;
					appetite -= mediumSize;
				}
				else{
					numLarge++;
					appetite = tempAppetite;
				}
			}
			else if(small == true){
				tempAppetite = appetite - largeSize;

				if((appetite - smallSize) <= 0 && (appetite - smallSize > tempAppetite)){
					numSmall++;
					appetite -= smallSize;
				}
				else{
					numLarge++;
					appetite = tempAppetite;
				}
			}
			else{
				numLarge++;
				appetite -= largeSize;
			}
		}
	}
	else if(medium == true){
		numMedium = Math.floor(appetite/mediumSize);
		appetite = appetite - (numMedium*mediumSize);
		if(appetite > 0){
			if(small == true){
				tempAppetite = appetite - mediumSize;
				
				if((appetite - smallSize) <= 0 && (appetite - smallSize > tempAppetite)){
					numSmall++;
					appetite -= smallSize;
				}
				else{
					numMedium++;
					appetite = tempAppetite;
				}
			}
			else{
				numMedium++;
				appetite -= mediumSize;
			}
		}
	}
	else if(small == true){
		numSmall = Math.floor(appetite/smallSize);
		appetite = appetite - (numSmall*smallSize);
		if(appetite > 0){
			numSmall++;
			appetite -= smallSize;
		}
	}	
	else{
		//do nothing
	}
			
	remaining = -appetite;
	
	document.getElementById("numSmall").innerHTML = "Number of Small Pizzas: " + numSmall;
	document.getElementById("numMedium").innerHTML = "Number of Medium Pizzas: " + numMedium;
	document.getElementById("numLarge").innerHTML = "Number of Large Pizzas: " + numLarge;
	document.getElementById("remainder").innerHTML = "Number of Remaining Sq. Inches: " + remaining.toFixed(2);
	document.getElementById("slices").innerHTML = "Number of Remaining Slices: " + (remaining/(portion/2)).toFixed(2) + " slices";
	
}


function pizzaArea(diameter){
	radius = diameter / 2;
	return Math.PI * radius * radius;
}

