import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authAction';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/layout/PrivateRoute';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import SignUp from './components/auth/Signup';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/Login';
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
						{/* <Switch>
							<PrivateRoute exact path="/create-profile" component={CreateProfile} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/edit-profile" component={EditProfile} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/posts" component={Posts} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/post/:id" component={Post} />
						</Switch> */}
					</div>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
