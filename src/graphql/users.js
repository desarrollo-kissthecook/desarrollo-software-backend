const { gql } = require('apollo-server');

const resolvers = {
  Query: {
    users: (root, args, context) => {
      const { orm } = context;
      return orm.user.findAll();
    },

    user: (root, args, context) => {
      const { orm } = context;
      return orm.user.findByPk(args.id);
    },
  },
  Mutation: {
    createUser: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      return orm.user.create(input);
    },

    editUser: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const user = await orm.user.findByPk(input.id);
      return user.update(input);
    },

    deleteUser: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const user = await orm.user.findByPk(input.id);
      user.destroy();
      return user;
    },
  },
};

const typeDef = gql`
  type User {
    id: ID!
    email: String
    password: String
  }

  extend type Query {
    users: [User]
    user(id: Int!, name: String, email: String, password: String): User
  }

  input CreateUserInput {
    email: String!
    password: String!
  }

  input IdUserInput {
    email: String
    password: String
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User!
    editUser(input: IdUserInput!): User!
    deleteUser(input: IdUserInput!): User!
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
