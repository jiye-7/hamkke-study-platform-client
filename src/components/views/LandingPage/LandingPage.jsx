import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../../_actions/postAction';
import Post from '../Post/Post';
import StackPage from '../StackPage/StackPage';

const LandingPage = () => {
	const dispatch = useDispatch();
	const { posts } = useSelector(({ post }) => post);
	const [selectStack, setSelectStack] = useState([]);

	useEffect(() => {
		dispatch(getPosts(selectStack));
	}, [selectStack]);

	// 해당 post 1개씩 리턴
	const renderPost = () => {
		return posts.map((post) => <Post key={post.id} post={post} />);
	};

	const handleStackCheck = (checkStack) => {
		const stack = checkStack.toLowerCase();
		// selectStack에 stack이 있는 지 확인
		const findIdx = selectStack.indexOf(stack);
		const stacks = [...selectStack];

		// findIdx가 -1이면 존재하지 않으니 selectStack에 해당 stack을 추가한다.
		// findIdx가 0이면 존재하는 경우, selectStack에서 지운다.
		findIdx === -1 ? stacks.push(stack) : stacks.splice(findIdx, 1);
		setSelectStack(stacks);
	};

	return (
		<div className='main-container'>
			{/* language filter section */}
			<section className='stackFilter-section'>
				<StackPage stackCheck={handleStackCheck} />
			</section>
			{/* TODO: filter section(recent, like, recruiting) */}
			{/* posts section */}
			<section className='post-section'>{renderPost()}</section>
		</div>
	);
};

export default LandingPage;
