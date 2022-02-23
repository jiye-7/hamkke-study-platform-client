import {
	LOGIN_USER,
	REGISTER_USER,
	LOGIN_FAIL,
	LOGOUT_USER,
	REGISTER_FAIL,
} from './types';
import { loginUserAPI, registerUserAPI } from '../_module/userApi';

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
	return registerUserAPI(dataToSubmit)
		.then((data) => ({
			type: REGISTER_USER,
			payload: data,
		}))
		.catch((err) => ({
			type: REGISTER_FAIL,
			payload: err,
		}));
};

export const logoutUser = (removeCookie) => {
	removeCookie('TID');
	return {
		type: LOGOUT_USER,
		payload: {},
	};
};
