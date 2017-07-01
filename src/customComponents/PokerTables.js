import React, { Component } from 'react';
// import $ from 'jquery'
import PokerHand from './PokerHand.js'
import Deck from '../utilityClasses/deck.js'
import Buttons from './Buttons.js'
import ThePot from './ThePot.js'
// var pokerFunct = require('../myMods/pokerFunctionMods/poker.js')
var uFunct = require('../myMods/pokerFunctionMods/functions.js')

var cards = new Deck()

class PokerTable extends Component{
	constructor(props) {
		super(props);
		this.state = {
			// hands: [
			// 	[],
			// 	[],
			// 	[],
			// ]
			dealersHand: ['deck','deck'],
			playersHand: ['deck','deck'],
			communityCards: [],
			wager: 0,
			turn: 0
		}
		this.prepDeck = this.prepDeck.bind(this)
		this.playerBet = this.playerBet.bind(this)
		this.flop = this.flop.bind(this)
		this.draw = this.draw.bind(this)
	}

	prepDeck(){
		cards.createDeck();
		// console.log(cards.deck)
		cards.shuffleDeck();
		// The deck is now ready for a new hands
		// Set up the players hand and the dealers hand
		var card1 = cards.deck.shift();
		var card2 = cards.deck.shift();
		var card3 = cards.deck.shift();
		var card4 = cards.deck.shift();
		// cards.deck is now 4 items shorter -- we mutated it
		var playersStartingHand = [card1,card3];
		var dealersStartingHand = [card2,card4];
		this.setState({
			dealersHand: dealersStartingHand,
			playersHand: playersStartingHand
		})
	}

	playerBet(amount){
		var p1Hand = this.state.playersHand
		var p2Hand = this.state.dealersHand
		var comCards = this.state.communityCards
		var newWager = this.state.wager + amount;
		var addTurn = this.state.turn + 1;
		this.setState({
			wager: newWager,
			turn: addTurn
		})
		if(this.state.turn === 0){
			this.flop()
		}else if(this.state.turn >= 3){

		}else{
			this.draw()
		}	
		this.checkHands(p1Hand,p2Hand,comCards)	
	}

	checkHands(hand1,hand2,communityCards){
		var player1Hands = uFunct.conCatHands(hand1,communityCards)
		var dealerHands = uFunct.conCatHands(hand2,communityCards)
		player1Hands = uFunct.combine(player1Hands,5)
		dealerHands = uFunct.combine(dealerHands,5)
		var player1BestHand = uFunct.findBestHand(player1Hands)
		console.log(player1BestHand)
		var dealerBestHand = uFunct.findBestHand(dealerHands)
		console.log(dealerBestHand)
		uFunct.findWinner(player1BestHand,dealerBestHand)
	}

	flop(){
		console.log('running flop')
		var flopNewCards = this.state.communityCards;
		flopNewCards.push(cards.deck.shift());
		flopNewCards.push(cards.deck.shift());
		flopNewCards.push(cards.deck.shift());
		this.setState({
			communityCards: flopNewCards,
		})
	}

	draw(){
		var communityNewCards = this.state.communityCards;
		communityNewCards.push(cards.deck.shift());
		this.setState({
			communityCards: communityNewCards
		})
		// console.log(this.state.communityCards)
	}

	render(){
		// this.prepDeck()
		// console.log(cards.deck)
		return(
			<div className='col-sm-12 the-table'>
				<ThePot wager={this.state.wager} />
				<PokerHand cards={this.state.dealersHand} /> {/* The computers cards */}
				<PokerHand cards={this.state.communityCards} /> {/* Community cards */}
				<PokerHand cards={this.state.playersHand} /> {/* The player cards */}
				<Buttons deal={this.prepDeck} bet={this.playerBet} />
			</div>
		)
	}
}

export default PokerTable;