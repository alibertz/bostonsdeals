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
    location: [Location]
    description: String
    dayOfWeek: String
    lat: Float
    lng: Float
    placeid: String
    detailIcon: String
    details: String
  }
  enum Location {
    Allston
    Brighton
    Back_Bay
    Financial_District
    Cambridge
    Copley_Square
    Harvard
    Boston
    South_End
    Downtown_Crossing
    MIT
    Faneuil_Hall
    West_End
    Central_Square

  }
`;

// Data set
const POSTS33 = [
    // { id: "1", companyName: "Stella", address: "123 Main St", location: "Back Bay", description: "$2 drafts", dayOfWeek: "Sunday", lat: 47, lng: -77},
    // { id: "2", "companyName": "Border Cafe", "address": "124 Main St", "location": "Cambridge", "description": "$4 sandwiches", "dayOfWeek": "Monday",  lat: 47, lng: -71.073315 },
    // { id: "3", "companyName": "McDonalds", "address": "125 Main St", "location": "Copley", "description": "BOGO drafts", "dayOfWeek": "Friday",  lat: 42.344231, lng: -71.073315 },
    // { id: "4", "companyName": "The Model", "address": "126 Main St", "location": "Harvard Square", "description": "Half priced appetizers", "dayOfWeek": "Wednesday",  lat: 77, lng: -71.073315 },
    // { id: "5", "companyName": "Shifts", "address": "127 Main St", "location": "South End", "description": "$1 drafts", "dayOfWeek": "Tuesday",  lat: 77, lng: -71.073315 },
    // { id: "6", "companyName": "Tavern in the Square", "address": "128 Main St", "location": "Somerville", "description": "$2 burgers", "dayOfWeek": "Tuesday",  lat: 77, lng: -71.073315 },
    // { id: "7", "companyName": "McDonalds", "address": "129 Main St", "location": "North End", "description": "$2 drafts", "dayOfWeek": "Daily",  lat: 42.348311, lng: -71.073315 },
    // { id: "8", "companyName": "Trader Joe's", "address": "130 Main St", "location": "North End", "description": "$4 sandwiches", "dayOfWeek": "Daily",  lat: 42.333411, lng: -71.073315 },
    // { id: "9", "companyName": "Tasty Burger", "address": "131 Main St", "location": "Financial District", "description": "BOGO drafts", "dayOfWeek": "Daily",  lat: 42.348411, lng: -71.073315 },
    // { id: "10", "companyName": "Tasty Burger", "address": "132 Main St", "location": "Cambridge", "description": "Half priced appetizers", "dayOfWeek": "Tuesday",  lat: 42.348422, lng: -71.073315 },
    // { id: "11", "companyName": "Sweetgreen's", "address": "133 Main St", "location": "Harvard Square", "description": "$1 drafts", "dayOfWeek": "Sunday",  lat: 42.348411, lng: -71.073315 },
    // { id: "12", "companyName": "An Tain", "address": "134 Main St", "location": "Davis Square", "description": "$2 burgers", "dayOfWeek": "Monday",  lat: 42.3411, lng: -71.073315 },
    // { id: "13", "companyName": "Red House Tavern", "address": "135 Main St", "location": "South End", "description": "$2 drafts", "dayOfWeek": "Friday",  lat: 42.344031, lng: -71.073315 },
    // { id: "14", "companyName": "Dark Horse Tavern", "address": "136 Main St", "location": "Financial District", "description": "$4 sandwiches", "dayOfWeek": "Wednesday",  lat: 42.648411, lng: -71.073315 },
    // { id: "15", "companyName": "Tasty Burger", "address": "137 Main St", "location": "Back Bay", "description": "BOGO drafts", "dayOfWeek": "Tuesday",  lat: 42.648411, lng: -71.073315 },
    // { id: "16", "companyName": "Felipe's", "address": "138 Main St", "location": "Back Bay", "description": "Half priced appetizers", "dayOfWeek": "Tuesday",  lat: 42.348411, lng: -71.073315 },
    // { id: "17", "companyName": "Chimmichurri Steakhouse", "address": "139 Main St", "location": "Somerville", "description": "$1 drafts", "dayOfWeek": "Daily",  lat: 42.348411, lng: -71.073315 },
    // { id: "18", "companyName": "Coogan's", "address": "140 Main St", "location": "Harvard Square", "description": "$2 burgers", "dayOfWeek": "Tuesday",  lat: 42.348411, lng: -71.073315 },
    // { id: "19", "companyName": "Coogan's", "address": "141 Main St", "location": "South End", "description": "$2 drafts", "dayOfWeek": "Thursday",  lat: 42.348411, lng: -71.073315 },
    // { id: "20", "companyName": "Big Brain Steakhouse", "address": "142 Main St", "location": "Copley Square", "description": "$4 sandwiches", "dayOfWeek": "Tuesday",  lat: 42.348411, lng: -71.073315 },
    // { id: "21", "companyName": "Pokework's", "address": "143 Main St", "location": "Cambridge", "description": "BOGO drafts", "dayOfWeek": "Sunday",  lat: 42.348411, lng: -77 },
    { id: "22", "companyName": "Border Cafe", "address": "144 Main St", "location": ["Allston", "Back_Bay"], "description": "Half priced appetizers", "dayOfWeek": "Daily",  lat: 42.348411, lng: -71.073315 },
    { id: "23", "companyName": "Ben n Jerry's", "address": "145 Main St", "location": ["Brighton", "Copley_Square", "Boston"], "description": "$1 drafts", "dayOfWeek": "Daily",  lat: 42.348411, lng: -71.073315 },
    { id: "24", "companyName": "The 99", "address": "146 Main St", "location": ["Brighton", "Allston", "Boston"], "description": "$2 burgers", "dayOfWeek": "Daily",  lat: 42.348411, lng: -71.073315 },
    { id: "25", "companyName": "Amici's", "address": "147 Main St", "location": ["Brighton", "Allston", "Back_Bay"], "description": "$2 drafts", "dayOfWeek": "Daily",  lat: 42.348411, lng: -71.073315 }
];

POSTS = [{
  "id": 1,
  "companyName": "Flann O'Brien's",
  "address": "1619 Tremont St",
  "location": [
      "South_End",
      "Boston"
  ],
  "description": "Free wings w/ purchase of beverage",
  "dayOfWeek": "Daily",
  "lat": 42.333854,
  "lng": -71.103343,
  "placeid": "ChIJSSXrKo9544kRKijcZSfqYNQ",
  "detailIcon": "far fa-clock",
  "details": "After 9PM"
},
{
  "id": "2",
  "companyName": "The Avenue",
  "address": "1249 Commonwealth Ave",
  "city": "Allston",
  "location": [
      "Allston",
      "Brighton",
      "Boston"
  ],
  "description": "$2 burgers",
  "dayOfWeek": "Monday",
  "lat": 42.350156,
  "lng": -71.132124,
  "placeid": "ChIJgw3WEcZ544kRl1OnDzjRFns",
  "detailIcon": "far fa-clock",
  "details": "After 10PM"
},
{
  "id": 3,
  "companyName": "The Red Hat",
  "address": "9 Bowdoin St",
  "city": "Boston",
  "location": [
      "West_End",
      "Boston"
  ],
  "description": "$.10 cent wings",
  "dayOfWeek": "Daily",
  "lat": 42.360923,
  "lng": -71.063049,
  "placeid": "ChIJz4Ml6Jpw44kR5HvcyEKSeUM",
  "detailIcon": "",
  "details": ""
},
{
  "id": 4,
  "companyName": "McGreevy's",
  "address": "911 Boylston St",
  "city": "Boston",
  "location": [
      "Copley_Square",
      "Back_Bay",
      "Boston"
  ],
  "description": "$1 cheeseburgers 4-11pm",
  "dayOfWeek": "Tuesday",
  "lat": 42.348456,
  "lng": -71.084423,
  "placeid": "ChIJm9Kc7A9644kRFN5LXQoikuk",
  "detailIcon": "",
  "details": ""
},
{
  "id": 5,
  "companyName": "The Draft",
  "address": "34 Harvard Ave",
  "city": "Allston",
  "location": [
      "Allston",
      "Boston",
      "Brighton"
  ],
  "description": "$.35 cent wings",
  "dayOfWeek": "Sunday, Monday",
  "lat": 42.354846,
  "lng": -71.13246,
  "placeid": "ChIJJ7d7WsV544kRsc_8niKgO2o",
  "detailIcon": "",
  "details": ""
},
{
  "id": 6,
  "companyName": "Barracuda Tavern",
  "address": "15 Bosworth St",
  "city": "",
  "location": [
      "Downtown_Crossing",
      "Boston"
  ],
  "description": "$2 sliders",
  "dayOfWeek": "Monday",
  "lat": 42.357128,
  "lng": -71.060725,
  "placeid": "ChIJrZgpWoNw44kRcUu4aS4jzdg",
  "detailIcon": "",
  "details": ""
},
{
  "id": 7,
  "companyName": "Clarke's",
  "address": "21 Merchant Row",
  "city": "Boston",
  "location": [
      "Faneuil_Hall",
      "Boston",
      "Downtown_Crossing",
      "Financial_District"
  ],
  "description": "$5 pizza & taco specials",
  "dayOfWeek": "Daily",
  "lat": 42.359471,
  "lng": -71.0555,
  "placeid": "ChIJjTbKeYZw44kRHxgOJhTfGPk",
  "detailIcon": "far fa-clock",
  "details": "After 5PM"
},
{
  "id": 8,
  "companyName": "The Glenville Stops",
  "address": "87 Glenville Ave",
  "city": "",
  "location": [
      "Allston",
      "Boston"
  ],
  "description": "$1 oysters",
  "dayOfWeek": "Daily",
  "lat": 42.349499,
  "lng": -71.135011,
  "placeid": "ChIJ8whH7sh544kRM7Zj0fX_O3Y",
  "detailIcon": "far fa-clock",
  "details": "5PM-7PM"
},
{
  "id": 9,
  "companyName": "Lolita Back Bay",
  "address": "271 Dartmouth Street",
  "city": "",
  "location": [
      "Back_Bay",
      "Boston"
  ],
  "description": "$9 all you can eat tacos",
  "dayOfWeek": "Monday",
  "lat": 42.350664,
  "lng": -71.077443,
  "placeid": "ChIJ0VQFcQx644kR9HL-L98mUFY",
  "detailIcon": "fas fa-beer",
  "details": "After 5PM with drink purchase"
},
{
  "id": 10,
  "companyName": "The Asgard",
  "address": "350 Massachusetts Ave",
  "city": "",
  "location": [
      "Central_Square",
      "Cambridge",
      "MIT"
  ],
  "description": "$.25 cent wings",
  "dayOfWeek": "Monday",
  "lat": 42.362719,
  "lng": -71.099634,
  "placeid": "ChIJ9d1H8FR344kREiU1ulU7Juk",
  "detailIcon": "far fa-clock",
  "details": "After 5PM"
},
{
  "id": 11,
  "companyName": "Restaurant Dante",
  "address": "40 Edwin H. Land Blvd",
  "city": "",
  "location": [
      "Cambridge",
  ],
  "description": "$1 oysters",
  "dayOfWeek": "Daily",
  "lat": 42.366707,
  "lng": -71.075232,
  "placeid": "ChIJtQQAdb1w44kRnfbyG4CW6Z0",
  "detailIcon": "far fa-clock",
  "details": "2:30-6PM"
}]

// Getting the current day
let d = new Date();
let weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let currentDay = weekdays[d.getDay()];


// Resolvers
const resolvers = {
  Query: {
    posts: (parent, { location, dayOfWeek }) => {
      if (location.length===0) {
        return POSTS.filter(post => post.location.length>0 && ((post.dayOfWeek === currentDay) || ( post.dayOfWeek === dayOfWeek ) || (post.dayOfWeek === "Daily")));
      } else {
        return POSTS.filter(post => post.location.includes(location) && ((post.dayOfWeek === currentDay) || ( post.dayOfWeek === dayOfWeek ) || (post.dayOfWeek === "Daily")));
      }
      
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