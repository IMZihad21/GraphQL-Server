import { ApolloServer } from 'apollo-server';
import typeDefs from './gqlDefs/typeDefs.js';
import resolvers from './gqlDefs/resolvers.js';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,  // see below for more about this
    cors: {
        origin: [ "https://www.your-app.example", "https://studio.apollographql.com" ],
        credentials: true
    },
});

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});