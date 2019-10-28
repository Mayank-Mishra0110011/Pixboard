import { GET_SEARCH_RESULTS, SEARCH_RESULTS_LOADING } from '../actions/types';

const intialState = {
	searchResult: null,
	loading: false
};

export default function(state = intialState, action) {
	switch (action.type) {
		case SEARCH_RESULTS_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_SEARCH_RESULTS:
			return {
				...state,
				searchResult: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
