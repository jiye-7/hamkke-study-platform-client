import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'antd';
import languageOptions from '../../utils/data/language';
import FileUpload from '../../utils/FileUpload/FileUpload';
import { updateUser } from '../../../_actions/userAction';

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
	const dispatch = useDispatch();
	const { loginSuccess: userInfo } = useSelector((state) => state.user);
	const [updateNickname, setNickName] = useState('');
	const [updatePassword, setPassword] = useState('');
	const [isNicknameDisable, setIsNicknameDisable] = useState(true);
	const [isPasswordDisable, setIsPasswordDisable] = useState(true);
	const [stacks, setStacks] = useState([]);
	const [nicknameUpdateFail, setNicknameUpdateFail] = useState(false);
	console.log(userInfo);

	const handleNicknameDisable = (setFieldValue) => {
		setFieldValue('nickname', '');
		setIsNicknameDisable(!isNicknameDisable);
	};

	const handleNicknameUpdate = async (setFieldValue, nickname) => {
		if (nickname.length < 4) {
			return;
		}

		const { id: userId } = userInfo;

		// server 통신 후 성공 확인 된 후 -> 리덕스도 업데이트 해줘야 됨
		let response = await dispatch(
			updateUser({ userId, type: 'nickname', data: nickname }),
		);
		console.log(response);
		if (response.type === 'update_user') {
			setFieldValue('nickname', nickname);
			setIsNicknameDisable(!isNicknameDisable);
			setNicknameUpdateFail(false);
		} else {
			setNicknameUpdateFail(true);
		}
	};

	const handlePasswordDisable = (setFieldValue) => {
		setFieldValue('password', '');
		setIsPasswordDisable(!isPasswordDisable);
	};

	const handlePasswordUpdate = (setFieldValue, password) => {
		setPassword(password);
		setIsPasswordDisable(!isPasswordDisable);

		// server 통신 후 성공 확인 된 후
		// setFieldValue('password', '*****');
	};

	const handleStackValueChange = (values) => {
		// const newStacks = [];
		// values.forEach((value) => newStacks.push(value.label));
		const newStacks = values.map((value) => value.label);
		setStacks(newStacks);
	};

	const handleMembershipWithdrawal = () => {
		console.log('회원 탈퇴.');
	};

	return (
		<div className='user-container'>
			<div className='userInfo--container'>
				<h1>내 정보 수정</h1>
				<FileUpload />
				<Formik
					initialValues={{
						nickname: userInfo.nickname,
						password: '*****',
					}}
					validationSchema={UserInfoUpdateSchema}
					validateOnChange={false}
					validateOnBlur={true}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						setFieldValue,
					}) => (
						<Form className='userInfo--container-form'>
							<section>
								<div className='userInfo--container-form_filed'>
									<label htmlFor='nickname'>닉네임</label>
									<div>
										<Field
											name='nickname'
											id='nickname'
											value={values.nickname || ''}
											onChange={handleChange}
											onBlur={handleBlur}
											disabled={isNicknameDisable}
										/>
										{errors.nickname && touched.nickname && (
											<div className='input-feedback-error'>
												{errors.nickname}
											</div>
										)}
									</div>
									{isNicknameDisable ? (
										<Button
											type='primary'
											htmlType='button'
											className='change-btn'
											onClick={() => handleNicknameDisable(setFieldValue)}
										>
											닉네임 변경
										</Button>
									) : (
										<Button
											type='primary'
											htmlType='button'
											className='change-btn'
											onClick={() =>
												handleNicknameUpdate(setFieldValue, values.nickname)
											}
										>
											확인
										</Button>
									)}
								</div>
								{nicknameUpdateFail && (
									<div className='input-feedback-duplicated'>
										이미 사용중인 닉네임입니다.
									</div>
								)}
								<p>Hamkke에서 사용되는 이름입니다.</p>
							</section>
							<section>
								<div className='userInfo--container-form_filed'>
									<label htmlFor='password'>비밀번호</label>
									<div>
										<Field
											name='password'
											id='password'
											type='password'
											value={values.password || ''}
											onChange={handleChange}
											onBlur={handleBlur}
											disabled={isPasswordDisable}
										/>
										{errors.password && touched.password && (
											<div className='input-feedback-error'>
												{errors.password}
											</div>
										)}
									</div>
									{isPasswordDisable ? (
										<Button
											type='primary'
											htmlType='button'
											className='change-btn'
											onClick={() => handlePasswordDisable(setFieldValue)}
										>
											비밀번호 변경
										</Button>
									) : (
										<Button
											type='primary'
											htmlType='button'
											className='change-btn'
											onClick={() =>
												handlePasswordUpdate(setFieldValue, values.password)
											}
										>
											확인
										</Button>
									)}
								</div>
								<p>Hamkke에서 사용되는 비밀번호입니다.</p>
							</section>
							<section>
								<div className='userInfo--container-form_stack'>
									<label htmlFor='stack'>관심 기술 태그</label>
									<Select
										className='userInfo--container-form_stack-field'
										closeMenuOnSelect={false}
										components={animatedComponents}
										/* defaultInputValue={[]} */
										isMulti
										options={languageOptions}
										placeholder='관심 태그를 선택해주세요 :)'
										onChange={(value) => handleStackValueChange(value)}
									/>
								</div>
								<p>관심있는 기술 태그들을 등록해주세요 :)</p>
							</section>
							<section>
								<Button
									onClick={handleMembershipWithdrawal}
									className='userInfo--container-form_withdrawal'
									type='danger'
								>
									회원 탈퇴
								</Button>
							</section>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default UserInfoPage;
