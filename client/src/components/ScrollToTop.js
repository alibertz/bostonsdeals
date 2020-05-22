import React, { Component } from 'react';

export default class ScrollToTop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			is_visible: false
		};
	}

	componentDidMount() {
		let scrollComponent = this;

		document.addEventListener("scroll", e => scrollComponent.toggleVisibility());
	}

	toggleVisibility() {
		if (window.pageYOffset > 900) {
			this.setState({is_visible: true});
		} else {
			this.setState({is_visible:false});
		}
	}

	render() {
		return (
			<div className="scrollToTopBtn">
				{this.state.is_visible && <a href="#deals" className="scrollToTop"><i class="fas fa-angle-double-up"></i></a>}
			</div>
		);
	}
}