import mongoose from 'mongoose';
import { User } from './user.js';

const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 160,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.pre('remove', async function(next) {
  try {
    console.log('This object inside of MessageSchema.pre: ' + this);
    const user = await User.findById(this.user);
    user.messages.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    next(err);
  }
});

export const Message = mongoose.model('Message', MessageSchema);
