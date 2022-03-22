import React, { useState } from 'react';

const CheckBox = (props) => {
	return (
		<div className='checkbox-container'>
			<input
				type='checkbox'
				id='checkBox'
				onChange={props.recruitingPost}
				checked={props.recruitState}
			/>
			<label htmlFor='checkBox'></label>
			<span>{props.message}</span>
		</div>
	);
};

export default CheckBox;
