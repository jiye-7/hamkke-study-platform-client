import {
	LOGIN_USER,
	REGISTER_USER,
	LOGIN_FAIL,
	LOGOUT_USER,
	UPDATE_USER,
	DELETE_USER,
	UPDATE_USER_PROFILE,
	AUTH_USER,
} from '../_actions/types';

const defaultState = {
	userInfo: {
		id: null,
		email: '',
		nickname: '',
		profile: '',
		stacks: [],
	},
};

const userReducer = (state = defaultState, action) => {
	const { type, payload } = action;

	switch (type) {
		case AUTH_USER:
			return { ...state, userInfo: payload.user };
		case LOGIN_USER:
			return { ...state, userInfo: payload, loginSuccess: true };
		case LOGIN_FAIL:
			return { ...state, userInfo: payload };
		case REGISTER_USER:
			return { ...state, registerUser: payload };
		case LOGOUT_USER:
			return {
				...state,
				userInfo: payload,
				loginSuccess: false,
				logoutSuccess: true,
			};
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
				userInfo: { ...state.userInfo, ...updateData },
			};
		case DELETE_USER:
			return {
				...state,
				userInfo: { ...payload },
				registerUser: { ...payload },
			};
		case UPDATE_USER_PROFILE:
			return {
				...state,
				userInfo: { ...state.userInfo, profile: payload.image },
			};
		default:
			return state;
	}
};

export default userReducer;
