const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } = require("graphql");
const { default: mongoose } = require("mongoose");
const { UserModel } = require("../../models/Users");
const UserType = require("../TypeDefs/UserType");


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                const users = await UserModel.find({});
                return users;
            },
        },
        getUser: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                const user = await UserModel.findById(mongoose.Types.ObjectId(args.id));
                return user;
            }
        }
    },
});

module.exports = RootQuery;