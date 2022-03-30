import React from 'react';
import { CommentOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';

const PostInfoPage = (props) => {
	const { page, userInfo, handleLikePost, post } = props;

	return (
		<div className='post-info-container'>
			{page === 'landing' ? (
				<div
					className={`${
						props.recruitmentEnd
							? 'landing-page recruitment-end'
							: 'landing-page'
					}`}
				>
					<div>
						<CommentOutlined />
						<span>{post.comment}</span>
					</div>
					<div>
						<EyeOutlined />
						<span>{post.hit}</span>
					</div>
					<div>
						<HeartOutlined />
						<span>{post.like}</span>
					</div>
				</div>
			) : (
				<div className='detail-page'>
					<div>
						<EyeOutlined />
						<span>{post.hit}</span>
					</div>
					<div>
						<HeartOutlined
							className={`${post.isLike ? 'like' : 'unlike'}`}
							onClick={userInfo.id && handleLikePost}
						/>
						<span>{post.like}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostInfoPage;
