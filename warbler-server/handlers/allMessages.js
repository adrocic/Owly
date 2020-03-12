import * as db from '../models/index.js';

export const getAllMessages = async function(req, res, next) {
  try {
    const allMessages = await db.Message.find()
      .sort({ createdAt: 'desc' })
      .populate('user', {
        username: true,
        profileImageUrl: true,
      });
    return res.status(200).json(allMessages);
  } catch (error) {
    return next(error);
  }
};
