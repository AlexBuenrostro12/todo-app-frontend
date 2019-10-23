import { gql } from 'apollo-boost';

export const CREATE_USER_MUTATION = gql`
     mutation CREATE_USER_MUTATION(
        $name: String!
        $email: String!
        $password: String!
     ) {
        signUp(
             name: $name
             email: $email
             password: $password
         ) {
            id
            email
         }
     }
 `;