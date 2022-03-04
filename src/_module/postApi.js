import axios from 'axios';
import { POST_SERVER } from '../Config';

export const createPostAPI = (dataToSubmit) => {
	return axios
		.post(`${process.env.REACT_APP_SERVER_API + POST_SERVER}/`, dataToSubmit)
		.then((response) => response.data);
};

export const getPostsAPI = () => {
	return axios
		.get(`${process.env.REACT_APP_SERVER_API + POST_SERVER}/`)
		.then((response) => response.data);
};

export const getPostAPI = (postId) => {
	return axios
		.get(`${process.env.REACT_APP_SERVER_API + POST_SERVER}/${postId}`)
		.then((response) => response.data);
};

export const deletePostAPI = (postId) => {
	return axios
		.delete(`${process.env.REACT_APP_SERVER_API + POST_SERVER}/${postId}`)
		.then((response) => response.data);
};
