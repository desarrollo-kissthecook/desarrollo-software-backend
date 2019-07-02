const { gql } = require('apollo-server');
const { asyncForEach } = require('../utils');

const resolvers = {
  Chef: {
    user: (root, args, context) => root.getUser(),
    dishes: (root, args, context) => root.getDishes(),
    ranking: async (root, args, context) => {
      const dishes = await root.getDishes();
      const reviews = [];
      await asyncForEach(dishes, async dish => {
        reviews.push(await dish.getDishReviews());
      });
      let sum = 0;
      let count = 0;
      reviews.forEach(reviewsList => {
        reviewsList.forEach(r => {
          sum += r.ranking;
        });
        count += reviewsList.length;
      });
      return sum / count;
    },
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
    name: String
    dishes: [Dish!]
    ranking: Float
  }
  extend type Query {
    chefs: [Chef]
    chef(id: Int!, userID: ID, description: String, address: String): Chef
  }
  input CreateChefInput {
    userId: ID!
    description: String
    address: String
    name: String
  }
  input ChefInput {
    description: String
    address: String
    name: String
  }
  input CreateChefUserInput {
    email: String!
    password: String!
    description: String!
    address: String!
    name: String
  }
  extend type Mutation {
    createChef(input: CreateChefInput!): Chef
    editChef(input: ChefInput!): Chef
    deleteChef: Chef
    createChefUser(input: CreateChefUserInput!): Chef
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
