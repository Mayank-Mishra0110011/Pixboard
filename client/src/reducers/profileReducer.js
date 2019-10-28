import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from '../actions/types';

const intialState = {
	profile: null,
	profiles: null,
	profileLoading: false
};

export default function(state = intialState, action) {
	switch (action.type) {
		case PROFILE_LOADING:
			return {
				...state,
				profileLoading: true
			};
		case GET_PROFILE:
			return {
				...state,
				profile: action.payload,
				profileLoading: false
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profileLoading: null
			};
		default:
			return state;
	}
}
