var tieFunct = require('./tieBreak-functions.js')

var functions = {

	// These are the values on the cards in each players hand
	cardValue: ['2','3','4','5','6','7','8','9','T','J','Q','K','A'],
	// These are the corresponding conversions for each card value above 
	// so they can be easily converted to integers
	cardNumberValue: [2,3,4,5,6,7,8,9,10,11,12,13,14],

	// Main function that tests the rank of a hand
	// It takes one argument which is the hand to ranked
	// It returns an object (stats) that will be used to test two hands against each other
	// using the main function checkHands() in poker.js
	findRank: function(array) {
		var valueArray = this.sortArray(this.cardValueConversion(array));
		var suitArray = this.cardSuitConversion(array);
		var tempStats;
		var stats = {
			rank: 1,
			handValues: valueArray,
			pairs: [],
			remainingValues: [],
			trips: 0,
			quads: 0
		};
		if(this.straight(valueArray) && this.flush(suitArray) && valueArray[-1] === 14){
			stats.rank = 10;
		}else if (this.straight(valueArray) && this.flush(suitArray)){
			stats.rank = 9;
		}else if(this.checkDupes(valueArray,4).hasHand){
			tempStats = this.checkDupes(valueArray,4)
			stats.rank = 8;
			stats.quads = tempStats.pairs[0]
			stats.remainingValues = tempStats.remainingValues
		}else if(this.fullHouse(valueArray).hasHand){
			stats.rank = 7;
			stats.trips = this.fullHouse(valueArray).trips
			stats.pairs.push(this.fullHouse(valueArray).pairs[0])
		}else if(this.flush(suitArray)){
			stats.rank = 6;
		}else if(this.straight(valueArray)){
			stats.rank = 5;
		}else if(this.checkDupes(valueArray,3).hasHand){
			tempStats = this.checkDupes(valueArray,3)
			stats.rank = 4;
			stats.trips = tempStats.pairs
		}else if(this.twoPair(valueArray).hasHand){
			tempStats = this.twoPair(valueArray);
			stats.rank = 3;
			stats.pairs = tempStats.pairs
			stats.remainingValues = tempStats.remainingValues
		}else if(this.checkDupes(valueArray,2).hasHand){
			tempStats = this.checkDupes(valueArray,2)
			stats.rank = 2;
			stats.pairs = tempStats.pairs
			stats.remainingValues = tempStats.remainingValues
		}else{
			stats.rank = 1;
		}
		return stats
	},

	// Function that takes an array (only suits) as an argument
	// returns true if the hand is a flush
	// ex. ['H', 'D', 'S', 'H', 'S']
	flush: function(array) {
		var suit = array[0];
		for (let i = 1; i < array.length; i++){
			if (array[i] !== suit){
				return false;
			}
		}
		return true;
	},

	// Function that takes an array (only values) as an argument
	// returns true if the array contains all consecutive numbers
	// ex. [2,3,4,5,6]
	straight: function(array) {
		var poop = [];
		poop.push(this.sortArray(array));
		if ((array.indexOf(14) !== -1) && (array.indexOf(2) !== -1) && (array.indexOf(3) !== -1) && (array.indexOf(4) !== -1) && (array.indexOf(5) !== -1)){
			var aceIndex = poop.indexOf(14);
			poop.splice(aceIndex,1,1);
		}
		poop = this.sortArray(array);
		for (let i = 0; i < poop.length-1; i++){
			var current = poop[i];
			var next = poop[i+1];
			if(next === current + 1){
				continue
			}else{
				return false
			}
		}
		return true
	},

	// Funciton that takes an array (only values) as an argument 
	// returns an object with a value .hasHand that is either true or false
	fullHouse: function(array) {
		var testArray = array.slice(0);
		var trips = this.checkDupes(testArray,3);
		if(trips.hasHand){
			testArray = this.deletePair(testArray,trips.pairs[0]);
			var secondPair = this.checkDupes(testArray,2);
			secondPair.trips = trips.pairs[0];
			return secondPair;
		}else{
			return trips;
		}	
	},

	// Function that test to see if an array (values only) contains two pairs of integers
	// returns an object that is formatted like this:
	// stats = {
	// 		hasHand: false,
	// 		pairs: [],
	// 		remainingValues: []
	// 	}
	// hasHand will return as true if the array contains two distinct pairs of values
	twoPair: function(array) {
		var testArray = array.slice(0);
		var firstPair = this.checkDupes(testArray,2);
		if(firstPair.hasHand){
			testArray = this.deletePair(testArray,firstPair.pairs[0])
			var secondPair = this.checkDupes(testArray,2);
			secondPair.pairs.push(firstPair.pairs[0]);
			this.sortArray(secondPair.pairs)
			return secondPair;
		}else{
			return firstPair;
		}	
	},

	// Function that test to see if an array (values only) contains any number of duplicate values
	// It takes two arguments:
	// 1. an array of values only
	// 2. the number of duplicates to check for i.e. 
	// var testArray = [3,4,3,3,3]
	// checkDupes(testArray,4);
	// will check to see if there are 4 instances of any integer in testArray
	// It wil return an object:
	// var stats = {
	// 		hasHand: false,
	// 		pairs: [],
	// 		remainingValues: []
	// 	}
	// stats.hasHand will return true if the duplicates exist
	// stats.pairs will return with a single instance of the duplicat value found
	// stats.remaining values will return an array containing all values other than the duplicates found
	// the example above would return:
	// var stats = {
	// 		hasHand: true,
	// 		pairs: [3],
	// 		remainingValues: [4]
	// 	}
	checkDupes: function(array,numOfDupes) {
		var stats = {
			hasHand: false,
			pairs: [],
			remainingValues: []
		}
		var counter = 0;
		var highPair = 0;
		for (let i = 0; i < array.length; i++){
			for (let j = 0; j < array.length; j++){
				if (array[i] === array[j]){
					counter++;
					highPair = array[i];
				}
				if (counter === numOfDupes){
					stats.hasHand = true;
					stats.pairs.push(highPair);
					stats.remainingValues = this.sortArray(this.saveRemainingValues(array,highPair))
					return stats
				}
			}
			counter = 0
		}
		return stats
	},

	////////////////////////////////////////////////////////
	/////////////////// UTILITIES /////////////////////////
	//////////////////////////////////////////////////////

	// Function that takes an array of strings formatted like this:
	// ['4H','5S','6D','7D','4C']
	// It returns a different array containing only the suit from each index
	cardSuitConversion: function(array) {
		var tempArray = [];
		for (let i = 0; i < array.length; i++){
			tempArray.push(array[i].slice(-1)[0]);
		}
		return tempArray;
	},

	// Function that takes an array of strings formatted like this:
	// ['4H','5S','6D','7D','4C']
	// It returns a different array containing only the value as an integer from each index
	cardValueConversion: function(array) {
		var tempArray = [];
		var index;
		for (let i = 0; i < array.length; i++){
			tempArray.push(array[i].slice(0,1))
		}
		for (let i = 0; i < tempArray.length; i++){
			index = this.cardValue.indexOf(tempArray[i])
			// console.log(index)
			tempArray.splice(i,1,this.cardNumberValue[index]);
		}
		return tempArray;
	},

	// Function that takes an array of strings formatted like this:
	// ['4H','5S','6D','7D','4C']
	// returns the highest value in the Array
	// **Currently I do not think this fucntion is being used anymore**
	findHigh: function(array) {
		var maxArray = this.cardValueConversion(array);
		var currentHigh = maxArray[0];
		for (let i = 0; i < maxArray.length; i++){
			if (maxArray[i] > currentHigh){
				currentHigh = maxArray[i]
			}
		}
		return currentHigh
	},

	// Function that takes two arguments:
	// 1. an array (values only)
	// 2. a value to be removed from the Array
	// It returns an array with all instances of the second argument removed
	deletePair: function(array,valueToDelete){
		while(array.indexOf(valueToDelete) !== -1){
			for (let i = 0; i < array.length; i++){
				if(array[i] === valueToDelete){
					array.splice(i,1);
				}
			}
		}
		return array;
	},

	// Function that takes two arguments:
	// 1. an of values only
	// 2. a number to be excluded b/c it is already stashed b/c it has duplicates
	saveRemainingValues(array,pair){
		var arrayToPopulate = []
		for (let i = 0; i < array.length; i++){
			if(array[i] !== pair){
				arrayToPopulate.push(array[i]);
			}
		}
		return arrayToPopulate
	},

	// Function that takes one argument:
	// 1. an array with values only
	// returns a sorted array from smallest value to largest value
	sortArray: function(array) {
		var sortedArray = array.sort(function(a, b){return a - b});
		return sortedArray
	},

	// Function that takes two arguments
	// 1. an array 
	// 2. a number that will be the number of indecies in the return Array
	// It takes an array and returns an array the length of the second argument of all unique combinations 
	combine: function(a, ham) {
	    var fn = function(n, src, got, all) {
	        if (n === 0) {
	            if (got.length > 0) {
	                all[all.length] = got;
	            }
	            return;
	        }
	        for (var j = 0; j < src.length; j++) {
	            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
	        }
	        return;
	    }
	    var all = [];
	    fn(ham, a, [], all);
	    // all.push(a);
	    return all;
	},

	conCatHands: function(array1, array2){
		var result = array1.concat(array2);
		return result
	},

	findBestHand: function(array){
		var high = {
			rank: 0
		}
		for(let i = 0; i < array.length; i++){
			var temp = this.findRank(array[i]);
			if (temp.rank === high.rank){
				if(tieFunct.tieBreak(temp,high)){
					high = temp
				}
			}else if(temp.rank > high.rank){
				high = temp
			}
		}
		return high
	},

	findWinner: function(obj1,obj2){
		if(obj1.rank === obj2.rank){
			if(tieFunct.tieBreak(obj1,obj2)){
				console.log('YOU are WINNING!')
			}else {
				console.log('dealer is winning... :-(')
			}
		}else if(obj1.rank > obj2.rank){
			console.log('YOU are WINNING')
		}else{
			console.log('dealer is winning... :-(')
		}
	}
}

module.exports = functions








