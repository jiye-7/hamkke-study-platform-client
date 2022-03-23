import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser } from '../../../_actions/userAction';
import styled from 'styled-components';

const ForgotPassword = styled.a`
	float: right;
`;

const RegisterNow = styled.a`
	margin-left: 0.5rem;
	color: #1890ff;
`;

const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Email is invalid').required('Email is required'),
	password: Yup.string()
		.min(5, 'Password must be at least 5 characters')
		.required('Password is required'),
});

function LoginPage(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;
	// const [rememberMe, setRememberMe] = rememberMeChecked;
	const [rememberMe, setRememberMe] = useState(false);

	const initialEmail = localStorage.getItem('rememberMe')
		? localStorage.getItem('rememberMe')
		: '';

	const handleRememberMe = () => {
		setRememberMe(!rememberMe);
	};

	return (
		<Formik
			initialValues={{
				email: initialEmail,
				password: '',
			}}
			// validationSchema를 사용하면 포믹이 필드를 알 수 있으므로 제공된다면 포믹에 의해 사용될 수 있다.
			validationSchema={LoginSchema}
			onSubmit={async (values, { setSubmitting }) => {
				setSubmitting(true);
				let dataToSubmit = {
					email: values.email,
					password: values.password,
				};

				const { type } = await dispatch(loginUser(dataToSubmit));

				if (type === 'login_user') {
					setSubmitting(false);
					return navigate('/');
				}
			}}
		>
			{({
				values,
				touched,
				errors,
				isSubmitting,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => (
				<div className='login--container'>
					<h1 className='login--container__title'>Log In</h1>
					<form onSubmit={handleSubmit}>
						<Form.Item rules={[{ required: true }]}>
							<Input
								type='email'
								id='email'
								name='email'
								value={values.email}
								prefix={<MailOutlined style={{ color: 'rgba(0, 0, 0, .25' }} />}
								placeholder='Please input your email!'
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.email && touched.email
										? 'text-input error'
										: 'text-input'
								}
								autoComplete='on'
							/>
							{errors.email && touched.email && (
								<div className='input-feedback'>{errors.email}</div>
							)}
						</Form.Item>
						<Form.Item required>
							<Input
								name='password'
								type='password'
								id='password'
								value={values.password}
								prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, .25' }} />}
								placeholder='Please input your password!'
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.password && touched.password
										? 'text-input error'
										: 'text-input'
								}
								autoComplete='off'
							/>
							{errors.password && touched.password && (
								<div className='input-feedback'>{errors.password}</div>
							)}
						</Form.Item>
						<Form.Item>
							<Checkbox
								id='rememberMe'
								onChange={handleRememberMe}
								checked={rememberMe}
							>
								Remember Me
							</Checkbox>
							<ForgotPassword className='login-form-forgot' href='/reset_user'>
								forgot password
							</ForgotPassword>
							<div>
								<Button
									type='primary'
									htmlType='submit'
									disabled={isSubmitting}
									onSubmit={handleSubmit}
									className='login-form-button'
									style={{ minWidth: '100%' }}
								>
									Log In
								</Button>
							</div>
							Or
							<RegisterNow href='/register'>register now :)</RegisterNow>
						</Form.Item>
					</form>
				</div>
			)}
		</Formik>
	);
}

export default LoginPage;
