const fs = require('fs');
const { gql } = require('apollo-server');
const { processUpload, s3 } = require('../services/fileUpload');
const amazonConfig = require('../config/amazon');

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
    async uploadImageUser(root, args, context) {
      const { user } = context;
      const file = await args.input;
      const fileName = file.filename;
      const mimeType = file.mimetype;
      const { encoding } = file;
      const { id, path } = await processUpload(file);
      const myKey = id;
      const { myBucket } = amazonConfig;
      // eslint-disable-next-line consistent-return
      await fs.readFile(path, (err, data) => {
        if (err) {
          return null;
        }
        const params = {
          Bucket: myBucket,
          Key: myKey,
          Body: data,
          ACL: 'public-read-write',
        };
        s3.putObject(params, err2 => {
          if (err2) {
            return null;
          }
          return true;
        });
      });
      const url = `https://s3.us-east-2.amazonaws.com/${myBucket}/${myKey}`;
      await fs.unlinkSync(path);
      await user.update({ image: url });
      return {
        fileName,
        mimeType,
        encoding,
        url,
      };
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
  }

  type file {
    fileName: String!
    mimeType: String!
    encoding: String!
    url: String
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

  extend type Mutation {
    createUser(input: CreateUserInput!): User!
    editUser(input: UserInput!): User!
    deleteUser(input: UserInput!): User!
    uploadFile(input: Upload!): file!
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
