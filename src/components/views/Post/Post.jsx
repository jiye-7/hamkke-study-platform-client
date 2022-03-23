import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostInfoItem from './PostInfoItem/PostInfoItem';

const Post = ({ post }) => {
	const navigate = useNavigate();

	const handleSelectPost = () => {
		navigate(`/post/${post.id}`);
	};

	return (
		<div className='post-item-container' onClick={handleSelectPost}>
			<h1>{post.title}</h1>
			<p>{post.stacks.join(', ')}</p>
			<PostInfoItem page={'landing'} post={post} />
		</div>
	);
};

export default Post;
