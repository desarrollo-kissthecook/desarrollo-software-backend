const { gql } = require('apollo-server');

const resolvers = {
  User: {
    chef: (root, args, context) => root.getChef(),
    client: (root, args, context) => root.getClient(),
  },
  Query: {
    users: (root, args, context) => {
      const { orm } = context;
      return orm.user.findAll();
    },

    user: (root, args, context) => {
      const { orm } = context;
      return orm.user.findByPk(args.id);
    },

    getUser: async (root, args, { user }) => {
      return user;
    },
  },
  Mutation: {
    createUser: async (root, { input }, { orm }) => {
      return orm.user.create(input);
    },

    editUser: async (root, { input }, { orm, user }) => {
      const userToEdit = await orm.user.findByPk(input.id);
      if (!user || !userToEdit || user.id !== userToEdit.id) return null;
      return userToEdit.update(input);
    },

    deleteUser: async (root, { input }, { orm, user }) => {
      const userToDestroy = await orm.user.findByPk(input.id);
      if (!user || !userToDestroy || user.id !== userToDestroy.id) return null;
      return userToDestroy.destroy();
    },

    addMoney: async (root, { input }, { orm, user }) => {
      if (!user) return null;

      const userToEdit = await orm.user.findByPk(user.id);
      if (input.money >= 0) {
        userToEdit.money += input.money;
        userToEdit.save();
        await orm.moneyTransfer.create({
          toId: user.id,
          amount: input.money,
        });
      }
      return userToEdit.money;
    },
    substractMoney: async (root, { input }, { orm, user }) => {
      if (!user) return null;

      const userToEdit = await orm.user.findByPk(user.id);
      if (input.money >= 0 && input.money < userToEdit.money) {
        userToEdit.money -= input.money;
        userToEdit.save();
        await orm.moneyTransfer.create({
          fromId: user.id,
          amount: input.money,
        });
      }
      return userToEdit.money;
    },
  },
};

const typeDef = gql`
  type User {
    id: ID!
    email: String
    password: String
    chef: Chef
    client: Client
    money: Int
  }

  extend type Query {
    users: [User]
    user(id: Int!, name: String, email: String, password: String): User
    getUser: User
  }

  input CreateUserInput {
    email: String!
    password: String!
  }

  input UserInput {
    email: String
    password: String
  }

  input MoneyInput {
    money: Int
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User!
    editUser(input: UserInput!): User!
    deleteUser(input: UserInput!): User!
    addMoney(input: MoneyInput): Int
    substractMoney(input: MoneyInput): Int
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
