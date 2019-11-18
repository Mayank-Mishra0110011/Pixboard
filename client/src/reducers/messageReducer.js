import { SEND_MESSAGE, GET_MESSAGE, MESSAGE_SENT } from '../actions/types';

const initialState = {
	messageSent: false,
	messages: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SEND_MESSAGE:
			return {
				...state,
				messageSent: true
			};
		case MESSAGE_SENT:
			return {
				...state,
				messageSent: false
			};
		case GET_MESSAGE:
			return {
				...state,
				messages: action.payload
			};
		default:
			return state;
	}
}
