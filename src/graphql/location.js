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
    editLocation: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const location = await orm.location.findByPk(input.locationId);
      return location.update(input);
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
  input EditLocationInput {
    address: String!
    alias: String!
    locationId: ID!
  }
  extend type Mutation {
    createLocation(input: CreateLocationInput!): Location!
    editLocation(input: EditLocationInput!): Location
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
