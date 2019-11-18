import axios from 'axios';
import {
	GET_BOARD,
	BOARD_LOADING,
	USER_LIKED_BOARD_LOADING,
	GET_LIKED_BOARD,
	GET_ERRORS,
	GET_COMPLETE_BOARD,
	BOARD_CREATED,
	COMPLETE_BOARD_LOADING,
	CANCEL_BOARD_CREATED
} from './types';

export const createBoard = (boardTitle) => (dispatch) => {
	axios
		.post('board/create', boardTitle)
		.then((res) => {
			dispatch({
				type: BOARD_CREATED,
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

export const getUserBoard = () => (dispatch) => {
	dispatch(setBoardLoading());
	axios
		.get('board/all')
		.then((res) => {
			dispatch({
				type: GET_BOARD,
				payload: res.data
			});
		})
		.catch(() => {
			dispatch({
				type: GET_BOARD,
				payload: {}
			});
		});
};

export const getCompleteBoard = (boardID) => (dispatch) => {
	dispatch(setCompleteBoardLoading());
	axios
		.get(`board/complete/${boardID}`)
		.then((res) => {
			dispatch({
				type: GET_COMPLETE_BOARD,
				payload: res.data
			});
		})
		.catch(() => {
			dispatch({
				type: GET_COMPLETE_BOARD,
				payload: {}
			});
		});
};

export const setCompleteBoardLoading = () => {
	return {
		type: COMPLETE_BOARD_LOADING
	};
};

export const getUserLikedBoards = () => (dispatch) => {
	dispatch(setUserLikedBoardLoading());
	axios
		.get('board/liked')
		.then((res) => {
			dispatch({
				type: GET_LIKED_BOARD,
				payload: res.data
			});
		})
		.catch(() => {
			dispatch({
				type: GET_LIKED_BOARD,
				payload: {}
			});
		});
};

export const setUserLikedBoardLoading = () => {
	return {
		type: USER_LIKED_BOARD_LOADING
	};
};

export const cancelBoardCreated = () => (dispatch) => {
	dispatch({
		type: CANCEL_BOARD_CREATED
	});
};

export const cancelTitle = () => (dispatch) => {
	dispatch({
		type: GET_ERRORS,
		payload: { title: '' }
	});
};

export const setBoardLoading = () => {
	return {
		type: BOARD_LOADING
	};
};
