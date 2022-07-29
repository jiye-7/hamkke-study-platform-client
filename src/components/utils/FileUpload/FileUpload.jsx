import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../_actions/userAction';
import defaultProfileImage from '../../utils/image/hamkkelogo.jpg';

const FileUpload = (props) => {
	const dispatch = useDispatch();

	// userImg는 s3에서 받아오기
	const userImg = useSelector((state) => state.user.userInfo.profile);

	// 새로운 이미지 선택 -> 해당 이미지로 변경
	const handleChangeImage = async (e) => {
		const formData = new FormData();
		const { id: userId } = props.user;
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};

		if (e.target.files) {
			const uploadFile = e.target.files[0];
			formData.append('image', uploadFile);
		}

		// server로 요청 보내기
		// let result = await dispatch(updateUserProfile(userId, config, formData));
	};

	// 이미지 제거 버튼 클릭 시-> 로고 이미지로 변경
	const handleRemoveImage = () => {
		const { id: userId } = props.user;
		// let result = dispatch(updateUserProfile(userId));
	};

	return (
		<div className='fileUpload--container'>
			{userImg ? (
				<img src={userImg} alt='profile' />
			) : (
				<img src={defaultProfileImage} alt='profile' />
			)}

			<div className='fileUpload--container-button'>
				<label htmlFor='img-upload'>이미지 선택</label>
				<input
					type='file'
					id='img-upload'
					hidden
					onChange={handleChangeImage}
				/>
				<button id='img-remove' onClick={handleRemoveImage}>
					이미지 제거
				</button>
			</div>
		</div>
	);
};

export default FileUpload;
