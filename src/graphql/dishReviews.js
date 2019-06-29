const { gql } = require('apollo-server');
const sendReservationEmail = require('../mailers/reservation');

const resolvers = {
  DishReview: {
    client: (root, args, context) => root.getClient(),
    dish: (root, args, context) => root.getDish(),
  },
  Query: {
    dishReviews: async (root, { dishId }, { orm }) => {
      const dish = await orm.dish.findByPk(dishId);
      return dish.getDishReviews();
    },
  },
  Mutation: {
    createDishReview: async (root, { input }, { user, orm }) => {
      if (!user) return null;
      const client = await user.getClient();
      const dish = await orm.dish.findByPk(input.dishId);
      if (!dish) return null;
      return client.createDishReview(input);
    },
  },
};

const typeDef = gql`
  type DishReview {
    id: ID!
    client: Client!
    comment: String
    ranking: Int
    dish: Dish!
  }

  extend type Query {
    dishReviews(dishId: ID): [DishReview]
  }

  input CreateDishReviewInput {
    dishId: ID!
    ranking: Int
    comment: String
  }

  extend type Mutation {
    createDishReview(input: CreateDishReviewInput!): DishReview
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
