import { CREATE_POST, GET_POSTS, GET_POST } from './types';
import { createPostAPI, getPostsAPI, getPostAPI } from '../_module/postApi';

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

// 1개 글 가져오기
export const getPost = (postId) => {
	return getPostAPI(postId)
		.then((data) => ({
			type: GET_POST,
			payload: data,
		}))
		.catch((err) => err);
};
