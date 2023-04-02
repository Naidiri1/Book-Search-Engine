const { AuthenticationError } = require("apollo-server-express");
const { Book, User } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      } else {
        throw new AuthenticationError("Not logged in!");
      }
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    logIn: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong Password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { authors, description, bookId, image, link, title }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedBooks: {
                authors,
                description,
                bookId,
                image,
                link,
                title,
              },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      // if there is no context.user, then this error will display
      throw new AuthenticationError("Not logged in!");
    },
    deleteBook: async (parent, {bookId}, context) =>{
        
    if (context.user){
        return await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
    }
    throw new AuthenticationError("Not logged in!");
    }
  },
};

module.exports = resolvers;
