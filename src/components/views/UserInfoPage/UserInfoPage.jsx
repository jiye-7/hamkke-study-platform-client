import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'antd';
import languageOptions from '../../utils/data/language';
import FileUpload from '../../utils/FileUpload/FileUpload';

const animatedComponents = makeAnimated();

const UserInfoUpdateSchema = Yup.object().shape({
	nickname: Yup.string()
		.min(5, `닉네임은 5글자 이상이어야 합니다.`)
		.required(`닉네임은 필수입니다.`),
	password: Yup.string()
		.min(5, `비밀번호는 5글자 이상이어야 합니다.`)
		.required(`비밀번호는 필수입니다.`),
});

const UserInfoPage = () => {
	const { loginSuccess: userInfo } = useSelector((state) => state.user);

	return (
		<div className='userInfo--container'>
			<h1>내 정보 수정</h1>
			<FileUpload />
			<Formik
				initialValues={{
					nickname: '',
					password: '',
				}}
				validationSchema={UserInfoUpdateSchema}
				onSubmit={(values, { setSubmitting }) => {}}
				validateOnChange={false}
				validateOnBlur={true}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<Form className='userInfo--container-form'>
						<div className='userInfo--container-form_nickname'>
							<label htmlFor='nickname'>닉네임</label>
							<Field
								name='nickname'
								id='nickname'
								value={values.nickname}
								placeholder={userInfo.nickname}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Button htmlType='submit' onSubmit={handleSubmit}>
								닉네임 변경
							</Button>
							{values.nickname === userInfo.nickname && (
								<div className='input-feedback-duplicated'>
									이미 사용중인 닉네임입니다.
								</div>
							)}
							{errors.nickname && touched.nickname && (
								<div className='input-feedback-error'>{errors.nickname}</div>
							)}
							<p>Hamkke에서 사용되는 이름입니다.</p>
						</div>
						<div className='userInfo--container-form_password'>
							<label htmlFor='password'>비밀번호</label>
							<Field
								name='password'
								id='password'
								value={values.password}
								placeholder='변경할 비밀번호를 입력해주세요 :)'
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Button htmlType='submit' onSubmit={handleSubmit}>
								비밀번호 변경
							</Button>
							{errors.password && touched.password && (
								<div className='input-feedback-error'>{errors.password}</div>
							)}
							<p>Hamkke에서 사용되는 비밀번호입니다.</p>
						</div>
						<div className='userInfo--container-form_stack'>
							<label htmlFor='stack'>관심 기술 태그</label>
							{/* <Field /> */}
							<Select
								className='userInfo--container-form_stack-field'
								closeMenuOnSelect={false}
								components={animatedComponents}
								/* defaultInputValue={[]} */
								isMulti
								options={languageOptions}
								placeholder='관심 태그를 선택해주세요 :)'
							/>
						</div>
						<p>관심있는 기술 태그들을 등록해주세요 :)</p>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default UserInfoPage;
