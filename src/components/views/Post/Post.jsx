import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostInfoItem from './PostInfoItem/PostInfoItem';
import languageOptions from '../../utils/data/language';

const Post = (props) => {
	const navigate = useNavigate();
	const [stacks] = useState(props.post.stacks);

	const handleSelectPost = () => {
		navigate(`/post/${props.post.id}`, {
			state: { commentCount: props.post.comment },
		});
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
			.slice(0, 3)
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
					props.post.completed
						? 'post-item-container completed'
						: 'post-item-container'
				}`}
				onClick={handleSelectPost}
			>
				<h1>{props.post.title}</h1>
				<div className='stack-container'>{renderStacks()}</div>
				<PostInfoItem
					page={'landing'}
					post={props.post}
					recruitmentEnd={props.post.completed}
				/>
			</div>
			{props.post.completed ? (
				<div className='post-completed'>모집 완료</div>
			) : (
				''
			)}
		</div>
	);
};

export default Post;
