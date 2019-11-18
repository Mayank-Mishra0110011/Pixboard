import axios from 'axios';
import {
	GET_ERRORS,
	CANCEL_PIX_UPLOAD,
	GET_PIX,
	PIX_LOADING,
	ANONYMOUS_PIX_LOADING,
	ANONYMOUS_PIX_LOADED,
	PIX_UPLOADED,
	GET_LIKED_PIX,
	USER_LIKED_PIX_LOADING,
	LIKE_PIX,
	COMMENT_DELETE,
	COMMENT_PIX,
	SET_PIX_URL_AS_IMAGE_URL,
	UNSET_PIX_URL_AS_IMAGE_URL
} from './types';

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

export const likePix = (pixId, pix) => (dispatch) => {
	axios.post(`pix/heart/${pixId}`, { image: pix }).then(() => {
		dispatch({
			type: LIKE_PIX
		});
	});
};

export const commentPix = (comment, pixId, pix) => (dispatch) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`comment/${pixId}`, { comment: comment, image: pix })
			.then(() => {
				dispatch({
					type: COMMENT_PIX
				});
				resolve();
			})
			.catch((err) => {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				});
				reject();
			});
	});
};

export const setPixUrlAsImageUrl = () => (dispatch) => {
	dispatch({
		type: SET_PIX_URL_AS_IMAGE_URL
	});
};

export const unsetPixUrlAsImageUrl = () => (dispatch) => {
	dispatch({
		type: UNSET_PIX_URL_AS_IMAGE_URL
	});
};

export const deleteComment = (commentID) => (dispatch) => {
	return new Promise((resolve, reject) => {
		axios.delete(`comment/${commentID}`).then(() => {
			dispatch({
				type: COMMENT_DELETE
			});
			resolve();
		});
	});
};

export const cancelPixUpload = () => (dispatch) => {
	dispatch({
		type: CANCEL_PIX_UPLOAD
	});
};

export const uploadPix = (board, pix) => (dispatch) => {
	axios
		.post(`pix/upload/${board}`, { image: pix })
		.then((res) => {
			dispatch({
				type: PIX_UPLOADED,
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

export const loadAnonymousPix = (pixUrlOrData) => (dispatch) => {
	dispatch(setAnonymousPixLoading());
	axios
		.post('pix/anonymous', { image: pixUrlOrData })
		.then((res) => {
			dispatch({
				type: ANONYMOUS_PIX_LOADED,
				payload: res.data
			});
		})
		.catch(() => {
			dispatch({
				type: ANONYMOUS_PIX_LOADED,
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

export const setAnonymousPixLoading = () => {
	return {
		type: ANONYMOUS_PIX_LOADING
	};
};
