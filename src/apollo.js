const { merge } = require('lodash');
const { ApolloServer, gql } = require('apollo-server-koa');
const orm = require('./models');
const users = require('./graphql/users');

const typeDef = gql`
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs: [typeDef, users.typeDef],
  resolvers: merge(users.resolvers),
  playground: true,
  introspection: true,
  context: { orm },
});

module.exports = server;
