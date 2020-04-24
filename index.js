const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const path = require('path');

// import { ApolloServer, gql } from 'apollo-server-express';


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// Schema
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Query {
    posts(location: String dayOfWeek: String): [Post]
    post(id: ID): Post
  }

  type Post {
    id: ID
    companyName: String
    address: String
    location: String
    description: String
    dayOfWeek: String
    lat: Float
    lng: Float
  }
`;

// Data set
const POSTS = [
    { id: "1", companyName: "Stella", address: "123 Main St", location: "Back Bay", description: "$2 drafts", dayOfWeek: "Sunday", lat: 47, lng: -77},
    { id: "2", "companyName": "Border Cafe", "address": "124 Main St", "location": "Cambridge", "description": "$4 sandwiches", "dayOfWeek": "Monday",  lat: 47, lng: -71.073315 },
    { id: "3", "companyName": "McDonalds", "address": "125 Main St", "location": "Copley Square", "description": "BOGO drafts", "dayOfWeek": "Friday",  lat: 42.344231, lng: -71.073315 },
    { id: "4", "companyName": "The Model", "address": "126 Main St", "location": "Harvard Square", "description": "Half priced appetizers", "dayOfWeek": "Wednesday",  lat: 77, lng: -71.073315 },
    { id: "5", "companyName": "Shifts", "address": "127 Main St", "location": "South End", "description": "$1 drafts", "dayOfWeek": "Tuesday",  lat: 77, lng: -71.073315 },
    { id: "6", "companyName": "Tavern in the Square", "address": "128 Main St", "location": "Somerville", "description": "$2 burgers", "dayOfWeek": "Tuesday",  lat: 77, lng: -71.073315 },
    { id: "7", "companyName": "McDonalds", "address": "129 Main St", "location": "North End", "description": "$2 drafts", "dayOfWeek": "Daily",  lat: 42.348311, lng: -71.073315 },
    { id: "8", "companyName": "Trader Joe's", "address": "130 Main St", "location": "North End", "description": "$4 sandwiches", "dayOfWeek": "Daily",  lat: 42.333411, lng: -71.073315 },
    { id: "9", "companyName": "Tasty Burger", "address": "131 Main St", "location": "Financial District", "description": "BOGO drafts", "dayOfWeek": "Daily",  lat: 42.348411, lng: -71.073315 },
    { id: "10", "companyName": "Tasty Burger", "address": "132 Main St", "location": "Cambridge", "description": "Half priced appetizers", "dayOfWeek": "Tuesday",  lat: 42.348422, lng: -71.073315 },
    { id: "11", "companyName": "Sweetgreen's", "address": "133 Main St", "location": "Harvard Square", "description": "$1 drafts", "dayOfWeek": "Sunday",  lat: 42.348411, lng: -71.073315 },
    { id: "12", "companyName": "An Tain", "address": "134 Main St", "location": "Davis Square", "description": "$2 burgers", "dayOfWeek": "Monday",  lat: 42.3411, lng: -71.073315 },
    { id: "13", "companyName": "Red House Tavern", "address": "135 Main St", "location": "South End", "description": "$2 drafts", "dayOfWeek": "Friday",  lat: 42.344031, lng: -71.073315 },
    { id: "14", "companyName": "Dark Horse Tavern", "address": "136 Main St", "location": "Financial District", "description": "$4 sandwiches", "dayOfWeek": "Wednesday",  lat: 42.648411, lng: -71.073315 },
    { id: "15", "companyName": "Tasty Burger", "address": "137 Main St", "location": "Back Bay", "description": "BOGO drafts", "dayOfWeek": "Tuesday",  lat: 42.648411, lng: -71.073315 },
    { id: "16", "companyName": "Felipe's", "address": "138 Main St", "location": "Back Bay", "description": "Half priced appetizers", "dayOfWeek": "Tuesday",  lat: 42.348411, lng: -71.073315 },
    { id: "17", "companyName": "Chimmichurri Steakhouse", "address": "139 Main St", "location": "Somerville", "description": "$1 drafts", "dayOfWeek": "Daily",  lat: 42.348411, lng: -71.073315 },
    { id: "18", "companyName": "Coogan's", "address": "140 Main St", "location": "Harvard Square", "description": "$2 burgers", "dayOfWeek": "Tuesday",  lat: 42.348411, lng: -71.073315 },
    { id: "19", "companyName": "Coogan's", "address": "141 Main St", "location": "South End", "description": "$2 drafts", "dayOfWeek": "Thursday",  lat: 42.348411, lng: -71.073315 },
    { id: "20", "companyName": "Big Brain Steakhouse", "address": "142 Main St", "location": "Copley Square", "description": "$4 sandwiches", "dayOfWeek": "Tuesday",  lat: 42.348411, lng: -71.073315 },
    { id: "21", "companyName": "Pokework's", "address": "143 Main St", "location": "Cambridge", "description": "BOGO drafts", "dayOfWeek": "Sunday",  lat: 42.348411, lng: -77 },
    { id: "22", "companyName": "Border Cafe", "address": "144 Main St", "location": "North End", "description": "Half priced appetizers", "dayOfWeek": "Monday",  lat: 42.348411, lng: -71.073315 },
    { id: "23", "companyName": "Ben n Jerry's", "address": "145 Main St", "location": "Brighton", "description": "$1 drafts", "dayOfWeek": "Friday",  lat: 42.348411, lng: -71.073315 },
    { id: "24", "companyName": "The 99", "address": "146 Main St", "location": "Brighton", "description": "$2 burgers", "dayOfWeek": "Wednesday",  lat: 42.348411, lng: -71.073315 },
    { id: "25", "companyName": "Amici's", "address": "147 Main St", "location": "Brighton", "description": "$2 drafts", "dayOfWeek": "Daily",  lat: 42.348411, lng: -71.073315 }
];

// Getting the current day
let d = new Date();
let weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let currentDay = weekdays[d.getDay()];


// Resolvers
const resolvers = {
  Query: {
    posts: (parent, {location, dayOfWeek}) => {
      return POSTS.filter(post => post.location.toUpperCase().includes(location.toUpperCase()) && ((post.dayOfWeek === currentDay) || ( post.dayOfWeek === dayOfWeek ) || (post.dayOfWeek === "Daily")));
    },
    post: (parent, { id }) => {
      return POSTS.find(post => post.id === id);
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });


const app = express();
app.use(cors());
server.applyMiddleware({ app, path: "/graphql" });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => console.log(`u already kno that server BEEN started on localhost:${PORT}/graphql`));