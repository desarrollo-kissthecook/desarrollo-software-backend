const { merge } = require('lodash');
const jwtgenerator = require('jsonwebtoken');
const { ApolloServer, gql } = require('apollo-server-koa');
const orm = require('./models');
const session = require('./graphql/session');
const chef = require('./graphql/chefs');

const users = require('./graphql/users');

const typeDef = gql`
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs: [typeDef, session.typeDef, users.typeDef, chef.typeDef],
  resolvers: merge(session.resolvers, users.resolvers, chef.resolvers),
  playground: true,
  introspection: true,
  context: async ({ ctx }) => {
    const token = ctx.req.headers.authorization || '';
    const payload = jwtgenerator.decode(token);
    const userId = payload && payload.userId;
    const user = await orm.user.findByPk(userId);
    return {
      ...ctx,
      orm,
      user,
    };
  },
});

module.exports = server;
