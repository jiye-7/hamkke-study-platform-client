import React from 'react';
// import { useSelector } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';
import tagRender from '../../utils/TagSelector/TagRender';

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 12 },
};

const options = [
	{ value: 'C' },
	{ value: 'C++' },
	{ value: 'C#' },
	{ value: 'Spring' },
	{ value: 'JavaScript' },
	{ value: 'TypeScript' },
	{ value: 'Node.js' },
	{ value: 'React.js' },
	{ value: 'Vue.js' },
	{ value: 'Python' },
	{ value: 'Django' },
	{ value: 'Go' },
	{ value: 'Swift' },
	{ value: 'Kotlin' },
	{ value: 'Angular.js' },
	{ value: 'Ruby' },
	{ value: 'Java' },
	{ value: 'Flutter' },
];

const UserPage = () => {
	// const user = useSelector(state => state.userData);

	return (
		<Form {...layout}>
			<Form.Item label='nickname'>
				<Input />
			</Form.Item>
			<Form.Item label='password'>
				<Input />
			</Form.Item>
			<Form.Item>
				<Select
					mode='multiple'
					showArrow
					tagRender={tagRender}
					style={{ width: '100%' }}
					options={options}
				/>
			</Form.Item>
		</Form>
	);
};

export default UserPage;
