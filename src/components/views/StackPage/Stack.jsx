import React, { useState } from 'react';

const Stack = (props) => {
	const [isClick, setIsClick] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();
		handleSelectStack(e);
		setIsClick(!isClick);
	};

	const handleSelectStack = (e) => {
		const isStack = e.target.textContent.split('.')[0];

		// isClick이 true일 때 검색을 하기 위해 이미 클릭 한 상태 -> (state 변경 전) 한번 더 클릭 한 것이니 여기서 검색하지 않도록 다시 제거
		if (isClick) {
			props.cancelSearchStack(isStack);
		} else {
			// 검색하기 위해 추가
			props.addSearchStack(isStack);
		}
	};

	const handleCheckStack = () => {
		return (
			<button
				className={`stack-chip ${isClick ? `select` : ''}`}
				onClick={(e) => handleClick(e)}
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
