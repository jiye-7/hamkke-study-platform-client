import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from '../src/_reducers';
import App from './App';
import './index.css';
import 'antd/dist/antd.min.css';

import axios from 'axios';
axios.defaults.withCredentials = true;

const createStoreWithMiddleware = applyMiddleware(
	promiseMiddleware,
	ReduxThunk,
)(createStore);

ReactDOM.render(
	<Provider
		store={createStoreWithMiddleware(
			Reducer,
			window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__(),
		)}
	>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root'),
);
