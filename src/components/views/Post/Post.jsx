import React from 'react';

const Post = ({ post }) => {
	const handleSelectPost = () => {
		console.log('select post::::: ', post);
	};

	return (
		<div className='post-container' onClick={handleSelectPost}>
			<h1>{post.title}</h1>
			<p>{post.tags}</p>
		</div>
	);
};

export default Post;
