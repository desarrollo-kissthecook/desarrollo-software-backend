const { gql } = require('apollo-server');
const { Op } = require('sequelize');

const resolvers = {
  MoneyTransfer: {
    to: (root, args, context) => root.getTo(),
    from: (root, args, context) => root.getFrom(),
  },
  Query: {
    moneyTransfers: async (root, args, { orm: { moneyTransfer }, user }) => {
      if (!user) return [];
      return moneyTransfer.findAll({
        where: { [Op.or]: [{ fromId: user.id }, { toId: user.id }] },
      });
    },
  },
};

const typeDef = gql`
  type MoneyTransfer {
    to: User
    from: User
    amount: Int
  }

  extend type Query {
    moneyTransfers: [MoneyTransfer]
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
