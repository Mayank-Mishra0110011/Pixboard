import { SEND_MESSAGE, GET_ERRORS, GET_MESSAGE, MESSAGE_SENT } from './types';
import axios from 'axios';

export const sendMessage = (messageData) => (dispatch) => {
	axios
		.post('user/message', messageData)
		.then(() => {
			dispatch({
				type: SEND_MESSAGE
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const unsetMessageSent = () => (dispatch) => {
	dispatch({
		type: MESSAGE_SENT
	});
};

export const getMessage = () => (dispatch) => {
	axios
		.get('user/message')
		.then((res) => {
			dispatch({
				type: GET_MESSAGE,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
