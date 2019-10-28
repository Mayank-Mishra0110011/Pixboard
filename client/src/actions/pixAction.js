import axios from 'axios';
import { GET_PIX, PIX_LOADING, GET_LIKED_PIX, USER_LIKED_PIX_LOADING } from './types';

export const getUserPix = () => (dispatch) => {
	dispatch(setPixLoading());
	axios
		.get('pix/all')
		.then((res) => {
			dispatch({
				type: GET_PIX,
				payload: res.data
			});
		})
		.catch(() => {
			dispatch({
				type: GET_PIX,
				payload: {}
			});
		});
};

export const getUserLikedPix = () => (dispatch) => {
	dispatch(setUserLikedPixLoading());
	axios
		.get('pix/liked')
		.then((res) => {
			dispatch({
				type: GET_LIKED_PIX,
				payload: res.data
			});
		})
		.catch(() => {
			dispatch({
				type: GET_LIKED_PIX,
				payload: {}
			});
		});
};

export const setUserLikedPixLoading = () => {
	return {
		type: USER_LIKED_PIX_LOADING
	};
};

export const setPixLoading = () => {
	return {
		type: PIX_LOADING
	};
};
