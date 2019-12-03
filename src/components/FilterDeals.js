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
                    />
        
                <div id="dayOfWeekSelector" className="dropdown show">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onKeyPress={this.props.setPosts}>
                        {this.props.dayOfWeek}
                    </a>
                    <div name="dayOfWeek" className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <option className="dropdown-item" onClick={this.props.handleDayChange}  name="dayOfWeek" value="Sunday">Sunday</option>
                        <option className="dropdown-item" onClick={this.props.handleDayChange}  name="dayOfWeek" value="Monday">Monday</option>
                        <option className="dropdown-item" onClick={this.props.handleDayChange}  name="dayOfWeek" value="Tuesday">Tuesday</option>
                        <option className="dropdown-item" onClick={this.props.handleDayChange}  name="dayOfWeek" value="Wednesday">Wednesday</option>
                        <option className="dropdown-item" onClick={this.props.handleDayChange}  name="dayOfWeek" value="Thursday">Thursday</option>
                        <option className="dropdown-item" onClick={this.props.handleDayChange}  name="dayOfWeek" value="Friday">Friday</option>
                        <option className="dropdown-item" onClick={this.props.handleDayChange}  name="dayOfWeek" value="Saturday">Saturday</option>
                    </div>
                </div>
        </div>
        )
    }
}

export default FilterDeals;