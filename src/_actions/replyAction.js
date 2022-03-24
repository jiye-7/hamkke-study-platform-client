import { CREATE_REPLY, GET_REPLIES } from './types';
import { createReplyAPI, getRepliesAPI } from '../_module/replyApi';

export const createReply = (dataToSubmit) => {
	return createReplyAPI(dataToSubmit)
		.then((data) => ({
			type: CREATE_REPLY,
			payload: data,
		}))
		.catch((err) => err);
};

export const getReplies = (postId) => {
	return getRepliesAPI(postId)
		.then((data) => ({
			type: GET_REPLIES,
			payload: data.reply,
		}))
		.catch((err) => err);
};
