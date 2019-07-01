const { gql } = require('apollo-server');
const jwtgenerator = require('jsonwebtoken');

const resolvers = {
  Mutation: {
    signIn: async (root, args, { orm }) => {
      let token;
      const { email, password } = args.input;
      if (!email || !password) return null;
      const user = await orm.user.find({ where: { email } });
      if (user && (await user.checkPassword(password))) {
        token = await new Promise((resolve, reject) => {
          jwtgenerator.sign(
            { userId: user.id },
            process.env.TOKEN_SECRET,
            (err, tokenResult) => (err ? reject(err) : resolve(tokenResult))
          );
        });
      }
      return { user, token };
    },
  },
};

const typeDef = gql`
  type SignInPayload {
    token: String
    user: User
  }

  input SignInInput {
    email: String
    password: String
  }

  extend type Mutation {
    signIn(input: SignInInput): SignInPayload!
  }
`;

module.exports = {
  resolvers,
  typeDef,
};
