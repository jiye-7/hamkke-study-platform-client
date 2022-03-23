import React from 'react';
import { CommentOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';

const PostInfoPage = (props) => {
	const renderPost = () => {
		return (
			<>
				{props.page === 'landing' ? (
					<div>
						<CommentOutlined />
						<span>100</span>
					</div>
				) : (
					''
				)}
				<div>
					<EyeOutlined />
					<span>{props.post.hit}</span>
				</div>
				<div>
					<HeartOutlined />
					<span>30</span>
				</div>
			</>
		);
	};

	return (
		<div className='post-info-container'>
			{props.page === 'landing' ? (
				<div className='landing-page'>{renderPost()}</div>
			) : (
				<div className='detail-page'>{renderPost()}</div>
			)}
		</div>
	);
};

export default PostInfoPage;
