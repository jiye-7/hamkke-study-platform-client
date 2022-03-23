import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostInfoItem from './PostInfoItem/PostInfoItem';

const Post = ({ post }) => {
	const navigate = useNavigate();

	const handleSelectPost = () => {
		navigate(`/post/${post.id}`);
	};

	return (
		<div className='post-container-div'>
			<div
				className={`${
					post.completed
						? 'post-item-container completed'
						: 'post-item-container'
				}`}
				onClick={handleSelectPost}
			>
				<h1>{post.title}</h1>
				<p>{post.stacks.join(', ')}</p>
				<PostInfoItem page={'landing'} />
			</div>
			{post.completed ? <div className='post-completed'>모집 완료</div> : ''}
		</div>
	);
};

export default Post;
