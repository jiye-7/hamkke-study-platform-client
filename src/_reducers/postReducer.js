import { CREATE_POST } from '../_actions/types';

const postReducer = (state = {}, action) => {
	const { type, payload } = action;

	switch (type) {
		case CREATE_POST:
			return { ...state };
		default:
			return state;
	}
};

export default postReducer;
