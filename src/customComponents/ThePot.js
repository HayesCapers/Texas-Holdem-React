import React from 'react';

function ThePot(props){
	return(
		<div className='col-sm-4 col-sm-offset-4 the-pot'>
			Pot: {props.wager}
		</div>
	)
}

export default ThePot