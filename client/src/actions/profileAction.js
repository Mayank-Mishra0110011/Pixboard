import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types';

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

/*export const deleteAccount = () => (dispatch) => {
	axios
		.delete('/api/profile')
		.then(() =>
			dispatch({
				type: SET_CURRENT_USER,
				payload: {}
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
*/
