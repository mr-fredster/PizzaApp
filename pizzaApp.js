function processForm(){
	
	//pizza size areas
	const smallSize = pizzaArea(10);
	const mediumSize = pizzaArea(12);
	const largeSize = pizzaArea(16);
		
	var numberOfPeople = Number(document.mainForm.numberOfPeople.value);
	var portion = (mediumSize/4); //each person receives 2 average slices
	var appetite = numberOfPeople * portion; 
	var small = false;
	var medium = false;
	var large = false;
	var numSmall = 0;
	var numMedium = 0;
	var numLarge = 0;
	var remaining = 0;
		
	if(document.mainForm.small.checked){small = true};
	if(document.mainForm.medium.checked){medium = true};
	if(document.mainForm.large.checked){large = true};
		
	if(large == true){
		for(;(appetite/largeSize)>=1;){
			numLarge++;
			appetite -= largeSize;
		}
	}
	
	if(medium == true){
		for(;(appetite/mediumSize)>=1;){
			numMedium++;
			appetite -= mediumSize;
		}
	}
	
	if(small == true){
		for(;(appetite/smallSize)>=1;){
			numSmall++;
			appetite -= smallSize;
		}
	}
	
	if(appetite != 0){
		if((appetite - smallSize <= 0) && (small == true)){
			numSmall++;
			remaining = smallSize - appetite;
		}
		else if((appetite - mediumSize <= 0) && (medium == true)){
			numMedium++;
			remaining = mediumSize - appetite;
		}
		else{
			if(large == true){
				numLarge++;
				remaining = largeSize - appetite;
			}
		}
	}
	
	document.mainForm.numSmall.value = numSmall;
	document.mainForm.numMedium.value = numMedium;
	document.mainForm.numLarge.value = numLarge;
	document.mainForm.remainder.value = remaining.toFixed(2);
	document.mainForm.slices.value = (remaining/(portion/2)).toFixed(2) + " slices";
}

function pizzaArea(diameter){
	radius = diameter / 2;
	return Math.PI * radius * radius;
}

