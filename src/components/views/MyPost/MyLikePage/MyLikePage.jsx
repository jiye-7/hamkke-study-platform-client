import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { myLikePost } from '../../../../_actions/postAction';
import Post from '../../Post/Post';

const MyLikePage = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	const { userInfo } = state.user;
	const { myLikePosts } = state.post;
	const [page, setPage] = useState(1);
	const [myPosts, setMyLikePosts] = useState([]);
	const [isLastPage, setIsLastPage] = useState(false);

	useEffect(() => {
		(async () => {
			const query = queryString.stringify(
				{ limit: 5, page, userId: userInfo.id },
				{ dataFormat: 'bracket' },
			);
			const { type, payload } = await dispatch(myLikePost(query));

			if (type === 'get_my_like_post') {
				let resultPosts = payload.posts.map((post) => {
					post.stacks = post.stacks.split(',');
					return post;
				});
				setMyLikePosts([...myLikePosts, ...resultPosts]);
				setIsLastPage(payload.lastPage);
			}
		})();
	}, [page]);

	const handleMoreLikePosts = () => {
		setPage(page + 1);
	};

	const renderLikePosts = () => {
		return myPosts?.map((post) => <Post post={post} key={post.id} />);
	};

	return (
		<>
			<div className='my-like-container'>
				{myPosts.length > 0 && renderLikePosts()}
			</div>
			{isLastPage === false && (
				<button onClick={handleMoreLikePosts}>더 보기</button>
			)}
		</>
	);
};

export default MyLikePage;
