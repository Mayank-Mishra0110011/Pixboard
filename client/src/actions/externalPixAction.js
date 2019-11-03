import { SET_EXTERNAL_PIX } from './types';

export const setExternalPix = (URL) => (dispatch) => {
	dispatch({
		type: SET_EXTERNAL_PIX,
		payload: URL
	});
};
