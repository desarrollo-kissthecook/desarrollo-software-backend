const { gql } = require('apollo-server');

const resolvers = {
  Dish: {
    chef: (root, args, context) => root.getChef(),
  },
  Query: {
    dishes: (root, args, context) => {
      const { orm } = context;
      return orm.dish.all();
    },

    dish: (root, args, context) => {
      const { orm } = context;
      return orm.dish.findByPk(args.id);
    },
  },
  Mutation: {
    createDish: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      return orm.dish.create(input);
    },

    editDish: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const dish = await orm.dish.findByPk(input.id);
      return dish.update(input);
    },

    deleteDish: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const dish = await orm.dish.findByPk(input.id);
      dish.destroy();
      return dish;
    },
  },
};

const typeDef = gql`
  type Dish {
    id: ID!
    chef: Chef!
    description: String
    name: String
    price: Int
  }
  extend type Query {
    dishes: [Dish]
    dish(id: Int!, chefID: ID, description: String): Dish
  }
  input CreateDishInput {
    chefId: ID!
    description: String!
    name: String!
    price: Int!
  }
  input DishInput {
    id: Int!
    chefId: ID
    description: String
    name: String
    price: Int
  }
  extend type Mutation {
    createDish(input: CreateDishInput!): Dish!
    editDish(input: DishInput!): Dish!
    deleteDish(input: DishInput!): Dish!
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
