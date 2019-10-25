import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../img/Untitled.png';

class Navbar extends Component {
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
	render() {
		const { isAuthenticated, user } = this.props.auth;
		const authLinks = (
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<form className="form-inline my-2 my-lg-0 mr-auto">
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								<i className="fas fa-search" />
							</span>
						</div>
						<input
							className="form-control form-control-lg"
							type="search"
							placeholder="Search"
							aria-label="Search"
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
						/>
					</div>
				</form>
				<Link className="btn btn-light text-dark my-2 my-sm-0 mr-2 links btn-normal" to="/Dashboard">
					Home
				</Link>
				<Link className="btn btn-light text-dark my-2 my-sm-0 mr-2 links btn-normal" to="">
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
		return (
			<nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
				<Link className="navbar-brand pr-5" to="/">
					<img src={logo} className="logo" alt="logo" />
				</Link>
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

export default connect(mapStateToProps)(Navbar);
