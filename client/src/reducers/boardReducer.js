import { GET_BOARD, BOARD_LOADING, GET_LIKED_BOARD, USER_LIKED_BOARD_LOADING } from '../actions/types';

const intialState = {
	likedBoard: null,
	board: null,
	boardLoading: false,
	likedBoardLoading: false
};

export default function(state = intialState, action) {
	switch (action.type) {
		case BOARD_LOADING:
			return {
				...state,
				boardLoading: true
			};
		case USER_LIKED_BOARD_LOADING:
			return {
				...state,
				likedBoardLoading: true
			};
		case GET_BOARD:
			return {
				...state,
				board: action.payload,
				boardLoading: false
			};
		case GET_LIKED_BOARD:
			return {
				...state,
				likedBoard: action.payload,
				likedBoardLoading: false
			};
		default:
			return state;
	}
}
