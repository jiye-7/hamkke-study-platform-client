import React from 'react';

const Stack = (props) => {
	const handleSelectStack = (e) => {
		const isStack = e.target.textContent.split('.')[0];
		// e.target.classList.toggle('select');
		if (e.target.className === 'stack-chip') {
			e.target.classList.add('select');
		} else {
			e.target.classList.remove('select');
		}

		props.stackCheck(isStack);
	};

	const handleCheckStack = () => {
		return (
			<button
				className={`stack-chip`}
				onClick={handleSelectStack}
				style={{
					backgroundColor: `${props.stack.color}`,
				}}
			>
				{props.stack.label}
			</button>
		);
	};

	return <>{handleCheckStack()}</>;
};

export default Stack;
