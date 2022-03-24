import { CREATE_REPLY } from './types';
import { createReplyAPI } from '../_module/replyApi';

export const createReply = (dataToSubmit) => {
	return createReplyAPI(dataToSubmit)
		.then((data) => ({
			type: CREATE_REPLY,
			payload: data,
		}))
		.catch((err) => err);
};
