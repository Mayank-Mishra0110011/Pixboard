import React, { Component } from 'react';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			email: '',
			password: '',
			password2: '',
			location: '',
			bio: '',
			profilePicture: '',
			twitter: '',
			facebook: '',
			instagram: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/Dashboard');
		}
		document.getElementById('profilebtn').addEventListener('change', (event) => {
			if (event.target.files && event.target.files[0]) {
				const reader = new FileReader();
				reader.onload = function(e) {
					document.getElementById('profilePicture').src = e.target.result;
				};
				reader.readAsDataURL(event.target.files[0]);
			}
		});
	}
	previewProfile() {
		document.getElementById('profilebtn').click();
	}
	static getDerivedStateFromProps(nextProps, previousState) {
		if (nextProps.errors !== previousState.errors) {
			return { errors: nextProps.errors };
		}
		return null;
	}
	onSubmit(event) {
		event.preventDefault();
		const newUser = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			instagram: this.state.instagram,
			profilePicture: this.state.profilePicture,
			location: this.state.location,
			bio: this.state.bio
		};
		this.props.registerUser(newUser, this.props.history);
	}
	onChange(event) {
		if (event.target.id === 'profilebtn') {
			const reader = new FileReader();
			reader.onload = function(e) {
				this.setState({ profilePicture: e.target.result });
			};
			reader.onload = reader.onload.bind(this);
			reader.readAsDataURL(event.target.files[0]);
		} else {
			this.setState({ [event.target.name]: event.target.value });
		}
	}
	render() {
		const { errors } = this.state;
		return (
			<div className="container my-5 py-4">
				<form onSubmit={this.onSubmit} noValidate>
					<div className="form-row">
						<div className="col-md-4 mb-3">
							<label htmlFor="email">Email</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text" id="tooltipEmailPrepend">
										<i className="fas fa-envelope" />
									</span>
								</div>
								<input
									type="email"
									className={classnames('form-control', {
										'is-invalid': errors.email
									})}
									id="email"
									name="email"
									placeholder="Email"
									aria-describedby="tooltipEmailPrepend"
									value={this.state.email}
									onChange={this.onChange}
								/>
								{errors.email && <div className="invalid-feedback">{errors.email}</div>}
							</div>
						</div>
						<div className="col-md-4 mb-3">
							<label htmlFor="username">Username</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text" id="tooltipUsernamePrepend">
										<i className="fas fa-at" />
									</span>
								</div>
								<input
									type="text"
									className={classnames('form-control', {
										'is-invalid': errors.username
									})}
									id="username"
									name="username"
									placeholder="Username"
									aria-describedby="tooltipUsernamePrepend"
									value={this.state.username}
									onChange={this.onChange}
								/>
								{errors.username && <div className="invalid-feedback">{errors.username}</div>}
							</div>
						</div>
						<div className="col-md-4 mb-3">
							<label htmlFor="location">Location</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text" id="tooltipLocationPrepend">
										<i className="fas fa-map-marker-alt" />
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									id="location"
									name="location"
									placeholder="Location"
									aria-describedby="tooltipLocationPrepend"
									value={this.state.location}
									onChange={this.onChange}
								/>
							</div>
						</div>
					</div>
					<div className="form-row">
						<div className="col-md-6 mb-3">
							<label htmlFor="password">Password</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text" id="tooltipPasswordPrepend">
										<i className="fas fa-lock" />
									</span>
								</div>
								<input
									type="password"
									className={classnames('form-control', {
										'is-invalid': errors.password
									})}
									id="password"
									name="password"
									placeholder="Password"
									aria-describedby="tooltipPasswordPrepend"
									value={this.state.password}
									onChange={this.onChange}
								/>
								{errors.password && <div className="invalid-feedback">{errors.password}</div>}
							</div>
						</div>
						<div className="col-md-6 mb-3">
							<label htmlFor="password2">Confirm Password</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text" id="tooltipPassword2Prepend">
										<i className="fas fa-lock" />
									</span>
								</div>
								<input
									type="password"
									className={classnames('form-control', {
										'is-invalid': errors.password2
									})}
									id="password2"
									name="password2"
									placeholder="Confirm Password"
									aria-describedby="tooltipPassword2Prepend"
									value={this.state.password2}
									onChange={this.onChange}
								/>
								{errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
							</div>
						</div>
					</div>
					<div className="form-row">
						<div className="col-md-6 mb-3">
							<label htmlFor="bio">Your Bio</label>
							<textarea
								className="form-control"
								id="bio"
								rows="3"
								name="bio"
								value={this.state.bio}
								onChange={this.onChange}
							/>
						</div>
						<div className="col-md-6 mb-3">
							<label htmlFor="profile">Profile Picture</label>
							<div className="profile">
								<div className="profile-picture" onClick={this.previewProfile}>
									<img
										src="https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png"
										id="profilePicture"
										alt="profilePicture"
									/>
								</div>
								<div
									className="ml-4"
									style={{
										display: 'flex',
										flexDirection: 'column',
										height: '60%',
										justifyContent: 'center'
									}}
								>
									Click to upload image
								</div>
								<input
									type="file"
									className="form-control-file"
									id="profilebtn"
									name="profilePicture"
									accept="image/*"
									onChange={this.onChange}
								/>
							</div>
						</div>
					</div>
					<div className="form-row">
						<div className="col-md-4 mb-3">
							<label htmlFor="twitter">Twitter</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text" id="tooltipTwitterPrepend">
										<i className="fab fa-twitter-square" />
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									id="twitter"
									name="twitter"
									placeholder="Twitter"
									aria-describedby="tooltipTwitterPrepend"
									value={this.state.twitter}
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div className="col-md-4 mb-3">
							<label htmlFor="facebook">Facebook</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text" id="tooltipFacebookPrepend">
										<i className="fab fa-facebook-square" />
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									id="facebook"
									name="facebook"
									placeholder="Facebook"
									aria-describedby="tooltipFacebookPrepend"
									value={this.state.facebook}
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div className="col-md-4 mb-3">
							<label htmlFor="instagram">Instagram</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text" id="tooltipInstagramPrepend">
										<i className="fab fa-instagram" />
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									id="instagram"
									name="instagram"
									placeholder="Instagram"
									aria-describedby="tooltipInstagramPrepend"
									value={this.state.instagram}
									onChange={this.onChange}
								/>
							</div>
						</div>
					</div>
					<button className="btn btn-outline-primary" type="submit">
						Sign Up
					</button>
				</form>
			</div>
		);
	}
}

Signup.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
