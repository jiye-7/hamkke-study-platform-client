import {
	GET_REPLIES,
	CREATE_REPLY,
	DELETE_REPLY,
	UPDATE_REPLY,
} from '../_actions/types';

const defaultState = {
	replies: [],
};

const replyReducer = (state = defaultState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_REPLIES:
			return { ...state, replies: payload };
		case CREATE_REPLY:
			return { ...state, replies: [payload, ...state.replies] };
		case DELETE_REPLY: {
			const replyId = +payload.replyId;
			const newReplies = state.replies.filter((reply) => reply.id !== replyId);
			return { ...state, replies: newReplies };
		}
		case UPDATE_REPLY: {
			const { replyId, contents } = payload;
			const newReplies = state.replies.map((reply) => {
				if (reply.id === replyId) {
					reply.contents = contents;
				}
				return reply;
			});
			return { ...state, replies: newReplies };
		}
		default:
			return state;
	}
};

export default replyReducer;
