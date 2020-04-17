import { config } from 'dotenv';
import { ApolloServer } from 'apollo-server';
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import createStore, {createProfileStore} from "./database";
import UserAPI from "./datasource/userAPI";
import MessagesAPI from './datasource/messagesAPI';
import ProfileAPI from './datasource/profileAPI';
import isEmail from 'isemail';

const { DB_LOCAL, DB_CORE } = process.env;

const store = createStore(DB_LOCAL);
const profileStore = createProfileStore(DB_CORE);

const dataSources = () => ({
  userAPI: new UserAPI({ store }),
  messageAPI: new MessagesAPI({ store }),
  profileAPI: new ProfileAPI({ store: profileStore })
})

const context = async ({ req }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || '';
  const email = Buffer.from(auth, 'base64').toString('ascii');
  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const users = await store.Users.findOrCreate({ where: { email } });
  const user = users && users[0] ? users[0] : null;

  return { user: { ...user.dataValues } };
};

const server = new ApolloServer({
 typeDefs,
 resolvers,
 dataSources,
 context
});

server.listen().then(({ url }) => {
 console.log(`🚀 Server ready at ${url}`)
});