import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/Dashboard');
		}
	}
	onSubmit(event) {
		event.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(userData);
	}
	static getDerivedStateFromProps(nextProps, previousState) {
		if (nextProps.auth.isAuthenticated) {
			nextProps.history.push('/Dashboard');
		}
		if (nextProps.errors !== previousState.errors) {
			return { errors: nextProps.errors };
		}
		return null;
	}
	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	render() {
		const { errors } = this.state;
		return (
			<div className="container my-5 py-5">
				<div className="container my-5 py-5">
					<form onSubmit={this.onSubmit} noValidate>
						<div className="form-row" style={{ justifyContent: 'center' }}>
							<div className="col-md-6 mb-3">
								<label htmlFor="emailorusername">Email</label>
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text" id="tooltipEmailOrUsernamePrepend">
											<i className="fas fa-at" />
										</span>
									</div>
									<input
										type="text"
										className={classnames('form-control', {
											'is-invalid': errors.email
										})}
										id="emailorusername"
										name="email"
										placeholder="Email"
										aria-describedby="tooltipEmailOrUsernamePrepend"
										value={this.state.email}
										onChange={this.onChange}
									/>
									{errors.email && <div className="invalid-feedback">{errors.email}</div>}
								</div>
							</div>
						</div>
						<div className="form-row" style={{ justifyContent: 'center' }}>
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
						</div>
						<div
							className="form-row"
							style={{
								justifyContent: 'center'
							}}
						>
							<button className="btn btn-outline-primary" type="submit">
								Log in
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
