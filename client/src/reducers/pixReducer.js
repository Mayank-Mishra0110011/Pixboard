import { GET_PIX, PIX_LOADING, GET_LIKED_PIX, USER_LIKED_PIX_LOADING } from '../actions/types';

const intialState = {
	pix: null,
	likedPix: null,
	likedPixLoading: false,
	pixLoading: false
};

export default function(state = intialState, action) {
	switch (action.type) {
		case PIX_LOADING:
			return {
				...state,
				pixLoading: true
			};
		case USER_LIKED_PIX_LOADING:
			return {
				...state,
				likedPixLoading: true
			};
		case GET_PIX:
			return {
				...state,
				pix: action.payload,
				pixLoading: false
			};
		case GET_LIKED_PIX:
			return {
				...state,
				likedPix: action.payload,
				likedPixLoading: false
			};
		default:
			return state;
	}
}
