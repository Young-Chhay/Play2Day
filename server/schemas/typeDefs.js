const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    games: [Game]!
  }

  type Game {
    _id: ID
    gameName: String
    date: String
    time: String
    sport: String
    number_of_players: String
    skill_level: String
    location: String
    gameCreator: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    games(username: String): [Game]
    game(gameId: ID!): Game
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGame(
      gameName: String!
      date: String!
      time: String!
      sport: String!
      number_of_players: String
      skill_level: String!
      location: String!
      gameCreator: String
    ): Game
    removeGame(gameId: ID!): Game
  }
`;

module.exports = typeDefs;
