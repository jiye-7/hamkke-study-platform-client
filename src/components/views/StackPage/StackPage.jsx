import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import Stack from './Stack';
import languageOptions from '../../utils/data/language';

const StackPage = (props) => {
	const stack = () =>
		languageOptions.map((stack) => (
			<Stack key={stack.id} stack={stack} stackCheck={props.stackCheck} />
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
