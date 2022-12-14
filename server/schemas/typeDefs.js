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
    _id: ID!
    date: Date
    time: Date
    sport: Array
    number_of_players: Number
    skill_level: Array
    location: Array
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
    addGame(date: Date, time: Date, sport: Array, number_of_players: Number, skill_level: Array, location: Array): Game
    removeGame(gameId: ID!): Game
  }
`;

module.exports = typeDefs;
