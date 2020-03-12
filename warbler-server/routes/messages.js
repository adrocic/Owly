import express from 'express';
const messagesRouter = express.Router({ mergeParams: true });
import {
  createMessage,
  getMessage,
  deleteMessage,
} from '../handlers/messages.js';

messagesRouter.route('/').get(createMessage);
messagesRouter
  .route('/:message_id')
  .get(getMessage)
  .delete(deleteMessage);

export default messagesRouter;
