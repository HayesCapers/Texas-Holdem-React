import React from 'react';

function ThePot(props){
	return(
		<div className='col-sm-4 col-sm-offset-4 the-pot'>
			Wager: {props.wager}
		</div>
	)
}

export default ThePot