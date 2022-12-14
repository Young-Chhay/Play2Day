import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            user.[game]
            
            
        }
    }
`
export const QUERY_SINGLE_GAME = gql`
    query getSingleGame {
        singleGame {
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