

var tBFuncts = {

	// Tests to see which player wins in case of a tie
	// tieBreak is the main function that makes use of all other functions below it
	// Returns true if player1 wins, false if player 2 wins
	// p1Stats (and p2Stats) is an object formatted like this:
	// stats = {
	// 		rank: 1,
	// 		handValues: valueArray,
	// 		high: high,
	// 		pairs: [],
	// 		remainingValues: [],
	// 		trips: 0,
	// 		quads: 0
	// 	};
	// this object represents the players current hand
	// This object is returned from the findRank function found in functions.js
	tieBreak: function(p1Stats,p2Stats) {
		let rank = p1Stats.rank;
		if (rank === 10){
			return "Wtf!";
		}else if ((rank === 9) || (rank === 6) || (rank === 5) || (rank === 1)){
			return this.highCardArrayTest(p1Stats.handValues,p2Stats.handValues);
		}else if ((rank === 7) || (rank === 4)){
			return this.player1WinsTrips(p1Stats.trips,p2Stats.trips);
		}else if ((rank === 8) || (rank === 3) || (rank === 2)){
			return this.player1WinsPair(p1Stats,p2Stats)
		}
	},

	// Test to see which player has the highest set in a tie where both players have three of a kind
	// p1Trips and p2Trips correspond to stats.trips in the object above
	// p1Trips is an integer passed representing player1's triple set value
	// Returns true if player1 wins, false if player 2 wins
	player1WinsTrips: function(p1Trips,p2Trips){
		if (p1Trips > p2Trips){
			return true;
		}else{
			return false;
		}
	},

	// Test to see which player has the highest set in a tie where both players have a single pair, two pair, or quads
	player1WinsPair: function(p1Stats,p2Stats){
		for (let i = p1Stats.pairs.length; i >= 0; i--){
			if (p1Stats.pairs[i] === p2Stats.pairs[i]){
				continue;
			}else if (p1Stats.pairs[i] > p2Stats.pairs[i]){
				return true;
			}else{
				return false;
			}
		}
		return this.highCardArrayTest(p1Stats.remainingValues,p2Stats.remainingValues);
	},

	// Test to find the highst value in two arrays with the same length
	// used in cases where a high card is necessary to clarify a winner
	// Takes two arrays. 
	// The firsts should be tied to player 1 and the second to player 2
	// returns true if the first array has the highest corresponding card and false if the second ahs the highest corresponding card
	highCardArrayTest: function(arrayOfValuesToTest1,arrayOfValuesToTest2){
		var arrayLength = arrayOfValuesToTest1.length;
		for (let i = arrayLength; i >= 0; i--){
			if (arrayOfValuesToTest1[i] === arrayOfValuesToTest2[i]){
				continue;
			}else if (arrayOfValuesToTest1[i] > arrayOfValuesToTest2[i]){
				return true;
			}else{
				return false;
			}
		}
		// console.log('you\'re both fucked.')
	}

}

module.exports = tBFuncts;

