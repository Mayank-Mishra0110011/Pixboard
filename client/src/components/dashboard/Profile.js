import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { getCurrentUserProfile } from '../../actions/profileAction';
import { getUserPix, getUserLikedPix } from '../../actions/pixAction';
import { getUserBoard, getUserLikedBoards } from '../../actions/boardAction';
import ModlasAndSidebars from '../layout/ModalsAndSiderbars';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			selectedBtn: 'boards'
		};
		this.clickHandler = this.clickHandler.bind(this);
	}
	clickHandler(event) {
		window.$(event.target).addClass('active');
		window.$(event.target).siblings().removeClass('active');
		switch (event.target.id) {
			case 'pixBtn':
				this.setState({ selectedBtn: 'pix' });
				break;
			case 'boardsBtn':
				this.setState({ selectedBtn: 'boards' });
				break;
			case 'likedPixBtn':
				this.setState({ selectedBtn: 'likedPix' });
				break;
			case 'likedBoardsBtn':
				this.setState({ selectedBtn: 'likedBoards' });
				break;
			default:
				break;
		}
	}
	componentDidMount() {
		this.props.getUserPix();
		this.props.getUserBoard();
		this.props.getUserLikedBoards();
		this.props.getUserLikedPix();
		this.props.getCurrentUserProfile();
	}
	render() {
		const { user } = this.props.auth;
		const { profile, profileLoading } = this.props.profile;
		const { pix, pixLoading, likedPix, likedPixLoading } = this.props.pix;
		const { board, boardLoading, likedBoard, likedBoardLoading } = this.props.board;
		let socialLinks,
			pixContent,
			pixLinks = [ [], [], [], [] ],
			likedPixContent,
			likedPixLinks = [ [], [], [], [] ],
			likedBoardContent,
			likedBoardRowLinks = [],
			likedBoardColumnLinks = [],
			likedBoardDiv = [],
			boardContent,
			boardRowLinks = [],
			boardColumnLinks = [],
			boardDiv = [],
			empty = (
				<div className="row justify-content-center py-5 mt-5" style={{ width: '100%' }}>
					<h1>
						<i className="fas fa-folder-minus" /> Empty...
					</h1>
				</div>
			),
			selectedContent;
		if (likedPix) {
			if (likedPix.pixData.length === 0) {
				likedPixContent = empty;
			} else {
				let i,
					k = 0;
				for (i = 0; i < likedPix.pixData.length - 4; i += 4) {
					likedPixLinks[0].push(
						<Link to="" key={i}>
							<img src={likedPix.pixData[i].image} className="img-fluid mb-4 img-container" alt="pix" />
						</Link>
					);
					likedPixLinks[1].push(
						<Link to="" key={i + 1}>
							<img
								src={likedPix.pixData[i + 1].image}
								className="img-fluid mb-4 img-container"
								alt="pix"
							/>
						</Link>
					);
					likedPixLinks[2].push(
						<Link to="" key={i + 2}>
							<img
								src={likedPix.pixData[i + 2].image}
								className="img-fluid mb-4 img-container"
								alt="pix"
							/>
						</Link>
					);
					likedPixLinks[3].push(
						<Link to="" key={i + 3}>
							<img
								src={likedPix.pixData[i + 3].image}
								className="img-fluid mb-4 img-container"
								alt="pix"
							/>
						</Link>
					);
				}
				while (i < likedPix.pixData.length) {
					likedPixLinks[k].push(
						<Link to="" key={i}>
							<img src={likedPix.pixData[i].image} className="img-fluid mb-4 img-container" alt="pix" />
						</Link>
					);
					i++;
					k++;
				}
				likedPixContent = (
					<div className="row">
						<div className="col-lg-3 col-md-6">{likedPixLinks[0]}</div>
						<div className="col-lg-3 col-md-6">{likedPixLinks[1]}</div>
						<div className="col-lg-3 col-md-6">{likedPixLinks[2]}</div>
						<div className="col-lg-3 col-md-6">{likedPixLinks[3]}</div>
					</div>
				);
			}
		}
		if (pix) {
			if (pix.pixData.length === 0) {
				pixContent = empty;
			} else {
				let i,
					k = 0;
				for (i = 0; i < pix.pixData.length - 4; i += 4) {
					pixLinks[0].push(
						<Link to="" key={i}>
							<img src={pix.pixData[i].image} className="img-fluid mb-4 img-container" alt="pix" />
						</Link>
					);
					pixLinks[1].push(
						<Link to="" key={i + 1}>
							<img src={pix.pixData[i + 1].image} className="img-fluid mb-4 img-container" alt="pix" />
						</Link>
					);
					pixLinks[2].push(
						<Link to="" key={i + 2}>
							<img src={pix.pixData[i + 2].image} className="img-fluid mb-4 img-container" alt="pix" />
						</Link>
					);
					pixLinks[3].push(
						<Link to="" key={i + 3}>
							<img src={pix.pixData[i + 3].image} className="img-fluid mb-4 img-container" alt="pix" />
						</Link>
					);
				}
				while (i < pix.pixData.length) {
					pixLinks[k].push(
						<Link to="" key={i}>
							<img src={pix.pixData[i].image} className="img-fluid mb-4 img-container" alt="pix" />
						</Link>
					);
					i++;
					k++;
				}
				pixContent = (
					<div className="row">
						<div className="col-lg-3 col-md-6">{pixLinks[0]}</div>
						<div className="col-lg-3 col-md-6">{pixLinks[1]}</div>
						<div className="col-lg-3 col-md-6">{pixLinks[2]}</div>
						<div className="col-lg-3 col-md-6">{pixLinks[3]}</div>
					</div>
				);
			}
		}
		if (likedBoard) {
			if (likedBoard.data.length === 0) {
				likedBoardContent = empty;
			} else {
				for (let i = 0; i < likedBoard.data.length; i++) {
					for (let j = 0; j < likedBoard.data[i].pix.length; j++) {
						likedBoardRowLinks.push(
							<div className="col-4 px-1" key={j}>
								<img src={likedBoard.data[i].pix[j].pix.image} className="img-fluid mb-1" alt="pix" />
							</div>
						);
					}
					likedBoardColumnLinks.push(
						<Link
							className="col-lg-3 col-md-3 col-sm-5 col-10 board mt-5 text-decoration-none text-dark"
							to=""
							key={i}
						>
							<div className="row mt-2 px-1">
								<div>
									<h3>{likedBoard.data[i].title}</h3>
									<p>{likedBoard.size[i]} Pix</p>
								</div>
							</div>
							<div className="row">{likedBoardRowLinks}</div>
						</Link>
					);
					likedBoardRowLinks = [];
					if ((i % 2 === 0 && i !== 0) || i === likedBoard.data.length - 1) {
						likedBoardDiv.push(
							<div className="row justify-content-around" key={i}>
								{likedBoardColumnLinks}
							</div>
						);
						likedBoardColumnLinks = [];
					}
				}
				likedBoardContent = likedBoardDiv;
			}
		}
		if (board) {
			if (board.data.length === 0) {
				boardContent = empty;
			} else {
				for (let i = 0; i < board.data.length; i++) {
					for (let j = 0; j < board.data[i].pix.length; j++) {
						boardRowLinks.push(
							<div className="col-4 px-1" key={j}>
								<img src={board.data[i].pix[j].pix.image} className="img-fluid mb-1" alt="pix" />
							</div>
						);
					}
					if (board.data[i].pix.length === 0) {
						boardColumnLinks.push(
							<Link
								className="col-lg-3 col-md-3 col-sm-5 col-10 board mt-5 text-decoration-none text-dark"
								style={{ minWidth: '10rem' }}
								to=""
								key={i}
							>
								<div className="row mt-2 px-1">
									<div>
										<h3>{board.data[i].title}</h3>
										<p>{board.size[i]} Pix</p>
									</div>
								</div>
								<div className="row">{boardRowLinks}</div>
							</Link>
						);
					} else {
						boardColumnLinks.push(
							<Link
								className="col-lg-3 col-md-3 col-sm-5 col-10 board mt-5 text-decoration-none text-dark"
								to=""
								key={i}
							>
								<div className="row mt-2 px-1">
									<div>
										<h3>{board.data[i].title}</h3>
										<p>{board.size[i]} Pix</p>
									</div>
								</div>
								<div className="row">{boardRowLinks}</div>
							</Link>
						);
					}
					boardRowLinks = [];
					if ((i % 2 === 0 && i !== 0) || i === board.data.length - 1) {
						boardDiv.push(
							<div className="row justify-content-around" key={i}>
								{boardColumnLinks}
							</div>
						);
						boardColumnLinks = [];
					}
				}
				boardContent = boardDiv;
			}
		}
		if (!boardContent || boardLoading) {
			boardContent = <Spinner />;
		}
		if (!pixContent || pixLoading) {
			pixContent = <Spinner />;
		}
		if (!likedPixContent || likedPixLoading) {
			likedPixContent = <Spinner />;
		}
		if (!likedBoardContent || likedBoardLoading) {
			likedBoardContent = <Spinner />;
		}
		if (profile) {
			if (
				profile.profile.social.facebook !== '' ||
				profile.profile.social.twitter !== '' ||
				profile.profile.social.instagram !== ''
			) {
				socialLinks = (
					<p>
						<a className="highlight-link p-2" href={profile.profile.social.twitter}>
							<i className="fab fa-twitter fa-2x" />
						</a>
						<a className="highlight-link p-2" href={profile.profile.social.facebook}>
							<i className="fab fa-facebook fa-2x" />
						</a>
						<a className="highlight-link p-2" href={profile.profile.social.instagram}>
							<i className="fab fa-instagram fa-2x" />
						</a>
					</p>
				);
			}
		}
		if (this.state.selectedBtn === 'boards') {
			selectedContent = boardContent;
		} else if (this.state.selectedBtn === 'pix') {
			selectedContent = pixContent;
		} else if (this.state.selectedBtn === 'likedPix') {
			selectedContent = likedPixContent;
		} else if (this.state.selectedBtn === 'likedBoards') {
			selectedContent = likedBoardContent;
		}
		let profileContent;
		if (profile === null || profileLoading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-12">
							<div className="card card-body text-white mb-3" style={{ backgroundColor: '#f8f9fa' }}>
								<div className="row">
									<div className="col-4 col-md-3 m-auto">
										<img
											className="rounded-circle img-fluid"
											src={profile.profilePicture}
											alt="avatar"
										/>
									</div>
								</div>
								<div className="text-center text-dark">
									<h1 className="display-4 text-center">{user.username}</h1>
									{profile.profile.location ? (
										<p>
											<i className="fas fa-map-marker-alt mr-2" />
											{profile.profile.location}
										</p>
									) : null}
									{socialLinks}
								</div>
								<div className="text-center text-dark mt-3">
									<p>
										<Link className="p-4 highlight-link" to="">
											{profile.followers.length} Followers
										</Link>
										<Link className="p-4 highlight-link" to="">
											{profile.following.length} Following
										</Link>
									</p>
								</div>
								{profile.profile.bio ? (
									<div>
										<hr />
										<div className="text-center text-dark">
											<p className="lead">{profile.profile.bio}</p>
										</div>
									</div>
								) : null}
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="card card-body bg-light mb-3">
								<div className="row justify-content-center">
									<button
										id="boardsBtn"
										className="btn active btn-light highlight-link my-2 my-sm-0 mr-3 links btn-normal"
										onClick={this.clickHandler}
									>
										Boards
									</button>
									<button
										id="pixBtn"
										className="btn btn-light highlight-link my-2 my-sm-0 mr-3 links btn-normal"
										onClick={this.clickHandler}
									>
										Pix
									</button>
									<button
										id="likedBoardsBtn"
										className="btn btn-light highlight-link my-2 my-sm-0 mr-3 links btn-normal"
										onClick={this.clickHandler}
									>
										Liked Boards
									</button>
									<button
										id="likedPixBtn"
										className="btn btn-light highlight-link my-2 my-sm-0 mr-3 links btn-normal"
										onClick={this.clickHandler}
									>
										Liked Pix
									</button>
								</div>
								<div className="container">
									<div className="row">{selectedContent}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div>
				<div className="profile">
					<div className="container">
						<div className="row">
							<div className="col-md-12 mt-5">{profileContent}</div>
						</div>
					</div>
				</div>
				<ModlasAndSidebars />
			</div>
		);
	}
}

Profile.propTypes = {
	getCurrentUserProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	pix: PropTypes.object.isRequired,
	board: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	pix: state.pix,
	board: state.board
});

export default connect(mapStateToProps, {
	getCurrentUserProfile,
	getUserPix,
	getUserBoard,
	getUserLikedPix,
	getUserLikedBoards
})(Profile);
