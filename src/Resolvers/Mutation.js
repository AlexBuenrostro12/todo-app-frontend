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

 export const CREATE_TICKET = gql`
   mutation CREATE_TICKET(
      $title: String!
      $email: String!
   ) {
      createTicket(
         title: $title
         owner: { connect: { email: $email } }
      ) {
         id
      }
   }
 `;