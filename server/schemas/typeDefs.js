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
    date: String
    time: String
    sport: String
    Int_of_players: Int
    skill_level: String
    location: String
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
    addGame(date: String, time: String, sport: String, number_of_players: Int, skill_level: String, location: String): Game
    removeGame(gameId: ID!): Game
  }
`;

module.exports = typeDefs;
