import { CREATE_POST, GET_POSTS } from './types';
import { createPostAPI, getPostsAPI } from '../_module/postApi';

export const createPost = (dataToSubmit) => {
	return createPostAPI(dataToSubmit)
		.then((data) => ({
			type: CREATE_POST,
			payload: data,
		}))
		.catch((err) => err);
};
// 글 전체 가져오기
export const getPosts = () => {
	return getPostsAPI()
		.then((data) => ({
			type: GET_POSTS,
			payload: data,
		}))
		.catch((err) => err);
};
