import { CREATE_POST } from './types';
import { createPostAPI } from '../_module/postApi';

export const createPost = (dataToSubmit) => {
	return createPostAPI(dataToSubmit)
		.then((data) => ({
			type: CREATE_POST,
			payload: data,
		}))
		.catch((err) => err);
};
