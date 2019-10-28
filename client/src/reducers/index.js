import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import pixReducer from './pixReducer';
import boardReducer from './boardReducer';
import profileReducer from './profileReducer';
import searchReducer from './searchReducer';

export default combineReducers({
	auth: authReducer,
	profile: profileReducer,
	pix: pixReducer,
	board: boardReducer,
	errors: errorReducer,
	search: searchReducer
});
