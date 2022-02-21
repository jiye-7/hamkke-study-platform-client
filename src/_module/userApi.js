import axios from 'axios';
// SERVER ROUTES
export const USER_SERVER = '/api/users';

export const loginUserAPI = (dataToSubmit) => {
	return axios.post(
		`${process.env.REACT_APP_SERVER_API + USER_SERVER}/login`,
		dataToSubmit,
	);
};

export const registerUserAPI = (dataToSubmit) => {
	return axios.post(
		`${process.env.REACT_APP_SERVER_API + USER_SERVER}/register`,
		dataToSubmit,
	);
};
