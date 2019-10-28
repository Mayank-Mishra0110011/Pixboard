import axios from 'axios';
import { GET_BOARD, BOARD_LOADING, USER_LIKED_BOARD_LOADING, GET_LIKED_BOARD } from './types';

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

export const setBoardLoading = () => {
	return {
		type: BOARD_LOADING
	};
};
