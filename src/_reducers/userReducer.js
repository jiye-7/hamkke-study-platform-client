import {
	LOGIN_USER,
	REGISTER_USER,
	LOGIN_FAIL,
	LOGOUT_USER,
	UPDATE_USER,
	DELETE_USER,
} from '../_actions/types';

const userReducer = (state = {}, action) => {
	const { type, payload } = action;

	switch (type) {
		case LOGIN_USER:
			return { ...state, loginSuccess: payload };
		case LOGIN_FAIL:
			return { ...state, loginSuccess: payload };
		case REGISTER_USER:
			return { ...state, registerUser: payload };
		case LOGOUT_USER:
			return { ...state, loginSuccess: payload, logoutSuccess: true };
		case UPDATE_USER:
			const { type, data } = payload;
			const updateData = {};

			if (type === 'nickname') {
				updateData.nickname = data;
			} else if (type === 'stacks') {
				updateData.stacks = data;
			}
			return {
				...state,
				loginSuccess: { ...state.loginSuccess, ...updateData },
			};
		case DELETE_USER:
			return {
				...state,
				loginSuccess: { ...payload },
				registerUser: { ...payload },
			};
		default:
			return state;
	}
};

export default userReducer;
