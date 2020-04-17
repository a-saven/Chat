import { PubSub } from 'apollo-server'
import { paginateResults } from './database';

const NEW_MESSAGE = 'NEW_MESSAGE';
const pubsub = new PubSub();
//fieldName: (parent, args, context, info) => data;
const resolvers = {
  Message: {
    sender: async (parent, args, {dataSources}, info) => {
      //parent is the root object (Message is the parent here)
      const sender = await dataSources.userAPI.findOneUser({_id: parent.sender});
      return sender
    }
  },
  // Chat: {
  //   chats: async (parent, args, {dataSources}, info) => {
  //     //parent is the root object (Chat is the parent here)
  //     const messages = await dataSources.messageAPI.findChatMessages(parent.chats);
  //     return messages
  //   }
  // },
  Query: {
    user: async(_source, _args, {dataSources}) => {
      const users = await dataSources.userAPI.findOneUser(_args);
      return users;
    },
    users: async (_source, _args, { dataSources }) => {
      const profile = await dataSources.profileAPI.findProfile()
      const users = await dataSources.userAPI.findUsers(_args);
      return users;
    },
    agents: async () => {
      const agents = await dataSources.userAPI.findUsers({ user_type: 3 })
      return agents;
    },
    getOneChat: async(_source, _args, { dataSources }) => {
      const chat = await dataSources.messageAPI.findOneChat(_args);
      return chat;
    },
    getAllChats: async(_source, { pageSize = 20, after }, { dataSources }) => {
      const allChats = await dataSources.messageAPI.findChats({});
      allChats.reverse();
      const chats = paginateResults({
        after,
        pageSize,
        results: allChats
      })
      const obj = {
        chats,
        cursor: chats.length ? chats[chats.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: chats.length
          ? chats[chats.length - 1].cursor !==
          allChats[allChats.length - 1].cursor
          : false
      };
      return obj;
    },
    GetMessagesByIds: async(_source, _args, { dataSources }) => {
      const messages = await dataSources.messageAPI.findMessages(_args);
      return messages;
    },
    message: async(_source, _args, { dataSources }) => {
      const message = await dataSources.messageAPI.findOneMessage(_args);
      return message;
    },
    messagesByChat: async(_source, {chatId}, { dataSources }) => {
      const messages = await dataSources.messageAPI.messagesByChatId({chatId});
      return messages
    },
    newChat: async(_, { token }, { dataSources }) => {
      try {
        const user = await dataSources.userAPI.findUserByToken(token);
        if (!user) console.error('No such user')
        const chat = await dataSources.messageAPI.createChat(user._id);
        return chat;
      } catch (e) {
        throw e;
      }
    },
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return Buffer.from(email).toString('base64');
    },
    addUser: async (parent, args, context, req) => {
      try {
        const user = await req.dataSources.userAPI.findOrCrateUser(args);
        return user;
      } catch (e) {
        throw e;
      }
    },
    signInWithPassword: async (parent, args, context, req) => {
      try {
        const credentials = await req.dataSources.userAPI.signInWithPassword(args);
        return credentials;
      } catch (err) {
        throw err
      }
    },
    signUp: async (parent, args, context, req) => {
      try {
        const credentials = await req.dataSources.userAPI.createAgent(args);
        return credentials;
      } catch (err) {
        throw err
      }
    },
    sendMessage: async (_, {content, sender,  chat_token, type, chatId}, {dataSources}, req) => {
      try {
        const message = await dataSources.messageAPI.sendMessage({content, sender,  chat_token, type, chatId, req});
        return message;
      } catch (e) {
        throw e;
      }
    },
    getBotMessage: async (parent, {text, patient_token, chat_token, title}, context, req) => {
      try {
        const message = req.dataSources.dialogFlowAPI.botMessage({text, patient_token, chat_token, title}, req);
        return message;
      } catch (e) {
        throw e;
      }
    },
    sendMessageFromAgent: async(parent, { chat_token }, context, req) => {
      try {
        const message = req.dataSources.messageAPI.findOrCreateMessage(chat_token);
        return message;
      } catch(e) {
        throw e;
      }
    },
    setResolvedChat: async(parent, { chat_token, resolved }, context, req) => {
      try {
        const resolve = await req.dataSources.messageAPI.updateChat({ chat_token, resolved });
        return resolve;
      } catch (e) {
        throw e;
      }
    },

    assignWithAgentId: async(parent, args, context, req) => {
      try {
        const chat = await req.dataSources.messageAPI.updateChat(args);
        return chat;
      } catch (e) {
        throw e;
      }
    }
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator([NEW_MESSAGE]),
    }
  }
}

export default resolvers