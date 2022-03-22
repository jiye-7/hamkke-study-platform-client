import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import Post from '../Post/Post';
import StackPage from '../StackPage/StackPage';
import FilterPage from '../FilterPage/FilterPage';
import { getPosts, clearPosts } from '../../../_actions/postAction';

const LandingPage = () => {
	const dispatch = useDispatch();
	const { posts, isLastPost } = useSelector(({ post }) => post);
	const [selectStack, setSelectStack] = useState([]);
	const [page, setPage] = useState(1);
	const [isMoreBtn, setIsMoreBtn] = useState(false);
	const [updateState, setUpdateState] = useState('stackUpdate');
	const [isRecruitState, setIsRecruitState] = useState(true);

	useEffect(() => {
		const query = queryString.stringify(
			{ stacks: selectStack, limit: 6, page },
			{ arrayFormat: 'bracket' },
		);

		if (updateState === 'stackUpdate') {
			(async () => {
				await dispatch(clearPosts());
				await dispatch(getPosts(query));
			})();
		} else {
			dispatch(getPosts(query));
		}
	}, [selectStack, page, updateState]);

	useEffect(() => {
		return () => dispatch(clearPosts());
	}, []);

	const renderPost = () => {
		return posts.map((post) => <Post key={post.id} post={post} />);
	};

	const handleStackCheck = (checkStack) => {
		setPage(1);
		setUpdateState('stackUpdate');
		const stack = checkStack.toLowerCase();
		const findIdx = selectStack.findIndex((el) => el === stack);
		const stacks = [...selectStack];

		// findIdx가 -1이면 존재하지 않으니 selectStack에 해당 stack을 추가, findIdx가 존재(0)하는 경우, selectStack에서 지운다.
		findIdx === -1 ? stacks.push(stack) : stacks.splice(findIdx, 1);
		setSelectStack(stacks);
	};

	// 최신, 인기, 모집 중인 글만 보기 추가

	/** 모집 중인 글만 보기 */
	const handleRecruitmentPosts = (value) => {
		console.log('서버로 요청 보내기');

		if (isRecruitState) {
			console.log('모집 중인 글만 보기 서버로 요청 보내기');
		} else {
			console.log('전체 글 보기 (모집 끝난 글도 보기)');
		}
	};

	/** 더 보기 로직 */
	const handleIsMorePost = () => {
		let nextPage = page + 1;
		setPage(nextPage);
		setUpdateState('morePosts');
		setIsMoreBtn(true);
	};

	return (
		<div className='main-container'>
			<section className='stackFilter-section'>
				<StackPage stackCheck={handleStackCheck} />
			</section>
			{/* TODO: filter section(recent, like, recruiting) */}
			<section className='filter-section'>
				<FilterPage recruitingPost={handleRecruitmentPosts} />
			</section>
			<section className='post-section'>{renderPost()}</section>
			<section className='more-post-section'>
				{isLastPost === false && (
					<button onClick={handleIsMorePost}>더 보기</button>
				)}
			</section>
		</div>
	);
};

export default LandingPage;
