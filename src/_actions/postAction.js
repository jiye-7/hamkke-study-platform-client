import {
	CREATE_POST,
	GET_POSTS,
	GET_POST,
	DELETE_POST,
	UPDATE_POST,
} from './types';
import {
	createPostAPI,
	getPostsAPI,
	getPostAPI,
	deletePostAPI,
	updatePostAPI,
} from '../_module/postApi';

export const createPost = (dataToSubmit) => {
	return createPostAPI(dataToSubmit)
		.then((data) => ({
			type: CREATE_POST,
			payload: data,
		}))
		.catch((err) => err);
};

/** 글 전체 가져오기 */
export const getPosts = () => {
	return getPostsAPI()
		.then((data) => ({
			type: GET_POSTS,
			payload: data,
		}))
		.catch((err) => err);
};

/** 1개 글 가져오기 */
export const getPost = (postId) => {
	return getPostAPI(postId)
		.then((data) => ({
			type: GET_POST,
			payload: data,
		}))
		.catch((err) => err);
};

/** 글 삭제하기 */
export const deletePost = (postId) => {
	return deletePostAPI(postId)
		.then((data) => ({
			type: DELETE_POST,
			payload: data,
		}))
		.catch((err) => err);
};

/** 글 수정하기 */
export const updatePost = (dataToSubmit) => {
	return updatePostAPI(dataToSubmit)
		.then((data) => ({
			type: UPDATE_POST,
			payload: data,
		}))
		.catch((err) => err);
};
