import { GET_REPLIES, DELETE_REPLY } from '../_actions/types';

const defaultState = {
	replies: [],
};

const replyReducer = (state = defaultState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_REPLIES:
			return { ...state, replies: payload };
		case DELETE_REPLY:
			const replyId = +payload.replyId;
			const newReplies = state.replies.filter((reply) => reply.id !== replyId);
			return { ...state, replies: newReplies };
		default:
			return state;
	}
};

export default replyReducer;
