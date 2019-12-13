const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// Schema
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Query {
    posts(location: String dayOfWeek: String): [Post]
    post(id: ID): Post
    postys: [Post]
  }

  type Post {
    id: ID
    companyName: String
    address: String
    location: String
    description: String
    dayOfWeek: String
    expiryDate: String
  }
`;

// Data set
const POSTS = [
    { id: "1", companyName: "Stella", address: "123 Main St", location: "Back Bay", description: "$2 drafts", dayOfWeek: "Sunday", expiryDate: "N\/A" },
    { id: "2", "companyName": "Border Cafe", "address": "124 Main St", "location": "Cambridge", "description": "$4 sandwiches", "dayOfWeek": "Monday", "expiryDate": "N\/A" },
    { id: "3", "companyName": "McDonalds", "address": "125 Main St", "location": "Copley Square", "description": "BOGO drafts", "dayOfWeek": "Friday", "expiryDate": "N\/A" },
    { id: "4", "companyName": "The Model", "address": "126 Main St", "location": "Harvard Square", "description": "Half priced appetizers", "dayOfWeek": "Wednesday", "expiryDate": "N\/A" },
    { id: "5", "companyName": "Shifts", "address": "127 Main St", "location": "South End", "description": "$1 drafts", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
    { id: "6", "companyName": "Tavern in the Square", "address": "128 Main St", "location": "Somerville", "description": "$2 burgers", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
    { id: "7", "companyName": "McDonalds", "address": "129 Main St", "location": "North End", "description": "$2 drafts", "dayOfWeek": "Daily", "expiryDate": "N\/A" },
    { id: "8", "companyName": "Trader Joe's", "address": "130 Main St", "location": "North End", "description": "$4 sandwiches", "dayOfWeek": "Daily", "expiryDate": "N\/A" },
    { id: "9", "companyName": "Tasty Burger", "address": "131 Main St", "location": "Financial District", "description": "BOGO drafts", "dayOfWeek": "Daily", "expiryDate": "N\/A" },
    { id: "10", "companyName": "Tasty Burger", "address": "132 Main St", "location": "Cambridge", "description": "Half priced appetizers", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
    { "id": "11", "companyName": "Sweetgreen's", "address": "133 Main St", "location": "Harvard Square", "description": "$1 drafts", "dayOfWeek": "Sunday", "expiryDate": "N\/A" },
    { "id": "12", "companyName": "An Tain", "address": "134 Main St", "location": "Davis Square", "description": "$2 burgers", "dayOfWeek": "Monday", "expiryDate": "N\/A" },
    { "id": "13", "companyName": "Red House Tavern", "address": "135 Main St", "location": "South End", "description": "$2 drafts", "dayOfWeek": "Friday", "expiryDate": "N\/A" },
    { "id": "14", "companyName": "Dark Horse Tavern", "address": "136 Main St", "location": "Financial District", "description": "$4 sandwiches", "dayOfWeek": "Wednesday", "expiryDate": "N\/A" },
    { "id": "15", "companyName": "Tasty Burger", "address": "137 Main St", "location": "Back Bay", "description": "BOGO drafts", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
    { "id": "16", "companyName": "Felipe's", "address": "138 Main St", "location": "Back Bay", "description": "Half priced appetizers", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
    { "id": "17", "companyName": "Chimmichurri Steakhouse", "address": "139 Main St", "location": "Somerville", "description": "$1 drafts", "dayOfWeek": "Daily", "expiryDate": "N\/A" },
    { "id": "18", "companyName": "Coogan's", "address": "140 Main St", "location": "Harvard Square", "description": "$2 burgers", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
    { "id": "19", "companyName": "Coogan's", "address": "141 Main St", "location": "South End", "description": "$2 drafts", "dayOfWeek": "Thursday", "expiryDate": "N\/A" },
    { "id": "20", "companyName": "Big Brain Steakhouse", "address": "142 Main St", "location": "Copley Square", "description": "$4 sandwiches", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
    { "id": "21", "companyName": "Pokework's", "address": "143 Main St", "location": "Cambridge", "description": "BOGO drafts", "dayOfWeek": "Sunday", "expiryDate": "N\/A" },
    { "id": "22", "companyName": "Border Cafe", "address": "144 Main St", "location": "North End", "description": "Half priced appetizers", "dayOfWeek": "Monday", "expiryDate": "N\/A" },
    { "id": "23", "companyName": "Ben n Jerry's", "address": "145 Main St", "location": "Brighton", "description": "$1 drafts", "dayOfWeek": "Friday", "expiryDate": "N\/A" },
    { "id": "24", "companyName": "The 99", "address": "146 Main St", "location": "Brighton", "description": "$2 burgers", "dayOfWeek": "Wednesday", "expiryDate": "N\/A" },
    { "id": "25", "companyName": "Amici's", "address": "147 Main St", "location": "Brighton", "description": "$2 drafts", "dayOfWeek": "Daily", "expiryDate": "N\/A" }
];

// Getting the current day
let d = new Date();
let weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let currentDay = weekdays[d.getDay()];


// Resolvers
const resolvers = {
  Query: {
    posts: (parent, {location, dayOfWeek}) => {
      // return POSTS.filter(post => post.location.toUpperCase().includes(location.toUpperCase()) && ((post.dayOfWeek === currentDay) || ( post.dayOfWeek === dayOfWeek ) || (post.dayOfWeek === "Daily")));
      return POSTS.filter(post => post.location.toUpperCase().includes(location.toUpperCase()) && ((post.dayOfWeek === currentDay) || ( post.dayOfWeek === dayOfWeek ) || (post.dayOfWeek === "Daily")));
    },
    post: (parent, { id }) => {
      return POSTS.find(post => post.id === id);
    },
    postys: () => POSTS
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});