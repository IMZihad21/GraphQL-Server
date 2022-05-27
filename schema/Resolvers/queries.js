const { GraphQLInt, GraphQLList, GraphQLObjectType } = require("graphql");
const UserType = require("../TypeDefs/UserType");
const userData = require('../../fakeData/users.json');


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

module.exports = RootQuery;