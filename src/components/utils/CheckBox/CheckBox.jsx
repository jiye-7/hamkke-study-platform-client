import React from 'react';

const CheckBox = (props) => {
	/** 모집 중인 글 보기 */
	const handleRecruitment = (e) => {
		console.log(e.target);
		props.recruitingPost();
	};

	return (
		<div className='checkbox-container'>
			<input
				type='checkbox'
				id='checkBox'
				value={true}
				onClick={handleRecruitment}
			/>
			<label htmlFor='checkBox'></label>
			<span>{props.message}</span>
		</div>
	);
};

export default CheckBox;
