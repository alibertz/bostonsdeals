import React, { Component } from 'react';
import ScrollableAnchor, { configureAnchors, removeHash } from 'react-scrollable-anchor';

import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import PostViewer from './components/PostViewer';
import FilterDeals from './components/FilterDeals';
import Footer from './components/Footer'

const d = new Date();
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const currentDay = weekdays[d.getDay()]

configureAnchors({scrollDuration: 450});

class App extends Component {

	constructor (props) {
		super(props);
		this.items = [
			'',
			'North End', 
			'Cambridge', 
			'South End', 
			'Back Bay',
			"Copley Square",
			"Harvard Square",
			"Financial District",
			"Fenway",
			"Kenmore",
			"Faneuil Hall",
			"Somerville",
			"Brighton",
			"Davis Square",
			"Allston",
			"Beacon Hill",
			"Chinatown",
			"Bay Village",
			"Downtown Crossing",
			"West End",
			"Roxbury",
			"Dorchester",
			"Roslindale",
			"Mattapan",
			"Hyde Park",
			"West Roxbury",
			"Jamaica Plain",
			"Mission Hill",
			"South Boston",
			"Charlestown",
			"East Boston",
			"Mid Dorchester",
			"Boston"
		]
		this.state = {
			location: "",
			dayOfWeek: currentDay,
			posts: [],
			suggestions: [],
			value: "",
		}
		removeHash()
	}

	posts = []

	handleChange = (e) => {
		if(e.key === 'Enter' && this.state.suggestions[0]) {

			let value = this.state.suggestions[0].replace(' ', '_');

			if(value === undefined) {
				value = e.target.value;
			}

			this.setState({value, location: value});
			this.setState({suggestions: []});

			if (value === undefined) {
				value = e.target.value;
			}
			
			this.setState({value: this.state.suggestions[0], location: value});
			this.setState({suggestions: []}, console.log(value));

			
			// Old handler for enter key, revert if new way breaks
			// this.setState({[e.target.name]: e.target.value });
			
		}
	};

	handleDayChange (f) {
		this.setState({dayOfWeek: f.target.value});
	};

	handleSelect = (location) => {
		this.setState({location});
	};

	onTextChanged (suggestions, value, location) {
		this.setState({suggestions, value});
	};

	seeAllDeals () {
		this.setState({location: '', value: ''});
	};

	render() {
		return (
			<div>
				<main className="bg-img">

				<div className="header">
					<h1 onClick={this.seeAllDeals.bind(this)} className="brand" id="header">Boston's Deals</h1>
					<Navbar />
				</div>

				<ScrollToTop />
				

				<div className="info-panel">
					<h3>Welcome to Boston's Deals</h3>
					<p>A simple to use platform that allows you to find great deals from your favorite restaurants, and also helps you find great deals happening at other restaurants in your neighborhood</p>
					<a href="#deals">
						<svg id="more-arrows">
							<polygon class="arrow-top" points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 "/>					
						</svg>						
					</a>

					
				</div>

				<ScrollableAnchor id={'deals'}>
					<FilterDeals 
							handleDayChange={this.handleDayChange.bind(this)} 
							handleChange={this.handleChange.bind(this)} 
							dayOfWeek={this.state.dayOfWeek}
							location={this.state.location}
							posts={this.posts}
							handleSelect={this.handleSelect.bind(this)}
							suggestions={this.state.suggestions}
							onTextChanged={this.onTextChanged.bind(this)}
							value={this.state.value}
							items={this.items}
							/>
					</ScrollableAnchor>
					<PostViewer 
						dayOfWeek={this.state.dayOfWeek}
						location={this.state.location}
						posts={this.state.posts}
						items={this.items}
						seeAllDeals={this.seeAllDeals.bind(this)}
						handleSelect={this.handleSelect.bind(this)}
						/>					
				

				</main>
				<Footer />
			</div>
			
		);
	}
}

export default App;