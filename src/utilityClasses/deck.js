

class Deck{
	constructor(props) {
		this.deck = []	
	}

	createDeck(){
		// reset the deck to empty
		this.deck = []
		// Two loops, one for suit, one for card value
		var suits = ['h','s','d','c'];
		var faceCards = ['T','J','Q','K','A']
		// Outter loop which iterates the suit/letter...
		for(let s = 0; s < suits.length; s++){
			// Inner Loop which iterates the values/Number
			for(let c = 2; c <= 9; c++){
				// Push onto newDeck array, the value[c] + suit[s]
				this.deck.push(c+suits[s]);
			}
			for(let j = 0; j < faceCards.length; j++){
				this.deck.push(faceCards[j]+suits[s]);
			}
		}
		return this.deck;
	}

	shuffleDeck(){
		// Swap 2 elements in the array many, many times to shuffle.
		for(let i = 0; i < 14000; i++){
			var random1 = Math.floor(Math.random() * 52);
			var random2 = Math.floor(Math.random() * 52);
			// Store in temp, the value at index random1, in array theDeck (for later)
			var temp = this.deck[random1];
			// Overwrite what's at index random1 with what's at index random2
			this.deck[random1] = this.deck[random2];
			// Overwrite what's at index random2 with what's in temp
			this.deck[random2] = temp;
		}
	}
}



export default Deck;