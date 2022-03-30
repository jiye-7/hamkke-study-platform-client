import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostInfoItem from './PostInfoItem/PostInfoItem';
import languageOptions from '../../utils/data/language';

const Post = ({ post }) => {
	const navigate = useNavigate();
	const [stacks] = useState(post.stacks);
	console.log('commentCount:::::', post.comment);

	const handleSelectPost = () => {
		navigate(`/post/${post.id}`, { state: { commentCount: post.comment } });
	};

	const hashStacks = () => {
		return stacks.reduce((acc, cur) => {
			acc[cur] = 1;
			return acc;
		}, {});
	};

	const renderStacks = () => {
		const hashStackResult = hashStacks();

		return languageOptions
			.filter((option) => {
				return option.value in hashStackResult;
			})
			.map((stackInfo) => (
				<div className='stack-info' key={stackInfo.id + stackInfo.src}>
					<img
						src={stackInfo.src}
						alt={`${stackInfo.value + 'logo'}`}
						style={{ width: '48px', height: '45px' }}
					/>
					<p>{stackInfo.value}</p>
				</div>
			));
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
				<div className='stack-container'>{renderStacks()}</div>
				<PostInfoItem
					page={'landing'}
					post={post}
					recruitmentEnd={post.completed}
				/>
			</div>
			{post.completed ? <div className='post-completed'>모집 완료</div> : ''}
		</div>
	);
};

export default Post;
