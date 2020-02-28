import * as db from '../models/index.js';

export const createMessage = async function(req, res, next) {
  try {
    const message = await db.Message.create({
      text: req.body.text,
      user: req.params.id,
    });
    const foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message.id);
    await foundUser.save();
    const foundMessage = await db.Message.findById(message._id).populate(
      'user',
      { username: true, profileImageUrl: true }
    );
    return res.status(201).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

// export const getMessage = async function(req, res, next) {};

// export const deleteMessage = async function(req, res, next) {};
