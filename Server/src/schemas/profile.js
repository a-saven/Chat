import mongoose from 'mongoose';

const Schema = mongoose.Schema
const profileSchema = new Schema(
  {
    _id: String,
    username: String,
    emails: [{
      address: String,
      verified: Boolean,
    }],
    profile: Object,
  },
  { timestamps: true }
);

export default profileSchema;