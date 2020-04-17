import { gql } from 'apollo-server';

export default gql`
   extend type Query {
     user(token: String): User
     users: [User]
     agent(id: ID): Agent
     agents: [Agent]
     me(token: String): Agent
     findUsers: [User]
   }
   extend type Mutation {
     addUser(
       name: String!
       patient_token: String!
       chat_token: String!
       user_type: Int!
     ): User
     signInWithPassword(
       email: String!
       password: String!
     ): Tokens
     signUp(
       username: String!
       email: String!
       password: String!
     ): User
     assignWithAgentId(
       agent_id: String!
       chat_token: String!
     ): Chat
     login(
       email: String
      ): String
   }
   type User {
     _id: ID
     username: String
     name: String
     token: String
     email: String
     password: String
     user_type: Int
     chats: [Chat!]
     img: String
   }
   type Agent {
     id: ID
     email: String
     username: String
   }
   type Tokens {
     token: String!
     ssoToken: String
     email: String!
     username: String!
   }`