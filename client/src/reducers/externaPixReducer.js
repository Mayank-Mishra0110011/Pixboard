import { SET_EXTERNAL_PIX } from '../actions/types';

const intialState = {
	externalPix: null
};

export default function(state = intialState, action) {
	switch (action.type) {
		case SET_EXTERNAL_PIX:
			return {
				...state,
				externalPix: action.payload
			};
		default:
			return state;
	}
}
