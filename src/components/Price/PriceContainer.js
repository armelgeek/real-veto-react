import React, { useState } from 'react';

const PriceContainer = ({c,i, update, date}) => {
	const [state, setState] = useState(c.prixVente);
	const onChange = (value)=>{
		update(i, "prixVente", value);
		setState(value);
		console.log(i,value);
	}
    return (
  		<>
  			<p>{date}</p>
  			<p><input value={state} onChange={(e)=> onChange(e.target.value)} /></p>
  		</>      
    );
};
export default PriceContainer;
