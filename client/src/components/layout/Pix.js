import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ModlasAndSidebars from './ModalsAndSiderbars';
import Spinner from '../layout/Spinner';
import { loadAnonymousPix, likePix, commentPix, deleteComment, setPixUrlAsImageUrl } from '../../actions/pixAction';
import { getCurrentUserProfile } from '../../actions/profileAction';

class Pix extends Component {
	constructor() {
		super();
		this.onMouserOverHandler = this.onMouserOverHandler.bind(this);
		this.onMouserOutHandler = this.onMouserOutHandler.bind(this);
		this.goBack = this.goBack.bind(this);
		this.onChange = this.onChange.bind(this);
		this.comment = this.comment.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
		this.state = {
			comment: ''
		};
	}
	onMouserOverHandler(event) {
		window.$(event.target).removeClass('far');
		window.$(event.target).addClass('fas');
	}
	onMouserOutHandler(event) {
		if (window.$(event.target).hasClass('fas')) window.$(event.target).removeClass('fas');
		if (!window.$(event.target).hasClass('liked')) {
			window.$(event.target).addClass('far');
		} else {
			window.$(event.target).addClass('fas');
		}
	}
	deleteComment(id) {
		this.props.deleteComment(id).then(() => {
			this.props.loadAnonymousPix(localStorage.getItem('pixURL'));
		});
	}
	componentDidMount() {
		window.colorize();
		window.scrollTo(0, 0);
		if (this.props.externalPix.externalPix) {
			localStorage.setItem('pixURL', this.props.externalPix.externalPix);
		}
		if (this.props.location.state) {
			this.props.history.replace({ state: this.props.location.state });
		}
		this.props.getCurrentUserProfile();
		this.props.loadAnonymousPix(localStorage.getItem('pixURL'));
	}
	goBack() {
		const route = localStorage.getItem('backTo');
		const objectID = this.props.location.state.boardID;
		this.props.history.push(route);
		if (objectID) {
			this.props.history.location.state = { boardID: objectID };
		}
	}
	like(id, event) {
		event.preventDefault();
		if (window.$(event.target).hasClass('liked')) {
			window.$(event.target).removeClass('liked');
			window.$(event.target).removeClass('fas');
			window.$(event.target).addClass('far');
			window.$(event.target).on('mouseover', this.onMouserOverHandler);
			window.$(event.target).on('mouseout', this.onMouserOutHandler);
		} else {
			window.$(event.target).removeClass('far');
			window.$(event.target).addClass('fas');
			window.$(event.target).addClass('liked');
			window.$(event.target).off('mouseover', this.onMouserOverHandler);
			window.$(event.target).off('mouseout', this.onMouserOutHandler);
		}
		this.props.likePix(id, localStorage.getItem('pixURL'));
	}
	comment(id, event) {
		event.preventDefault();
		this.props
			.commentPix(this.state.comment, id, localStorage.getItem('pixURL'))
			.then(() => {
				this.props.loadAnonymousPix(localStorage.getItem('pixURL'));
			})
			.catch(() => {});
	}
	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	render() {
		const { anonymousPixLoading, anonymousPix } = this.props.pix;
		const errors = this.props.errors;
		const auth = this.props.auth;
		const { profile, profileLoading } = this.props.profile;
		let imgSrc;
		if (this.props.externalPix.externalPix) {
			imgSrc = this.props.externalPix.externalPix;
		} else {
			imgSrc = localStorage.getItem('pixURL');
		}
		let renderContent,
			comments = [],
			commentSection;
		if (profileLoading || !profile) {
			renderContent = <Spinner />;
		} else {
			if (anonymousPixLoading) {
				renderContent = <Spinner />;
			} else {
				if (anonymousPix) {
					for (let i = 0; i < anonymousPix.comments.length; i++) {
						anonymousPix.comments[i].user === auth.user.id
							? comments.push(
									<div className="row justify-content-center align-items-center" key={i}>
										<div className="col-lg-1 col-2">
											<img
												className="rounded-circle img-fluid"
												src={anonymousPix.comments[i].profilePicture}
												alt="profile"
											/>
										</div>
										<div className="col-lg-7 col-6 mt-5">
											<p>{anonymousPix.comments[i].comment}</p>
											<div className="row justify-content-end">
												<button
													className="btn btn-outline-danger"
													data-toggle="tooltip"
													data-placement="bottom"
													onClick={this.deleteComment.bind(this, anonymousPix.comments[i]._id)}
													title="Delete Comment"
												>
													<i className="fas fa-times" />
												</button>
												<br />
											</div>
											<hr />
										</div>
									</div>
								)
							: comments.push(
									<div className="row justify-content-center align-items-center" key={i}>
										<div className="col-lg-1 col-2">
											<Link to="/Profile">
												<img
													className="rounded-circle img-fluid"
													src={anonymousPix.comments[i].profilePicture}
													alt="profile"
												/>
											</Link>
										</div>
										<div className="col-lg-7 col-6 mt-5">
											<p>{anonymousPix.comments[i].comment}</p>
											<hr />
										</div>
									</div>
								);
					}
					if (anonymousPix.comments.length > 0) {
						commentSection = (
							<div className="row justify-content-center align-items-center mt-5">
								<div className="col-8">
									<h3>Comments</h3>
									<hr />
								</div>
							</div>
						);
					}
					renderContent = (
						<div className="container my-5 py-5 bg-light" style={{ borderRadius: '1rem' }}>
							<div className="row justify-content-center">
								<div className="col-12">
									<button className="btn btn-outline-dark" onClick={this.goBack}>
										<i className="fas fa-arrow-left" />
									</button>
								</div>
							</div>
							{anonymousPix.username && anonymousPix.profilePicture ? (
								<div className="row justify-content-center">
									<div className="col-1">
										<Link to="">
											<img
												src={anonymousPix.profilePicture}
												className="img-fluid rounded-circle"
												alt="profilePicture"
											/>
										</Link>
									</div>
									<div className="col-7">
										<h4>Posted by: </h4>
										<p>@{anonymousPix.username}</p>
									</div>
								</div>
							) : null}
							<div className="row justify-content-center">
								<div className="col-8">
									<img src={imgSrc} className="img-fluid mb-4 img-container" alt="pix" />
								</div>
							</div>
							<div className="row justify-content-center align-items-center mt-3">
								<div className="col-8">
									<span data-toggle="tooltip" data-placement="bottom" title="Add to board">
										<i
											className="fas fa-paperclip"
											data-toggle="modal"
											data-target="#createPixModal"
											onClick={() => {
												this.props.setPixUrlAsImageUrl();
											}}
										/>
									</span>
									<a
										href="none"
										onClick={this.like.bind(this, anonymousPix._id)}
										style={{ color: 'black' }}
									>
										{anonymousPix.hearts.filter((userID) => userID === profile._id).length > 0 ? (
											<i
												className="fas fa-heart ml-5 liked"
												data-toggle="tooltip"
												data-placement="bottom"
												title="Like"
											/>
										) : (
											<i
												className="far fa-heart ml-5"
												onMouseOver={this.onMouserOverHandler}
												onMouseOut={this.onMouserOutHandler}
												data-toggle="tooltip"
												data-placement="bottom"
												title="Like"
											/>
										)}
									</a>
								</div>
							</div>
							<div className="row justify-content-center align-items-center mt-5">
								<div className="col-lg-1 col-2">
									<img
										className="rounded-circle img-fluid"
										src={profile.profilePicture}
										alt="profile"
									/>
								</div>
								<div className="col-lg-7 col-6">
									<div className="input-group">
										<textarea
											className={classnames('form-control', {
												'is-invalid': errors.comment
											})}
											name="comment"
											rows="3"
											value={this.state.comment}
											onChange={this.onChange}
											placeholder="Add a comment"
										/>
										{errors.comment && <div className="invalid-feedback">{errors.comment}</div>}
									</div>
								</div>
							</div>
							<div className="row justify-content-center align-items-center mt-5">
								<div className="col-8">
									<button
										className="btn btn-outline-primary"
										onClick={this.comment.bind(this, anonymousPix._id)}
									>
										Comment
									</button>
								</div>
							</div>
							{commentSection}
							{comments}
						</div>
					);
				} else {
					renderContent = (
						<div className="container my-5 py-5 bg-light" style={{ borderRadius: '1rem' }}>
							<div className="row justify-content-center">
								<div className="col-12">
									<button className="btn btn-outline-dark" onClick={this.goBack}>
										<i className="fas fa-arrow-left" />
									</button>
								</div>
							</div>
							<div className="row justify-content-center">
								<div className="col-8">
									<img src={imgSrc} className="img-fluid mb-4 img-container" alt="pix" />
								</div>
							</div>
							<div className="row justify-content-center align-items-center mt-3">
								<div className="col-8">
									<span data-toggle="tooltip" data-placement="bottom" title="Add to board">
										<i
											className="fas fa-paperclip"
											data-toggle="modal"
											data-target="#createPixModal"
											onClick={() => {
												this.props.setPixUrlAsImageUrl();
											}}
										/>
									</span>
									<a href="none" onClick={this.like.bind(this, 'none')} style={{ color: 'black' }}>
										<i
											className="far fa-heart ml-5"
											onMouseOver={this.onMouserOverHandler}
											onMouseOut={this.onMouserOutHandler}
											data-toggle="tooltip"
											data-placement="bottom"
											title="Like"
										/>
									</a>
								</div>
							</div>
							<div className="row justify-content-center align-items-center mt-5">
								<div className="col-lg-1 col-2">
									<img
										className="rounded-circle img-fluid"
										src={profile.profilePicture}
										alt="profile"
									/>
								</div>
								<div className="col-lg-7 col-6">
									<div className="input-group">
										<textarea
											className={classnames('form-control', {
												'is-invalid': errors.comment
											})}
											name="comment"
											rows="3"
											value={this.state.comment}
											onChange={this.onChange}
											placeholder="Add a comment"
										/>
										{errors.comment && <div className="invalid-feedback">{errors.comment}</div>}
									</div>
								</div>
							</div>
							<div className="row justify-content-center align-items-center mt-5">
								<div className="col-8">
									<button
										onClick={this.comment.bind(this, 'none')}
										className="btn btn-outline-primary"
									>
										Comment
									</button>
								</div>
							</div>
						</div>
					);
				}
			}
		}
		return (
			<div>
				{renderContent}
				<ModlasAndSidebars />
			</div>
		);
	}
}

Pix.propTypes = {
	getCurrentUserProfile: PropTypes.func.isRequired,
	externalPix: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	pix: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	externalPix: state.externalPix,
	auth: state.auth,
	pix: state.pix,
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, {
	loadAnonymousPix,
	likePix,
	getCurrentUserProfile,
	commentPix,
	deleteComment,
	setPixUrlAsImageUrl
})(withRouter(Pix));
