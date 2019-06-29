const { gql } = require('apollo-server');
const sendReservationEmail = require('../mailers/reservation');

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
      const userToEdit = await orm.user.findByPk(user.id);
      const client = await userToEdit.getClient();
      const dish = await orm.dish.findByPk(input.dishId);
      const chef = await dish.getChef();
      const chefUser = await chef.getUser();
      sendReservationEmail(ctx, { user: userToEdit, dish });
      userToEdit.money -= dish.price;
      userToEdit.save();
      chefUser.money += dish.price;
      chefUser.save();

      await orm.moneyTransfer.create({
        fromId: userToEdit.id,
        toId: chefUser.id,
        amount: dish.price,
      });
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
