import {
	LOGIN_USER,
	REGISTER_USER,
	LOGIN_FAIL,
	LOGOUT_USER,
} from '../_actions/types';

const userReducer = (state = {}, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loginSuccess: action.payload };
		case LOGIN_FAIL:
			return { ...state, loginSuccess: action.payload };
		case REGISTER_USER:
			return { ...state, registerUser: action.payload };
		case LOGOUT_USER:
			return { ...state, loginSuccess: action.payload, logoutSuccess: true };
		default:
			return state;
	}
};

export default userReducer;
