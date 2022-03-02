import { combineReducers } from 'redux';
import user from './userReducer';
import post from './postReducer';

const rootReducer = combineReducers({ user, post });

export default rootReducer;
