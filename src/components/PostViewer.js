import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import '../stylesheet.scss';

export const GET_POSTS = gql`
  query GET_POSTS($location: String, $dayOfWeek: String){
    posts(location: $location dayOfWeek: $dayOfWeek) {
      id
      location
      description
      companyName
    }
  }
`;

export default (props) => (
  <Query query={GET_POSTS} variables={{ location: props.location, dayOfWeek: props.dayOfWeek}}>
    {({ loading, data }) => !loading && (
        <div id="card-wrapper">
        {data.posts.length > 0 ? (<h4 id="tagline">{props.location.length > 0 ? data.posts.length + ' d' : 'D'}eal{data.posts.length > 1 && 's'} {props.location.length > 0 && 'in '}<span className="location">{props.location}</span> for {props.dayOfWeek}</h4>) : (<h4 id="tagline">No results for '{props.location}'. Try again?</h4>)}
          {data.posts.map(post => {
            return (<div id="card" key={post.id}>
                      <div className="info">
                        <h2 className="description">{post.description}</h2>
                        <h3 className="companyName">{post.companyName}</h3>
                        <h4 className="location"><i className="fas fa-map-marker-alt" style={{paddingRight: '.5rem'}}></i>{post.location}</h4>
                        <h4 className="address">{post.address}</h4>
                      </div>
                      <div className="directions">
                        <i className="fas fa-directions"></i>
                      </div>
                    </div>
                  )
          })}
          
        </div>
        
    )}
    
  </Query>
);