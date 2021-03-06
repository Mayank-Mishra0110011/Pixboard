import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/user/register', userData)
		.then(() => {
			history.push('/Login');
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const loginUser = (userData) => (dispatch) => {
	axios
		.post('user/login', userData)
		.then((res) => {
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('jwtToken');
	localStorage.removeItem('backTo');
	localStorage.removeItem('pixURL');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};
