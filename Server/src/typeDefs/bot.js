import { gql } from 'apollo-server'

export default gql`
  extend type Mutation {
    getBotMessage(
      text: String! 
      patient_token: String!
      chat_token: String!
      contexts: String
      title: String
    ): botMessage
  }
  type botMessage {
    data: String
    context: String
  }`
