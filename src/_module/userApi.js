import axios from 'axios';
import { USER_SERVER } from '../Config';

export const loginUserAPI = (dataToSubmit) => {
	return axios
		.post(
			`${process.env.REACT_APP_SERVER_API + USER_SERVER}/login`,
			dataToSubmit,
		)
		.then((response) => response.data);
};

export const registerUserAPI = (dataToSubmit) => {
	return axios
		.post(
			`${process.env.REACT_APP_SERVER_API + USER_SERVER}/register`,
			dataToSubmit,
		)
		.then((response) => response.data);
};

export const updateUserAPI = (dataToSubmit) => {
	return axios
		.put(`${process.env.REACT_APP_SERVER_API + USER_SERVER}`, dataToSubmit)
		.then((response) => response.data);
};
