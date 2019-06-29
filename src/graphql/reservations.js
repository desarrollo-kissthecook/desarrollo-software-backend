const { gql } = require('apollo-server');
const sendReservationEmailClient = require('../mailers/reservationClient');
const sendReservationEmailChef = require('../mailers/reservationChef');

const resolvers = {
  Reservation: {
    client: (root, args, context) => root.getClient(),
    dish: (root, args, context) => root.getDish(),
  },
  Query: {
    reservations: (root, args, context) => {
      const { orm } = context;
      return orm.reservation.all();
    },

    reservation: (root, args, context) => {
      const { orm } = context;
      return orm.reservation.findByPk(args.id);
    },
  },
  Mutation: {
    createReservation: async (root, { input }, { user, ctx, orm }) => {
      if (!user) return null;
      const client = await user.getClient();
      const dish = await orm.dish.findByPk(input.dishId);
      const chef = await orm.chef.findByPk(dish.chefId);
      const userChef = await orm.user.findByPk(chef.userId);
      sendReservationEmailClient(ctx, { user, dish });
      sendReservationEmailChef(ctx, { user, userChef, dish });
      return client.createReservation(input);
    },

    editReservation: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const reservation = await orm.reservation.findByPk(input.id);
      return reservation.update(input);
    },

    deleteReservation: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const reservation = await orm.reservation.findByPk(input.id);
      reservation.destroy();
      return reservation;
    },
  },
};

const typeDef = gql`
  type Reservation {
    id: ID!
    client: Client!
    comment: String!
    delivered: Boolean!
    dish: Dish!
  }

  extend type Query {
    reservations: [Reservation]
    reservation(id: Int!, clientID: ID, comment: String, age: Int): Reservation
  }

  input CreateReservationInput {
    dishId: ID!
    comment: String
  }

  input ReservationInput {
    id: Int!
    clientId: ID
    comment: String
    delivered: Boolean
  }

  extend type Mutation {
    createReservation(input: CreateReservationInput!): Reservation!
    editReservation(input: ReservationInput!): Reservation!
    deleteReservation(input: ReservationInput!): Reservation!
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
