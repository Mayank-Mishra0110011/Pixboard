import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import messageReducer from './messageReducer';
import pixReducer from './pixReducer';
import boardReducer from './boardReducer';
import profileReducer from './profileReducer';
import searchReducer from './searchReducer';
import externalPixReducer from './externaPixReducer';

export default combineReducers({
	auth: authReducer,
	profile: profileReducer,
	pix: pixReducer,
	board: boardReducer,
	errors: errorReducer,
	search: searchReducer,
	externalPix: externalPixReducer,
	message: messageReducer
});
