import React, { Component } from 'react';
import Card from './Card.js'

class PokerHand extends Component{

	render(){
		var hand = [];
		this.props.cards.map((card,index)=>{
			hand.push(<Card key={index} card={card} />)
			return "ham"
		})
		return(
			<div className='col-sm-12 players-hand'>
				{hand}
			</div>
		)
	}

}

export default PokerHand;