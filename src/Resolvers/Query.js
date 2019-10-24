import { gql } from 'apollo-boost';

export const SIGNIN = gql`
    query SIGNIN($email: String! $password: String!) {
        signIn(where: { email: $email }, password: $password) {
            id 
            email
            name
        }
    }
`;

export const TICKETS = gql`
    query TICKETS {
        tickets{
            id
            title
            owner {
                name
            }
        }
    }
`;