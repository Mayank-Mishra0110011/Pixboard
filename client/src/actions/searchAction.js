import axios from 'axios';
import { GET_SEARCH_RESULTS, SEARCH_RESULTS_LOADING } from './types';

export const getSearchResults = (page, query) => (dispatch) => {
	dispatch(setSearchResultLoading());
	axios
		.get(`search/${page}/${query}`)
		.then((res) => {
			dispatch({
				type: GET_SEARCH_RESULTS,
				payload: res.data
			});
		})
		.catch(() => {
			dispatch({
				type: GET_SEARCH_RESULTS,
				payload: {}
			});
		});
};

export const setSearchResultLoading = () => {
	return {
		type: SEARCH_RESULTS_LOADING
	};
};
