import React, { Component } from 'react';
// import $ from 'jquery'
import PokerHand from './PokerHand.js';
import Deck from '../utilityClasses/deck.js';
import Buttons from './Buttons.js';
import ThePot from './ThePot.js';
import PlayerBank from './PlayerBank';
import HandInfo from './HandInfo';
// var pokerFunct = require('../myMods/pokerFunctionMods/poker.js')
var uFunct = require('../myMods/pokerFunctionMods/functions.js')

var cards = new Deck()

class PokerTable extends Component{
	constructor(props) {
		super(props);
		this.state = {
			playerBank: 5000,
			dealersHand: ['deck','deck'],
			dealerBestHand: {},
			dealerShownCards: ['deck','deck'],
			playersHand: ['deck','deck'],
			playersBestHand: {},
			communityCards: [],
			wager: 0,
			turn: 0
		}
		this.prepDeck = this.prepDeck.bind(this)
		this.playerBet = this.playerBet.bind(this)
		this.flop = this.flop.bind(this)
		this.draw = this.draw.bind(this)
		this.playerCheck = this.playerCheck.bind(this)
		this.playerFold = this.playerFold.bind(this)
	}

	prepDeck(){
		if (this.state.turn === 0){
			console.log(this.state.turn)
			var addTurn = this.state.turn + 1;
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
				playersHand: playersStartingHand,
				turn: addTurn
			})
		}	
	}

	playerBet(amount){
		let p1Hand = this.state.playersHand;
		let p2Hand = this.state.dealersHand;
		let comCards = this.state.communityCards;
		let newAmount = uFunct.checkBetAmount(this.state.playerBank,amount);
		let updatePlayerBank = this.state.playerBank - newAmount;
		let newWager = this.state.wager + (newAmount * 2);
		let potentialPlayerBank = this.state.playerBank + newWager;
		let addTurn = this.state.turn + 1;
		this.checkHands(p1Hand,p2Hand,comCards);
		console.log(this.state.playersBestHand)
		console.log(this.state.dealerBestHand)
		this.setState({
			playerBank: updatePlayerBank,
			wager: newWager,
			turn: addTurn
		})
		if(this.state.turn === 1){
			this.flop()
		}else if(this.state.turn >= 4){
			if(this.checkHands(p1Hand,p2Hand,comCards)){
				console.log('player WON')
				this.setState({
					playerBank: potentialPlayerBank,
					dealersHand: ['deck','deck'],
					dealerShownCards: p2Hand,
					playersHand: ['deck','deck'],
					communityCards: [],
					wager: 0,
					turn: 0
				})
			}else{
				console.log('COMP WON')
				this.setState({
					dealersHand: ['deck','deck'],
					dealerShownCards: p2Hand,
					playersHand: ['deck','deck'],
					communityCards: [],
					wager: 0,
					turn: 0
				})
			}
		}else{
			this.draw()
		}	
		
		// console.log(this.state.playerBank)	
	}

	playerCheck(){
		var p1Hand = this.state.playersHand;
		var p2Hand = this.state.dealersHand;
		var comCards = this.state.communityCards;
		var addTurn = this.state.turn + 1;
		var potentialPlayerBank = this.state.playerBank + this.state.wager;
		this.checkHands(p1Hand,p2Hand,comCards);
		console.log(this.state.playersBestHand)
		console.log(this.state.dealerBestHand)
		this.setState({
			turn: addTurn
		});
		if(this.state.turn === 1){
			this.flop()
		}else if(this.state.turn >= 4){
			if(uFunct.findWinner(this.state.playersBestHand,this.state.dealerBestHand)){
				// console.log('player WON')
				this.setState({
					playerBank: potentialPlayerBank,
					dealersHand: ['deck','deck'],
					dealerShownCards: p2Hand,
					playersHand: ['deck','deck'],
					communityCards: [],
					wager: 0,
					turn: 0
				})
			}else{
				// console.log('COMP WON')
				this.setState({
					dealersHand: ['deck','deck'],
					dealerShownCards: p2Hand,
					playersHand: ['deck','deck'],
					communityCards: [],
					wager: 0,
					turn: 0
				})
			}	
		}else{
			this.draw()
		}

		// this.checkHands(p1Hand,p2Hand,comCards)
	}

	playerFold(){
		var newPlayerBank = this.state.playerBank;
		this.setState({
			playerBank: newPlayerBank,
			dealersHand: ['deck','deck'],
			playersHand: ['deck','deck'],
			communityCards: [],
			wager: 0,
			turn: 0
		})
	}

	checkHands(hand1,hand2,communityCards){
		var player1Hands = uFunct.conCatHands(hand1,communityCards)
		var dealerHands = uFunct.conCatHands(hand2,communityCards)
		player1Hands = uFunct.combine(player1Hands,5)
		dealerHands = uFunct.combine(dealerHands,5)
		var player1BestHand = uFunct.findBestHand(player1Hands)
		// console.log(player1BestHand)
		var dealerBestHand = uFunct.findBestHand(dealerHands)
		// console.log(dealerBestHand)
		this.setState({
			dealerBestHand: dealerBestHand,
			playersBestHand: player1BestHand
		})
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
				<PokerHand cards={this.state.dealerShownCards} /> {/* The computers cards */}
				<PokerHand cards={this.state.communityCards} /> {/* Community cards */}
				<PokerHand cards={this.state.playersHand} /> {/* The player cards */}
				<PlayerBank balance={this.state.playerBank} />
				<HandInfo hand={this.state.playersBestHand}/>
				<Buttons deal={this.prepDeck} bet={this.playerBet} check={this.playerCheck} fold={this.playerFold} />
			</div>
		)
	}
}

export default PokerTable;