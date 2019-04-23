const { gql } = require('apollo-server');

const resolvers = {
  Chef: {
    user: (root, args, context) => root.getUser(),
  },
  Query: {
    chefs: (root, args, context) => {
      const { orm } = context;
      return orm.chef.all();
    },

    chef: (root, args, context) => {
      const { orm } = context;
      return orm.chef.findByPk(args.id);
    },
  },
  Mutation: {
    createChef: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      return orm.chef.create(input);
    },

    editChef: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const chef = await orm.chef.findByPk(input.id);
      return chef.update(input);
    },

    deleteChef: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const chef = await orm.chef.findByPk(input.id);
      chef.destroy();
      return chef;
    },
  },
};

const typeDef = gql`
  type Chef {
    id: ID!
    user: User!
    description: String
    address: String
  }

  extend type Query {
    chefs: [Chef]
    chef(id: Int!, userID: ID, description: String, address: String): Chef
  }

  input CreateChefInput {
    userId: ID!
    description: String!
    address: String!
  }

  input ChefInput {
    id: Int!
    userId: ID
    description: String
    address: String
  }

  extend type Mutation {
    createChef(input: CreateChefInput!): Chef!
    editChef(input: ChefInput!): Chef!
    deleteChef(input: ChefInput!): Chef!
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
