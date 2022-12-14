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
    mutation addGame($date: Date!, $time: Date!, $sport: String, $number_of_players: Number, $skill_level: String, $location: String) {
        addGame(date: $date, time: $time, sport: $sport, number_of_players: $number_of_players, skill_level: $skill_level, location: $location) {
            date
            time
            sport 
            number_of_players
            skill_level
            location
        }
    }
`