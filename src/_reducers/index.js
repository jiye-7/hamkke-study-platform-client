import { combineReducers } from 'redux';
import user from './userReducer';
import post from './postReducer';
import replyReducer from './replyReducer';

const rootReducer = combineReducers({ user, post, replyReducer });

export default rootReducer;
