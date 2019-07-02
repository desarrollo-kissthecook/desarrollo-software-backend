const { gql } = require('apollo-server');

const resolvers = {
  Tag: {
    dishes: (root, args, context) => root.getDishes(),
  },
  Query: {
    tags: (root, args, context) => {
      const { orm } = context;
      return orm.tag.all();
    },

    tag: (root, args, context) => {
      const { orm } = context;
      return orm.tag.findByPk(args.id);
    },
  },
  Mutation: {
    createTag: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      return orm.tag.create(input);
    },
  },
};

const typeDef = gql`
  type Tag {
    id: ID!
    title: String
    color: String
    dishes: [Dish]
  }

  extend type Query {
    tags: [Tag]
    tag(id: Int!): Tag
  }
  input CreateTagInput {
    title: String!
    color: String
  }
  extend type Mutation {
    createTag(input: CreateTagInput!): Tag
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
