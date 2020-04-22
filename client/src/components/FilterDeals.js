import React, { Component } from 'react';
import AutoCompleteText from './AutoCompleteText';

const INPUT_TIMEOUT = 250;

class FilterDeals extends Component {
		
		constructor(props) {
				super(props);
				this.state = {
						value: '',
						predictions: []
				};
				this.onChange = this.onChange.bind(this);
		}

		getPredictions(value) {

				return [
						'Fenway/Kenmore',
						'Back Bay',
						'Brighton',
						'North End',
						'South End',
						'Cambridge',
						'Somerville',
						'Financial District',
						'Harvard Square',
						'Copley Square'
				].filter(item => item.toLowerCase().indexOf(value.toLowerCase()) !== -1);
		}

		onChange(e) {
				// clear timeout when input changes value
				clearTimeout(this.timeout);
				const value = e.target.value;
				this.setState({
					value: value
				});
				// console.log(this.state.value);
				// console.log(this.state.predictions);

				if (value.length > 0) {
					// make delayed api call
					this.timeout = setTimeout(() => {
						const predictions = this.getPredictions(value);
						this.setState({
							predictions
						});
					}, INPUT_TIMEOUT);
				} else {
					this.setState({
						predictions: []
					});
				}
		}

		render() {
				return (
						<div id="filterDeals">

								<AutoCompleteText 
										handleSelect={this.props.handleSelect} 
										handleChange={this.props.handleChange}
										suggestions={this.props.suggestions}
										onTextChanged={this.props.onTextChanged}
										value={this.props.value}
										posts={this.props.posts}
										/>
										
										<div id="dayOfWeekSelector">
											<label>
												<input onClick={this.props.handleDayChange} type="radio" name="dayOfWeek" value="Sunday" defaultChecked={this.props.dayOfWeek === 'Sunday'}/>
												<span>Sun</span>
											</label>
											<label>
												<input onClick={this.props.handleDayChange} type="radio" name="dayOfWeek" value="Monday" defaultChecked={this.props.dayOfWeek === 'Monday'}/>
												<span>Mon</span>
											</label>
											<label>
												<input onClick={this.props.handleDayChange} type="radio" name="dayOfWeek" value="Tuesday" defaultChecked={this.props.dayOfWeek === 'Tuesday'}/>
												<span>Tues</span>
											</label>
											<label>
												<input onClick={this.props.handleDayChange} type="radio" name="dayOfWeek" value="Wednesday" defaultChecked={this.props.dayOfWeek === 'Wednesday'}/>
												<span>Wed</span>
											</label>
											<label>
												<input onClick={this.props.handleDayChange} type="radio" name="dayOfWeek" value="Thursday" defaultChecked={this.props.dayOfWeek === 'Thursday'}/>
												<span>Thu</span>
											</label>
											<label>
												<input onClick={this.props.handleDayChange} type="radio" name="dayOfWeek" value="Friday" defaultChecked={this.props.dayOfWeek === 'Friday'}/>
												<span>Fri</span>
											</label>
											<label>
												<input onClick={this.props.handleDayChange} type="radio" name="dayOfWeek" value="Saturday" defaultChecked={this.props.dayOfWeek === 'Saturday'}/>
												<span>Sat</span>
											</label>  
										</div>
								</div>
				// </div>
				)
		}
}

export default FilterDeals;