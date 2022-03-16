import React from 'react';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
	const navigate = useNavigate();

	const handleSelectPost = () => {
		// 서버에 상세 글 요청 날리기
		navigate(`/post/${post.id}`);
	};

	return (
		<div className='post-container' onClick={handleSelectPost}>
			<h1>{post.title}</h1>
			<p>{post.stacks.join(', ')}</p>
		</div>
	);
};

export default Post;
