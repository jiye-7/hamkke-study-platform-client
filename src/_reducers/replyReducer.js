import { GET_REPLIES } from '../_actions/types';

const defaultState = {
	replies: [],
};

const replyReducer = (state = defaultState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_REPLIES:
			return { ...state, replies: payload };
		default:
			return state;
	}
};

export default replyReducer;
