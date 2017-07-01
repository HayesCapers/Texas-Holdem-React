import React, { Component } from 'react'

class Buttons extends Component{

	render(){
		return(
			<div className='col-sm-12 button-wrapper'>
				<div className='col-sm-2 button'>
					<button className='btn btn-info' onClick={this.props.deal}>Deal</button>
				</div>
				<div className='col-sm-2 button'>
					<button className='btn btn-info' onClick={()=>{this.props.bet(10)}}>Bet 10</button>
				</div>
				<div className='col-sm-2 button'>
					<button className='btn btn-info' onClick={()=>{this.props.bet(100)}}>Bet 100</button>
				</div>
				<div className='col-sm-2 button'>
					<button className='btn btn-info'>Check</button>
				</div>
				<div className='col-sm-2 button'>
					<button className='btn btn-info'>Fold</button>
				</div>
			</div>
		)
	}
}

export default Buttons