import { DataSource } from 'apollo-datasource';
import { sign } from 'jsonwebtoken'
import { getInfoWithToken } from '../utils/getInfoWithToken'

export default class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const users = await this.store.Users.findOrCreate({ where: { email } });
    return users && users[0] ? users[0] : null;
  }

  async findOneUser (params) {
    const user = await this.store.User.findOne(params);
    return user;
  }

  async findUserByToken (token) {
    const user = await this.store.User.findOne({token: token}, 'token _id name user_type img');
    return user;
  }

  async findUsers({params} = {}) {
    const users = await this.store.User.find({params});
    return users;
  }

  async singInWithPassword(args) {
    let { email, password } = args;
    email = email.toLowerCase();
    const agent = await this.store.findOne({ email })
    if (!agent) throw new Error('Not registed User.')
    const encodedPassword = agent.password;
    if (password === encodedPassword) {
      const secret = JWT_SECRET_KEY;
      const token = sign(
        {
          id: agent._id,
          email
        },
        secret,
        {
          expiresIn: TOKEN_EXPIRES_IN
        }
      );
      const username = agent.username || 'username';
      return { token, email, username };
    }
  }

  async createAgent (args) {
    let { username, email, password } = args;
    email = email.toLowerCase();
    const agent = await  this.store.User.findOne({ email })
    if (agent) throw new Error('Already registered.')
    const newAgent = {
      name: "Agent",
      username,
      email,
      password,
      user_type: 3,
      img: 'resources/images/avatars/4.jpg'
    }
    return  this.store.User.create(newAgent)
  }
}