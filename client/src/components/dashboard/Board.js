import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCompleteBoard } from '../../actions/boardAction';

class Board extends Component {
	componentDidMount() {
		const objectID = this.props.location.pathname.split('/')[2];
		this.props.getCompleteBoard(objectID);
	}
	render() {
		const { completeBoard, completeBoardLoading } = this.props.board;
		console.log(completeBoard, completeBoardLoading);

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12 my-5">
						<div className="card card-body bg-light mb-3">
							<div className="container">
								<div className="row justify-content-center">
									<h1>Board Title</h1>
								</div>
								<hr />
								<div className="row">
									<div className="col-lg-3 col-md-6">
										<Link to="">
											<img
												src="https://cdn-ep19.pressidium.com/wp-content/uploads/2019/07/photography-aesthetic-bridge-landscape-at-blue-hour.jpg"
												className="img-fluid mb-4 img-container"
												alt="pix"
											/>
										</Link>
										<Link to="">
											<img
												src="https://66.media.tumblr.com/26d3c7f3b0b850f630d6038f1280978a/tumblr_p0jxiknQux1u3tdofo1_400.jpg"
												className="img-fluid mb-4 img-container"
												alt="pix"
											/>
										</Link>
										<Link to="">
											<img
												src="https://www.elsetge.cat/myimg/f/5-55807_hong-kong-city-neon-city-aesthetic-red-neon.jpg"
												className="img-fluid mb-4 img-container"
												alt="pix"
											/>
										</Link>
									</div>
									<div className="col-lg-3 col-md-6">
										<Link to="">
											<img
												src="https://66.media.tumblr.com/b0b21fca30158fc6552a30f6b8fa9fcd/tumblr_pfp8laZ8031sd8vlq_540.jpg"
												className="img-fluid mb-4 img-container"
												alt="pix"
											/>
										</Link>
										<Link to="">
											<img
												src="https://i.pinimg.com/736x/bd/14/41/bd1441b34595070ac3f1e95ddaca02ca.jpg"
												className="img-fluid mb-4 img-container"
												alt="pix"
											/>
										</Link>
										<Link to="">
											<img
												src="https://www.economist.com/sites/default/files/20180407_BLP504.jpg"
												className="img-fluid mb-4 img-container"
												alt="pix"
											/>
										</Link>
									</div>
									<div className="col-lg-3 col-md-6">
										<Link to="">
											<img
												src="https://miro.medium.com/max/12408/1*gJJ3Z3rTDVy0KbP2m7h_dQ.jpeg"
												className="img-fluid mb-4 img-container"
												alt="pix"
											/>
										</Link>
										<Link to="">
											<img
												src="https://media-cdn.tripadvisor.com/media/photo-s/07/1b/99/35/wc-harlan.jpg"
												className="img-fluid mb-4 img-container"
												alt="pix"
											/>
										</Link>
										<Link to="">
											<img
												src="https://theminimalistvegan.com/wp-content/uploads/2018/08/The-Curse-of-The-Minimalist-Aesthetic-e1534243052697.jpg"
												className="img-fluid mb-4 img-container"
												alt="pix"
											/>
										</Link>
									</div>
									<div className="col-lg-3 col-md-6">
										<Link to="">
											<img
												src="https://66.media.tumblr.com/9ec80f6957eeef5ce742f9822ae84c28/tumblr_oyas2o9mNF1w0qmx4o1_400.jpg"
												className="img-fluid mb-4 img-container"
												alt="pix"
											/>
										</Link>
										<Link to="">
											<img
												src="http://s12.favim.com/orig/161116/aesthetic-alternative-boy-cigarette-Favim.com-4874207.jpeg"
												className="img-fluid mb-4 img-container"
												alt="pix"
											/>
										</Link>
										<Link to="">
											<img
												src="http://s12.favim.com/orig/161116/aesthetic-alternative-boy-cigarette-Favim.com-4874207.jpeg"
												className="img-fluid mb-4 img-container"
												alt="pix"
											/>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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
	getCompleteBoard
})(Board);
