const { ApolloServer } = require('apollo-server');
const { GraphQLSchema } = require("graphql");
const Mutation = require('./schema/Resolvers/mutations.js');
const RootQuery = require('./schema/Resolvers/queries.js');

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

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});