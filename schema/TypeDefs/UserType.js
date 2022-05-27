// import createType from 'mongoose-schema-to-graphql';
const createType = require('mongoose-schema-to-graphql');
const { UserSchema } = require('../../models/Users');

const config = {
    name: 'userType',
    description: 'User schema',
    class: 'GraphQLObjectType',
    schema: UserSchema,
    exclude: [ '_id', '__v' ]
};

const UserType = createType(config);

module.exports = UserType;