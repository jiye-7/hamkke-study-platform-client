import { GET_POSTS, CLEAR_POSTS, GET_MY_WRITE_POST } from '../_actions/types';

const defaultState = {
	posts: [],
	myPosts: [],
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
		default:
			return state;
	}
};

export default postReducer;
