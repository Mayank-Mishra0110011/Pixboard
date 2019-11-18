import axios from 'axios';
import { GET_SEARCH_RESULTS, SEARCH_RESULTS_LOADING } from './types';

export const getSearchResults = (page, query) => (dispatch) => {
	dispatch(setSearchResultLoading());
	axios
		.get(`search/${query}`)
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

export const getDashboardSearchResults = (page, query) => (dispatch) => {
	dispatch(setSearchResultLoading());
	axios
		.get(`search/dashboard/${query}`)
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
