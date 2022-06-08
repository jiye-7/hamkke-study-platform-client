import {
	CREATE_POST,
	GET_POSTS,
	CLEAR_POSTS,
	GET_POST,
	DELETE_POST,
	UPDATE_POST,
	NONEXISTENCE_POST,
	LIKE_POST,
	GET_MY_WRITE_POST,
	GET_MY_LIKE_POST,
} from './types';
import {
	createPostAPI,
	getPostsAPI,
	getPostAPI,
	deletePostAPI,
	updatePostAPI,
	completionOfRecruitmentAPI,
	likePostAPI,
	getMyWritePostAPI,
	getMyLikePostAPI,
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
export const getPost = (postId, query) => {
	return getPostAPI(postId, query)
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

/** 모집 완료 */
export const completionOfRecruitment = (postId) => {
	return completionOfRecruitmentAPI(postId).then((data) => data);
};

/** 좋아요 */
export const likePost = (dataToSubmit) => {
	return likePostAPI(dataToSubmit)
		.then((data) => ({
			type: LIKE_POST,
			payload: data,
		}))
		.catch((err) => err);
};

/** 내가 작성한 글 목록 가져오기 */
export const myWritePost = (userId) => {
	return getMyWritePostAPI(userId)
		.then((data) => ({
			type: GET_MY_WRITE_POST,
			payload: data,
		}))
		.catch((err) => ({
			success: 'fail',
			message: err,
		}));
};

/** 내가 좋아요 한 글 목록 가져오기 */
export const myLikePost = (dataToSubmit) => {
	return getMyLikePostAPI(dataToSubmit)
		.then((data) => ({
			type: GET_MY_LIKE_POST,
			payload: data,
		}))
		.catch((err) => ({
			success: 'fail',
			message: err,
		}));
};
