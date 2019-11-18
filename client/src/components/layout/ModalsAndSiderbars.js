import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authAction';
import { cancelPixUpload, uploadPix, getUserPix, unsetPixUrlAsImageUrl } from '../../actions/pixAction';
import { createBoard, getUserBoard, cancelBoardCreated, cancelTitle } from '../../actions/boardAction';
import { deleteAccount } from '../../actions/profileAction';
import { getMessage, sendMessage, unsetMessageSent } from '../../actions/messageAction';

class ModalsAndSiderbars extends Component {
	constructor() {
		super();
		this.state = {
			boardTitle: '',
			pixURL: '',
			pixDataURL: '',
			pixTitle: '',
			message: '',
			receiver: '',
			sender: '',
			mainMessage: '',
			errors: {}
		};
		this.onLogoutClick = this.onLogoutClick.bind(this);
		this.createBoard = this.createBoard.bind(this);
		this.cancelBoard = this.cancelBoard.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePixChange = this.handlePixChange.bind(this);
		this.uploadPix = this.uploadPix.bind(this);
		this.cancelPix = this.cancelPix.bind(this);
		this.deleteAccount = this.deleteAccount.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}
	deleteAccount() {
		localStorage.removeItem('jwtToken');
		this.props.deleteAccount();
	}
	sendMessage() {
		const messageData = {
			username: this.state.receiver,
			message: this.state.message
		};
		this.props.sendMessage(messageData);
	}
	handlePixChange(event) {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = function(e) {
				document.getElementById('locate').innerText = '';
				const pix = document.getElementById('pix');
				pix.src = e.target.result;
				this.setState({ pixDataURL: e.target.result });
				document.getElementById('pixURL').disabled = true;
				pix.style.visibility = 'visible';
			};
			reader.onload = reader.onload.bind(this);
			reader.readAsDataURL(event.target.files[0]);
		}
	}
	cancelBoard() {
		this.setState({ boardTitle: '' });
		this.props.cancelTitle();
		this.props.cancelBoardCreated();
	}
	cancelPix() {
		document.getElementById('boardOptions').value = 'Save to Board';
		document.getElementById('pix').src = '';
		document.getElementById('pix').style.visibility = 'hidden';
		document.getElementById('pixURL').disabled = false;
		document.getElementById('locate').innerText = 'Click to locate pix';
		this.setState({ pixURL: '', pixTitle: '', pixDataURL: '' });
		this.props.cancelPixUpload();
	}
	static getDerivedStateFromProps(nextProps, previousState) {
		if (nextProps.errors !== previousState.errors) {
			return { errors: nextProps.errors };
		}
		return null;
	}
	uploadPix(event) {
		event.preventDefault();
		if (this.state.pixURL.trim() !== '') {
			this.props.uploadPix(document.getElementById('boardOptions').value, this.state.pixURL);
		} else if (this.state.pixDataURL.trim() !== '') {
			this.props.uploadPix(document.getElementById('boardOptions').value, this.state.pixDataURL);
		} else {
			this.props.uploadPix(null, null);
		}
		this.props.getUserPix();
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
		this.props.getMessage();
		document.getElementById('createPixBtn').addEventListener('click', this.rotateBtn);
		document.getElementById('pixBtn').addEventListener('change', this.handlePixChange);
	}
	componentDidUpdate() {
		if (this.props.pix.pixUrlAsImageUrl) {
			this.setState({ pixURL: localStorage.getItem('pixURL') });
			this.props.unsetPixUrlAsImageUrl();
		}
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
		const { pixUploaded } = this.props.pix;
		const { messageSent, messages } = this.props.message;
		let messageList = [];
		if (messages) {
			for (let i = 0; i < messages.messagesReceived.length; i++) {
				messageList.push(
					<div key={i}>
						<div>
							<p>
								<strong>
									@{messages.messagesReceived[i].user.username}
									<button
										type="button"
										className="btn btn-primary ml-2"
										data-toggle="modal"
										data-target="#viewMessageModal"
										onClick={() => {
											this.setState({
												sender: messages.messagesReceived[i].user.username,
												mainMessage: messages.messagesReceived[i].message
											});
										}}
									>
										View
									</button>
								</strong>
							</p>
							<p>
								{messages.messagesReceived[i].message.length > 110 ? (
									messages.messagesReceived[i].message.slice(0, 110) + '...'
								) : (
									messages.messagesReceived[i].message
								)}
							</p>
						</div>
						<hr />
					</div>
				);
			}
		}

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
						{messageList.length > 0 ? messageList : <h3>No Messages</h3>}
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
										{messageSent ? (
											<div className="text-success mt-2">Message Sent Successfully!!</div>
										) : null}
										<label htmlFor="to" className="col-form-label">
											To:
										</label>
										<input
											type="text"
											className={classnames('form-control', {
												'is-invalid': errors.username
											})}
											name="receiver"
											value={this.state.receiver}
											onChange={this.handleChange}
											placeholder="@Username"
										/>
										{errors.username && <div className="invalid-feedback">{errors.username}</div>}
									</div>
									<div className="form-group">
										<label htmlFor="message-text" className="col-form-label">
											Message:
										</label>
										<textarea
											className={classnames('form-control', {
												'is-invalid': errors.message
											})}
											name="message"
											placeholder="Message"
											value={this.state.message}
											onChange={this.handleChange}
										/>
										{errors.message && <div className="invalid-feedback">{errors.message}</div>}
									</div>
								</form>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-danger"
									data-dismiss="modal"
									onClick={() => {
										this.props.unsetMessageSent();
										this.setState({ message: '', username: '' });
									}}
								>
									Close
								</button>
								<button onClick={this.sendMessage} type="button" className="btn btn-primary">
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
								<h3 className="modal-title">@{this.state.sender}</h3>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>
							<div className="modal-body">{this.state.mainMessage}</div>
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
								<button
									onClick={this.deleteAccount}
									type="button"
									className="btn btn-danger"
									data-dismiss="modal"
								>
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
											{pixUploaded ? (
												<div className="text-success my-2">Pix Uploaded!!</div>
											) : null}
											<select
												className={classnames('custom-select form-control', {
													'is-invalid': errors.boardNotFound
												})}
												id="boardOptions"
											>
												<option defaultValue>Save to Board</option>
												{boardOptions}
											</select>
											{errors.boardNotFound && (
												<div className="invalid-feedback">{errors.boardNotFound}</div>
											)}
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
												placeholder="Pix Title (Optional)"
											/>
										</div>
									</div>
									<div className="row mt-4">
										<div className="col-12">
											<input
												type="text"
												className={classnames('form-control', {
													'is-invalid': errors.image
												})}
												id="pixURL"
												name="pixURL"
												value={this.state.pixURL}
												onChange={this.handleChange}
												placeholder="Pix URL"
											/>
											{errors.image && <div className="invalid-feedback">{errors.image}</div>}
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
								<button
									type="button"
									className="btn btn-primary"
									data-dismiss="modal"
									onClick={this.cancelPix}
								>
									Cancel
								</button>
								<button type="button" className="btn btn-success" onClick={this.uploadPix}>
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
	board: PropTypes.object.isRequired,
	pix: PropTypes.object.isRequired,
	message: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	errors: state.errors,
	board: state.board,
	pix: state.pix,
	message: state.message
});

export default connect(mapStateToProps, {
	logoutUser,
	createBoard,
	getUserBoard,
	cancelBoardCreated,
	cancelTitle,
	uploadPix,
	cancelPixUpload,
	getUserPix,
	unsetPixUrlAsImageUrl,
	deleteAccount,
	getMessage,
	sendMessage,
	unsetMessageSent
})(withRouter(ModalsAndSiderbars));
