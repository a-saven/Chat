import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    getAllChats (
    """
    The number of results to show. Must be >= 1. Default = 20
    """
    pageSize: Int
    """
    If you add a cursor here, it will only return results _after_ this cursor
    """
    after: String
    ) : ChatConnection
    getAllMessages (pageSize: Int, after: String): MessageConnection
    GetMessagesByIds (_id: [ID]): [Message]
    getOneChat(_id: ID): Chat
    messagesByChat(chatId: ID): [Message]
    message (_id: ID): Message
    newChat(token: String): Chat
  }
  type Subscription {
    newMessage: Message
  }
  extend type Mutation {
    setResolvedChat(
      chat_token: String! 
      resolved: Boolean!
    ): Chat
    sendMessageFromAgent(
      chat_token: String! 
    ): Message
    sendMessage(
      content: String
      sender: ID
      patient_token: String
      chat_token: String
      chatId: String
      type: String
    ): Message
  }
  type Chat {
    _id: ID
    resolved: Boolean
    takeoverAgent: Int
    customer: User
    supporter: User
    token: String
    createdAt: String
    updatedAt: String
  }
  type Message {
    _id: ID
    content: String
    sender: User
    createdAt: String
    updatedAt: String
    chat_token: String
    chatId: String
  }
  type ChatConnection {
    cursor: String!,
    hasMore: Boolean!,
    chats: [Chat]!
  },
  type MessageConnection {
    cursor: String!,
    hasMore: Boolean!,
    messages: [Message]!
  }
`