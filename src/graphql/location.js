const { gql } = require('apollo-server');

const resolvers = {
  Location: {
    dishes: (root, args, context) => root.getDishes(),
  },
  Query: {
    locations: (root, args, context) => {
      const { orm } = context;
      return orm.location.all();
    },

    location: (root, args, context) => {
      const { orm } = context;
      return orm.location.findByPk(args.id);
    },
  },
  Mutation: {
    createLocation: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      return orm.location.create(input);
    },
  },
};

const typeDef = gql`
  type Location {
    id: ID!
    address: String!
    alias: String!
    dishes: [Dish]
  }

  extend type Query {
    locations: [Location]
    location(id: Int!): Location
  }
  input CreateLocationInput {
    address: String!
    alias: String!
  }
  extend type Mutation {
    createLocation(input: CreateLocationInput!): Location!
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
