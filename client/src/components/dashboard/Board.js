import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { setExternalPix } from '../../actions/externalPixAction';
import { getCompleteBoard } from '../../actions/boardAction';

class Board extends Component {
	constructor() {
		super();
		this.pixClickHandler = this.pixClickHandler.bind(this);
	}
	componentDidMount() {
		if (this.props.location.state) {
			this.props.history.replace({ state: this.props.location.state });
		}
		const objectID = this.props.location.state.boardID;
		this.props.getCompleteBoard(objectID);
	}
	pixClickHandler(event) {
		event.preventDefault();
		this.props.setExternalPix(event.target.src);
		localStorage.setItem('backTo', window.location.href.split('/').pop());
		const objectID = this.props.location.state.boardID;
		this.props.history.push('/Pix');
		this.props.history.location.state = { boardID: objectID };
	}
	render() {
		const { completeBoard, completeBoardLoading } = this.props.board;
		let pixLinks = [],
			boardContent = [];
		if (completeBoard) {
			for (let i = 0; i < completeBoard.board.pix.length; i++) {
				pixLinks.push(
					<a href="/Pix" key={i} onClick={this.pixClickHandler}>
						<img
							src={completeBoard.board.pix[i].pix.image}
							className="img-fluid mb-4 img-container"
							alt="pix"
						/>
					</a>
				);
				if (
					(i % 2 === 0 && i !== 0 && i < 3) ||
					(i % 3 === 0 && i > 3) ||
					i === completeBoard.board.pix.length - 1
				) {
					boardContent.push(
						<div className="col-lg-3 col-md-6" key={i}>
							{pixLinks}
						</div>
					);
					pixLinks = [];
				}
			}
		}
		return (
			<div className="container">
				{completeBoardLoading ? (
					<Spinner />
				) : completeBoard ? (
					<div className="row">
						<div className="col-md-12 my-5">
							<div className="card card-body bg-light mb-3">
								<div className="container">
									<div className="row justify-content-center">
										<h1>{completeBoard.board.title}</h1>
									</div>
									<hr />
									<div className="row">{boardContent}</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<Spinner />
				)}
			</div>
		);
	}
}

Board.propTypes = {
	board: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	board: state.board
});

export default connect(mapStateToProps, {
	getCompleteBoard,
	setExternalPix
})(Board);
