import {
	LOGIN_USER,
	REGISTER_USER,
	LOGIN_FAIL,
	LOGOUT_USER,
	REGISTER_FAIL,
	UPDATE_USER,
	UPDATE_FAIL,
	DELETE_USER,
	DELETE_USER_FAIL,
	UPDATE_USER_PROFILE,
	UPDATE_USER_PROFILE_FAIL,
	AUTH_USER,
	AUTH_FAIL,
} from './types';

import {
	loginUserAPI,
	registerUserAPI,
	updateUserAPI,
	deleteUserAPI,
	updateUserProfileAPI,
	authUserAPI,
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

export const updateUserProfile = (userId, config, formData) => {
	return updateUserProfileAPI(userId, config, formData)
		.then((data) => ({
			type: UPDATE_USER_PROFILE,
			payload: data,
		}))
		.catch((err) => ({
			type: UPDATE_USER_PROFILE_FAIL,
			payload: err,
		}));
};

export const deleteUser = (dataToSubmit) => {
	return deleteUserAPI(dataToSubmit)
		.then((data) => ({
			type: DELETE_USER,
			payload: {},
		}))
		.catch((err) => ({
			type: DELETE_USER_FAIL,
			payload: err,
		}));
};

export const auth = () => {
	return authUserAPI()
		.then((response) => ({
			type: AUTH_USER,
			payload: response,
		}))
		.catch((err) => {
			return {
				type: AUTH_FAIL,
				payload: { success: false },
			};
		});
};
