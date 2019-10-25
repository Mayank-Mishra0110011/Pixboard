import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../img/Untitled.png';

class Landing extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/Dashboard');
		}
	}
	render() {
		return (
			<div>
				<div className="container-fluid my-4">
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
									src="data:image/jpeg;base64,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"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
						</div>
					</div>
				</div>
				<div className="landing">
					<div className="dark-overlay landing-inner text-light">
						<div className="container">
							<div className="row">
								<div className="col-md-12 text-center">
									<img src={logo} className="img-fluid" alt="logo" />
									<hr />
									<div className="landing-btn-container">
										<Link to="/SignUp" className="btn btn-lg btn-outline-light">
											Sign Up
										</Link>
										<Link to="/Login" className="btn btn-lg btn-outline-light">
											Login
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

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Landing));
