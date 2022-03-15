import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { getPosts } from '../../../_actions/postAction';
import Post from '../Post/Post';
import Loading from '../../utils/Loading/Loading';

const LandingPage = () => {
	const dispatch = useDispatch();
	const { posts } = useSelector(({ post }) => post);

	const [isLoaded, setIsLoaded] = useState(false);

	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 0,
	});
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
			{/* <div ref={setTarget}>{isLoaded && <Loading />}</div> */}
			<section className='post-section'>{renderPost()}</section>
		</div>
	);
};

export default LandingPage;
