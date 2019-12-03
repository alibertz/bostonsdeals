const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const POSTS = [
  // { id: "1", companyName: "6B Lounge", address: "6 Beacon Street", location: "Back Bay", description: "$.25 cent wings & $5 mini flatbreads", dayOfWeek: "Monday", expiryDate: ""},
  // { id: "2", companyName: "Moogy's Restaurant", address: "154 Chestnut Hill Avenue, Brighton", location: "Brighton", description: "$2 burgers & $1 PBRs", dayOfWeek: "Tuesday", expiryDate: ""},
  // { id: "3", companyName: "Stella", address: "1525 Washington Street, Boston", location: "South End", description: "$6 appetizers from 4-6PM", dayOfWeek: "Weekday", expiryDate: ""},
  // { id: "4", companyName: "Red House", address: "98 Winthrop Street, Cambridge", location: "West Cambridge", description: "$.20c wings at the bar (with purchase of alcoholic beverage)", dayOfWeek: "Tuesday", expiryDate: ""},
  // { id: "5", companyName: "Gem", address: "42 Province Street, Boston", location: "North End", description: "$.50c wings & 1/2 priced pizza", dayOfWeek: "Friday", expiryDate: ""},
  // { id: "6", companyName: "An Tain", address: "31 India Street, Boston", location: "North End", description: "$1 draft beers", dayOfWeek: "Thursday", expiryDate: ""},
  // { id: "7", companyName: "Border Cafe", address: "34 Church Street", location: "Harvard Square", description: "$2 tacos", dayOfWeek: "Sunday", expiryDate: "" },
  { "id": 1, "companyName": "Stella", "address": "123 Main St", "location": "Back Bay", "description": "$2 drafts", "dayOfWeek": "Sunday", "expiryDate": "N\/A" },
  { "id": 2, "companyName": "Border Cafe", "address": "124 Main St", "location": "Cambridge", "description": "$4 sandwiches", "dayOfWeek": "Monday", "expiryDate": "N\/A" },
  { "id": 3, "companyName": "McDonalds", "address": "125 Main St", "location": "Copley Square", "description": "BOGO drafts", "dayOfWeek": "Friday", "expiryDate": "N\/A" },
  { "id": 4, "companyName": "The Model", "address": "126 Main St", "location": "Harvard Square", "description": "Half priced appetizers", "dayOfWeek": "Wednesday", "expiryDate": "N\/A" },
  { "id": 5, "companyName": "Shifts", "address": "127 Main St", "location": "South End", "description": "$1 drafts", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
  { "id": 6, "companyName": "Tavern in the Square", "address": "128 Main St", "location": "Somerville", "description": "$2 burgers", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
  { "id": 7, "companyName": "McDonalds", "address": "129 Main St", "location": "North End", "description": "$2 drafts", "dayOfWeek": "Daily", "expiryDate": "N\/A" },
  { "id": 8, "companyName": "Trader Joe's", "address": "130 Main St", "location": "North End", "description": "$4 sandwiches", "dayOfWeek": "Daily", "expiryDate": "N\/A" },
  { "id": 9, "companyName": "Tasty Burger", "address": "131 Main St", "location": "Financial District", "description": "BOGO drafts", "dayOfWeek": "Daily", "expiryDate": "N\/A" },
  { "id": 10, "companyName": "Tasty Burger", "address": "132 Main St", "location": "Cambridge", "description": "Half priced appetizers", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
  { "id": 11, "companyName": "Sweetgreen's", "address": "133 Main St", "location": "Harvard Square", "description": "$1 drafts", "dayOfWeek": "Sunday", "expiryDate": "N\/A" },
  { "id": 12, "companyName": "An Tain", "address": "134 Main St", "location": "Davis Square", "description": "$2 burgers", "dayOfWeek": "Monday", "expiryDate": "N\/A" },
  { "id": 13, "companyName": "Red House Tavern", "address": "135 Main St", "location": "South End", "description": "$2 drafts", "dayOfWeek": "Friday", "expiryDate": "N\/A" },
  { "id": 14, "companyName": "Dark Horse Tavern", "address": "136 Main St", "location": "Financial District", "description": "$4 sandwiches", "dayOfWeek": "Wednesday", "expiryDate": "N\/A" },
  { "id": 15, "companyName": "Tasty Burger", "address": "137 Main St", "location": "Back Bay", "description": "BOGO drafts", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
  { "id": 16, "companyName": "Felipe's", "address": "138 Main St", "location": "Back Bay", "description": "Half priced appetizers", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
  { "id": 17, "companyName": "Chimmichurri Steakhouse", "address": "139 Main St", "location": "Somerville", "description": "$1 drafts", "dayOfWeek": "Daily", "expiryDate": "N\/A" },
  { "id": 18, "companyName": "Coogan's", "address": "140 Main St", "location": "Harvard Square", "description": "$2 burgers", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
  { "id": 19, "companyName": "Coogan's", "address": "141 Main St", "location": "South End", "description": "$2 drafts", "dayOfWeek": "Thursday", "expiryDate": "N\/A" },
  { "id": 20, "companyName": "Big Brain Steakhouse", "address": "142 Main St", "location": "Copley Square", "description": "$4 sandwiches", "dayOfWeek": "Tuesday", "expiryDate": "N\/A" },
  { "id": 21, "companyName": "Pokework's", "address": "143 Main St", "location": "Cambridge", "description": "BOGO drafts", "dayOfWeek": "Sunday", "expiryDate": "N\/A" },
  { "id": 22, "companyName": "Border Cafe", "address": "144 Main St", "location": "North End", "description": "Half priced appetizers", "dayOfWeek": "Monday", "expiryDate": "N\/A" },
  { "id": 23, "companyName": "Ben n Jerry's", "address": "145 Main St", "location": "Brighton", "description": "$1 drafts", "dayOfWeek": "Friday", "expiryDate": "N\/A" },
  { "id": 24, "companyName": "The 99", "address": "146 Main St", "location": "Brighton", "description": "$2 burgers", "dayOfWeek": "Wednesday", "expiryDate": "N\/A" },
  { "id": 25, "companyName": "Amici's", "address": "147 Main St", "location": "Brighton", "description": "$2 drafts", "dayOfWeek": "Daily", "expiryDate": "N\/A" }
];

const schema = buildASTSchema(gql`
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
    expiryDate: String
  }
`);

const mapPost = (post, id) => post && ({ id, ...post });

let d = new Date();
let weekdays = new Array(7);
weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";

let currentDay = weekdays[d.getDay()];

const root = {
  posts: function ({location, dayOfWeek}) {
    return POSTS.filter(post => post.location.toUpperCase().includes(location.toUpperCase()) && ((post.dayOfWeek === currentDay) || ( post.dayOfWeek === dayOfWeek ) || (post.dayOfWeek === "Daily")));
  },
  post: ({ id }) => mapPost(POSTS[id], id)
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);