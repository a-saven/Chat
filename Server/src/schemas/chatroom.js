import mongoose from 'mongoose';

const Schema = mongoose.Schema

const chatroomSchema  =  new Schema(
  {
    token: {
      type: String
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    supporter: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    chats: [{
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    }],
    resolved: {
      type: Boolean,
      default: false
    },
    takeoverAgent: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default chatroomSchema;