import React from 'react';
import { CommentOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';

const PostInfoPage = (props) => {
	return (
		<div className='post-info-container'>
			{props.page === 'landing' ? (
				<div className='landing-page'>
					<CommentOutlined />
					<EyeOutlined />
					<HeartOutlined />
				</div>
			) : (
				<div className='detail-page'>
					<EyeOutlined />
					<HeartOutlined />
				</div>
			)}
		</div>
	);
};

export default PostInfoPage;
