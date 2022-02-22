import {
	LOGIN_USER,
	REGISTER_USER,
	LOGIN_FAIL,
	LOGOUT_USER,
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
		default:
			return state;
	}
};

export default userReducer;
