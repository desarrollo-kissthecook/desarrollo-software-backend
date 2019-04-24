const { gql } = require('apollo-server');

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
    createReservation: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      return orm.reservation.create(input);
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
    dish: Dish!
  }

  extend type Query {
    reservations: [Reservation]
    reservation(id: Int!, clientID: ID, comment: String, age: Int): Reservation
  }

  input CreateReservationInput {
    clientId: ID!
    comment: String!
    age: Int!
  }

  input ReservationInput {
    id: Int!
    clientId: ID
    comment: String
    age: Int
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
