import mongoose from 'mongoose';

const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      default: null
    },
    user_type: {
      type: Number,
      required: true
    },
    token: {
      type: String,
      default: null
    },
    chats: [{
      type: Schema.Types.ObjectId,
      ref: 'Chat'
    }],
    img: String,
    password: String,
    email: String
  },
  { timestamps: true }
);

//const User = mongoose.model('User', userSchema);

export default userSchema;
