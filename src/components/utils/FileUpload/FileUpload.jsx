import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../../_actions/userAction';
import quokkaImg from '../../utils/image/quokka.jpg';
import defaultProfileImage from '../../utils/image/hamkkelogo.jpg';

const FileUpload = (props) => {
	const dispatch = useDispatch();

	// 이미지 제거 버튼 클릭 시 -> 기본 이미지 제공
	const [defaultImg, setDefaultImage] = useState(defaultProfileImage);
	// userImg는 s3에서 받아오기
	const [userImg, setUserImage] = useState(defaultImg);

	// 새로운 이미지 선택 -> 해당 이미지로 변경
	const handleChangeImage = async (e) => {
		const formData = new FormData();
		const { id: userId } = props.user;
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};

		if (e.target.files) {
			const uploadFile = e.target.files[0];
			formData.append('file', uploadFile);
		}
		console.log(formData);

		// server로 요청 보내기
		let result = await dispatch(updateUserProfile(userId, config, formData));
		console.log(result);
	};

	// 이미지 제거 버튼 클릭 시-> 로고 이미지로 변경
	const handleRemoveImage = () => {
		console.log('이미지 제거 및 기본 이미지로 변경');
		setUserImage(defaultImg);
	};

	return (
		<div className='fileUpload--container'>
			{userImg === defaultImg ? (
				<img src={defaultImg} alt='profile' />
			) : (
				<img src={userImg} alt='profile' />
			)}

			<div className='fileUpload--container-button'>
				<label htmlFor='img-upload'>이미지 선택</label>
				<input type='file' id='img-upload' hidden onClick={handleChangeImage} />
				<button id='img-remove' onClick={handleRemoveImage}>
					이미지 제거
				</button>
			</div>
		</div>
	);
};

export default FileUpload;
