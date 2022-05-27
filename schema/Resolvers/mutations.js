const { GraphQLObjectType, GraphQLString } = require("graphql");
const UserType = require("../TypeDefs/UserType");
const userData = require('../../fakeData/users.json');
const { AuthenticationError } = require("apollo-server");


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        signup: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                const userExists = userData.find(user => user.email === args.email);
                if (userExists) {
                    throw new AuthenticationError("User with this email already exists");
                }
                const payload = {
                    id: userData.length + 1,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password,
                }
                userData.push(payload);
                const { password, ...userReturn } = payload;
                return userReturn;
            },
        },
        signin: {
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
                    const { password, ...userReturn } = user;
                    return userReturn;
                }
                else {
                    throw new AuthenticationError("Invalid Credentials");
                }
            }
        }
    },
});

module.exports = Mutation;