import React from 'react';
import defaultProfileImg from '../../utils/image/quokka.jpg';

const FileUpload = () => {
	return (
		<div className='fileUpload--container'>
			<img src={defaultProfileImg} alt='profile-image' />
			<div className='fileUpload--container-button'>
				<button>이미지 선택</button>
				<button>이미지 제거</button>
			</div>
		</div>
	);
};

export default FileUpload;
