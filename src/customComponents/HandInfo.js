import React, { Component } from 'react';
var uFunct = require('../myMods/pokerFunctionMods/functions.js')

class HandInfo extends Component{
	constructor(props) {
		super(props);
		
	}
	
	render(){
		var stringToPrint = uFunct.printString(this.props.hand)
		return(
			<div className='col-sm-4'>
				<h5>Best Hand: {stringToPrint}</h5>
			</div>
		)
	}	
}

export default HandInfo