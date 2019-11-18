import {
	GET_PIX,
	CANCEL_PIX_UPLOAD,
	PIX_LOADING,
	GET_LIKED_PIX,
	USER_LIKED_PIX_LOADING,
	ANONYMOUS_PIX_LOADING,
	ANONYMOUS_PIX_LOADED,
	PIX_UPLOADED,
	SET_PIX_URL_AS_IMAGE_URL,
	UNSET_PIX_URL_AS_IMAGE_URL
} from '../actions/types';

const intialState = {
	pix: null,
	likedPix: null,
	likedPixLoading: false,
	pixLoading: false,
	pixUploaded: false,
	anonymousPix: null,
	anonymousPixLoading: false,
	pixUrlAsImageUrl: false
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
		case UNSET_PIX_URL_AS_IMAGE_URL:
			return {
				...state,
				pixUrlAsImageUrl: false
			};
		case SET_PIX_URL_AS_IMAGE_URL:
			return {
				...state,
				pixUrlAsImageUrl: true
			};
		case PIX_UPLOADED:
			return {
				...state,
				pixUploaded: true
			};
		case ANONYMOUS_PIX_LOADING:
			return {
				...state,
				anonymousPixLoading: true
			};
		case ANONYMOUS_PIX_LOADED:
			return {
				...state,
				anonymousPix: action.payload,
				anonymousPixLoading: false
			};
		case CANCEL_PIX_UPLOAD:
			return {
				...state,
				pixUploaded: false
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
