// Player 1 should win 376 hands... Fix It

// var hands = require('./hands.js');
var pFunct = require('./functions.js')
var tieFunct = require('./tieBreak-functions.js')

// main function to test two hands against each other
// takes two arguments (both must be arrays of the same length)
// 1. array containing player 1's hand/hands
// 2. array containing player 2's hand/hands
// Returns an object with the number of hands player 1 wins and the number of hands player 2 wins
function checkHands(player1Hands,player2Hands){
	var p1Score = 0;
	var p2Score = 0;
	var scores = {
		player1: p1Score,
		player2: p2Score
	}
	for (let i = 0; i < player1Hands.length; i++){
		let player1High = pFunct.findHigh(player1Hands[i]);
		let player1Stats = pFunct.findRank(player1Hands[i],player1High);
		let player2High = pFunct.findHigh(player2Hands[i]);
		let player2Stats = pFunct.findRank(player2Hands[i],player2High);	
		if(player1Stats.rank === player2Stats.rank){
			if(tieFunct.tieBreak(player1Stats,player2Stats)){
				scores.player1++;
			}else{
				scores.player2++;
			}
		}else if (player1Stats.rank > player2Stats.rank){
			scores.player1++;	
		}else{
			scores.player2++;
		}
	}
	return scores;
}

module.exports = checkHands

// If you have nodejs installed
// run 'node poker' in the terminal while in this folder to see the results 
// from the 1000 hands imported from the hands.js file
// the result should be:
// { player1: 376, player2: 624 }

// console.log(checkHands(hands.player1,hands.player2));









