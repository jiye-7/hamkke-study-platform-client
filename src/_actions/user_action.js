import { LOGIN_USER, REGISTER_USER, LOGIN_FAIL, LOGOUT_USER } from './types';
import { loginUserAPI, registerUserAPI } from '../_module/user_api';

export const loginUser = (dataToSubmit) => {
	return loginUserAPI(dataToSubmit)
		.then((data) => ({
			type: LOGIN_USER,
			payload: data,
		}))
		.catch((err) => {
			return {
				type: LOGIN_FAIL,
				payload: {},
			};
		});
};

export const registerUser = (dataToSubmit) => {
	const request = registerUserAPI(dataToSubmit);

	return {
		type: REGISTER_USER,
		payload: request,
	};
};

export const logoutUser = () => {
	return {
		type: LOGOUT_USER,
		payload: {},
	};
};
