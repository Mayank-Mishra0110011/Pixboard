import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ModalsAndSiderbars from '../layout/ModalsAndSiderbars';

class Dashboard extends Component {
	render() {
		return (
			<div>
				<div className="container-fluid my-4">
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
					<ModalsAndSiderbars />
				</div>
			</div>
		);
	}
}

export default Dashboard;
