import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            myGames {
                // NEED TO UPDATE WITH GAMES INFO
            }
            
        }
    }
`