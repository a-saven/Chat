import mongoose from 'mongoose';

const Schema = mongoose.Schema

const chatSchema  =  new Schema(
  {
    content: {
      type: String
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    chat_token: {
      type: String
    },
    chatId: {
      type: Schema.Types.ObjectId,
    }
  },
{ timestamps: true }
);

export default chatSchema;