import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import '../stylesheet.scss';
import { Spring } from "react-spring/renderprops";

import Map from './Map';

const GET_POSTS = gql`
	query GET_POSTS($location: String, $dayOfWeek: String){
		posts(location: $location dayOfWeek: $dayOfWeek) {
			id
			companyName
			address
			location
			description
			dayOfWeek
			lat
			lng
			detailIcon
			details
		}
	}
`;

class PostViewer extends React.Component {
	state = {

	}

	render() {
		const expandCard = (e) => {
			// only expand card if click is NOT within Google map
			if(e.target.parentNode.parentNode.parentNode.parentNode.className !== 'googleMap' && e.target.parentNode.className !== 'directions') {
				this.setState({[e.currentTarget.id]: !this.state[e.currentTarget.id]});
			}
		}

		const openMaps = (arr) => {
			if((navigator.platform.indexOf("iPhone") !== -1) || (navigator.platform.indexOf("iPad") !== -1) || (navigator.platform.indexOf("iPod") !== -1)) {
				window.open("http://maps.apple.com/?saddr=Current+Location&daddr="+arr[0].replace(' ','+'));					 
			} else {
				window.open("http://maps.google.com/maps?saddr=Current%20Location&daddr="+arr[0].replace(' ', '+'));
			}
		}

		const showDealsFromLoc = (arr) => {
			this.props.handleSelect(arr);
		}

		return (
			<Query
				query={GET_POSTS}
				variables={{ location: this.props.location, dayOfWeek: this.props.dayOfWeek}}
				onCompleted={data => data.posts.forEach(post => this.setState({[post.id]: false}))}>
				{({ loading, data }) => !loading && (
					<div>

						{data.posts.length > 0 ? (<h4 id="tagline">{this.props.location.length > 0 ? data.posts.length + ' d' : 'D'}eal{data.posts.length > 1 && 's'} {this.props.location.length > 0 && 'in '}<span className="location">{this.props.location.replace('_',' ')}</span> for {this.props.dayOfWeek}</h4>) : (this.props.items.includes(this.props.location.replace('_', ' '))) ? <h4 id="tagline">Sorry, no deals in {this.props.location.replace('_',' ')} on {this.props.dayOfWeek}s yet :(</h4> : (<h4 id="tagline">No results for '{this.props.location.replace('_', ' ')}'. Try again?</h4>)}
						
						{this.props.location.length > 0 &&
							<div className="seeAllDealsWrapper" onClick={this.props.seeAllDeals}>
								<h6 className="seeAllDeals"><span style={{fontSize:'1.4rem',fontWeight:'bolder',margin:'2rem .8rem'}}>+ </span> See all deals for {this.props.dayOfWeek}</h6>						
							</div>}

						<div id="card-wrapper">
							{data.posts.map(post => {
								return (
									<Spring
										from={{opacity: 0, marginTop: -15}}
										to={{opacity:1, marginTop: 0}}
										key={post.id}>

										{props => (
											<div onClick={expandCard} className="card" style={props} key={post.id} id={post.id}>
												<div className="defaultCard">
													<div className="info">
														<h2 className="description">{post.description}</h2>
														<h3 className="companyName">{post.companyName}</h3>
														<div className="locationWrapper">
															<div>
																{post.location[0] && <h4 onClick={() => showDealsFromLoc(post.location[0])} className="location"><i className="fas fa-map-marker-alt" style={{paddingRight: '.5rem'}}></i><span>{post.location[0].replace('_',' ')}</span></h4>}
															</div>
															<div>
																{post.location[1] && <h4 onClick={() => showDealsFromLoc(post.location[1])} className="location"><i className="fas fa-map-marker-alt" style={{paddingRight: '.5rem'}}></i><span>{post.location[1].replace('_',' ')}</span></h4>}
															</div>
														</div>	
														
													</div>
													<div className="directions" onClick={openMaps.bind(this, [post.companyName])}>
														<i className="fas fa-directions"></i>
													</div>
												</div>
												
												{this.state[post.id] ?
													<div className="expandInfo">
														<h4 className="address">{post.address}</h4>
														<p className="details"><i style={{marginRight:'.8rem'}} className={post.detailIcon}></i>{post.details}</p>
														<Map
															googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAeR4JJANXM7oOYOzhXYlrcQeJ5y0FKRw4&v=3.exp&libraries=geometry,drawing,places"
															loadingElement={<div className='googleMap' style={{ height: `100%` }} />}
															containerElement={<div className='googleMap' />}
															mapElement={<div className='googleMap' style={{ height: `100%` }} />}
															lat={post.lat}
															lng={post.lng}
														/>													
													</div>
 : 
													<div className="more">
														<i className="fas fa-angle-double-down"></i><em><h6>more</h6></em>
													</div>
												}
											</div>
										)}
									</Spring>
								)
							})}
						</div>
					</div>
				)}
			</Query>
		);
	}
}

export default PostViewer;