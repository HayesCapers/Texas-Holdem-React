import React from 'react';

function PlayerBank(props){
	return(
		<div className='col-sm-3 the-bank'>
			Your Chips: {props.balance}
		</div>	
	)
}

export default PlayerBank