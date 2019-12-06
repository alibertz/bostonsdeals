import React from 'react';

export default class AutoCompleteText extends React.Component {
    constructor (props) {
        super(props);
        this.items = [
                        'North End', 
                        'Cambridge', 
                        'South End', 
                        'Back Bay',
                        "Copley Square",
                        "Harvard Square",
                        "Financial District",
                        "Fenway/Kenmore",
                        "Somerville",
                        "Brighton",
                        "Davis Square",
                        "Allston",
                        "Beacon Hill",
                        "Chinatown",
                        "Bay Village",
                        "Downtown",
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

                    ];
        this.state = {
            suggestions: [],
            text: ""
        };
    }
    
    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v))
        }
        this.props.onTextChanged(suggestions, value);
        this.setState(() => ({ suggestions, text: value }));
         
    }


    renderSuggestions () {
        const { suggestions } = this.props;
        const location = this.state.text;

        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.handleLocationSelect(item)}><i class="fas fa-search"></i>{item}</li>)}
            </ul>
        );
    }

    handleLocationSelect = (value) => {
        this.setState(() => ({
            text: value,
            suggestions: []
        }));
        let suggestions = [];
        this.props.onTextChanged(suggestions, value);
        this.props.handleSelect(value);
        
    }

    render () {
        const value = this.props.value;
        return (
            <div id="locationSelector" >
                <input  type="text" 
                        name="location"
                        onKeyPress={this.props.handleChange} 
                        type="text"
                        onChange={this.onTextChanged}
                        value={value}
                        />

                {this.renderSuggestions()}
            </div>
        )
    }
}