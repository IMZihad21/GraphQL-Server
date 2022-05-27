const { ApolloServer } = require('apollo-server');
const { GraphQLSchema } = require("graphql");
const Mutation = require('./schema/Resolvers/mutations.js');
const RootQuery = require('./schema/Resolvers/queries.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// read the mongoose connection string from an environment variable
const MONGO_URI = process.env.MONGO_URI;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    schema: new GraphQLSchema({ query: RootQuery, mutation: Mutation }),
    csrfPrevention: true,  // see below for more about this
    cors: {
        origin: [ "http://localhost:8080", "https://studio.apollographql.com" ],
        credentials: true
    },
});

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        // The `listen` method launches a web server.
        server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
            console.log(`🚀  Server ready at ${url}`);
        });
    })
    .catch(err => {
        console.error(err);
    });