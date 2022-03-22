import {
	CREATE_POST,
	GET_POSTS,
	CLEAR_POSTS,
	GET_POST,
	DELETE_POST,
	UPDATE_POST,
	NONEXISTENCE_POST,
} from './types';
import {
	createPostAPI,
	getPostsAPI,
	getPostAPI,
	deletePostAPI,
	updatePostAPI,
} from '../_module/postApi';

/** 글 작성하기 */
export const createPost = (dataToSubmit) => {
	return createPostAPI(dataToSubmit)
		.then((data) => ({
			type: CREATE_POST,
			payload: data,
		}))
		.catch((err) => err);
};

/** 글 전체 가져오기 */
export const getPosts = (params) => {
	return getPostsAPI(params)
		.then((data) => ({
			type: GET_POSTS,
			payload: data,
		}))
		.catch((err) => {
			return {
				type: NONEXISTENCE_POST,
				payload: { success: false, message: '게시글이 존재하지 않습니다.' },
			};
		});
};

/** 가져온 전체 글 지우기 */
export const clearPosts = () => {
	return {
		type: CLEAR_POSTS,
		payload: { posts: [] },
	};
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
