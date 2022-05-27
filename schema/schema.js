const { AuthenticationError } = require("apollo-server");
const {
    GraphQLInt, GraphQLList, GraphQLObjectType,
    GraphQLSchema, GraphQLString
} = require("graphql");
const userData = require('../fakeData/users.json')
const UserType = require('./TypeDefs/UserType');

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return userData;
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                const payload = {
                    id: userData.length + 1,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password,
                }
                userData.push(payload);
                return payload;
            },
        },
        authentication: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                const user = userData.find(user => {
                    if (user.email === args.email && user.password === args.password) {
                        return user;
                    }
                })
                if (user) {
                    return user;
                }
                else {
                    throw new AuthenticationError("Invalid Credentials");
                }
            }
        }
    },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });