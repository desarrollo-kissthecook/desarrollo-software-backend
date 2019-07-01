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

    editClient: async (root, { input }, { user }) => {
      if (!user) return null;
      const client = await user.getClient();
      return client.update(input);
    },

    deleteClient: async (root, args, { user }) => {
      if (!user) return null;
      const client = await user.getClient();
      await client.destroy();
      return client;
    },
    createClientUser: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const userCreated = await orm.user.create(input);
      return userCreated.createClient(input);
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
    name: String
    age: Int
  }
  input CreateClientUserInput {
    email: String!
    password: String!
    name: String!
    age: Int!
  }

  extend type Mutation {
    createClient(input: CreateClientInput!): Client!
    editClient(input: ClientInput!): Client
    deleteClient: Client
    createClientUser(input: CreateClientUserInput!): Client!
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
