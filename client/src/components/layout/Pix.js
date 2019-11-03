import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Pix extends Component {
	constructor() {
		super();
		this.onMouserOverHandler = this.onMouserOverHandler.bind(this);
		this.onMouserOutHandler = this.onMouserOutHandler.bind(this);
		this.goBack = this.goBack.bind(this);
	}
	onMouserOverHandler(event) {
		window.$(event.target).removeClass('far');
		window.$(event.target).addClass('fas');
	}
	onMouserOutHandler(event) {
		if (window.$(event.target).hasClass('fas')) window.$(event.target).removeClass('fas');
		window.$(event.target).addClass('far');
	}
	componentDidMount() {
		window.colorize();
		window.scrollTo(0, 0);
		if (this.props.externalPix.externalPix) {
			localStorage.setItem(
				'pixURL',
				this.props.externalPix.externalPix.slice(0, this.props.externalPix.externalPix.length - 5) + '.gif'
			);
		}
	}
	goBack() {
		const route = localStorage.getItem('backTo');
		this.props.history.push(route);
	}
	render() {
		let imgSrc;
		if (this.props.externalPix.externalPix) {
			imgSrc =
				this.props.externalPix.externalPix.slice(0, this.props.externalPix.externalPix.length - 5) + '.gif';
		} else {
			imgSrc = localStorage.getItem('pixURL');
		}
		return (
			// For anonymous pix
			// Create a new backend function to add anonymous pix to a pixboard by an admin user's account
			// If a pix is anonymous, i.e, it's not in pix collection and it is being liked/commented/added
			// to a board by any user call this function before the like/comment/add action call.
			// Save url with b character at the end, the single frame of the gif url
			// Return a promise
			// Then just add like, add to board and comment feature below
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
							<i className="fas fa-paperclip" data-toggle="modal" data-target="#addToBoardModal" />
						</span>
						<i
							className="far fa-heart ml-5"
							onMouseOver={this.onMouserOverHandler}
							onMouseOut={this.onMouserOutHandler}
							data-toggle="tooltip"
							data-placement="bottom"
							title="Like"
						/>
					</div>
				</div>
				<div className="row justify-content-center align-items-center mt-5">
					<div className="col-lg-1 col-2">
						<img
							className="rounded-circle img-fluid"
							src="https://avatarfiles.alphacoders.com/715/71560.jpg"
							alt="profile"
						/>
					</div>
					<div className="col-lg-7 col-6">
						<div className="input-group">
							<textarea className="form-control" id="comment" rows="3" placeholder="Add a comment" />
						</div>
					</div>
				</div>
				<div className="row justify-content-center align-items-center mt-5">
					<div className="col-8">
						<button className="btn btn-outline-primary">Comment</button>
					</div>
				</div>
				<div className="row justify-content-center align-items-center mt-5">
					<div className="col-8">
						<h3>Comments</h3>
						<hr />
					</div>
				</div>
				<div className="row justify-content-center align-items-center">
					<div className="col-lg-1 col-2">
						<Link to="/Profile">
							<img
								className="rounded-circle img-fluid"
								src="https://i.imgur.com/cXz9gpv.jpg"
								alt="profile"
							/>
						</Link>
					</div>
					<div className="col-lg-7 col-6 mt-5">
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam est expedita id ullam
							saepe, maxime labore. Adipisci corrupti sit fuga aliquid numquam, commodi sint repellendus,
							excepturi quo tempora mollitia assumenda?
						</p>
						<hr />
					</div>
				</div>
				<div className="row justify-content-center align-items-center">
					<div className="col-lg-1 col-2">
						<Link to="/Profile">
							<img
								className="rounded-circle img-fluid"
								src="https://pbs.twimg.com/profile_images/951947966989791232/0stSRmcg_400x400.jpg"
								alt="profile"
							/>
						</Link>
					</div>
					<div className="col-lg-7 col-6 mt-5">
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
						<hr />
					</div>
				</div>
				<div className="row justify-content-center align-items-center">
					<div className="col-lg-1 col-2">
						<img
							className="rounded-circle img-fluid"
							src="https://avatarfiles.alphacoders.com/715/71560.jpg"
							alt="profile"
						/>
					</div>
					<div className="col-lg-7 col-6 mt-5">
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam est expedita id ullam
							saepe, maxime labore. Adipisci corrupti sit fuga aliquid numquam, commodi sint repellendus,
							excepturi quo tempora mollitia assumenda?
						</p>
						<div className="row justify-content-around">
							<button
								className="btn btn-outline-success"
								data-toggle="tooltip"
								data-placement="bottom"
								title="Edit Comment"
							>
								<i className="fas fa-edit" />
							</button>
							<br />
							<button
								className="btn btn-outline-danger"
								data-toggle="tooltip"
								data-placement="bottom"
								title="Delete Comment"
							>
								<i className="fas fa-times" />
							</button>
							<br />
						</div>
						<hr />
					</div>
				</div>
			</div>
		);
	}
}

Pix.propTypes = {
	externalPix: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	externalPix: state.externalPix
});

export default connect(mapStateToProps)(withRouter(Pix));
