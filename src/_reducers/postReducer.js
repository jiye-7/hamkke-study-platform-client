import { GET_POSTS } from '../_actions/types';

const defaultState = {
	posts: [],
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
		default:
			return state;
	}
};

export default postReducer;
