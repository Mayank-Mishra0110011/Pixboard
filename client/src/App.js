import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { getCurrentUserProfile } from './actions/profileAction';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/layout/PrivateRoute';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Profile from './components/dashboard/Profile';
import Pix from './components/layout/Pix';
import SignUp from './components/auth/Signup';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));
	getCurrentUserProfile();
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/';
	}
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Navbar />
					<Route exact path="/" component={Landing} />
					<div className="container">
						<Route exact path="/SignUp" component={SignUp} />
						<Route exact path="/Login" component={Login} />
						<Switch>
							<PrivateRoute exact path="/Dashboard" component={Dashboard} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/Profile" component={Profile} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/Pix" component={Pix} />
						</Switch>
					</div>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
