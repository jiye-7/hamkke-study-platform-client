import { GET_POSTS, CLEAR_POSTS, GET_MY_WRITE_POST } from '../_actions/types';
import {
	GET_POSTS,
	CLEAR_POSTS,
	GET_MY_WRITE_POST,
	GET_MY_LIKE_POST,
} from '../_actions/types';

const defaultState = {
	posts: [],
	myPosts: [],
	myLikePosts: [],
};

const postReducer = (state = defaultState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: [...state.posts, ...payload.posts],
				isLastPost: payload.isLastPost,
			};
		case CLEAR_POSTS:
			return {
				...state,
				posts: payload.posts,
			};
		case GET_MY_WRITE_POST:
			return { ...state, myPosts: payload.posts };
		case GET_MY_LIKE_POST:
			// return { ...state, myLikePosts: payload.posts };
			// console.log(payload.posts.map((post) => post.));
			return {
				...state,
				myLikePosts: [...state.myLikePosts, ...payload.posts],
			};
		default:
			return state;
	}
};

export default postReducer;
