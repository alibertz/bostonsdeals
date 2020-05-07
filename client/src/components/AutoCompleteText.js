import React from 'react';

export default class AutoCompleteText extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            suggestions: [''],
            text: ""
        };
    }
    
    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.props.items.sort().filter(v => regex.test(v))
        }
        this.props.onTextChanged(suggestions, value);
        this.setState(() => ({ suggestions, text: value }));
         
    }


    renderSuggestions () {
        const { suggestions } = this.props;

        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.handleLocationSelect(item)} key={this.props.posts.id}><i className="fas fa-search"></i>{item}</li>)}
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
                <input  
                    type="text" 
                    name="location"
                    onKeyPress={this.props.handleChange}
                    onChange={this.onTextChanged}
                    value={value || ''}
                    placeholder="Enter neighborhood..."
                />

                {this.renderSuggestions()}
            </div>
        )
    }
}