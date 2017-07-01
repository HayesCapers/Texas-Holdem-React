import React from 'react';

function Card(props){
	var theCard = `cards/${props.card}.png`
	return(
		<div className='col-sm-2 card'>
			<img src={theCard} />
		</div>
	)
}

export default Card