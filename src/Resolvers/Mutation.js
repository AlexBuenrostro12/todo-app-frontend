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

 export const EDIT_TICKET = gql`
   mutation EDIT_TICKET(
      $id: ID!
      $title: String!
   ) {
      updateTicket(
         where: { id: $id } 
         data: { title: $title }) {
         id
      }
   }
 `;

 export const ASSIGN_DEVELOPER = gql`
   mutation ASSIGN_DEVELOPER(
      $id: ID!
      $email: String!
   ) {
      assignDeveloper(
         where: { id: $id } 
         data: {
            developer: {
               create: { 
                  developedBy: { 
                     connect: { 
                        email: $email 
                     } 
                  } 
               }
            }
         }
      ) {
         id
      }
   }
 `;

 export const DELETE_TICKET = gql `
   mutation DELETE_TICKET(
      $id: ID!
   ) {
      deleteTicket(where: { id: $id }) {
         id
      }
   }
 `;

 export const COMMENT_TICKET = gql`
   mutation COMMENT_TICKET(
      $id: ID!
      $comment: String!
      $email: String!
   ) {
      commentTicket(
         where: { id: $id } 
         data: {
            comments: {
               create: {
                  comment: $comment
                  commentedBy: {
                     connect: { email: $email }
                  }
               }
            }
         }
      ) {
         id
      }
   }
 `;   