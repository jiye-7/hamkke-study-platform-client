import React from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as Yup from 'yup';
import { Form, Input, Button } from 'antd';
import languageOptions from '../../utils/language';

const animatedComponents = makeAnimated();

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
};

const UserInfoPage = () => {
	const { loginSuccess: userInfo } = useSelector((state) => state.user);
	console.log(userInfo);

	return (
		<div className='userInfo--container'>
			<h1>내 정보 수정</h1>
			<Form {...layout}>
				<Form.Item key='nickname' label='닉네임' name='nickname'>
					<Input value={userInfo.nickname} />
					<Button>변경</Button>
				</Form.Item>
				<Form.Item key='password' label='비밀번호' name='pw'>
					<Input value={userInfo.password} disabled />
				</Form.Item>
				<Form.Item key='change-password' label='비밀번호 변경' name='pwConfirm'>
					<Input />
				</Form.Item>
				<Form.Item key='tag' label='관심 기술 태그' name='tags'>
					<Select
						closeMenuOnSelect={false}
						components={animatedComponents}
						/* defaultInputValue={[]} */
						isMulti
						options={languageOptions}
					/>
				</Form.Item>
			</Form>
		</div>
	);
};

export default UserInfoPage;
