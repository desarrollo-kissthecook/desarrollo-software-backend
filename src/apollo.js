const { merge } = require('lodash');
const jwtgenerator = require('jsonwebtoken');
const { ApolloServer, gql } = require('apollo-server-koa');
const orm = require('./models');
const session = require('./graphql/session');
const chef = require('./graphql/chefs');
const client = require('./graphql/clients');
const users = require('./graphql/users');
const reservation = require('./graphql/reservations');
const dish = require('./graphql/dishes');

const typeDef = gql`
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs: [
    typeDef,
    session.typeDef,
    users.typeDef,
    chef.typeDef,
    client.typeDef,
    reservation.typeDef,
    dish.typeDef,
  ],
  resolvers: merge(
    session.resolvers,
    users.resolvers,
    chef.resolvers,
    client.resolvers,
    reservation.resolvers,
    dish.resolvers
  ),
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
