import axios from 'axios';
import { REPLY_SERVER } from '../Config';

export const createReplyAPI = (dataToSubmit) => {
	return axios
		.post(`${process.env.REACT_APP_SERVER_API + REPLY_SERVER}/`, dataToSubmit)
		.then((response) => response.data);
};
