import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUserProfile, follow } from '../../actions/profileAction';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import NoResult from '../layout/NoResult';
import { setExternalPix } from '../../actions/externalPixAction';
import PropTypes from 'prop-types';
import ModalsAndSiderbars from '../layout/ModalsAndSiderbars';

class Dashboard extends Component {
	constructor() {
		super();
		this.clickHandler = this.clickHandler.bind(this);
		this.follow = this.follow.bind(this);
	}
	clickHandler(event) {
		event.preventDefault();
		this.props.setExternalPix(event.target.src);
		localStorage.setItem(
			'backTo',
			window.location.href.slice(window.location.href.lastIndexOf('/'), window.location.href.length)
		);
		this.props.history.push('/Pix');
	}
	follow(id, event) {
		this.props.follow(id);
		if (window.$(event.target).hasClass('btn-outline-light')) {
			window.$(event.target).removeClass('btn-outline-light');
			window.$(event.target).addClass('btn-outline-danger');
			window.$(event.target).html('<i class="fas fa-check-circle" /> Following');
			let followers = parseInt(window.$(event.target.parentElement.previousSibling).html());
			window.$(event.target.parentElement.previousSibling).html(`${followers + 1} Followers`);
		} else {
			window.$(event.target).removeClass('btn-outline-danger');
			window.$(event.target).addClass('btn-outline-light');
			window.$(event.target).html('Follow');
			let followers = parseInt(window.$(event.target.parentElement.previousSibling).html());
			window.$(event.target.parentElement.previousSibling).html(`${followers - 1} Followers`);
		}
	}
	componentDidMount() {
		this.props.getCurrentUserProfile();
	}
	componentDidUpdate() {
		window.colorize();
	}
	render() {
		const { searchResult, loading } = this.props.search;
		let renderComponent,
			renderComponentProfiles,
			profileRows = [],
			imgLinks = [ [], [], [], [] ];
		if (loading) {
			renderComponent = (
				<div className="row">
					<Spinner />
				</div>
			);
		} else {
			if (searchResult) {
				if (searchResult.users && searchResult.users.length > 0) {
					let k;
					for (k = 0; k < searchResult.users.length - 1; k += 2) {
						let isFollowing = [ [], [] ];
						for (let i = 0; i < 2; i++) {
							if (this.props.profile.profile._id === searchResult.users[k + i]._id) {
								isFollowing[i] = 'self';
							} else {
								if (
									searchResult.users[k + 1].followers.filter(
										(userID) => userID.follower === this.props.profile.profile._id
									).length > 0
								) {
									isFollowing[i] = true;
								} else {
									isFollowing[i] = false;
								}
							}
						}
						profileRows.push(
							<div className="row justify-content-around py-5 text-light" key={k}>
								<div
									className="col-lg-3 col-md-3 col-9 mt-5 bg-dark py-3"
									style={{ borderRadius: '1rem' }}
								>
									<div className="row justify-content-center">
										<div className="col-lg-6 col-md-5 col-9">
											<Link to="">
												<img
													className="rounded-circle img-fluid"
													src={searchResult.users[k].profilePicture}
													alt="profilePicture"
												/>
											</Link>
										</div>
									</div>
									<div className="row justify-content-center py-3">
										<Link to="" style={{ color: '#e0115f', textDecoration: 'none' }}>
											{searchResult.users[k].username}
										</Link>
									</div>
									<div className="row justify-content-center py-3">
										{searchResult.users[k].boards.length} boards
									</div>
									<div className="row justify-content-center py-3">
										{searchResult.users[k].followers.length} Followers
									</div>
									{isFollowing[0] === 'self' ? null : isFollowing[0] ? (
										<div className="row justify-content-center py-3">
											<button
												className="btn btn-outline-danger"
												onClick={this.follow.bind(this, searchResult.users[k]._id)}
											>
												<i className="fas fa-check-circle" /> Following
											</button>
										</div>
									) : (
										<div
											className="row justify-content-center py-2"
											onClick={this.follow.bind(this, searchResult.users[k]._id)}
										>
											<button className="btn btn-outline-light">Follow</button>
										</div>
									)}
								</div>
								<div
									className="col-lg-3 col-md-3 col-9 mt-5 bg-dark py-3"
									style={{ borderRadius: '1rem' }}
								>
									<div className="row justify-content-center">
										<div className="col-lg-6 col-md-5 col-9">
											<Link to="">
												<img
													className="rounded-circle img-fluid"
													src={searchResult.users[k + 1].profilePicture}
													alt="profilePicture"
												/>
											</Link>
										</div>
									</div>
									<div className="row justify-content-center py-3">
										<Link to="" style={{ color: '#e0115f', textDecoration: 'none' }}>
											{searchResult.users[k + 1].username}
										</Link>
									</div>
									<div className="row justify-content-center py-3">
										{searchResult.users[k + 1].boards.length} boards
									</div>
									<div className="row justify-content-center py-3">
										{searchResult.users[k + 1].followers.length} Followers
									</div>
									{isFollowing[1] === 'self' ? null : isFollowing[1] ? (
										<div className="row justify-content-center py-3">
											<button
												className="btn btn-outline-danger"
												onClick={this.follow.bind(this, searchResult.users[k + 1]._id)}
											>
												<i className="fas fa-check-circle" /> Following
											</button>
										</div>
									) : (
										<div
											className="row justify-content-center py-2"
											onClick={this.follow.bind(this, searchResult.users[k + 1]._id)}
										>
											<button className="btn btn-outline-light">Follow</button>
										</div>
									)}
								</div>
							</div>
						);
					}
					while (k < searchResult.users.length) {
						let isFollowing;
						if (this.props.profile.profile._id === searchResult.users[k]._id) {
							isFollowing = 'self';
						} else {
							if (
								searchResult.users[k].followers.filter(
									(userID) => userID.follower === this.props.profile.profile._id
								).length > 0
							) {
								isFollowing = true;
							} else {
								isFollowing = false;
							}
						}
						profileRows.push(
							<div className="row justify-content-around py-5 text-light" key={k}>
								<div
									className="col-lg-3 col-md-3 col-9 mt-5 bg-dark py-3"
									style={{ borderRadius: '1rem' }}
								>
									<div className="row justify-content-center">
										<div className="col-lg-6 col-md-5 col-9">
											<Link to="">
												<img
													className="rounded-circle img-fluid"
													src={searchResult.users[k].profilePicture}
													alt="profilePicture"
												/>
											</Link>
										</div>
									</div>
									<div className="row justify-content-center py-3">
										<Link to="" style={{ color: '#e0115f', textDecoration: 'none' }}>
											{searchResult.users[k].username}
										</Link>
									</div>
									<div className="row justify-content-center py-3">
										{searchResult.users[k].boards.length} boards
									</div>
									<div className="row justify-content-center py-3">
										{searchResult.users[k].followers.length} Followers
									</div>
									{isFollowing === 'self' ? null : isFollowing ? (
										<div className="row justify-content-center py-3">
											<button
												className="btn btn-outline-danger"
												onClick={this.follow.bind(this, searchResult.users[k]._id)}
											>
												<i className="fas fa-check-circle" /> Following
											</button>
										</div>
									) : (
										<div className="row justify-content-center py-3">
											<button
												className="btn btn-outline-light"
												onClick={this.follow.bind(this, searchResult.users[k]._id)}
											>
												Follow
											</button>
										</div>
									)}
								</div>
							</div>
						);
						k++;
					}
					if (profileRows.length > 0) {
						renderComponentProfiles = (
							<div className="container-fluid bg-light py-5 my-5">{profileRows}</div>
						);
					}
				}
				if (searchResult.data) {
					for (let i = 0; i < searchResult.data.length - 2; i += 4) {
						imgLinks[0].push(
							<a href={searchResult.data[i]} key={i} onClick={this.clickHandler}>
								<img src={searchResult.data[i]} className="img-fluid mb-4 img-container" alt="pix" />
							</a>
						);
						imgLinks[1].push(
							<a href={searchResult.data[i + 1]} key={i + 1} onClick={this.clickHandler}>
								<img
									src={searchResult.data[i + 1]}
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</a>
						);
						imgLinks[2].push(
							<a href={searchResult.data[i + 2]} key={i + 2} onClick={this.clickHandler}>
								<img
									src={searchResult.data[i + 2]}
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</a>
						);
						imgLinks[3].push(
							<a href={searchResult.data[i + 3]} key={i + 3} onClick={this.clickHandler}>
								<img
									src={searchResult.data[i + 3]}
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</a>
						);
					}
					renderComponent = (
						<div className="row">
							<div className="col-lg-3 col-md-6">{imgLinks[0]}</div>
							<div className="col-lg-3 col-md-6">{imgLinks[1]}</div>
							<div className="col-lg-3 col-md-6">{imgLinks[2]}</div>
							<div className="col-lg-3 col-md-6">{imgLinks[3]}</div>
						</div>
					);
				}
				if (!renderComponent && !renderComponentProfiles) {
					renderComponent = (
						<div>
							<NoResult />;
						</div>
					);
				}
			}
		}
		return (
			<div>
				{renderComponentProfiles}
				<div className="container-fluid my-4">
					{renderComponent}
					<ModalsAndSiderbars />
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	getCurrentUserProfile: PropTypes.func.isRequired,
	search: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	search: state.search,
	profile: state.profile
});

export default connect(mapStateToProps, { setExternalPix, follow, getCurrentUserProfile })(withRouter(Dashboard));
