const { gql } = require('apollo-server');

const resolvers = {
  Client: {
    user: (root, args, context) => root.getUser(),
    reservations: (root, args, context) => root.getReservations(),
  },
  Query: {
    clients: (root, args, context) => {
      const { orm } = context;
      return orm.client.all();
    },

    client: (root, args, context) => {
      const { orm } = context;
      return orm.client.findByPk(args.id);
    },
  },
  Mutation: {
    createClient: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      return orm.client.create(input);
    },

    editClient: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const client = await orm.client.findByPk(input.id);
      return client.update(input);
    },

    deleteClient: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const client = await orm.client.findByPk(input.id);
      client.destroy();
      return client;
    },
  },
};

const typeDef = gql`
  type Client {
    id: ID!
    user: User!
    reservations: [Reservation!]
    name: String!
    age: Int!
  }

  extend type Query {
    clients: [Client]
    client(id: Int!, userID: ID, name: String, age: Int): Client
  }

  input CreateClientInput {
    userId: ID!
    name: String!
    age: Int!
  }

  input ClientInput {
    id: Int!
    userId: ID
    name: String
    age: Int
  }

  extend type Mutation {
    createClient(input: CreateClientInput!): Client!
    editClient(input: ClientInput!): Client!
    deleteClient(input: ClientInput!): Client!
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
