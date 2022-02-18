import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from 'antd';
import { registerUserAPI } from '../../../_module/userApi';

const RegisterPage = () => {
	// email validate
	const validateEmail = (value) => {
		let error;

		if (!value) {
			error = `Email is Required..`;
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
			error = `Invalid email address..`;
		}
		return error;
	};

	// password validate
	const validatePassword = (value) => {
		let error;

		if (!value) {
			error = 'Password is Required...';
		} else if (value.length <= 4) {
			error = 'Password must be at least 5 characters';
		}
		return error;
	};

	// passwordConfirm validate
	const validatePasswordConfirm = (password, pwConfirm) => {
		let error;

		if (!pwConfirm) {
			error = 'Password Confirm is Required...';
		} else if (password !== pwConfirm) {
			error = 'Password is not matched';
		}
		return error;
	};

	// nickname validate
	const validateNickname = (value) => {
		let error;

		if (!value) {
			error = 'Nickname is Required...';
		} else if (value.length <= 4) {
			error = 'Nickname must be at least 5 characters';
		}
		return error;
	};

	return (
		<div className='register--container'>
			<h1>Sign Up</h1>
			<Formik
				initialValues={{
					email: '',
					password: '',
					pwConfirm: '',
					nickname: '',
				}}
				/* validate={(values) => {
					const errors = {};
				}} */
				validateOnChange={false}
				validateOnBlur={true}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);

					const { email, password, nickname } = values;
					let result = registerUserAPI({ email, password, nickname });
					setSubmitting(false);
				}}
			>
				{({ values, errors, touched, handleReset }) => (
					<Form>
						<div>
							<label htmlFor='Emil'>Email</label>
							<Field
								id='Emil'
								name='email'
								type='email'
								validate={validateEmail}
								autoComplete='on'
							/>
							{errors.email && touched.email && <div>{errors.email}</div>}
						</div>
						<div>
							<label htmlFor='Password'>Password</label>
							<Field
								id='Password'
								name='password'
								type='password'
								validate={validatePassword}
								autoComplete='off'
							/>
							{errors.password && touched.password && (
								<div>{errors.password}</div>
							)}
						</div>
						<div>
							<label htmlFor='PasswordConfirm'>PwConfirm</label>
							<Field
								id='PasswordConfirm'
								name='pwConfirm'
								type='password'
								validate={(pwConfirm) =>
									validatePasswordConfirm(values.password, pwConfirm)
								}
								autoComplete='off'
							/>
							{errors.pwConfirm && touched.pwConfirm && (
								<div>{errors.pwConfirm}</div>
							)}
						</div>
						<div>
							<label htmlFor='Nickname'>Nickname</label>
							<Field
								id='Nickname'
								name='nickname'
								type='text'
								validate={validateNickname}
								autoComplete='on'
							/>
							{errors.nickname && touched.nickname && (
								<div>{errors.nickname}</div>
							)}
						</div>
						<div>
							<Button onClick={handleReset}>Reset</Button>
							<Button type='primary' htmlType='submit'>
								Submit
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RegisterPage;
