import React, { useState } from 'react';
import quokkaImg from '../../utils/image/quokka.jpg';
import defaultProfileImage from '../../utils/image/hamkkelogo.jpg';

const FileUpload = () => {
	// 이미지 제거 버튼 클릭 시 -> 기본 이미지 제공
	const [defaultImg, setDefaultImage] = useState(defaultProfileImage);
	// userImg는 s3에서 받아오기
	const [userImg, setUserImage] = useState(defaultImg);

	// 새로운 이미지 선택 -> 해당 이미지로 변경
	const handleChangeImage = (e) => {
		let formData = new FormData();

		const config = {
			header: { 'content-type': 'multipart/form-data' },
		};

		if (e.target.files[0]) {
			const uploadFile = e.target.files[0];
			formData.append('files', uploadFile);
		}

		// server로 요청 보내기
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
