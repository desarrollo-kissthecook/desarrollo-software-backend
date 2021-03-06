const fs = require('fs');
const { gql } = require('apollo-server');
const { processUpload, s3 } = require('../services/fileUpload');
const amazonConfig = require('../config/amazon');

const resolvers = {
  Dish: {
    chef: (root, args, context) => root.getChef(),
    dishImages: (root, args, context) => root.getDishImages(),
    location: (root, args, context) => root.getLocation(),
    dishReviews: (root, args, context) => root.getDishReviews(),
    tags: (root, args, context) => root.getTags(),
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
    createDish: async (root, args, { user, orm }) => {
      const { input } = args;
      if (!user) return null;
      const chef = await user.getChef();
      const dish = await chef.createDish(input);
      // eslint-disable-next-line func-names
      if (input.images) {
        // eslint-disable-next-line func-names
        input.images.forEach(function(image) {
          dish.createDishImage({ url: image });
        });
      }

      if (input.tagId) {
        await orm.dishTag.create({
          dishId: dish.id,
          tagId: input.tagId,
        });
      }
      return dish;
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
    addTagToDish: async (root, { input }, { orm }) => {
      const dish = await orm.dish.findByPk(input.dishId);
      const dishTags = await dish.getTags();
      if (!dishTags.some(tag => tag.id === input.tagId)) {
        orm.dishTag.create(input);
      }
      return dish;
    },
    removeTagToDish: async (root, { input }, { orm }) => {
      const dish = await orm.dish.findByPk(input.dishId);
      const dishTags = await dish.getTags();
      if (!dishTags.some(tag => tag.id === input.tagId)) {
        const dishTag = await orm.dishTag.findOne({
          where: input,
        });
        await dishTag.destroy();
      }
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
  scalar Date

  type Dish {
    id: ID!
    chef: Chef!
    description: String
    name: String
    price: Int
    beginDate: Date
    endDate: Date
    stock: Int
    sales: Int
    dishImages: [DishImage!]
    location: Location
    dishReviews: [DishReview!]
    tags: [Tag]
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
    locationId: Int!
    tagId: Int
    beginDate: Date
    endDate: Date
    stock: Int
    sales: Int
    images: [String]
  }
  input DishInput {
    id: Int!
    chefId: ID
    description: String
    name: String
    price: Int
    beginDate: Date
    endDate: Date
    locationId: Int
    stock: Int
    sales: Int
  }
  input DishTagInput {
    dishId: ID!
    tagId: ID!
  }
  extend type Mutation {
    createDish(input: CreateDishInput!): Dish!
    editDish(input: DishInput!): Dish!
    deleteDish(input: DishInput!): Dish!
    uploadDishImage(input: Upload!, dishId: Int!): file!
    addTagToDish(input: DishTagInput): Dish
    removeTagToDish(input: DishTagInput): Dish
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
