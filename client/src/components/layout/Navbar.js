import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../img/Untitled.png';
import { getSearchResults, getDashboardSearchResults } from '../../actions/searchAction';

class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			searchQuery: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.backToDashboard = this.backToDashboard.bind(this);
	}
	handleFocus() {
		document.getElementById('basic-addon1').style.color = '#e0115f';
	}
	handleBlur() {
		document.getElementById('basic-addon1').style.color = '#495057';
	}
	expandMessagesSidebar() {
		window.expandMessagesSidebar();
	}
	expandSettingsSidebar() {
		window.expandSettingsSidebar();
	}
	hideSidebar() {
		window.hideSidebar();
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	handleSearch(event) {
		event.preventDefault();
		if (this.state.searchQuery.trim() !== '') {
			this.props.history.push(`/Dashboard?q=${this.state.searchQuery}`);
			this.props.getSearchResults(0, this.state.searchQuery);
		}
	}
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			if (window.location.href.includes('?q=')) {
				this.props.getSearchResults(0, window.location.href.split('?q=')[1]);
			} else if (localStorage.getItem('backTo') && localStorage.getItem('backTo').includes('?q')) {
				this.props.getSearchResults(0, localStorage.getItem('backTo').split('?q=')[1]);
			} else {
				this.backToDashboard();
			}
		}
	}
	backToDashboard() {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		const date = new Date();
		this.props.getDashboardSearchResults(0, months[date.getMonth()]);
	}
	render() {
		const { isAuthenticated, user } = this.props.auth;
		const authLinks = (
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<form className="form-inline my-2 my-lg-0 mr-auto" onSubmit={this.handleSearch}>
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								<i className="fas fa-search" />
							</span>
						</div>
						<input
							className="form-control form-control-lg"
							type="search"
							name="searchQuery"
							placeholder="Search"
							aria-label="Search"
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
							onChange={this.handleChange}
						/>
					</div>
				</form>
				<Link
					className="btn btn-light text-dark my-2 my-sm-0 mr-2 links btn-normal"
					to="/Dashboard"
					onClick={this.backToDashboard}
				>
					Home
				</Link>
				<Link className="btn btn-light text-dark my-2 my-sm-0 mr-2 links btn-normal" to="/Profile">
					{user.username}
				</Link>
				<button
					className="btn btn-light text-dark my-2 my-sm-0 mr-2 btn-icons"
					onClick={this.expandMessagesSidebar}
				>
					<i className="fas fa-envelope" />
				</button>
				<button className="btn btn-light text-dark my-2 my-sm-0 btn-icons" onClick={this.expandSettingsSidebar}>
					<i className="fas fa-cog" />
				</button>
			</div>
		);
		const guestLinks = (
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<Link className="btn btn-light text-dark my-2 my-sm-0 mr-2 links btn-normal ml-auto" to="/SignUp">
					Sign Up
				</Link>
				<Link className="btn btn-light text-dark my-2 my-sm-0 mr-2 links btn-normal" to="/Login">
					Log In
				</Link>
			</div>
		);
		let logoLink = isAuthenticated ? (
			<Link className="navbar-brand pr-5" to="/" onClick={this.backToDashboard}>
				<img src={logo} className="logo" alt="logo" />
			</Link>
		) : (
			<Link className="navbar-brand pr-5" to="/">
				<img src={logo} className="logo" alt="logo" />
			</Link>
		);
		return (
			<nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
				{logoLink}
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
					onClick={this.hideSidebar}
				>
					<span className="navbar-toggler-icon" />
				</button>
				{isAuthenticated ? authLinks : guestLinks}
			</nav>
		);
	}
}

Navbar.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { getSearchResults, getDashboardSearchResults })(withRouter(Navbar));
