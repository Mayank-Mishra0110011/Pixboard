window.onload = function() {
	const imgContainer = this.document.getElementsByClassName('img-container');
	for (let img of imgContainer) {
		let r = this.random(0, 256).toString(16);
		let g = this.random(0, 256).toString(16);
		let b = this.random(0, 256).toString(16);
		img.style.color = '#' + r + g + b;
	}
};

function random(min, max) {
	return Math.floor(Math.random() * max + min);
}

function expandMessagesSidebar() {
	let width = '25vw',
		contentWidth = '20vw';
	if (window.innerWidth <= 991 && window.innerWidth > 575) {
		width = '40vw';
		contentWidth = '35vw';
	} else if (window.innerWidth <= 575) {
		width = '100vw';
		contentWidth = '95vw';
	}
	if (document.getElementById('settingsSidebar').style.width == `${width}`) {
		TweenMax.to('#settingsSidebar', 0, {
			width: '0',
			visibility: 'hidden',
			onComplete: function() {
				TweenMax.to('.settingsidebar-btn', 0, {
					visibility: 'hidden',
					onComplete: function() {
						TweenMax.to('#messagesSidebar', 0.4, {
							width: `${width}`,
							visibility: 'visible',
							onComplete: function() {
								TweenMax.to('.msg-sidebar-content', 0, {
									width: `${contentWidth}`,
									visibility: 'visible'
								});
							}
						});
					}
				});
			}
		});
	} else {
		if (document.getElementById('messagesSidebar').style.width == `${width}`) {
			TweenMax.to('.msg-sidebar-content', 0, {
				visibility: 'hidden',
				onComplete: function() {
					TweenMax.to('#messagesSidebar', 0, {
						width: '0',
						visibility: 'hidden'
					});
				}
			});
		} else {
			TweenMax.to('#messagesSidebar', 0.4, {
				width: `${width}`,
				visibility: 'visible',
				onComplete: function() {
					TweenMax.to('.msg-sidebar-content', 0, {
						width: `${contentWidth}`,
						visibility: 'visible'
					});
				}
			});
		}
	}
}

function expandSettingsSidebar() {
	let width = '25vw';
	if (window.innerWidth <= 991 && window.innerWidth > 575) {
		width = '40vw';
	} else if (window.innerWidth <= 575) {
		width = '100vw';
	}
	if (document.getElementById('messagesSidebar').style.width == `${width}`) {
		TweenMax.to('.msg-sidebar-content', 0, {
			visibility: 'hidden',
			onComplete: function() {
				TweenMax.to('#messagesSidebar', 0, {
					width: '0',
					visibility: 'hidden',
					onComplete: function() {
						TweenMax.to('#settingsSidebar', 0.4, {
							width: `${width}`,
							visibility: 'visible',
							onComplete: function() {
								TweenMax.to('.settingsidebar-btn', 0, {
									visibility: 'visible'
								});
							}
						});
					}
				});
			}
		});
	} else {
		if (document.getElementById('settingsSidebar').style.width == `${width}`) {
			TweenMax.to('.settingsidebar-btn', 0, {
				visibility: 'hidden',
				onComplete: function() {
					TweenMax.to('#settingsSidebar', 0, {
						width: '0',
						visibility: 'hidden'
					});
				}
			});
		} else {
			TweenMax.to('#settingsSidebar', 0.4, {
				width: `${width}`,
				visibility: 'visible',
				onComplete: function() {
					TweenMax.to('.settingsidebar-btn', 0, {
						visibility: 'visible'
					});
				}
			});
		}
	}
}

function hideSidebar() {
	const settings = document.getElementById('settingsSidebar');
	const messages = document.getElementById('messagesSidebar');
	if (settings || messages) {
		if (settings.style.width != '0' && settings.style.width != '' && settings.style.width != '0px') {
			this.expandSettingsSidebar();
		}
		if (messages.style.width != '0' && messages.style.width != '' && messages.style.width != '0px') {
			this.expandMessagesSidebar();
		}
	}
}
