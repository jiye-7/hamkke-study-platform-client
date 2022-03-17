import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import Post from '../Post/Post';
import StackPage from '../StackPage/StackPage';
import { getPosts } from '../../../_actions/postAction';

const LandingPage = () => {
	const dispatch = useDispatch();
	const { posts, isLastPost } = useSelector(({ post }) => post);
	const [selectStack, setSelectStack] = useState([]);
	const [isMoreBtn, setIsMoreBtn] = useState(false);
	const [page, setPage] = useState(1);

	/** 게시글 가져오는 useEffect */
	useEffect(() => {
		const query = queryString.stringify(
			{ stacks: selectStack, limit: 6, page },
			{ arrayFormat: 'bracket' },
		);
		dispatch(getPosts(query));
		setIsMoreBtn(false);
	}, [selectStack]);

	const renderPost = () => {
		return posts.map((post) => <Post key={post.id} post={post} />);
	};

	const handleStackCheck = (checkStack) => {
		const stack = checkStack.toLowerCase();
		const findIdx = selectStack.findIndex((el) => el === stack);
		const stacks = [...selectStack];

		// findIdx가 -1이면 존재하지 않으니 selectStack에 해당 stack을 추가, findIdx가 0이면 존재하는 경우, selectStack에서 지운다.
		findIdx === -1 ? stacks.push(stack) : stacks.splice(findIdx, 1);
		setSelectStack(stacks);
	};

	/** 더 보기 로직 */
	const handleIsMore = () => {
		let nextPage = page + 1;
		setPage(nextPage);
		setIsMoreBtn(true);
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
			<section>
				{isLastPost === false && (
					<button onClick={handleIsMore}>더 보기</button>
				)}
			</section>
		</div>
	);
};

export default LandingPage;
