import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import ModalsAndSiderbars from '../layout/ModalsAndSiderbars';

class Dashboard extends Component {
	render() {
		const { searchResult, loading } = this.props.search;
		let renderComponent,
			imgLinks = [ [], [], [], [] ];
		if (loading) {
			renderComponent = (
				<div className="row">
					<Spinner />
				</div>
			);
		} else {
			if (searchResult) {
				// For search result links full page rendering create a new route on backend to render
				// pix with data passed in query string as anonymous pix without a user.
				// Or just make a separate frontend private route for anonymous pix rendering
				for (let i = 0; i < searchResult.data.length - 2; i += 4) {
					imgLinks[0].push(
						<a href={searchResult.data[i]} key={i}>
							<img src={searchResult.data[i]} className="img-fluid mb-4 img-container" alt="pix" />
						</a>
					);
					imgLinks[1].push(
						<a href={searchResult.data[i]} key={i + 1}>
							<img src={searchResult.data[i + 1]} className="img-fluid mb-4 img-container" alt="pix" />
						</a>
					);
					imgLinks[2].push(
						<a href={searchResult.data[i]} key={i + 2}>
							<img src={searchResult.data[i + 2]} className="img-fluid mb-4 img-container" alt="pix" />
						</a>
					);
					imgLinks[3].push(
						<a href={searchResult.data[i]} key={i + 3}>
							<img src={searchResult.data[i + 3]} className="img-fluid mb-4 img-container" alt="pix" />
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
			} else {
				renderComponent = (
					<div className="row">
						<div className="col-lg-3 col-md-6">
							<Link to="">
								<img
									src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216671.5403_tunyra_n.jpg"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
							<Link to="">
								<img
									src="https://vignette.wikia.nocookie.net/satsuriku-no-tenshi/images/4/4d/KeyVisual%28Anime%29.jpg/revision/latest?cb=20180322002814"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
							<Link to="">
								<img
									src="https://images.alphacoders.com/598/598846.jpg"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
						</div>
						<div className="col-lg-3 col-md-6">
							<Link to="">
								<img
									src="https://imgix.ranker.com/user_node_img/50090/1001797995/original/blade-of-demon-destruction-photo-u1?w=650&q=50&fm=pjpg&fit=crop&crop=faces"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
							<Link to="">
								<img
									src="https://i.kinja-img.com/gawker-media/image/upload/s--jMsuwPKN--/c_scale,f_auto,fl_progressive,q_80,w_800/jvpdt4hmiw24uhusuc5k.jpg"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
							<Link to="">
								<img
									src="https://img1.ak.crunchyroll.com/i/spire1/fff72a8a6613dd71b40989b7eb7cbb7c1561055752_full.png"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
						</div>
						<div className="col-lg-3 col-md-6">
							<Link to="">
								<img
									src="https://cdn.pastemagazine.com/www/articles/Cowboy%20Bebop%20Anime%2050%20Main.jpeg"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
							<Link to="">
								<img
									src="https://media.comicbook.com/2019/06/dr-stone-anime-1173558-1280x0.jpeg"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
							<Link to="">
								<img
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5n-TNnDRH4J2l_imQGepMBK2GMfKKOW0djgQIh_sSpnfZzr_Q"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
						</div>
						<div className="col-lg-3 col-md-6">
							<Link to="">
								<img
									src="https://www.dailydot.com/wp-content/uploads/2018/04/what_is_anime.png"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
							<Link to="">
								<img
									src="https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Bleachanime.png/220px-Bleachanime.png"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
							<Link to="">
								<img
									src="https://static.highsnobiety.com/thumbor/GId1pKbFgBTbzS0XdfpnR91FsnI=/fit-in/480x320/smart/static.highsnobiety.com/wp-content/uploads/2019/09/25183759/michael-b-jordon-favorite-anime-08.jpg"
									className="img-fluid mb-4 img-container"
									alt="pix"
								/>
							</Link>
						</div>
					</div>
				);
			}
		}

		return (
			<div>
				<div className="container-fluid my-4">
					{renderComponent}
					<ModalsAndSiderbars />
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	search: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	search: state.search
});

export default connect(mapStateToProps)(Dashboard);
