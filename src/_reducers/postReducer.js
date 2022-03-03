import { GET_POSTS } from '../_actions/types';

const defaultState = {
	posts: [],
};

const postReducer = (state = defaultState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return { ...state, posts: payload.posts };
		default:
			return state;
	}
};

export default postReducer;
