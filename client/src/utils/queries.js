import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      games {
        gameName
        date
        sport
        number_of_players
        skill_level
        location
        gameCreator
      }
    }
  }
`;

export const QUERY_ALL_GAMES = gql`
  query games {
    games {
        _id
        date
        sport
        number_of_players
        skill_level
        location
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      games {
        _id
        gameName
        date
        sport
        number_of_players
        skill_level
        location
      }
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
    query game ($gameId: ID!) {
        game(gameId: $gameId) {
            _id
            date
            sport
            number_of_players
            skill_level
            location
        }
    }
`
