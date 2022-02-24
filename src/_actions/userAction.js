import {
	LOGIN_USER,
	REGISTER_USER,
	LOGIN_FAIL,
	LOGOUT_USER,
	REGISTER_FAIL,
	UPDATE_USER,
	UPDATE_FAIL,
} from './types';
import {
	loginUserAPI,
	registerUserAPI,
	updateUserAPI,
} from '../_module/userApi';

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

export const updateUser = (dataToSubmit) => {
	return updateUserAPI(dataToSubmit)
		.then(() => ({
			type: UPDATE_USER,
			payload: dataToSubmit,
		}))
		.catch((err) => ({
			type: UPDATE_FAIL,
			payload: err,
		}));
};
