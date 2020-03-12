import express from 'express';
const messagesRouter = express.Router({ mergeParams: true });
import {
  createMessage,
  getMessage,
  deleteMessage,
} from '../handlers/messages.js';

messagesRouter.post('/', createMessage);
messagesRouter.get('/:message_id', getMessage);
messagesRouter.delete('/:message_id', deleteMessage);

export default messagesRouter;
