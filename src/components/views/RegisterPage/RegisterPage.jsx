import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Button } from 'antd';
import { registerUser } from '../../../_actions/userAction';

const RegisterPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const validate = {
		validateEmail: (value) => {
			let error;
			const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

			if (!value) {
				error = `Email is Required..`;
			} else if (!emailValidation.test(value)) {
				error = `Invalid email address..`;
			}
			return error;
		},
		validatePassword: (value) => {
			let error;

			if (!value) {
				error = 'Password is Required...';
			} else if (value.length <= 4) {
				error = 'Password must be at least 5 characters';
			}
			return error;
		},
		validatePasswordConfirm: (password, pwConfirm) => {
			let error;

			if (!pwConfirm) {
				error = 'Password Confirm is Required...';
			} else if (password !== pwConfirm) {
				error = 'Password is not matched';
			}
			return error;
		},
		validateNickname: (value) => {
			let error;

			if (!value) {
				error = 'Nickname is Required...';
			} else if (value.length <= 4) {
				error = 'Nickname must be at least 5 characters';
			}
			return error;
		},
	};

	return (
		<div className='register--container'>
			<h1 className='register--container_title'>Sign Up</h1>
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
				onSubmit={async (values, { setSubmitting }) => {
					setSubmitting(true);

					const { email, password, nickname } = values;
					const { type } = await dispatch(
						registerUser({ email, password, nickname }),
					);

					setSubmitting(false);

					if (type === 'register_user') {
						navigate('/login');
					}
				}}
			>
				{({ values, errors, touched, handleReset }) => (
					<Form className='register--container-form'>
						<div className='register--container-form_email'>
							<label htmlFor='Emil'>Email</label>
							<Field
								id='Emil'
								name='email'
								type='email'
								validate={validate.validateEmail}
								autoComplete='on'
							/>
							{errors.email && touched.email && (
								<div className='input-validate'>{errors.email}</div>
							)}
						</div>
						<div className='register--container-form_password'>
							<label htmlFor='Password'>Password</label>
							<Field
								id='Password'
								name='password'
								type='password'
								validate={validate.validatePassword}
								autoComplete='off'
							/>
							{errors.password && touched.password && (
								<div className='input-validate'>{errors.password}</div>
							)}
						</div>
						<div className='register--container-form_pwConfirm'>
							<label htmlFor='PasswordConfirm'>PwConfirm</label>
							<Field
								id='PasswordConfirm'
								name='pwConfirm'
								type='password'
								validate={(pwConfirm) =>
									validate.validatePasswordConfirm(values.password, pwConfirm)
								}
								autoComplete='off'
							/>
							{errors.pwConfirm && touched.pwConfirm && (
								<div className='input-validate'>{errors.pwConfirm}</div>
							)}
						</div>
						<div className='register--container-form_nickname'>
							<label htmlFor='Nickname'>Nickname</label>
							<Field
								id='Nickname'
								name='nickname'
								type='text'
								validate={validate.validateNickname}
								autoComplete='on'
							/>
							{errors.nickname && touched.nickname && (
								<div className='input-validate'>{errors.nickname}</div>
							)}
						</div>
						<div className='register--container-form_button'>
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
