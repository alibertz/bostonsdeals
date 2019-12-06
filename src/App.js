import React, { Component } from 'react';

import PostViewer from './components/PostViewer';
import FilterDeals from './components/FilterDeals';
import Footer from './components/Footer'

const d = new Date();
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const currentDay = weekdays[d.getDay()]

class App extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    location: "",
    dayOfWeek: currentDay,
    posts: [],
    suggestions: [],
    value: "",
  };

  posts = []

  handleChange = (e) => {
    if(e.key === 'Enter') {

      let value = this.state.suggestions[0];

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
  }

  onTextChanged (suggestions, value, location) {
    this.setState({suggestions, value});
  }

  render() {
    return (
      <div>
        <main className="bg-img">
          <h1 className="header" id="header">Boston's Deals</h1>
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
              />

          <PostViewer 
            dayOfWeek={this.state.dayOfWeek}
            location={this.state.location}
            posts={this.state.posts}
            />
        </main>
        <Footer />
      </div>
      
    );
  }
}

export default App;