const { gql } = require('apollo-server');

const resolvers = {
  Chef: {
    user: (root, args, context) => root.getUser(),
    dishes: (root, args, context) => root.getDishes(),
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

    editChef: async (root, { input }, { user }) => {
      if (!user) return null;
      const chef = await user.getChef();
      return chef.update(input);
    },

    deleteChef: async (root, args, { user }) => {
      if (!user) return null;
      const chef = await user.getChef();
      await chef.destroy();
      return chef;
    },
    createChefUser: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const userCreated = await orm.user.create(input);
      return userCreated.createChef(input);
    },
  },
};

const typeDef = gql`
  type Chef {
    id: ID!
    user: User!
    description: String
    address: String
    dishes: [Dish!]
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
    description: String
    address: String
  }
  input CreateChefUserInput {
    email: String!
    password: String!
    description: String!
    address: String!
  }
  extend type Mutation {
    createChef(input: CreateChefInput!): Chef!
    editChef(input: ChefInput!): Chef!
    deleteChef: Chef!
    createChefUser(input: CreateChefUserInput!): Chef!
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
