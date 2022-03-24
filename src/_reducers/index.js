import { combineReducers } from 'redux';
import user from './userReducer';
import post from './postReducer';
import reply from './replyReducer';

const rootReducer = combineReducers({ user, post, reply });

export default rootReducer;
