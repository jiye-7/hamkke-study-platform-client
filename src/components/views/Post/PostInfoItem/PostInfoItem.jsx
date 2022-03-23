import React from 'react';
import { CommentOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';

const PostInfoPage = (props) => {
	return (
		<div className='post-info-container'>
			{props.page === 'landing' ? (
				<div
					className={`${
						props.recruitmentEnd
							? 'landing-page recruitment-end'
							: 'landing-page'
					}`}
				>
					<div>
						<CommentOutlined />
						<span>100</span>
					</div>
					<div>
						<EyeOutlined />
						<span>{props.post.hit}</span>
					</div>
					<div>
						<HeartOutlined />
						<span>{props.post.like}</span>
					</div>
				</div>
			) : (
				<div className='detail-page'>
					<div>
						<EyeOutlined />
						<span>{props.post.hit}</span>
					</div>
					<div>
						<HeartOutlined
							className={`${props.post.isLike ? 'like' : 'unlike'}`}
							onClick={props.userInfo.id && props.handleLikePost}
						/>
						<span>{props.post.like}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostInfoPage;
