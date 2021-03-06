import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import Post from '../Post/Post';
import StackPage from '../StackPage/StackPage';
import FilterPage from '../FilterPage/FilterPage';
import { getPosts, clearPosts } from '../../../_actions/postAction';
import imgLogo from '../../utils/image/main_logo.png';

const LandingPage = () => {
	const dispatch = useDispatch();
	const { posts, isLastPost } = useSelector(({ post }) => post);
	const [selectStack, setSelectStack] = useState([]);
	const [page, setPage] = useState(1);
	const [, setIsMoreBtn] = useState(false);
	const [updateState, setUpdateState] = useState('stackUpdate');
	const [isRecruitState, setIsRecruitState] = useState(true);
	const [isSort, setIsSort] = useState('recent');

	useEffect(() => {
		const query = queryString.stringify(
			{
				stacks: selectStack,
				limit: 6,
				page,
				completed: !isRecruitState,
				sort: isSort,
			},
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
	}, [selectStack, page, updateState, isRecruitState, isSort, dispatch]);

	useEffect(() => {
		return () => dispatch(clearPosts());
	}, [dispatch]);

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

	/** 최신, 인기 글 보기 추가 */
	const handleSortPostsFilter = (value) => {
		setIsSort(value);
	};

	/** 모집 중인 글만 보기 */
	const handleRecruitmentPosts = () => {
		setIsRecruitState(!isRecruitState);
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
			<section className='logo-container'>
				<img className='logo-container_img' src={imgLogo} alt='logo img' />
				<a target='blank' href='https://www.freepik.com/'>
					©Designed by Freepik
				</a>
			</section>
			<section className='stackFilter-section'>
				<StackPage stackCheck={handleStackCheck} />
			</section>
			<section className='filter-section'>
				<FilterPage
					recruitingPost={handleRecruitmentPosts}
					recruitState={isRecruitState}
					handleSortPostsFilter={handleSortPostsFilter}
					isSort={isSort}
				/>
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
