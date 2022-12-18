// import dependency
import { gql } from '@apollo/client';

// define mutation for login
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

// define mutation for adding a user
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

// define mutation for creating a game
export const ADD_GAME = gql`
    mutation addGame($gameName: String!, $date: String!, $time: String!, $sport: String!, $number_of_players: String, $skill_level: String!, $location: String!, $gameCreator: String) {
        addGame(gameName: $gameName, date: $date, time: $time, sport: $sport, number_of_players: $number_of_players, skill_level: $skill_level, location: $location, gameCreator: $gameCreator) {
            _id
            gameName
            date
            time
            sport 
            number_of_players
            skill_level
            location
            gameCreator
        }
    }
`

// define mutation to join a game
export const JOIN_GAME = gql`
    mutation joinGame($joinedUsers: String!, $gameId: ID!) {
        joinGame(joinedUsers: $joinedUsers, gameId: $gameId) {
            _id
            gameName
            date
            time
            sport 
            number_of_players
            skill_level
            location
            gameCreator
            joinedUsers {
                _id
                username
            }
        }
    }
`