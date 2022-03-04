import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getPost } from '../../../_actions/postAction';

const Post = ({ post }) => {
	const navigate = useNavigate();

	const handleSelectPost = async () => {
		// 서버에 상세 글 요청 날리기
		let result = await getPost(post.id);
		if (result) {
			navigate(`/post/${post.id}`);
		}
	};

	return (
		<div className='post-container' onClick={handleSelectPost}>
			<h1>{post.title}</h1>
			<p>{post.tags}</p>
		</div>
	);
};

export default Post;
