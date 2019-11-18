import axios from 'axios';
import {
	GET_PROFILE,
	SET_CURRENT_USER,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	FOLLOW_ACTION
} from './types';

export const getCurrentUserProfile = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get('user/profile')
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch(() => {
			dispatch({
				type: GET_PROFILE,
				payload: {}
			});
		});
};

export const follow = (id) => (dispatch) => {
	axios.post(`user/follow/${id}`).then((res) => {
		dispatch({
			type: FOLLOW_ACTION,
			payload: res.data
		});
	});
};

export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};

export const createProfile = (profileData, history) => (dispatch) => {
	axios
		.post('/api/profile', profileData)
		.then(() => {
			history.push('/dashboard');
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const deleteAccount = () => (dispatch) => {
	axios.delete('/user/profile').then(() =>
		dispatch({
			type: SET_CURRENT_USER,
			payload: {}
		})
	);
};
