import React, { Component } from 'react'

class Buttons extends Component{
	constructor(props) {
		super(props);

		this.state = {
			betAmount: 0
		}
		
		this.updateInput = this.updateInput.bind(this)
		this.getValue = this.getValue.bind(this)
	}

	updateInput(event){
		event.preventDefault()
		var newbetAmount = event.target.parentNode.childNodes[0].value
		this.setState({
			betAmount: newbetAmount,
		})
	}

	getValue(event){
		console.log('thisworked')
		event.preventDefault()
		var betValue = event.target.parentNode.childNodes[0].value;
		console.log(betValue)
		return betValue
	}

	render(){
		return(
			<div className='col-sm-12 button-wrapper'>
				<div className='col-sm-2 button'>
					<button className='btn btn-info' onClick={this.props.deal}>Deal</button>
				</div>
				<div className='col-sm-4 button'>
					<input type='number' id='betInput' onChange={this.updateInput} />
					<button className='btn btn-info' onClick={()=>{this.props.bet(document.getElementById('betInput').value)}}>Bet</button>
				</div>
				<div className='col-sm-2 button'>
					<button className='btn btn-info' onClick={this.props.check}>Check</button>
				</div>
				<div className='col-sm-2 button'>
					<button className='btn btn-info' onClick={this.props.fold}>Fold</button>
				</div>
			</div>
		)
	}
}

export default Buttons



// <div className='col-sm-2 button'>
// 	<button className='btn btn-info' onClick={()=>{this.props.bet(10)}}>Bet 10</button>
// </div>