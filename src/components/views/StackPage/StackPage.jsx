import React, { useState } from 'react';
import { HeartOutlined } from '@ant-design/icons';
import Stack from './Stack';
import languageOptions from '../../utils/data/language';

const StackPage = () => {
	const [selectStack, setSelectStack] = useState([]);

	const handleAddStack = (stack) => {
		const resultStack = [...selectStack, stack];
		setSelectStack(resultStack);
		handleSearchStack();
	};

	const handleCancelStack = (stack) => {
		// selectStack에서 해당 stack만 제거
		const resultStack = selectStack.filter((el) => el !== stack);
		setSelectStack(resultStack);
		handleSearchStack();
	};

	// filter server request
	const handleSearchStack = () => {
		console.log('server 요청..');
		console.log(selectStack);
	};

	const stack = () =>
		languageOptions.map((stack) => (
			<Stack
				key={stack.id}
				stack={stack}
				addSearchStack={handleAddStack}
				cancelSearchStack={handleCancelStack}
			/>
		));

	return (
		<div className='stack-search'>
			<div className='balloon'>
				<HeartOutlined className='balloon_icon' />
				원하는 언어로 필터링 해보세요 :)
			</div>
			{stack()}
		</div>
	);
};

export default StackPage;
