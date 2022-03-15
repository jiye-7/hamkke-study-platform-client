import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../../_actions/postAction';
import { useInView } from 'react-intersection-observer';
import Post from '../Post/Post';

const LandingPage = () => {
	const dispatch = useDispatch();
	const { posts } = useSelector(({ post }) => post);

	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 0,
	});

	console.log(inView, entry);

	useEffect(() => {
		dispatch(getPosts());
	}, []);

	// 해당 post 1개씩 리턴
	const renderPost = () => {
		return posts.map((post) => <Post key={post.id} post={post} />);
	};

	return (
		<div className='main-container'>
			{/* TODO: language filter section */}
			{/* TODO: filter section(recent, like, recruiting) */}
			{/* posts section */}
			<section className='post-section'>{renderPost()}</section>
		</div>
	);
};

export default LandingPage;
