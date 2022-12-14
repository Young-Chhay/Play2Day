import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      game {
        _id
        user
        date
        sport
        number_of_players
        skill_level
        location
        
      }
    }
  }
`;

export const QUERY_ALL_GAMES = gql`
  query getAllGames {
    games {
        _id
        user
        date
        sport
        number_of_players
        skill_level
        location
        createdAt
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
        user
        date
        sport
        number_of_players
        skill_level
        location
        createdAt
      }
    }
  }
`;
export const QUERY_SINGLE_GAME = gql`
    query getSingleGame($gameId: ID!) {
        singleGame(gameId: $gameId) {
            _id
            user
            date
            sport
            number_of_players
            skill_level
            location
            
        }
    }
`
