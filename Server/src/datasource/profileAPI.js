import { DataSource } from 'apollo-datasource';
import mongoose from 'mongoose';
import crypto from 'crypto';
const algorithm = "aes-256-ctr";
const password = "Thu3PeAPS8MWAt7v";

export default class Profile extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findProfile({params} = {}) {
    const  user = await this.store.Profile.findOne({_id:"fNDPt3zA56xkr4RAR"});
    return user;
  }
}