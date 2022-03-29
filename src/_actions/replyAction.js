import { CREATE_REPLY, GET_REPLIES, DELETE_REPLY } from './types';
import {
	createReplyAPI,
	getRepliesAPI,
	deleteReplyAPI,
} from '../_module/replyApi';

export const createReply = (dataToSubmit) => {
	return createReplyAPI(dataToSubmit)
		.then((data) => ({
			type: CREATE_REPLY,
			payload: data,
		}))
		.catch((err) => err);
};

export const getReplies = (postId) => {
	return getRepliesAPI(postId) /*.then((data) => console.log(data)); */
		.then((data) => ({
			type: GET_REPLIES,
			payload: data.reply,
		}))
		.catch((err) => console.log(err));
};

export const deleteReply = (replyId) => {
	return deleteReplyAPI(replyId).then((data) => ({
		type: DELETE_REPLY,
		payload: +data.replyId,
	}));
};
