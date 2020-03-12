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

// /api/users/:id/messages/:id
export const getMessage = async function(req, res, next) {
  try {
    const message = db.Message.find(req.params.message_id);
    return res.status(200).json(message);
  } catch (error) {
    return next(error);
  }
};

export const deleteMessage = async function(req, res, next) {
  try {
    const foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
  } catch (error) {
    return next(error);
  }
};

// export const getMessage = async function(req, res, next) {};

// export const deleteMessage = async function(req, res, next) {};
