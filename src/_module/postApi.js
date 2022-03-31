import axios from 'axios';
import { POST_SERVER } from '../Config';

export const createPostAPI = (dataToSubmit) => {
	return axios
		.post(`${process.env.REACT_APP_SERVER_API + POST_SERVER}/`, dataToSubmit)
		.then((response) => response.data);
};

export const getPostsAPI = (params) => {
	return axios
		.get(`${process.env.REACT_APP_SERVER_API + POST_SERVER}?${params}`)
		.then((response) => response.data);
};

export const getPostAPI = (postId, query) => {
	return axios
		.get(`${process.env.REACT_APP_SERVER_API + POST_SERVER}/${postId}?${query}`)
		.then((response) => response.data);
};

export const deletePostAPI = (postId) => {
	return axios
		.delete(`${process.env.REACT_APP_SERVER_API + POST_SERVER}/${postId}`)
		.then((response) => response.data);
};

export const updatePostAPI = (dataToSubmit) => {
	return axios
		.put(`${process.env.REACT_APP_SERVER_API + POST_SERVER}`, dataToSubmit)
		.then((response) => response.data);
};

export const completionOfRecruitmentAPI = (postId) => {
	return axios
		.put(
			`${process.env.REACT_APP_SERVER_API + POST_SERVER}/completed/${postId}`,
		)
		.then((response) => response.data);
};

export const likePostAPI = (dataToSubmit) => {
	return axios
		.post(
			`${process.env.REACT_APP_SERVER_API + POST_SERVER}/like`,
			dataToSubmit,
		)
		.then((response) => response.data);
};

export const getMyWritePostAPI = (userId) => {
	return axios
		.get(
			`${
				process.env.REACT_APP_SERVER_API + POST_SERVER
			}/write/me?userId=${userId}`,
		)
		.then((response) => response.data);
};
