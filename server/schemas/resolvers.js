const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('games');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    games: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Game.find(params);
    },
    game: async (parent, { gameId }) => {
      return Game.findOne({ _id: gameId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('games');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addGame: async (
      parent,
      { gameName, date, time, sport, number_of_players, skill_level, location },
      context
    ) => {
      if (context.user) {
        const game = await Game.create({
          gameName,
          date,
          time,
          sport,
          number_of_players,
          skill_level,
          location,
          gameCreator: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { games: game._id } }
        );

        return game;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeGame: async (parent, { gameId }, context) => {
      if (context.user) {
        const game = await Game.findOneAndDelete({
          _id: gameId,
          gameCreator: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { games: game._id } }
        );

        return game;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    joinGame: async (parent, { gameId }, context) => {
      if (context.user) {
        const game = await Game.findOneAndUpdate(
          { _id: gameId },
          { 
            $addToSet: { 
              joinedUsers: { username: context.user.username } 
            }
          },
        );

        return game;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;

