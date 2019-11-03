import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authAction';
import { createBoard, getUserBoard, cancelBoardCreated, cancelTitle } from '../../actions/boardAction';

class ModalsAndSiderbars extends Component {
	constructor() {
		super();
		this.state = {
			boardTitle: '',
			pixURL: '',
			pixTitle: '',
			errors: {}
		};
		this.onLogoutClick = this.onLogoutClick.bind(this);
		this.createBoard = this.createBoard.bind(this);
		this.cancelBoard = this.cancelBoard.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	cancelBoard() {
		this.setState({ boardTitle: '' });
		this.props.cancelTitle();
		this.props.cancelBoardCreated();
	}
	static getDerivedStateFromProps(nextProps, previousState) {
		if (nextProps.errors !== previousState.errors) {
			return { errors: nextProps.errors };
		}
		return null;
	}
	onLogoutClick(event) {
		event.preventDefault();
		this.props.logoutUser();
		this.props.history.push('/');
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	createBoard(event) {
		event.preventDefault();
		this.props.createBoard({ title: this.state.boardTitle });
		this.props.getUserBoard();
	}
	componentDidMount() {
		this.props.getUserBoard();
		document.getElementById('createPixBtn').addEventListener('click', this.rotateBtn);
		document.getElementById('pixBtn').addEventListener('change', (event) => {
			if (event.target.files && event.target.files[0]) {
				const reader = new FileReader();
				reader.onload = function(e) {
					document.getElementById('locate').innerText = '';
					const pix = document.getElementById('pix');
					pix.src = e.target.result;
					pix.style.visibility = 'visible';
				};
				reader.readAsDataURL(event.target.files[0]);
			}
		});
	}
	rotateBtn() {
		const btn = document.getElementsByClassName('fa-plus')[0];
		if (btn.style.transform === '') {
			btn.style.transform = 'rotate(45deg)';
		} else {
			btn.style.transform = '';
		}
	}
	loadPix() {
		document.getElementById('pixBtn').click();
	}
	render() {
		const { errors } = this.state;
		const { boardCreated, board } = this.props.board;
		let boardOptions = [];
		if (board) {
			for (let i = 0; i < board.data.length; i++) {
				boardOptions.push(
					<option value={board.data[i]._id} key={i}>
						{board.data[i].title}
					</option>
				);
			}
		}
		return (
			<div>
				<div className="sidebar" id="messagesSidebar">
					<div style={{ display: 'flex', justifyContent: 'center' }} className="msg-sidebar-content">
						<h1>Inbox</h1>
					</div>
					<div style={{ height: '30vh', overflowY: 'scroll' }} className="msg-sidebar-content">
						<div>
							<p>
								<strong>
									@johan_liebert<button
										type="button"
										className="btn btn-primary ml-2"
										data-toggle="modal"
										data-target="#viewMessageModal"
									>
										View
									</button>
								</strong>
							</p>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis quisquam aliquid
								voluptas.
							</p>
						</div>
						<hr />
						<div>
							<p>
								<strong>
									@garry_host<button
										type="button"
										className="btn btn-primary ml-2"
										data-toggle="modal"
										data-target="#viewMessageModal"
									>
										View
									</button>
								</strong>
							</p>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis quisquam aliquid
								voluptas.
							</p>
						</div>
						<hr />
						<div>
							<p>
								<strong>
									@mayank<button
										type="button"
										className="btn btn-primary ml-2"
										data-toggle="modal"
										data-target="#viewMessageModal"
									>
										View
									</button>
								</strong>
							</p>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis quisquam aliquid
								voluptas.
							</p>
						</div>
						<hr />
					</div>
					<div
						style={{ display: 'flex', justifyContent: 'center', width: '25vw' }}
						className="msg-sidebar-content"
					>
						{' '}
					</div>
					<div
						style={{ display: 'flex', justifyContent: 'center', width: '25vw' }}
						className="msg-sidebar-content"
					>
						<button
							type="button"
							className="btn btn-danger"
							data-toggle="modal"
							data-target="#messageModal"
						>
							<i className="fas fa-signature" /> New Message
						</button>
					</div>
				</div>

				<div className="sidebar" id="settingsSidebar">
					<div className="settingsidebar-btn">
						<Link to="" className="btn btn-info">
							Edit Profile
						</Link>
					</div>
					<div className="settingsidebar-btn">
						<button type="button" className="btn btn-info" onClick={this.onLogoutClick}>
							Logout <i className="fas fa-sign-out-alt" />
						</button>
					</div>
					<div className="settingsidebar-btn">
						<button
							type="button"
							className="btn btn-danger"
							data-toggle="modal"
							data-target="#deleteAccountModal"
						>
							<i className="fas fa-user-slash" /> Delete My Account
						</button>
					</div>
				</div>
				<div className="modal fade" id="messageModal">
					<div className="modal-dialog modal-dialog-centered modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h3 className="modal-title">New Message</h3>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>
							<div className="modal-body">
								<form>
									<div className="form-group">
										<label htmlFor="to" className="col-form-label">
											To:
										</label>
										<input
											type="text"
											className="form-control"
											id="to"
											placeholder="@Username or Email"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="message-text" className="col-form-label">
											Message:
										</label>
										<textarea className="form-control" id="message-text" placeholder="Message" />
									</div>
								</form>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-danger" data-dismiss="modal">
									Close
								</button>
								<button type="button" className="btn btn-primary">
									Send message
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade" id="viewMessageModal">
					<div className="modal-dialog modal-dialog-centered modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h3 className="modal-title">@johan_liebert</h3>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>
							<div className="modal-body">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi reprehenderit
								provident, culpa obcaecati molestiae ea, at esse molestias deleniti error delectus,
								neque temporibus quibusdam quia tenetur soluta non natus.
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-danger" data-dismiss="modal">
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade" id="deleteAccountModal">
					<div className="modal-dialog modal-dialog-centered modal-md">
						<div className="modal-content">
							<div className="modal-header">
								<h2 className="modal-title text-danger">Delete Account</h2>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>
							<div className="modal-body text-danger">Are you sure? This action cannot be undone!!</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal">
									Cancel
								</button>
								<button type="button" className="btn btn-danger" data-dismiss="modal">
									Yes, Delete My Account
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="btn-group dropleft create">
					<button
						className="create-btn"
						id="createPixBtn"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<i className="fas fa-plus" />
					</button>
					<div className="dropdown-menu mr-3">
						<button
							onClick={this.rotateBtn}
							className="dropdown-item"
							data-toggle="modal"
							data-target="#createPixModal"
						>
							<i className="fas fa-image mr-2" /> Create a pix
						</button>
						<button
							className="dropdown-item"
							data-toggle="modal"
							data-target="#createBoardModal"
							onClick={this.rotateBtn}
						>
							<i className="fas fa-border-all mr-2" /> Create a board
						</button>
					</div>
				</div>
				<div className="modal fade" id="createBoardModal">
					<div className="modal-dialog modal-dialog-centered modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h2 className="modal-title">Create Board</h2>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>
							<div className="modal-body">
								<input
									type="text"
									className={classnames('form-control', {
										'is-invalid': errors.title
									})}
									name="boardTitle"
									placeholder="Board Title"
									onChange={this.handleChange}
									value={this.state.boardTitle}
								/>
								{!boardCreated &&
								errors.title && <div className="invalid-feedback">{errors.title}</div>}
								{boardCreated ? <div className="text-success mt-2">Board Created!!</div> : null}
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-primary"
									data-dismiss="modal"
									id="boardCancel"
									onClick={this.cancelBoard}
								>
									Cancel
								</button>
								<button type="button" className="btn btn-success" onClick={this.createBoard}>
									Create
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade" id="createPixModal">
					<div className="modal-dialog modal-dialog-centered modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h2 className="modal-title">Create Pix</h2>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>
							<div className="modal-body">
								<div className="container">
									<div className="row">
										<div className="col-12">
											<select className="custom-select" id="boardOptions">
												<option defaultValue>Save to Board</option>
												{boardOptions}
											</select>
										</div>
									</div>
									<div className="row mt-4">
										<div className="col-12">
											<input
												type="text"
												className="form-control"
												name="pixTitle"
												value={this.state.pixTitle}
												onChange={this.handleChange}
												placeholder="Pix Title"
											/>
										</div>
									</div>
									<div className="row mt-4">
										<div className="col-12">
											<input
												type="text"
												className="form-control"
												name="pixURL"
												value={this.state.pixURL}
												onChange={this.handleChange}
												placeholder="Pix URL"
											/>
										</div>
									</div>
									<div className="row mt-4 justify-content-center">
										<h2>Or</h2>
									</div>
									<div className="row mt-4 justify-content-center">
										<div className="col-11">
											<div
												className="py-5 bg-dark row justify-content-center"
												style={{ cursor: 'pointer', position: 'relative' }}
												onClick={this.loadPix}
											>
												<span
													className="text-danger"
													id="locate"
													style={{ position: 'absolute' }}
												>
													Click to locate pix
												</span>
												<div className="col-lg-12">
													<img src="" alt="pix" id="pix" className="img-fluid" />
												</div>
											</div>
											<input
												type="file"
												className="form-control-file"
												id="pixBtn"
												accept="image/*"
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal">
									Cancel
								</button>
								<button type="button" className="btn btn-success" data-dismiss="modal">
									Upload
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ModalsAndSiderbars.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	createBoard: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	board: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	errors: state.errors,
	board: state.board
});

export default connect(mapStateToProps, { logoutUser, createBoard, getUserBoard, cancelBoardCreated, cancelTitle })(
	withRouter(ModalsAndSiderbars)
);