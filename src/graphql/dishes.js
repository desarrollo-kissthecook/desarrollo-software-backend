const fs = require('fs');
const { gql } = require('apollo-server');
const { processUpload, s3 } = require('../services/fileUpload');
const amazonConfig = require('../config/amazon');

const resolvers = {
  Dish: {
    chef: (root, args, context) => root.getChef(),
    dishImages: (root, args, context) => root.getDishImages(),
    dishReviews: (root, args, context) => root.getDishReviews(),
  },
  Query: {
    dishes: (root, args, context) => {
      const { orm } = context;
      return orm.dish.all();
    },

    dish: (root, args, context) => {
      const { orm } = context;
      return orm.dish.findByPk(args.id);
    },
  },
  Mutation: {
    createDish: async (root, args, context) => {
      const { user } = context;
      const { input } = args;
      if (!user) return null;
      const chef = await user.getChef();
      return chef.createDish(input);
    },

    editDish: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const dish = await orm.dish.findByPk(input.id);
      return dish.update(input);
    },

    deleteDish: async (root, args, context) => {
      const { orm } = context;
      const { input } = args;
      const dish = await orm.dish.findByPk(input.id);
      dish.destroy();
      return dish;
    },

    uploadDishImage: async (root, args, context) => {
      const { user, orm } = context;
      const file = await args.input;
      if (!user) return null;
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
      const input = { dishId: args.dishId, url };
      await orm.dishImage.create(input);
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
  type Dish {
    id: ID!
    chef: Chef!
    description: String
    name: String
    price: Int
    dishImages: [DishImage!]
    dishReviews: [DishReview!]
  }

  type DishImage {
    id: ID!
    url: String!
    dish: Dish!
  }

  extend type Query {
    dishes: [Dish]
    dish(id: Int!, chefID: ID, description: String): Dish
  }
  input CreateDishInput {
    description: String!
    name: String!
    price: Int!
  }
  input DishInput {
    id: Int!
    chefId: ID
    description: String
    name: String
    price: Int
  }
  extend type Mutation {
    createDish(input: CreateDishInput!): Dish!
    editDish(input: DishInput!): Dish!
    deleteDish(input: DishInput!): Dish!
    uploadDishImage(input: Upload!, dishId: Int!): file!
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
